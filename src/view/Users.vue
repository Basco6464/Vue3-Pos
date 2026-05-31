<script setup lang="ts">
import { request } from "../utill/api";
import { ref, onMounted } from "vue";
const users = ref<any[]>([]);
const getListUser = async () => {
  try {
    const res = await request("auth/list-users", "GET");
    users.value = res.user;
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getListUser();
});
</script>
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>List Users {{ users.length }}</h1>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#categoryModal"
        @click=""
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
              data-bs-target="#categoryModal"
              @click=""
            >
              Edit
            </button>

            <button class="btn btn-sm btn-danger" @click="">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
