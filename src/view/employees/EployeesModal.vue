<script setup lang="ts">
type EmployeeModalProps = {
  form: {
    first_name: string;
    last_name: string;
    card_id: string;
    dob: string;
    gender: string;
    tel: string;
    email: string;
    base_salary: number;
    address: string;
  };
  isEdit: boolean;
};

const props = defineProps<EmployeeModalProps>();

defineEmits(["save"]);
</script>

<template>
  <div class="modal fade" id="employeeModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- HEADER -->
        <div class="modal-header">
          <h5 class="modal-title">
            {{ props.isEdit ? "Update Employee" : "Add Employee" }}
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- BODY -->
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input class="form-control" v-model="props.form.first_name" />
          </div>

          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input class="form-control" v-model="props.form.last_name" />
          </div>

          <div class="mb-3">
            <label class="form-label">Card ID</label>
            <input class="form-control" v-model="props.form.card_id" />
          </div>

          <div class="mb-3">
            <label class="form-label">Date of Birth</label>
            <input type="date" class="form-control" v-model="props.form.dob" />
          </div>

          <div class="mb-3">
            <label class="form-label">Gender</label>
            <select class="form-select" v-model="props.form.gender">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Telephone</label>
            <input class="form-control" v-model="props.form.tel" />
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
            <label class="form-label">Base Salary</label>
            <input
              type="number"
              class="form-control"
              v-model.number="props.form.base_salary"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Address</label>
            <textarea
              class="form-control"
              v-model="props.form.address"
            ></textarea>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>

          <button class="btn btn-primary" @click="$emit('save')">
            {{ props.isEdit ? "Update" : "Save" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
