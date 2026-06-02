<script setup lang="ts">
import { request } from "../../utill/api";
import { ref, onMounted } from "vue";
import UserModal from "./UserModal.vue";
import Swal from "sweetalert2";
const users = ref<any[]>([]);
const roles = ref<any[]>([]);
const form = ref({
  id: null,
  name: "",
  username: "",
  password: "",
  role: "",
  status: true,
});
const isEdit = ref(false);
const getListUser = async () => {
  try {
    const res = await request("auth/list-users", "GET");
    users.value = res.user;
  } catch (error) {
    console.log(error);
  }
};
const getListRole = async () => {
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
    username: "",
    password: "",
    role: "",
    status: true,
  };
};
const editUser = (item: any) => {
  isEdit.value = true;
  const selectedRole = roles.value.find((r) => r.name === item.role_name);

  form.value = {
    id: item.id,
    name: item.name,
    username: item.username,
    password: "",
    role: selectedRole ? String(selectedRole.id) : "",
    status: item.is_active,
  };
};
const saveUser = async () => {
  try {
    if (!form.value.role) {
      return Swal.fire({
        icon: "error",
        title: "Select a role",
        text: "Please choose a user role before saving.",
      });
    }
    if (!form.value.name || !form.value.username || !form.value.password) {
      return Swal.fire({
        icon: "error",
        title: "Missing information",
        text: "Name, username, and password are required.",
      });
    }

    const payload = {
      name: form.value.name,
      username: form.value.username,
      password: form.value.password,
      is_active: form.value.status,
      role_id: Number(form.value.role),
      create_by: null,
    };

    if (isEdit.value) {
      if (!form.value.id) {
        throw new Error("User ID is missing");
      }
      await request(`auth/users/${form.value.id}`, "PUT", payload);
    } else {
      await request("auth/register", "POST", payload);
    }

    await getListUser();

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
  } catch (error: any) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text:
        error?.response?.data?.message ||
        error?.message ||
        "Unable to save user.",
    });
  }
};
const deleteUser = async (id: number) => {
  if (!id) {
    console.log("Invalid ID:", id);
    return;
  }

  const result = await Swal.fire({
    title: "Delete User?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      await request(`auth/users/${id}`, "DELETE");

      await getListUser();

      Swal.fire({
        title: "Deleted!",
        text: "User deleted successfully.",
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
  getListUser();
  getListRole();
});
</script>
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>List Users {{ users.length }}</h1>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#userModal"
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
          <th>Username</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in users" :key="item.id">
          <td>{{ index + 1 }}</td>

          <td>{{ item.name }}</td>

          <td>{{ item.username }}</td>
          <td>{{ item.role_name }}</td>

          <td>
            <span
              :class="item.is_active ? 'badge bg-success' : 'badge bg-danger'"
            >
              {{ item.is_active ? "Active" : "Inactive" }}
            </span>
          </td>

          <td>
            <button
              class="btn btn-sm btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#userModal"
              @click="editUser(item)"
            >
              Edit
            </button>

            <button class="btn btn-sm btn-danger" @click="deleteUser(item.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <UserModal :form="form" :isEdit="isEdit" :roles="roles" @save="saveUser" />
  </div>
</template>
