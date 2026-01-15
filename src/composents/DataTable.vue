//TODO Datatable -> where we will find all data
//SearchBar
//TabBar
//Sorting


<script setup lang="ts">
import { useDataSource } from '@/composables/useDatasource';

const { dataSources, loading, error } = useDataSource();
</script>

<template>
  <div class="data-table-container">

    <div v-if="loading" class="loading">
      Chargement des données...
    </div>

    <div v-else-if="error" class="error">
      Erreur: {{ error }}
    </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataSources" :key="item.id">
            <td class="name-cell">
              <img 
                v-if="item.logoUrl" 
                :src="item.logoUrl" 
                :alt="item.name"
                class="logo"
              />
              <span>{{ item.name }}</span>
            </td>
            
            <td>{{ item.type }}</td>
            
            <td>
              <span :class="['status-badge', `status-${item.status.toLowerCase().replace(' ', '-')}`]">
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<style scoped>
.data-table-container {
  padding: 20px;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #e74c3c;
}

.data-table {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #f8f9fa;
}

th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
}

td {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}

.status-working {
  background-color: #d4edda;
  color: #155724;
}

.status-coming-soon {
  background-color: #fff3cd;
  color: #856404;
}
</style>


