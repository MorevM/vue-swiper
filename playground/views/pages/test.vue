<template>
	<div>
		<!-- <br v-for="i in 50" :key="i" /> -->
		<swiper
			class="swiper-test"
			v-bind="cOptions"
			lazy-init
			:children-key="childrenKey"
		>
			<swiper-slide
				v-for="item in cItems"
				:key="item.label"
				@click="isDisabled = !isDisabled"
			>
				<button type="button" @click="activeItem = item.label">Set active</button><br />
				{{ item }}<br />
				<!-- {{ slideData }} -->
			</swiper-slide>

			<!-- <template #navigation>
				<button ref="prevEl" type="button">Prev button!</button>
				<button ref="nextEl" type="button">Next button</button>
				</template> -->

			<template #pagination>
				<div ref="paginationEl" class="swiper-pagination"></div>
			</template>

			<template #button-prev-content>
				prev
			</template>

			<template #button-next-content>
				next
			</template>

			<!-- <div class="swiper-slide">1</div>
				<div class="swiper-slide">2</div>
				<div class="swiper-slide">3</div>
				<div class="swiper-slide">4</div>
				<div class="swiper-slide">5</div> -->
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
	} from '../../../src/index.js';
	import 'swiper/swiper-bundle.min.css';

	export default {
		name: 'test', // eslint-disable-line vue/multi-word-component-names
		components: {
			Swiper,
			SwiperSlide,
		},
		props: {},
		data: (vm) => ({
			isDisabled: false,
			clicked: {},
			activeItem: 1,
			items: [1, 2, 3, 4, 5, 6],
		}),
		computed: {
			cItems() {
				return this.items.map(i => ({
					active: i === this.activeItem,
					label: i,
				}))
			},
			cOptions() {
				return {
					slidesPerView: 2,
					spaceBetween: 16,
					// initialSlide: 2,
					modules: [
						Navigation,
						Pagination,
						Autoplay,
						FreeMode,
						Virtual,
						EffectCoverflow,
						Grid,
						A11y,
					],
					// lazyInit: true,
					navigation: true,
					// navigation: {
					// 	prevEl: () => this.$refs.prevEl,
					// 	nextEl: () => this.$refs.nextEl,
					// },
					navigationOutside: true,
					pagination: {
						el: () => this.$refs.paginationEl,
						renderBullet: (index, classname) => `<div class="${classname}">${index}</div>`,
					},
					watchSlidesProgress: true,
					// paginationOutside: true,
					loop: true,
					// virtual: true,
					disabled: this.isDisabled,
					bemBlock: 'test',
				};
			},
		},
		methods: {
			childrenKey(oldKey) {
				const key = this.items.map(i => (i === this.activeItem).toString()).join('');
				return (oldKey === key) ? false : key;
			}
		},
		mounted() {
			console.log('test mounted');
		},
	};
</script>

<style lang="scss">
	.swiper-root { position: relative; }
	.swiper-root:not(.swiper-initialized) .swiper-slide-duplicate {
		position: absolute;
		left: -99999px;
	}

	.swiper-test { width: 700px; margin: 50px auto; outline: 2px solid red; }
	.swiper-slide { padding: 50px; outline: 1px solid blue;}

	.swiper:not(.swiper-initialized) {
		.swiper-wrapper {
			display: flex;
			gap: 16px;
		}
		.swiper-slide {
			margin-right: 16px;
			width: calc(50%);
		}
	}
</style>
