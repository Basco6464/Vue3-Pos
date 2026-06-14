<script setup lang="ts">
import { useEmployees } from "../../composble/userEmployee.ts";
import EmployeeModal from "../employees/EployeesModal.vue";
import EmployeeTable from "./EmployeeTable.vue";

const {
  employees,
  isEdit,
  form,
  openAddModal,
  editEmployee,
  saveEmployee,
  deleteEmployees,
} = useEmployees();
</script>

<template>
  <EmployeeTable
    :employees="employees"
    @add="openAddModal"
    @edit="editEmployee"
    @delete="deleteEmployees"
  />
  <EmployeeModal :form="form" :isEdit="isEdit" @save="saveEmployee" />
</template>
