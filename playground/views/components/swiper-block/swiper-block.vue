<template>
	<div class="swiper-block">
		<div class="swiper-block__title">
			{{ title }}
		</div>

		<swiper class="swiper-block__items" v-bind="cmpOptions">
			<div
				v-for="slide in slides"
				:key="slide"
				:class="['swiper-block__item', getSlideColor(slide)]"
			>
				<div class="swiper-block__item-content" v-html="getSlideContent(slide)"></div>
			</div>
		</swiper>
	</div>
</template>

<script>
	import {
		Swiper,
		SwiperSlide,
		Navigation,
		Pagination,
		Autoplay,
		FreeMode,
		Virtual,
		EffectCoverflow,
		Grid,
		A11y,
		Scrollbar,
	} from '../../../../src/index.js';

	import 'swiper/swiper-bundle.min.css';

	export default {
		name: 'swiper-block',
		components: {
			Swiper,
			SwiperSlide,
		},
		props: {
			title: {
				type: String,
				required: true,
			},
			slides: {
				type: Number,
				default: 10,
			},
			slidesPerView: {
				type: Number,
				default: 1,
			},
			spaceBetween: {
				type: Number,
				default: 0,
			},
			breakpoints: {
				type: Object,
				default: () => ({}),
			},
			navigation: {
				type: [Boolean, Object],
				default: false,
			},
			pagination: {
				type: [Boolean, Object],
				default: false,
			},
			scrollbar: {
				type: [Boolean, Object],
				default: false,
			},
			loop: {
				type: Boolean,
				default: false,
			},
			autoHeight: {
				type: Boolean,
				default: false,
			},
			direction: {
				validator: (value) => ['vertical', 'horizontal'].includes(value),
				default: 'horizontal',
			},
			autoplay: {
				type: [Boolean, Object],
				default: false,
			},
			freeMode: {
				type: [Boolean, Object],
				default: false,
			},
			virtual: {
				type: [Boolean, Object],
				default: false,
			},
			effect: {
				type: String,
				default: 'slide',
			},
			coverflowEffect: {
				type: Object,
				default: () => ({}),
			},
			centeredSlides: {
				type: Boolean,
				default: false,
			},
			grid: {
				type: Object,
				default: () => ({}),
			},
		},
		data: (vm) => ({}),
		computed: {
			cmpOptions() {
				return {
					slidesPerView: this.slidesPerView,
					spaceBetween: this.spaceBetween,
					breakpoints: this.breakpoints,
					navigation: this.navigation,
					pagination: this.pagination,
					scrollbar: this.scrollbar,
					loop: this.loop,
					autoHeight: this.autoHeight,
					direction: this.direction,
					autoplay: this.autoplay,
					freeMode: this.freeMode,
					virtual: this.virtual,
					effect: this.effect,
					coverflowEffect: this.effect === 'coverflow' ? this.coverflowEffect : null,
					centeredSlides: this.centeredSlides,
					grid: this.grid,
					modules: [
						Navigation,
						Pagination,
						Autoplay,
						FreeMode,
						Virtual,
						EffectCoverflow,
						Grid,
						Scrollbar,
						A11y,
					],
				};
			},
		},
		methods: {
			getSlideColor(index) {
				switch (index % 6) {
					case 1:
						return 'style-color-one';
					case 2:
						return 'style-color-two';
					case 3:
						return 'style-color-three';
					case 4:
						return 'style-color-four';
					case 5:
						return 'style-color-five';
					default:
						return 'style-color-six';
				}
			},
			getSlideContent(index) {
				if (!this.autoHeight) {
					return `<div class="swiper-block__item-index">${index}</div>`;
				}

				return `
					<p>Slide ${index}</p>
					${'<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>'.repeat(index)}
				`;
			},
		},
	};
</script>

<style lang="scss" src="./swiper-block.scss"></style>
