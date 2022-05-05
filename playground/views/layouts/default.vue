<template>
	<div id="root">
		<nuxt />
	</div>
</template>

<script>
	export default {
		name: 'layout-default',
		errorCaptured(error, component, info) {
			console.error(error, component, info);
			return false;
		},
	};
</script>
