//TODO FIX URL STATE
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { SortOrder } from "@/utils/sorting";

export interface UrlState {
  category: string;
  sortColumn: "name" | "type" | "status";
  sortOrder: SortOrder;
  searchQuery: string;
}

const DEFAULT_STATE: UrlState = {
  category: "All Platforms",
  sortColumn: "name",
  sortOrder: "asc",
  searchQuery: "",
};

export function useUrlState() {
  const router = useRouter();
  const route = useRoute();

  const category = ref<string>(
    (route.query.category as string) || DEFAULT_STATE.category,
  );

  const sortColumn = ref<"name" | "type" | "status">(
    (route.query.sort as "name" | "type" | "status") ||
      DEFAULT_STATE.sortColumn,
  );

  const sortOrder = ref<SortOrder>(
    (route.query.order as SortOrder) || DEFAULT_STATE.sortOrder,
  );

  const searchQuery = ref<string>(
    (route.query.search as string) || DEFAULT_STATE.searchQuery,
  );

  const updateUrl = () => {
    const query: Record<string, string> = {};

    if (category.value !== DEFAULT_STATE.category) {
      query.category = category.value;
    }
    if (sortColumn.value !== DEFAULT_STATE.sortColumn) {
      query.sort = sortColumn.value;
    }
    if (sortOrder.value !== DEFAULT_STATE.sortOrder) {
      query.order = sortOrder.value;
    }
    if (searchQuery.value !== DEFAULT_STATE.searchQuery) {
      query.search = searchQuery.value;
    }

    router.replace({ query });
  };

  watch(
    [category, sortColumn, sortOrder, searchQuery],
    () => {
      updateUrl();
    },
    { deep: true },
  );

  return {
    category,
    sortColumn,
    sortOrder,
    searchQuery,
  };
}
