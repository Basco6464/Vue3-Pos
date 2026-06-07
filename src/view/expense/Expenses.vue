<script setup lang="ts">
import { request } from "../../utill/api";
import { ref, onMounted } from "vue";
import ExpensesModal from "../expense/ExpensesModal.vue";
import { useConfigStore } from "../../store/config.store.ts";
import Swal from "sweetalert2";

const configStore = useConfigStore();
const expenses = ref<any[]>([]);
const form = ref({
  id: null,
  name: "",
  ref_no: "",
  expense_type_id: null as number | null,
  amount: 0,
  remark: "",
  expense_date: "",
});
const isEdit = ref(false);

const getListExpenses = async () => {
  try {
    const res = await request("expenses", "GET");
    expenses.value = res.expenses;
  } catch (error) {
    console.log(error);
  }
};
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB");
};
const resetForm = () => {
  form.value = {
    id: null,
    name: "",
    ref_no: "",
    expense_type_id: null as number | null,
    amount: 0,
    remark: "",
    expense_date: "",
  };
};
const openAddModal = () => {
  isEdit.value = false;
  resetForm();
};
const editProduct = (item: any) => {
  isEdit.value = true;

  form.value = {
    id: item.id,
    name: item.name,
    ref_no: item.ref_no,
    expense_type_id: item.expense_type_id,
    amount: Number(item.amount),
    remark: item.remark,
    expense_date: item.expenses_date,
  };
};
const saveExpenses = async () => {
  try {
    if (isEdit.value) {
      if (!form.value.id) {
        throw new Error("Supplier ID is missing");
      }

      await request(`expenses/${form.value.id}`, "PUT", form.value);
    } else {
      await request("expenses", "POST", form.value);
    }

    await getListExpenses();

    Swal.fire({
      title: "Success!",
      text: isEdit.value
        ? "Customer updated successfully."
        : "Customer created successfully.",
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
onMounted(getListExpenses);
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>List Suppliers {{ expenses.length }}</h1>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#expensesModal"
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
          <th>Ref No</th>
          <th>Expense Type</th>
          <th>Amount</th>
          <th>Remark</th>
          <th>Expense Date</th>

          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in expenses" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.ref_no }}</td>
          <td>{{ item.expense_type }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.remark }}</td>
          <td>{{ formatDate(item.expense_date) }}</td>
          <td>
            <button
              class="btn btn-sm btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#expensesModal"
              @click="editProduct(item)"
            >
              Edit
            </button>

            <button class="btn btn-sm btn-danger" @click="">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <ExpensesModal
      :form="form"
      :isEdit="isEdit"
      :Expenses_type="configStore.expenses_type"
      @save="saveExpenses"
    />
  </div>
</template>
