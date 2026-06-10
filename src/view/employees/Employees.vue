<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { request } from "../../utill/api";
import EmployeeModal from "../employees/EployeesModal.vue";
import Swal from "sweetalert2";

type Employee = {
  id: number;
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

const employees = ref<Employee[]>([]);
const isEdit = ref(false);
const form = ref({
  id: null as number | null,
  first_name: "",
  last_name: "",
  card_id: "",
  dob: "",
  gender: "",
  tel: "",
  email: "",
  base_salary: 0,
  address: "",
});
const resetForm = () => {
  form.value = {
    id: null as number | null,
    first_name: "",
    last_name: "",
    card_id: "",
    dob: "",
    gender: "",
    tel: "",
    email: "",
    base_salary: 0,
    address: "",
  };
};
const openAddModal = () => {
  isEdit.value = false;
  resetForm();
};
const editEmployee = (item: Employee) => {
  isEdit.value = true;

  form.value = {
    id: item.id,
    first_name: item.first_name,
    last_name: item.last_name,
    card_id: item.card_id,
    dob: item.dob,
    gender: item.gender,
    tel: item.tel,
    email: item.email,
    base_salary: Number(item.base_salary),
    address: item.address,
  };
};
const saveEmployee = async () => {
  try {
    if (isEdit.value) {
      await request(`employees/${form.value.id}`, "PUT", form.value);
    } else {
      await request("employees", "POST", form.value);
    }

    await getListEmployees();

    Swal.fire({
      title: "Success!",
      text: isEdit.value
        ? "Employees updated successfully."
        : "Employees created successfully.",
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
const deleteEmployees = async (id: number) => {
  if (!id) {
    console.log("Invalid ID:", id);
    return;
  }

  const result = await Swal.fire({
    title: "Delete Employees?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  try {
    if (result.isConfirmed) {
      await request(`employees/${id}`, "DELETE");

      await getListEmployees();
      Swal.fire({
        title: "Deleted!",
        text: "Employees deleted successfully.",
        icon: "success",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error!",
      text: "Delete failed.",
      icon: "error",
    });
  }
};
const getListEmployees = async () => {
  try {
    const res = await request("employees", "GET");
    employees.value = res.employees;
  } catch (error) {
    console.log(error);
  }
};
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB");
};

onMounted(getListEmployees);
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>List Employees {{ employees.length }}</h1>
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#employeeModal"
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
          <th>Card ID</th>
          <th>Gender</th>
          <th>DOB</th>

          <th>Tel</th>
          <th>Email</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in employees" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.first_name }} {{ item.last_name }}</td>
          <td>{{ item.card_id }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ formatDate(item.dob) }}</td>
          <td>{{ item.tel }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.base_salary }}</td>
          <td>
            <button
              class="btn btn-sm btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#employeeModal"
              @click="editEmployee(item)"
            >
              Edit
            </button>
            <button
              class="btn btn-sm btn-danger"
              data-bs-toggle="modal"
              @click="deleteEmployees(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <EmployeeModal :form="form" :isEdit="isEdit" @save="saveEmployee" />
</template>
