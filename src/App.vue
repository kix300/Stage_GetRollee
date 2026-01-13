<script setup lang="ts">

	import {useDataSource} from '@/composables/useDatasource';
	
	const {dataSources, error, loading} = useDataSource();
</script>

<template>
  <div>
    <h1>Coverage Page</h1>
  </div>
</template>

<style scoped>
</style>
