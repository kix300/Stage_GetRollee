<script setup lang="ts">
import datatable from "@/composents/DataTable.vue";
import { useDataSource } from "@/composables/useDatasource";
const { dataSources, loading, error } = useDataSource();
</script>

<template>
  <div id="app">
    <header class="main-header">
      <div class="logo-section">
        <img src="/rollee_logo.jpg" alt="getrollee" width="40" height="40" />
        <span class="brand-name">Rollee</span>
      </div>

      <h1 class="main-title">Coverage App</h1>

      <div class="stats">
        <span class="badge">{{ dataSources.length }} platforms in total</span>
      </div>
    </header>
    <main>
      <datatable :dataSources="dataSources" :loading="loading" :error="error" />
    </main>
  </div>
</template>

<style scoped>
.main-header {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 1rem 2rem;
  /* border-bottom: 1px solid #eee; */
  box-shadow: inset 0 -5px 5px rgba(0, 0, 0, 0.1);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.main-title {
  font-size: 1.2rem;
  color: #666;
  margin-left: auto;
  padding-left: 20px;
}

.badge {
  color: #1a202c;
  padding: 4px 12px;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
