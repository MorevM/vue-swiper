import Swiper from 'swiper';

import { cloneVNode, setProps } from './utils.js';

export const calcLoopedSlides = (slides, swiperParams) => {
	let slidesPerViewParams = swiperParams.slidesPerView;
	if (swiperParams.breakpoints) {
		const breakpoint = Swiper.prototype.getBreakpoint(swiperParams.breakpoints);
		const breakpointOnlyParams = breakpoint in swiperParams.breakpoints
			? swiperParams.breakpoints[breakpoint]
			: undefined;
		if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
			slidesPerViewParams = breakpointOnlyParams.slidesPerView;
		}
	}
	let loopedSlides = Math.ceil(parseFloat(swiperParams.loopedSlides || slidesPerViewParams));

	loopedSlides += swiperParams.loopAdditionalSlides;

	if (loopedSlides > slides.length) {
		loopedSlides = slides.length;
	}

	return loopedSlides;
};

export const renderLoop = (swiper, slides, swiperParams, h) => {
	const modifiedSlides = slides.map((slide, index) => {
		setProps(slide, { index });
		return slide;
	});

	const duplicateSlide = (child, index, position) => {
		const cloned = cloneVNode(child, h);
		cloned.key = `duplicate-${index}-${position}`;
		cloned.data.staticClass = swiperParams.slideDuplicateClass;
		return cloned;
	};

	if (swiperParams.loopFillGroupWithBlank) {
		const blankSlidesNum = swiperParams.slidesPerGroup - (modifiedSlides.length % swiperParams.slidesPerGroup);
		if (blankSlidesNum !== swiperParams.slidesPerGroup) {
			for (let i = 0; i < blankSlidesNum; i += 1) {
				const blankSlide = h('div', {
					class: `${swiperParams.slideClass} ${swiperParams.slideBlankClass}`,
				});
				modifiedSlides.push(blankSlide);
			}
		}
	}

	if (swiperParams.slidesPerView === 'auto' && !swiperParams.loopedSlides) {
		swiperParams.loopedSlides = modifiedSlides.length;
	}

	const loopedSlides = calcLoopedSlides(modifiedSlides, swiperParams);

	const prependSlides = [];
	const appendSlides = [];
	modifiedSlides.forEach((child, index) => {
		if (index < loopedSlides) {
			appendSlides.push(duplicateSlide(child, index, 'prepend'));
		}
		if (index < modifiedSlides.length && index >= modifiedSlides.length - loopedSlides) {
			prependSlides.push(duplicateSlide(child, index, 'append'));
		}
	});
	if (swiper) {
		swiper.loopedSlides = loopedSlides;
	}

	return [...prependSlides, ...modifiedSlides, ...appendSlides];
};
