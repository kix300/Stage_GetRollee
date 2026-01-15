<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataSource } from '@/composables/useDatasource';
import { stableSort, toggleSortOrder, type SortOrder } from '@/utils/sorting';
import CatTab from './CatTab.vue';

const { dataSources, loading, error } = useDataSource();

const sortColumn = ref<'name' | 'type' | 'status'>('name');
const sortOrder = ref<SortOrder>('asc');
const searchQuery = ref('');
const selectedCategory = ref('All Platforms');

const handleSort = (column: 'name' | 'type' | 'status') => {
	sortOrder.value = toggleSortOrder(sortColumn.value, column, sortOrder.value);
	sortColumn.value = column;
};

const categoryFilteredData = computed(() => {
	if (!dataSources.value) return [];

	if (selectedCategory.value === 'All Platforms') {
		return dataSources.value;
	}

	return dataSources.value.filter(item => item.category === selectedCategory.value);
});

const searchFilteredData = computed(() => {
	if (!searchQuery.value.trim()) {
		return categoryFilteredData.value;
	}

	const query = searchQuery.value.toLowerCase();

	return categoryFilteredData.value.filter(item => 
		item.name.toLowerCase().includes(query)
	);
});

const sortedDataSources = computed(() => {
	return stableSort(searchFilteredData.value, sortColumn.value, sortOrder.value);
});

const getSortIcon = (column: 'name' | 'type' | 'status') => {
	if (sortColumn.value !== column) return '⇅';
	return sortOrder.value === 'asc' ? '↑' : '↓';
};
</script>

<template>
	<div class="data-table-container">

		<div v-if="loading" class="loading">
			loading...
		</div>

		<div v-else-if="error" class="error">
			Error: {{ error }}
		</div>

		<div v-else class="data-table">
			<div class="search-bar">
				<input 
					v-model="searchQuery"
					type="text"
					placeholder="Search by name..."
					class="search-input"
				/>
				<span v-if="searchQuery" class="search-clear" @click="searchQuery = ''">✕</span>
			</div>
			<CatTab 
				:data="dataSources" 
				:selectedCategory="selectedCategory"
				@update:selectedCategory="selectedCategory = $event"
			/>


			<div class="table-container">
			<table>
				<thead>
					<tr>
						<th 
							class="sortable" 
							@click="handleSort('name')"
							:class="{ active: sortColumn === 'name' }"
						>
							Platforms	
							<span class="sort-icon">{{ getSortIcon('name') }}</span>
						</th>
						<th 
							class="sortable" 
							@click="handleSort('type')"
							:class="{ active: sortColumn === 'type' }"
						>
							Type
							<span class="sort-icon">{{ getSortIcon('type') }}</span>
						</th>
						<th 
							class="sortable" 
							@click="handleSort('status')"
							:class="{ active: sortColumn === 'status' }"
						>
							Status
							<span class="sort-icon">{{ getSortIcon('status') }}</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in sortedDataSources" :key="item.id">
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

							<td class="status-cell">
								<span :class="['status-badge', `status-${item.status.toLowerCase().replace(' ', '-')}`]">

									<span v-if="item.status.toLowerCase() === 'working'" class="icon">✓</span>

									<span v-if="item.status.toLowerCase() === 'coming soon'" class="icon"><img src="https://cdn-icons-png.flaticon.com/512/2089/2089758.png" width="10" height="10" alt="clock" title="clock"></span>

									{{ item.status }}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div v-if="sortedDataSources.length === 0" class="no-results">
				<span v-if="searchQuery">None where find for "{{ searchQuery }}"</span>
				<span v-else>None can be found</span>
			</div>
		</div>
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

.search-bar {
	position: relative;
	margin-bottom: 20px;
}

.search-input {
	width: 100%;
	padding: 12px 40px 12px 16px;
	font-size: 16px;
	border: 2px solid #dee2e6;
	border-radius: 8px;
	outline: none;
	transition: border-color 0.2s;
	box-sizing: border-box;
}

.search-input:focus {
	border-color: #007bff;
}

.search-clear {
	position: absolute;
	right: 12px;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	color: #6c757d;
	font-size: 20px;
	padding: 4px 8px;
	user-select: none;
}

.search-clear:hover {
	color: #495057;
}

.table-container { 
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	padding: 20px;
	background-color: #E9EEF0;
	overflow: hidden;
}

table {
	background-color: white;
	width: 100%;
	border-collapse: collapse;
}

thead {
	background-color: #f8f9fa;
}

th {
	padding: 12px;
	text-align: left;
	font-weight: 600;
	user-select: none;
}

th.sortable {
	cursor: pointer;
	transition: background-color 0.2s;
}

/* th.sortable:hover { */
/* 	background-color: #e9ecef; */
/* } */

.sort-icon {
	margin-left: 8px;
	font-size: 12px;
	opacity: 0.5;
}

th.sortable.active .sort-icon {
	opacity: 1;
	color: #007bff;
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

.no-results {
	text-align: center;
	padding: 40px;
	color: #6c757d;
	font-style: italic;
}
</style>

