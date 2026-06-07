<script setup lang="ts">
import { ref } from "vue";
import { useConfigStore } from "../../store/config.store";
import ProductModal from "./ProductModal.vue";
import { request } from "../../utill/api.ts";
import { onMounted } from "vue";
import Swal from "sweetalert2";
const configStore = useConfigStore();
// http://localhost:3000

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
  image: "" as string,
  imageFile: null as File | null, // ✅ file lives here
});

const products = ref<any[]>([]);
const categorys = ref<any[]>([]);

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
    imageFile: null,
  };
};

const getListProduct = async () => {
  try {
    const res = await request("products", "GET");
    products.value = res.product;
  } catch (error) {
    console.error(error);
  }
};
const getListCategory = async () => {
  try {
    const res = await request("categories", "GET");
    categorys.value = res.data;
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
    qty: Number(item.qty),
    price: Number(item.price),
    discount: Number(item.discount),
    status: item.status,
    image: item.image || "",
    imageFile: null,
  };
};

const saveProduct = async () => {
  try {
    const formData = new FormData();

    formData.append("category_id", String(form.value.category_id));
    formData.append("brand", form.value.brand);
    formData.append("name", form.value.name);
    formData.append("description", form.value.description);
    formData.append("qty", String(form.value.qty));
    formData.append("price", String(form.value.price));
    formData.append("discount", String(form.value.discount));
    formData.append("status", String(form.value.status));
    if (form.value.imageFile) {
      formData.append("image", form.value.imageFile);
    }

    if (isEdit.value) {
      await request(`products/${form.value.id}`, "PUT", formData);
    } else {
      await request("products", "POST", formData);
    }

    await getListProduct();
    Swal.fire({
      title: "Success!",
      text: isEdit.value
        ? "User updated successfully."
        : "User created successfully.",
      icon: "success",
    });

    const closeBtn = document.querySelector(
      '[data-bs-dismiss="modal"]',
    ) as HTMLElement;

    closeBtn?.click();
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (id: number) => {
  if (!id) {
    console.log("Invalid ID:", id);
    return;
  }

  const result = await Swal.fire({
    title: "Delete Product?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  try {
    if (result.isConfirmed) {
      await request(`products/${id}`, "DELETE");

      await getListProduct();
      Swal.fire({
        title: "Deleted!",
        text: "User deleted successfully.",
        icon: "success",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error!",
      text: "Delete failed.",
      icon: "error",
    });
  }
};

onMounted(() => {
  getListProduct();
  getListCategory();
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

    <table class="table table-hover align-middle">
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
          <th>Image</th>
          <th>Status</th>
          <th width="180">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in products" :key="item.id">
          <td>{{ index + 1 }}</td>

          <td>{{ item.name }}</td>
          <td>{{ item.category_name }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.qty }}</td>
          <td>${{ item.price }}</td>
          <td>{{ item.discount }}%</td>
          <td>{{ item.description }}</td>
          <td>
            <img
              v-if="item.image"
              :src="`https://res.cloudinary.com/dw0yp7muh/image/upload/${item.image}`"
              alt="product"
              style="
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 6px;
              "
            />
            <span v-else class="text-muted">—</span>
          </td>
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
