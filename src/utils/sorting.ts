export type SortOrder = 'asc' | 'desc';

export interface SortConfig<T> {
	column: keyof T;
	order: SortOrder;
}

export function stableSort<T extends Record<string, any>>(
	data: T[],
	column: keyof T,
	order: SortOrder = 'asc',
	secondaryColumn: keyof T = 'name'
): T[] {
	const indexed = data.map((item, index) => ({ item, index }));

	indexed.sort((a, b) => {
		const valueA = a.item[column];
		const valueB = b.item[column];

		let compA = valueA;
		let compB = valueB;

		if (typeof valueA === 'string') {
			compA = valueA.toLowerCase();
		}
		if (typeof valueB === 'string') {
			compB = valueB.toLowerCase();
		}

		let comparison = 0;
		if (compA < compB) {
			comparison = -1;
		} else if (compA > compB) {
			comparison = 1;
		} else {
			if (column !== secondaryColumn) {
				const secA = a.item[secondaryColumn];
				const secB = b.item[secondaryColumn];

				let secCompA = secA;
				let secCompB = secB;

				if (typeof secA === 'string') {
					secCompA = secA.toLowerCase();
				}
				if (typeof secB === 'string') {
					secCompB = secB.toLowerCase();
				}

				if (secCompA < secCompB) {
					comparison = -1;
				} else if (secCompA > secCompB) {
					comparison = 1;
				} else {
					comparison = a.index - b.index;
				}
			} else {
				comparison = a.index - b.index;
			}
		}

		if (order === 'desc' && comparison !== 0) {
			const primaryA = a.item[column];
			const primaryB = b.item[column];

			let primCompA = primaryA;
			let primCompB = primaryB;

			if (typeof primaryA === 'string') primCompA = primaryA.toLowerCase();
			if (typeof primaryB === 'string') primCompB = primaryB.toLowerCase();

			if (primCompA !== primCompB) {
				return -comparison;
			}
		}

		return comparison;
	});

	return indexed.map(({ item }) => item);
}

export function toggleSortOrder(
	currentColumn: string,
	newColumn: string,
	currentOrder: SortOrder
): SortOrder {
	if (currentColumn === newColumn) {
		return currentOrder === 'asc' ? 'desc' : 'asc';
	}
	return 'asc';
}

