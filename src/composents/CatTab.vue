
<script setup lang="ts">
import { computed } from 'vue';

interface DataItem {
	category: string;
	[key: string]: any;
}

interface Props {
	data: DataItem[];
	selectedCategory: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: 'update:selectedCategory', category: string): void;
}>();

const categories = [
	'All Platforms',
	'Gig Economy',
	'Payments',
	'Payroll & HRIS',
	'Tax Portals',
	'Utilities'
] as const;

const categoryCounts = computed(() => {
	const counts: Record<string, number> = {
		'All Platforms': props.data.length,
		'Gig Economy': 0,
		'Payments': 0,
		'Payroll & HRIS': 0,
		'Tax Portals': 0,
		'Utilities': 0
	};

	props.data.forEach(item => {
		const category = item.category;
		counts[category] = (counts[category] || 0) + 1;
		if (category in counts) {
			counts[category]++;
		}
	});

	return counts;
});

const selectCategory = (category: string) => {
	emit('update:selectedCategory', category);
};
</script>

<template>
	<div class="cat-tab-container">
		<div class="tab-bar">
			<button
				v-for="category in categories"
				:key="category"
				:class="['tab', { active: selectedCategory === category }]"
				@click="selectCategory(category)"
			>
				{{ category }}
				<span class="count">{{ categoryCounts[category] }}</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
.cat-tab-container {
	margin-bottom: 20px;
}

.tab-bar {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.tab {
	padding: 12px 20px;
	border: none;
	border-radius: 30px;
	background: #E9EEF0;
	cursor: pointer;
	font-size: 14px;
	font-weight: 500;
	color: #6c757d;
	transition: all 0.3s ease;
	white-space: nowrap;
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: -2px;
}

.tab:hover {
	color: #495057;
	background-color: #f8f9fa;
}

.tab.active {
	color: #007bff;
}

.tab .count {
	background: #E9EEF0;
	color: #495057;
	padding: 2px 8px;
	border-radius: 12px;
	font-size: 12px;
	font-weight: 600;
	min-width: 24px;
	text-align: center;
}

.tab.active .count {
	background-color: #007bff;
	color: white;
}
</style>
