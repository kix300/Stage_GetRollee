import { ref, onMounted } from "vue";

interface NormalizeData {
	id: string;
	name: string;
	category: string;
	type: string;
	status: string;
	logoUrl: string;
}

function normalize(raw: any): NormalizeData {
	// if api change we will change the type after raw
	return {
		id: raw.id || "Unknown",
		name: raw.title || "Unknown",
		// for our category tab
		//( All Platforms, Gig Economy, Payments, Payroll & HRIS, Tax Portals, Utilities)
		category: raw.type || "Other",
		// type == category
		type: raw.type || "Other",
		///TODO ∈
		status:
		raw.status?.toLowerCase() === "working" ? "Working" : "Comming soon",
		logoUrl: raw.logo || "",
	};
}

export function useDataSource() {
	const dataSources = ref(<NormalizeData[]>[]);
	const loading = ref(true);
	const error = ref("");

	onMounted(async () => {
		try {
			const response = await fetch(
				"https://api.getrollee.com/api/dashboard/v0.1/documentation/datasources",
			);
			if (!response.ok) throw new Error("Erreur réseau");
			const data = await response.json();
			const rawItems = data.datasources;
			dataSources.value = rawItems.map(normalize);
		} catch (err) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	});
	return {dataSources, loading, error};
}
