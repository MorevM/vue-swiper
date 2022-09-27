# @morev/vue-swiper (still WIP)

![Stability of "master" branch](https://img.shields.io/github/workflow/status/MorevM/vue-swiper/Build/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Last commit](https://img.shields.io/github/last-commit/morevm/vue-swiper)
![Release version](https://img.shields.io/github/v/release/morevm/vue-swiper?include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/morevm/vue-swiper)
![Keywords](https://img.shields.io/github/package-json/keywords/morevm/vue-swiper)

Wrapper under latest [Swiper](https://swiperjs.com/) (8.4.2) with extra features working with Vue 2. \
SSR / Nuxt friendly.

Most of part API is compatible with original [Swiper Vue](https://swiperjs.com/vue) component, so see the provided link for base docs.

## Changes from original Swiper Vue component

* If your environment (such as `Nuxt 2` in context of webpack) doesn't support resolution of `exports` field in `package.json`,
  you need to import stylesheets by direct path. \
  Original Swiper module places files in package root, this package re-exports it in `dist` folder. So:

  ```js
  // Original package direct imports
  import '~swiper/swiper.min.css'
  import '~swiper/modules/pagination/pagination.min.css'

  // This package handles it another way
  import '~@morev/vue-swiper/dist/swiper.min.css'
  import '~@morev/vue-swiper/dist/modules/pagination/pagination.min.css'
  ```

  If your environment can resolve `exports` field in `package.json` there is no changes,
  just change the package name from `swiper` to `@morev/vue-swiper`.
* There is no typings (WIP)

## Extra features

Unfortunately, I currently have no time to do proper documentation, playground and even tests, so here is just short info about extra features:

* **prop `lazyInit`** - boolean \
  Allows to initialize Swiper only when it becomes visible (utilizing IntersectionObserver under the hood)

* **prop `disabled`** - boolean \
  Allows to render the default `<slot></slot>` content without swiper layout. \
  Just an wrapper called `swiper-root` and slot content inside. \
  This is suitable, for example, for blocks that have a grid layout on the desktop and turn into a slider on mobile devices.
  > In this case you don't need to wrap each element in `<swiper-slide>` component - plugin will do it for you.

* **prop `emitStyle`** - string (`camelCase` (default) or `kebab-case`) \
  Allows to customize emits style. By default Swiper utilizes `@camelCasedEvents`, but if you prefer (like me) `@kebab-cased-events`
  you can set this prop to `kebab-case`. Just a stylistic thing.
  > In Vue 3 there is no difference between `@onEvent` and `@on-event`, but Vue 2 handles them different.

* **prop `bemBlock`** - string \
  If you prefer (like me) to use BEM methodology, plugin can set BEM classes
  to Swiper elements alongside the Swiper classes (`.swiper`, `.swiper-wrapper`, etc). \
  So, if `bem-block="foo"` is passed, then you can access swiper elements like `.foo__swiper-wrapper`, `.foo__swiper-slide`, etc.

* **prop `navigationWrap`** - boolean \
  Allows to wrap automatically created elements `.swiper-button-prev` and `.swiper-button-next` to common container `.swiper-navigation`. \
  That's can be useful for custom styling.

* **prop `navigationOutside`** - boolean \
  Allows to render automatically created Navigation outside of `.swiper` element (which has `overflow: hidden` by design).

* **prop `paginationWrap`** - boolean \
  Wraps automatically created `.swiper-pagination` to extra wrapper `.swiper-pagination-wrapper`. \
  That's can be useful for custom styling.

* **prop `paginationOutside`** \
  Allows to render automatically created Pagination outside of `.swiper` element (which has `overflow: hidden` by design).

* **prop `scrollbarWrap`** - boolean \
  Wraps automatically created `.swiper-scrollbar` to extra wrapper `.swiper-scrollbar-wrapper`. \
  That's can be useful for custom styling.

* **prop `scrollbarOutside`** \
  Allows to render automatically created Scrollbar outside of `.swiper` element (which has `overflow: hidden` by design).

* **props `rootTag` and `rootClass`** \
  Because of `navigationOutside`, `paginationOutside` and `scrollbarOutside` all swiper markup should be wrapped with extra node. \
  Those props allows to customize tagName and className of this element.

* Slides have the `not-initialized` class before swiper is initialized. \
  It allows to style them properly before initialization (during SSR / hydration) to minimize CLS.

## Installation

> Note: You don't need to install Swiper alongside this package -
> it has Swiper as dependency and re-exports all things you need such as modules / stylesheets.

### Using `yarn`

```bash
yarn add @morev/vue-swiper
```

### Using `npm`

```bash
npm install @morev/vue-swiper
```

### Using `pnpm`

```bash
pnpm add @morev/vue-swiper
```

## Usage

```vue
<template>
  <swiper
    :slidesPerView="3"
    :spaceBetween="20"
    :navigation="true"
    :modules="modules"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <!-- ... -->
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide, Navigation } from '@morev/vue-swiper';
  import '@morev/vue-swiper/dist/swiper-bundle.min.css';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data: () => ({
      modules: [Navigation],
    }),
  };
</script>
```
