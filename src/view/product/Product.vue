<script setup lang="ts">
import { ref } from "vue";
import { useConfigStore } from "../../store/config.store";
import ProductModal from "./ProductModal.vue";
import { request } from "../../utill/api.ts";
import { onMounted } from "vue";

const configStore = useConfigStore();

const form = ref({
  id: null,
  category_id: null,
  brand: "",
  name: "",
  description: "",
  qty: 0,
  price: 0,
  discount: 0,
  status: true,
  image: "",
});

const products = ref<any[]>([]);
const isEdit = ref(false);

const resetForm = () => {
  form.value = {
    id: null,
    category_id: null,
    brand: "",
    name: "",
    description: "",
    qty: 0,
    price: 0,
    discount: 0,
    status: true,
    image: "",
  };
};
const getListProduct = async () => {
  try {
    const res = await request("products", "GET");
    products.value = res.products;
  } catch (error) {
    console.error(error);
  }
};
const openAddModal = () => {
  isEdit.value = false;
  resetForm();
};

const editProduct = (item: any) => {
  isEdit.value = true;

  form.value = {
    id: item.id,
    category_id: item.category_id,
    brand: item.brand,
    name: item.name,
    description: item.description,
    qty: item.qty,
    price: item.price,
    discount: item.discount,
    status: item.status,
    image: item.image || "",
  };
};

const saveProduct = async () => {
  try {
    if (isEdit.value) {
      console.log("Update", form.value);
    } else {
      console.log("Create", form.value);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (id: number) => {
  console.log("Delete", id);
};
onMounted(() => {
  getListProduct();
});
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex gap-2">
        <select class="form-select">
          <option value="">Select Category</option>
          <option
            v-for="category in configStore.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>

        <select class="form-select">
          <option value="">Select Brand</option>
          <option
            v-for="brand in configStore.brands"
            :key="brand.id"
            :value="brand.id"
          >
            {{ brand.name }}
          </option>
        </select>
      </div>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#productModal"
        @click="openAddModal"
      >
        Add New
      </button>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Description</th>
          <th>Status</th>
          <th width="180">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in products" :key="item.id">
          <td>{{ index + 1 }}</td>

          <td>{{ item.name }}</td>

          <!-- category -->
          <td>
            {{ item.category_name }}
          </td>

          <!-- brand -->
          <td>
            {{ item.brand }}
          </td>

          <td>{{ item.qty }}</td>

          <td>${{ item.price }}</td>

          <td>{{ item.discount }}%</td>

          <td>{{ item.description }}</td>

          <td>
            <span :class="item.status ? 'badge bg-success' : 'badge bg-danger'">
              {{ item.status ? "Active" : "Inactive" }}
            </span>
          </td>

          <td>
            <button
              class="btn btn-sm btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#productModal"
              @click="editProduct(item)"
            >
              Edit
            </button>

            <button
              class="btn btn-sm btn-danger"
              @click="deleteProduct(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <ProductModal
      :form="form"
      :isEdit="isEdit"
      :categories="configStore.categories"
      :brands="configStore.brands"
      @save="saveProduct"
    />
  </div>
</template>
