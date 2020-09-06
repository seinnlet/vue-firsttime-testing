<template>
	<div>
		<h1>User ID : {{ id }}</h1>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				id: this.$route.params.id
			}
		}
	};
</script>

<style type="text/css">
	
</style>