<script setup lang="ts">
type ExpensesModalProps = {
  form: {
    name: string;
    ref_no: string;
    expense_type_id: number | null;
    amount: number;
    remark: string;
    expense_date: string;
  };
  isEdit: boolean;
  Expenses_type: { id: number; name: string }[];
};

const props = defineProps<ExpensesModalProps>();

defineEmits(["save"]);
</script>

<template>
  <div class="modal fade" id="expensesModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ props.isEdit ? "Update Expenses" : "Add Expenses" }}
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
            <label class="form-label">Ref No</label>

            <input
              type="text"
              class="form-control"
              v-model="props.form.ref_no"
            />
          </div>

          <select v-model.number="form.expense_type_id" class="form-select">
            <option :value="null" disabled>Select Expenses</option>

            <option
              v-for="type in Expenses_type"
              :key="type.id"
              :value="type.id"
            >
              {{ type.name }}
            </option>
          </select>

          <div class="mb-3">
            <label class="form-label">Amount</label>

            <input
              type="email"
              class="form-control"
              v-model.number="props.form.amount"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Remark</label>

            <textarea
              class="form-control"
              v-model="props.form.remark"
            ></textarea>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Expenses Date</label>
          <input
            type="date"
            class="form-control"
            v-model="props.form.expense_date"
          />
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
