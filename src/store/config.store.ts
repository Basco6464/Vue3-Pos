import { defineStore } from "pinia";
import { ref } from "vue";
import { request } from "../utill/api.ts";
export const useConfigStore = defineStore("config", () => {
  const roles = ref<any[]>([]);
  const categories = ref<any[]>([]);
  const suppliers = ref<any[]>([]);
  const brands = ref<any[]>([]);

  const loading = ref(false);

  const fetchConfig = async () => {
    // Prevent duplicate requests
    if (roles.value.length > 0) return;

    try {
      loading.value = true;

      const res = await request("config", "GET");

      roles.value = res.data.role;
      categories.value = res.data.category;
      suppliers.value = res.data.supplier;
      brands.value = res.data.brands;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    roles,
    categories,
    suppliers,
    loading,
    fetchConfig,
    brands,
  };
});
