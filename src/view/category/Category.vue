<script setup lang="ts">
import { ref, onMounted } from "vue";
import { request } from "../../utill/api.ts";
import CategoryModal from "../category/CategoryModal.vue";
import Swal from "sweetalert2";

const categories = ref<any[]>([]);

const form = ref({
  id: null,
  name: "",
  description: "",
  status: true,
});

const isEdit = ref(false);

const getCategory = async () => {
  try {
    const res = await request("categories", "GET");
    categories.value = res;
  } catch (error) {
    console.log(error);
  }
};

const openAddModal = () => {
  isEdit.value = false;

  form.value = {
    id: null,
    name: "",
    description: "",
    status: true,
  };
};

const editCategory = (item: any) => {
  isEdit.value = true;

  form.value = {
    id: item.id,
    name: item.name,
    description: item.description,
    status: item.status,
  };
};

const saveCategory = async () => {
  try {
    if (isEdit.value) {
      await request(`categories/${form.value.id}`, "PUT", form.value);
    } else {
      await request("categories", "POST", form.value);
    }

    getCategory();
    Swal.fire({
      title: "Success!",
      text: isEdit.value
        ? "Category updated successfully."
        : "Category created successfully.",
      icon: "success",
    });

    const closeBtn = document.querySelector(
      '[data-bs-dismiss="modal"]',
    ) as HTMLElement;

    closeBtn?.click();
  } catch (error) {
    console.log(error);
  }
};
const deleteCategory = async (id: number) => {
  const result = await Swal.fire({
    title: "Delete Category?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      await request(`categories/${id}`, "DELETE");

      await getCategory();

      Swal.fire({
        title: "Deleted!",
        text: "Category deleted successfully.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Delete failed.",
        icon: "error",
      });

      console.log(error);
    }
  }
};
onMounted(() => {
  getCategory();
});
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Category {{ categories.length }}</h1>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#categoryModal"
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
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in categories" :key="item.id">
          <td>{{ index + 1 }}</td>

          <td>{{ item.name }}</td>

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
              data-bs-target="#categoryModal"
              @click="editCategory(item)"
            >
              Edit
            </button>

            <button
              class="btn btn-sm btn-danger"
              @click="deleteCategory(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <CategoryModal :form="form" :isEdit="isEdit" @save="saveCategory" />
  </div>
</template>
