<script setup lang="ts">
type RoleOption = {
  id: number;
  name: string;
};

type UserModalProps = {
  form: {
    name: string;
    username: string;
    password: string;
    role: string;
    status: boolean;
  };
  isEdit: boolean;
  roles: RoleOption[];
};

const props = defineProps<UserModalProps>();

defineEmits(["save"]);
</script>

<template>
  <div class="modal fade" id="userModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEdit ? "Update User" : "Add User" }}
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Name</label>

            <input type="text" class="form-control" v-model="form.name" />
          </div>

          <div class="mb-3">
            <label class="form-label">Username</label>

            <input type="text" class="form-control" v-model="form.username" />
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>

            <input
              type="password"
              class="form-control"
              v-model="form.password"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">User Role</label>

            <select class="form-select" v-model="form.role">
              <option value="">Select role</option>
              <option
                v-for="role in roles"
                :key="role.id"
                :value="String(role.id)"
              >
                {{ role.name }}
              </option>
            </select>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="form.status"
              id="status"
            />

            <label class="form-check-label" for="status"> Active </label>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>

          <button type="button" class="btn btn-primary" @click="$emit('save')">
            {{ isEdit ? "Update" : "Save" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
