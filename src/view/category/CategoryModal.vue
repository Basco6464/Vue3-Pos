<script setup lang="ts">
defineProps({
  form: {
    type: Object,
    required: true,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["save"]);
</script>

<template>
  <div class="modal fade" id="categoryModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEdit ? "Update Category" : "Add Category" }}
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
            <label class="form-label">Description</label>

            <textarea
              class="form-control"
              v-model="form.description"
            ></textarea>
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
