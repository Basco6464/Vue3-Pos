<script setup lang="ts">
import { request } from "../../utill/api";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import RoleModal from "./RoleModal.vue";

const roles = ref<any[]>([]);
const form = ref({
  id: null,
  name: "",
  code: "",
});
const isEdit = ref(false);

const getAllRole = async () => {
  try {
    const res = await request("auth/roles", "GET");
    roles.value = res.roles;
  } catch (error) {
    console.log(error);
  }
};
const openAddModal = () => {
  isEdit.value = false;

  form.value = {
    id: null,
    name: "",
    code: "",
  };
};
const editRole = (item: any) => {
  isEdit.value = true;

  form.value = {
    id: item.id,
    name: item.name,
    code: item.code,
  };
};
const saveRole = async () => {
  try {
    if (isEdit.value) {
      if (!form.value.id) {
        throw new Error("Role ID is missing");
      }

      await request(`auth/roles/${form.value.id}`, "PUT", form.value);
    } else {
      await request("auth/roles", "POST", form.value);
    }

    await getAllRole();

    Swal.fire({
      title: "Success!",
      text: isEdit.value
        ? "Role updated successfully."
        : "Role created successfully.",
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
  if (!id) {
    console.log("Invalid ID:", id);
    return;
  }

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
      await request(`auth/roles/${id}`, "DELETE");

      await getAllRole();

      Swal.fire({
        title: "Deleted!",
        text: "Category deleted successfully.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Delete failed.",
        icon: "error",
      });
    }
  }
};
onMounted(() => {
  getAllRole();
});
</script>
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>List Users {{ roles.length }}</h1>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#roleModal"
        @click="openAddModal"
      >
        Add New
      </button>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Code</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in roles" :key="item.id">
          <td>{{ index + 1 }}</td>

          <td>{{ item.code }}</td>

          <td>{{ item.name }}</td>

          <td>
            <button
              class="btn btn-sm btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#roleModal"
              @click="editRole(item)"
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
    <RoleModal :form="form" :isEdit="isEdit" @save="saveRole" />
  </div>
</template>
