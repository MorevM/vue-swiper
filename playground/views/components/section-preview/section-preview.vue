<template>
	<base-section tag="div" class="section-preview">
		<swiper-block
			id="default"
			class="section-preview__block"
			v-bind="{ title: 'Default', ...swiperDefault }"
		/>
		<swiper-block
			id="controls"
			class="section-preview__block"
			v-bind="{ title: 'All controls', ...swiperControls }"
		/>
		<swiper-block
			id="loop"
			class="section-preview__block"
			v-bind="{ title: 'Infinity loop', ...swiperLoop }"
		/>
		<swiper-block
			id="autoheight"
			class="section-preview__block"
			v-bind="{ title: 'Auto-height', slides: 5, ...swiperAutoheight }"
		/>
		<swiper-block
			id="vertical"
			class="section-preview__block"
			v-bind="{ title: 'Vertical direction', ...swiperVertical }"
		/>
		<swiper-block
			id="autoplay"
			class="section-preview__block"
			v-bind="{ title: 'Autoplay', ...swiperAutoplay }"
		/>
		<swiper-block
			id="freemode"
			class="section-preview__block"
			v-bind="{ title: 'Free mode', ...swiperFreemode }"
		/>
		<swiper-block
			id="virtual"
			class="section-preview__block"
			v-bind="{ title: 'Virtual slides', slides: 1000, ...swiperVirtual }"
		/>
		<swiper-block
			id="coverflow"
			class="section-preview__block"
			v-bind="{ title: 'Coverflow effect', ...swiperCoverflow }"
		/>
		<swiper-block
			id="grid"
			class="section-preview__block"
			v-bind="{ title: 'Grid module', slides: 9, ...swiperGrid }"
		/>
	</base-section>
</template>

<script>
	import BaseSection from '~components/base-section/base-section.vue';
	import SwiperBlock from '~components/swiper-block/swiper-block.vue';

	const defaults = {
		navigation: true,
		breakpoints: {
			0: { slidesPerView: 1, spaceBetween: 10 },
			600: { slidesPerView: 2, spaceBetween: 15 },
			1024: { slidesPerView: 3, spaceBetween: 20 },
		},
	};

	export default {
		name: 'section-preview',
		components: {
			BaseSection,
			SwiperBlock,
		},
		props: {},
		data: (vm) => ({
			swiperDefault: {
				...defaults,
			},
			swiperControls: {
				...defaults,
				slidesPerView: 1,
				spaceBetween: 10,
				pagination: {
					type: 'bullets',
					clickable: true,
				},
				scrollbar: {
					draggable: true,
				},
			},
			swiperLoop: {
				...defaults,
				loop: true,
			},
			swiperAutoheight: {
				...defaults,
				autoHeight: true,
			},
			swiperVertical: {
				...defaults,
				breakpoints: {
					0: { slidesPerView: 2, spaceBetween: 15 },
				},
				direction: 'vertical',
			},
			swiperAutoplay: {
				...defaults,
				autoplay: {
					delay: 1000,
					disableOnInteraction: true,
				},
			},
			swiperFreemode: {
				...defaults,
				freeMode: true,
			},
			swiperVirtual: {
				...defaults,
				pagination: {
					type: 'fraction',
				},
				virtual: true,
			},
			swiperCoverflow: {
				...defaults,
				breakpoints: {
					0: { slidesPerView: 1, spaceBetween: 15 },
					600: { slidesPerView: 3, spaceBetween: 20 },
				},
				effect: 'coverflow',
				coverflowEffect: {
					depth: 200,
					rotate: 45,
					slideShadows: false,
				},
				centeredSlides: true,
			},
			swiperGrid: {
				...defaults,
				breakpoints: {
					0: { slidesPerView: 2, spaceBetween: 15 },
					600: { slidesPerView: 3, spaceBetween: 15 },
				},
				grid: {
					rows: 2,
				},
			},
		}),
		computed: {},
		methods: {},
	};
</script>

<style lang="scss" src="./section-preview.scss"></style>
