<template>
	<component
		:is="tag"
		ref="slide"
		:class="cClasses"
		:data-swiper-slide-index="index"
		:style="cStyle"
	>
		<div
			v-if="zoom"
			class="swiper-zoom-container"
			:data-swiper-zoom="typeof zoom === 'number' ? zoom : undefined"
		>
			<slot v-bind="slideData"></slot>
		</div>
		<slot v-bind="slideData"></slot>
	</component>
</template>

<script>
	import { isVirtual, uniqueClasses } from './utils.js';

	export default {
		name: 'swiper-slide',
		provide() {
			return {
				swiperSlide: this.slideData,
			};
		},
		props: {
			tag: { type: String, default: 'div' },
			zoom: { type: Boolean, default: false },
			swiper: { type: Object, default: undefined },
			index: { type: Number, default: undefined },
			virtualData: { type: Object, default: undefined },
			bemBlock: { type: String, default: undefined },
		},
		data: () => ({
			eventAttached: false,
			slideClasses: 'swiper-slide not-initialized',
		}),
		computed: {
			slideData() {
				const includes = (...classes) => classes.map(c => this.slideClasses.includes(c)).some(Boolean);
				return {
					isActive: includes('swiper-slide-active', 'swiper-slide-duplicate-active'),
					isVisible: includes('swiper-slide-visible'),
					isDuplicate: includes('swiper-slide-duplicate'),
					isPrev: includes('swiper-slide-prev', 'swiper-slide-duplicate-prev'),
					isNext: includes('swiper-slide-next', 'swiper-slide-duplicate-next'),
				};
			},
			cClasses() {
				const bemClass = this.bemBlock
					? `${this.bemBlock}__swiper-slide`
					: null;

				return [bemClass, uniqueClasses(this.slideClasses)]
					.filter(Boolean).join(' ');
			},
			cStyle() {
				if (!isVirtual(this.swiper)) return {};
				const prop = this.swiper.isHorizontal()
					? (this.swiper.rtlTranslate ? 'right' : 'left')
					: 'top';
				return { [prop]: `${this.virtualData.offset}px` };
			},
		},
		methods: {
			updateClasses(swiper, el, classNames) {
				if (el === this.$refs.slide) this.slideClasses = classNames;
			},
		},
		mounted() {
			if (!this.swiper) return;
			this.swiper.on('_slideClass', this.updateClasses);
			this.eventAttached = true;
		},
		beforeUpdate() {
			if (this.eventAttached || !this.swiper) return;
			this.swiper.on('_slideClass', this.updateClasses);
			this.eventAttached = true;
		},
		beforeDestroy() {
			if (!this.swiper) return;
			this.swiper.off('_slideClass', this.updateClasses);
		},
		updated() {
			if (!this.$refs.slide || !this.swiper) return;
			if (this.swiper.destroyed && this.slideClasses !== 'swiper-slide') {
				this.slideClasses = 'swiper-slide';
			}
		},
	};
</script>
