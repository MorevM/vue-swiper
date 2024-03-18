<!-- eslint-disable vue/require-typed-object-prop -->
<script>
	/* eslint-disable vue/no-unused-properties, no-autofix/vue/no-boolean-default, vue/no-boolean-default */

	import Swiper from 'swiper';
	import { camelCase, kebabCase, isFunction, arrayUnique, isEmpty } from '@morev/helpers';
	import { getParams } from './get-params.js';
	import { updateSwiper } from './update-swiper.js';
	import { getChangedParams } from './get-changed-params.js';
	import { extend, isVirtual, cloneVNode, setProps } from './utils.js';
	import { calcLoopedSlides, renderLoop } from './loop.js';
	import SwiperSlide from './swiper-slide.vue';

	export default {
		// eslint-disable-next-line vue/multi-word-component-names
		name: 'swiper',
		props: {
			tag: { type: String, default: 'div' },
			wrapperTag: { type: String, default: 'div' },
			modules: { type: Array, default: undefined },
			init: { type: Boolean, default: undefined },
			direction: { type: String, default: undefined },
			touchEventsTarget: { type: String, default: undefined },
			initialSlide: { type: Number, default: undefined },
			speed: { type: Number, default: undefined },
			cssMode: { type: Boolean, default: undefined },
			updateOnWindowResize: { type: Boolean, default: undefined },
			resizeObserver: { type: Boolean, default: undefined },
			nested: { type: Boolean, default: undefined },
			focusableElements: { type: String, default: undefined },
			width: { type: Number, default: undefined },
			height: { type: Number, default: undefined },
			preventInteractionOnTransition: { type: Boolean, default: undefined },
			userAgent: { type: String, default: undefined },
			url: { type: String, default: undefined },
			edgeSwipeDetection: { type: [Boolean, String], default: undefined },
			edgeSwipeThreshold: { type: Number, default: undefined },
			autoHeight: { type: Boolean, default: undefined },
			setWrapperSize: { type: Boolean, default: undefined },
			virtualTranslate: { type: Boolean, default: undefined },
			effect: { type: String, default: undefined },
			breakpoints: { type: Object, default: undefined },
			spaceBetween: { type: Number, default: undefined },
			slidesPerView: { type: [Number, String], default: undefined },
			maxBackfaceHiddenSlides: { type: Number, default: undefined },
			slidesPerGroup: { type: Number, default: undefined },
			slidesPerGroupSkip: { type: Number, default: undefined },
			slidesPerGroupAuto: { type: Boolean, default: undefined },
			centeredSlides: { type: Boolean, default: undefined },
			centeredSlidesBounds: { type: Boolean, default: undefined },
			slidesOffsetBefore: { type: Number, default: undefined },
			slidesOffsetAfter: { type: Number, default: undefined },
			normalizeSlideIndex: { type: Boolean, default: undefined },
			centerInsufficientSlides: { type: Boolean, default: undefined },
			watchOverflow: { type: Boolean, default: undefined },
			roundLengths: { type: Boolean, default: undefined },
			touchRatio: { type: Number, default: undefined },
			touchAngle: { type: Number, default: undefined },
			simulateTouch: { type: Boolean, default: undefined },
			shortSwipes: { type: Boolean, default: undefined },
			longSwipes: { type: Boolean, default: undefined },
			longSwipesRatio: { type: Number, default: undefined },
			longSwipesMs: { type: Number, default: undefined },
			followFinger: { type: Boolean, default: undefined },
			allowTouchMove: { type: Boolean, default: undefined },
			threshold: { type: Number, default: undefined },
			touchMoveStopPropagation: { type: Boolean, default: undefined },
			touchStartPreventDefault: { type: Boolean, default: undefined },
			touchStartForcePreventDefault: { type: Boolean, default: undefined },
			touchReleaseOnEdges: { type: Boolean, default: undefined },
			uniqueNavElements: { type: Boolean, default: undefined },
			resistance: { type: Boolean, default: undefined },
			resistanceRatio: { type: Number, default: undefined },
			watchSlidesProgress: { type: Boolean, default: undefined },
			grabCursor: { type: Boolean, default: undefined },
			preventClicks: { type: Boolean, default: undefined },
			preventClicksPropagation: { type: Boolean, default: undefined },
			slideToClickedSlide: { type: Boolean, default: undefined },
			preloadImages: { type: Boolean, default: undefined },
			updateOnImagesReady: { type: Boolean, default: undefined },
			loop: { type: Boolean, default: undefined },
			loopAdditionalSlides: { type: Number, default: undefined },
			loopedSlides: { type: Number, default: undefined },
			loopFillGroupWithBlank: { type: Boolean, default: undefined },
			loopPreventsSlide: { type: Boolean, default: undefined },
			rewind: { type: Boolean, default: undefined },
			allowSlidePrev: { type: Boolean, default: undefined },
			allowSlideNext: { type: Boolean, default: undefined },
			swipeHandler: { type: Boolean, default: undefined },
			noSwiping: { type: Boolean, default: undefined },
			noSwipingClass: { type: String, default: undefined },
			noSwipingSelector: { type: String, default: undefined },
			passiveListeners: { type: Boolean, default: undefined },
			containerModifierClass: { type: String, default: undefined },
			slideClass: { type: String, default: undefined },
			slideBlankClass: { type: String, default: undefined },
			slideActiveClass: { type: String, default: undefined },
			slideDuplicateActiveClass: { type: String, default: undefined },
			slideVisibleClass: { type: String, default: undefined },
			slideDuplicateClass: { type: String, default: undefined },
			slideNextClass: { type: String, default: undefined },
			slideDuplicateNextClass: { type: String, default: undefined },
			slidePrevClass: { type: String, default: undefined },
			slideDuplicatePrevClass: { type: String, default: undefined },
			wrapperClass: { type: String, default: undefined },
			runCallbacksOnInit: { type: Boolean, default: undefined },
			observer: { type: Boolean, default: undefined },
			observeParents: { type: Boolean, default: undefined },
			observeSlideChildren: { type: Boolean, default: undefined },
			a11y: { type: [Boolean, Object], default: undefined },
			autoplay: { type: [Boolean, Object], default: undefined },
			controller: { type: Object, default: undefined },
			coverflowEffect: { type: Object, default: undefined },
			cubeEffect: { type: Object, default: undefined },
			fadeEffect: { type: Object, default: undefined },
			flipEffect: { type: Object, default: undefined },
			creativeEffect: { type: Object, default: undefined },
			cardsEffect: { type: Object, default: undefined },
			hashNavigation: { type: [Boolean, Object], default: undefined },
			history: { type: [Boolean, Object], default: undefined },
			keyboard: { type: [Boolean, Object], default: undefined },
			lazy: { type: [Boolean, Object], default: undefined },
			mousewheel: { type: [Boolean, Object], default: undefined },
			navigation: { type: [Boolean, Object], default: undefined },
			pagination: { type: [Boolean, Object], default: undefined },
			parallax: { type: [Boolean, Object], default: undefined },
			scrollbar: { type: [Boolean, Object], default: undefined },
			thumbs: { type: Object, default: undefined },
			virtual: { type: [Boolean, Object], default: undefined },
			zoom: { type: [Boolean, Object], default: undefined },
			grid: { type: [Object], default: undefined },
			freeMode: { type: [Boolean, Object], default: undefined },
			// Custom props
			lazyInit: { type: [Boolean, Object], default: false },
			disabled: { type: Boolean, default: false },
			bemBlock: { type: String, default: undefined },
			emitStyle: { type: String, default: 'camelCase' }, // kebab-case
			//
			rootTag: { type: String, default: 'div' },
			rootClass: { type: String, default: 'swiper-root' },
			//
			navigationWrap: { type: Boolean, default: false },
			navigationOutside: { type: Boolean, default: false },
			//
			paginationWrap: { type: Boolean, default: false },
			paginationOutside: { type: Boolean, default: false },
			//
			scrollbarWrap: { type: Boolean, default: false },
			scrollbarOutside: { type: Boolean, default: false },
			//
			childrenKey: { type: Function, default: undefined },
		},
		emits: [
			'_beforeBreakpoint',
			'_containerClasses',
			'_slideClass',
			'_slideClasses',
			'_swiper',
			'activeIndexChange',
			'afterInit',
			'autoplay',
			'autoplayStart',
			'autoplayStop',
			'autoplayPause',
			'autoplayResume',
			'beforeDestroy',
			'beforeInit',
			'beforeLoopFix',
			'beforeResize',
			'beforeSlideChangeStart',
			'beforeTransitionStart',
			'breakpoint',
			'changeDirection',
			'click',
			'disable',
			'doubleTap',
			'doubleClick',
			'destroy',
			'enable',
			'fromEdge',
			'hashChange',
			'hashSet',
			'imagesReady',
			'init',
			'keyPress',
			'lazyImageLoad',
			'lazyImageReady',
			'lock',
			'loopFix',
			'momentumBounce',
			'navigationHide',
			'navigationShow',
			'observerUpdate',
			'orientationchange',
			'paginationHide',
			'paginationRender',
			'paginationShow',
			'paginationUpdate',
			'progress',
			'reachBeginning',
			'reachEnd',
			'realIndexChange',
			'resize',
			'scroll',
			'scrollbarDragEnd',
			'scrollbarDragMove',
			'scrollbarDragStart',
			'setTransition',
			'setTranslate',
			'slideChange',
			'slideChangeTransitionEnd',
			'slideChangeTransitionStart',
			'slideNextTransitionEnd',
			'slideNextTransitionStart',
			'slidePrevTransitionEnd',
			'slidePrevTransitionStart',
			'slideResetTransitionStart',
			'slideResetTransitionEnd',
			'sliderMove',
			'sliderFirstMove',
			'slidesLengthChange',
			'slidesGridLengthChange',
			'snapGridLengthChange',
			'snapIndexChange',
			'swiper',
			'tap',
			'toEdge',
			'touchEnd',
			'touchMove',
			'touchMoveOpposite',
			'touchStart',
			'transitionEnd',
			'transitionStart',
			'unlock',
			'update',
			'zoomChange',
		],
		data: () => ({
			swiper: null,
			isMounted: false,
			wasMounted: false,
			wasInit: false,

			swiperParams: {},
			passedParams: {},
			oldPassedParams: {},
			slides: [],
			oldSlides: [],

			breakpointChanged: false,
			containerClasses: 'swiper',

			virtualData: null,
			prevChildrenKey: null,
		}),
		computed: {
			cleanSlides() {
				if (isEmpty(this.slides)) return [];
				// Skip text and comment nodes
				return this.slides.filter(slide => slide.tag);
			},

			cRootClasses() {
				const extraClasses = this.containerClasses.split(' ').filter(i => i !== 'swiper');
				return arrayUnique([this._withBem(this.rootClass), ...extraClasses]).join(' ');
			},
		},
		watch: {
			virtualData() {
				this.$nextTick(() => {
					const { swiper } = this;
					if (!isVirtual(swiper)) return;

					swiper.updateSlides();
					swiper.updateProgress();
					swiper.updateSlidesClasses();

					if (swiper.lazy && swiper.params.lazy.enabled) {
						swiper.lazy.load();
					}
					if (swiper.parallax && swiper.params.parallax.enabled) {
						swiper.parallax.setTranslate();
					}
				});
			},
			disabled(isDisabled) {
				this.$nextTick(() => {
					isDisabled && this.destroy();
					!isDisabled && this.tryEnable();
				});
			},
		},
		methods: {
			_withBem(classname) {
				if (!this.bemBlock) return classname;
				return [classname, `${this.bemBlock}__${classname}`].join(' ');
			},

			_emitWithCase(event, ...args) {
				if (this.emitStyle === 'camelCase') {
					this.$emit(event, ...args);
				} else {
					this.$emit(kebabCase(event).replace(/^-/, '_'), ...args);
				}
			},

			_getUniversalSlot(kebabCaseName) {
				return this.$slots[kebabCaseName] || this.$slots[camelCase(kebabCaseName)] || '';
			},

			_getSlidesForRender() {
				const wrappedSlides = this.cleanSlides.map(node => {
					if (node.componentOptions?.tag !== 'swiper-slide') {
						return this.$createElement(SwiperSlide, {}, [node]);
					}
					return node;
				}).map((node, index) => {
					setProps(node, { swiper: this.swiper, index, bemBlock: this.bemBlock });
					return node;
				});

				if (this.swiperParams.virtual) {
					if (!this.virtualData) return null;
					return wrappedSlides
						.filter((slide, index) => index >= this.virtualData.from && index <= this.virtualData.to)
						.map((node, i) => {
							const cloned = cloneVNode(node, this.$createElement);
							setProps(cloned, {
								swiper: this.swiper,
								virtualData: this.virtualData,
								index: this.virtualData.from + i,
							});
							return cloned;
						});
				}

				if (this.swiperParams.loop && this.swiper && this.isMounted) {
					this.swiper.loopedSlides = calcLoopedSlides(wrappedSlides, this.swiperParams);
					return renderLoop(this.swiper, wrappedSlides, this.swiperParams, this.$createElement);
				}

				return wrappedSlides;
			},

			_getNavigationNode() {
				if (this.$slots.navigation) return this.$slots.navigation;
				if (!this.passedParams.navigation) return null;
				if (
					typeof this.passedParams.navigation.prevEl !== 'undefined'
					|| typeof this.passedParams.navigation.nextEl !== 'undefined'
				) return;

				const prevButton = this.$createElement('button', {
					class: [this._withBem('swiper-button'), this._withBem('swiper-button-prev')].join(' '),
					ref: 'prevEl',
				}, [this._getUniversalSlot('button-prev-content')]);

				const nextButton = this.$createElement('button', {
					class: [this._withBem('swiper-button'), this._withBem('swiper-button-next')].join(' '),
					ref: 'nextEl',
				}, [this._getUniversalSlot('button-next-content')]);

				const buttons = [prevButton, nextButton];

				return this.navigationWrap
					? this.$createElement('div', { class: this._withBem('swiper-navigation') }, buttons)
					: buttons;
			},

			_getPaginationNode() {
				if (this.$slots.pagination) return this.$slots.pagination;
				if (!this.passedParams.pagination) return null;
				if (typeof this.passedParams.pagination.el !== 'undefined') return null;

				const node = this.$createElement('div', {
					class: this._withBem('swiper-pagination'),
					ref: 'paginationEl',
				});

				return this.paginationWrap
					? this.$createElement('div', { class: this._withBem('swiper-pagination-wrapper') }, [node])
					: node;
			},

			_getScrollbarNode() {
				if (this.$slots.scrollbar) return this.$slots.scrollbar;
				if (!this.passedParams.scrollbar) return null;
				if (typeof this.passedParams.scrollbar.el !== 'undefined') return null;

				const node = this.$createElement('div', {
					class: this._withBem('swiper-scrollbar'),
					ref: 'scrollbarEl',
				});

				return this.scrollbarWrap
					? this.$createElement('div', { class: this._withBem('swiper-scrollbar-wrapper') }, [node])
					: node;
			},

			_getEls() {
				const extractFrom = (from, prop) => {
					const obj = this.passedParams[from];
					if (!obj) return;
					return isFunction(obj[prop]) ? obj[prop](this) : (obj[prop] || null);
				};

				return {
					prevEl: extractFrom('navigation', 'prevEl') || this.$refs.prevEl || null,
					nextEl: extractFrom('navigation', 'nextEl') || this.$refs.nextEl || null,
					paginationEl: extractFrom('pagination', 'el') || this.$refs.paginationEl || null,
					scrollbarEl: extractFrom('scrollbar', 'el') || this.$refs.scrollbarEl || null,
				};
			},

			tryEnable() {
				// TODO: Observer options
				if (this.lazyInit) {
					if ('IntersectionObserver' in window) {
						this._observer = new IntersectionObserver((entries, _self) => {
							entries.filter(entry => entry.isIntersecting).forEach(entry => {
								this.enable();
								_self.unobserve(entry.target);
							});
						});
						this._observer.observe(this.$el);
					} else {
						console.warn('There is no `IntersectionObserver` in `window`. Swiper loads as mounted.');
						this.enable();
					}
				} else {
					this.enable();
				}
			},

			async enable() {
				if (!this.$refs.swiper) return;
				if (!this.wasInit) {
					this.setSwiperParams();
					this.initSwiper();
				}

				const { nextEl, prevEl, paginationEl, scrollbarEl } = this._getEls();
				const { swiper } = this;

				if (nextEl && prevEl) {
					swiper.params.navigation.nextEl = nextEl;
					swiper.originalParams.navigation.nextEl = nextEl;
					swiper.params.navigation.prevEl = prevEl;
					swiper.originalParams.navigation.prevEl = prevEl;
				}
				if (paginationEl) {
					swiper.params.pagination.el = paginationEl;
					swiper.originalParams.pagination.el = paginationEl;
				}
				if (scrollbarEl) {
					swiper.params.scrollbar.el = scrollbarEl;
					swiper.originalParams.scrollbar.el = scrollbarEl;
				}

				await this.$nextTick();

				swiper.init(this.$refs.swiper);
				this.$emit('swiper', this.swiper);

				this.wasMounted = true;
				this.swiper.emitSlidesClasses();
			},

			destroy() {
				if (this.swiper && !this.swiper.destroyed && this.wasMounted) {
					this.swiper.destroy(true, false);
				}
				this.swiper = null;
				this.passedParams = {};
				this.oldPassedParams = {};
				this.wasInit = false;

				this.slides = [];
				this.oldSlides = [];
				this._observer = null;
			},

			setSwiperParams() {
				const { params: swiperParams, passedParams } = getParams(this.$props);

				swiperParams.onAny = (event, ...args) => this._emitWithCase(event, ...args);
				swiperParams.on._beforeBreakpoint = () => (this.breakpointChanged = true);
				swiperParams.on._containerClasses = (swiper, classes) => (this.containerClasses = classes);

				this.swiperParams = swiperParams;
				this.passedParams = passedParams;
				this.oldPassedParams = passedParams;

				this.slides = this.$slots.default;
				this.oldSlides = this.$slots.default;
			},

			initSwiper() {
				this.swiper = new Swiper(this.swiperParams);
				this.wasInit = true;

				this.swiper.loopCreate = () => {};
				this.swiper.loopDestroy = () => {};

				if (this.swiper.virtual && this.swiper.params.virtual.enabled) {
					this.swiper.slides = this.cleanSlides;
					const extendWith = {
						cache: false,
						slides: this.slides,
						renderExternal: (data) => (this.virtualData = data),
						renderExternalUpdate: false,
					};
					extend(this.swiper.params.virtual, extendWith);
					extend(this.swiper.originalParams.virtual, extendWith);
				}
			},
		},

		mounted() {
			this.isMounted = true;
			this.tryEnable();
		},

		created() {
			this.setSwiperParams();
			this.initSwiper();
		},

		updated() {
			if (this.disabled || !this.wasInit || !this.wasMounted) return;
			this.swiper?.emitSlidesClasses();

			const { passedParams: newPassedParams } = getParams(this.$props);

			const changedParams = getChangedParams(
				newPassedParams,
				this.oldPassedParams,
				this.$slots.default,
				this.oldSlides,
			);
			this.oldPassedParams = newPassedParams;

			if (this.childrenKey && isFunction(this.childrenKey)) {
				const key = this.childrenKey(this.prevChildrenKey);
				if (key !== false && key !== null) {
					this.prevChildrenKey = key;
					changedParams.push('children');
				}
			}

			if (changedParams.includes('children')) {
				this.oldSlides = [...this.slides];
				this.slides = this.$slots.default;
			}

			if (
				(changedParams.length || this.breakpointChanged)
				&& this.swiper
				&& !this.swiper.destroyed
			) {
				updateSwiper({
					swiper: this.swiper,
					slides: this.slides,
					passedParams: newPassedParams,
					changedParams,
					nextEl: this.$refs.nextEl,
					prevEl: this.$refs.prevEl,
					scrollbarEl: this.$refs.scrollbarEl,
					paginationEl: this.$refs.paginationEl,
				});
			}
			this.breakpointChanged = false;
		},

		beforeDestroy() {
			this.destroy();
		},

		render(h) {
			const paginationNode = this._getPaginationNode();
			const navigationNode = this._getNavigationNode();
			const scrollbarNode = this._getScrollbarNode();
			const slides = this._getSlidesForRender();

			if (this.disabled) {
				return h('div', { class: this._withBem(this.rootClass) }, this.$slots.default);
			}

			return h(this.rootTag, { class: this.cRootClasses }, [
				this.$slots['element-start'],
				h(this.tag, { class: this._withBem('swiper'), ref: 'swiper' }, [
					this.$slots['container-start'],
					h(this.wrapperTag, { class: this._withBem('swiper-wrapper') }, [
						this.$slots['wrapper-start'],
						slides,
						this.$slots['wrapper-end'],
					]),
					this.$slots['container-end'],
					// Render navigation inside if needed
					!this.navigationOutside && navigationNode,
					// Render scrollbar inside if needed
					!this.scrollbarOutside && scrollbarNode,
					// Render pagination inside if needed
					!this.paginationOutside && paginationNode,
				]),
				// Render navigation outside if needed
				this.navigationOutside && navigationNode,
				// Render scrollbar outside if needed
				this.scrollbarOutside && scrollbarNode,
				// Render pagination outside if needed
				this.paginationOutside && paginationNode,
				this.$slots['element-end'],
			]);
		},
	};
</script>
