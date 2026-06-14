<script setup lang="ts">
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

const props = defineProps<{
  employees: Employee[];
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "edit", employee: Employee): void;
  (e: "delete", id: number): void;
}>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB");
};
</script>

<template>
  <button
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#employeeModal"
    @click="emit('add')"
  >
    Add New
  </button>
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
        <th>address</th>
        <th>Salary</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in employees">
        <td>{{ index + 1 }}</td>
        <td>{{ item.first_name }} {{ item.last_name }}</td>
        <td>{{ item.card_id }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ formatDate(item.dob) }}</td>
        <td>{{ item.tel }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.address }}</td>

        <td>{{ item.base_salary }}</td>

        <td>
          <button
            class="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#employeeModal"
            @click="emit('edit', item)"
          >
            Edit
          </button>
          <button
            class="btn btn-danger btn-sm"
            @click="emit('delete', item.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
