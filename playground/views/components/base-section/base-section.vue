<template>
	<component :is="tag" class="base-section">
		<slot name="before-wrapper"></slot>

		<base-wrapper class="base-section__wrapper">
			<slot></slot>
		</base-wrapper>

		<slot name="after-wrapper"></slot>
	</component>
</template>

<script>
	import BaseWrapper from '~components/base-wrapper/base-wrapper.vue';

	export default {
		name: 'base-section',
		components: {
			BaseWrapper,
		},
		props: {
			tag: { type: String, default: 'section' },
		},
		data: (vm) => ({}),
		computed: {},
		methods: {},
	};
</script>

<style lang="scss" src="./base-section.scss"></style>
