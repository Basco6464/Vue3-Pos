<script setup lang="ts">
type SupplierModalProps = {
  form: {
    name: string;
    code: string;
    address: string;
    tel: string;
    email: string;
    note: string;
  };
  isEdit: boolean;
};

const props = defineProps<SupplierModalProps>();

defineEmits(["save"]);
</script>

<template>
  <div class="modal fade" id="supplierModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ props.isEdit ? "Update Supplier" : "Add Supplier" }}
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

            <input type="text" class="form-control" v-model="props.form.name" />
          </div>

          <div class="mb-3">
            <label class="form-label">Code</label>

            <input type="text" class="form-control" v-model="props.form.code" />
          </div>

          <div class="mb-3">
            <label class="form-label">Address</label>

            <input
              type="text"
              class="form-control"
              v-model="props.form.address"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Phone</label>

            <input type="text" class="form-control" v-model="props.form.tel" />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>

            <input
              type="email"
              class="form-control"
              v-model="props.form.email"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Note</label>

            <textarea class="form-control" v-model="props.form.note"></textarea>
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
            {{ props.isEdit ? "Update" : "Save" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
