import { ref, onMounted } from 'vue';

interface NormalizeData {
	id: string;
	name: string;
	category: string;
	type: string;
	status: string;
	logoUrl: string;
}

function normalize(raw: any): NormalizeData{

	// if api change we will change the type after raw
	return {
		id: raw.id || 'Unknown',
		name: raw.title || 'Unknown',
		// for our category tab
		category: raw.type || 'Other',
		// type == category
		type: raw.type || 'Other',
		status: raw.status || 'Unknown',
		logoUrl: raw.logo || ''
	};
}

export function useDataSource (){

	const dataSources = ref(<NormalizeData[]>[]);
	const loading = ref(true);
	const error = ref('');

	onMounted(async () => {
		try {
			const response = await fetch('https://api.getrollee.com/api/dashboard/v0.1/documentation/datasources');
			if (!response.ok) throw new Error('Erreur réseau');
			const data = await response.json();
			console.log('Data reçue:', data);
			const rawItems = data.datasources;
			dataSources.value = rawItems.map(normalize);
			console.log('Data reçue:', dataSources.value);
			console.log('test1:', dataSources.value[0].id);
		} catch (err) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	});
	return (dataSources, loading, error);
}
