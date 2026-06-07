<script setup lang="ts">
import { request } from "../../utill/api";
import { ref, onMounted } from "vue";
import CustomerModal from "../customer/CustomerModal.vue";
import Swal from "sweetalert2";

const customers = ref<any[]>([]);
const form = ref({
  id: null,
  name: "",
  tel: "",
  address: "",
  email: "",
  type: "",
});
const isEdit = ref(false);
const getListCustomer = async () => {
  try {
    const res = await request("customers", "GET");
    customers.value = res.customers;
  } catch (error) {
    console.log(error);
  }
};
const openAddModal = () => {
  isEdit.value = false;
  form.value = {
    id: null,
    name: "",
    address: "",
    tel: "",
    email: "",
    type: "",
  };
};
const editSupplier = (item: any) => {
  isEdit.value = true;

  form.value = {
    id: item.id,
    name: item.name,
    address: item.address,
    tel: item.tel,
    email: item.email,
    type: item.type,
  };
};
const saveCustomer = async () => {
  try {
    if (isEdit.value) {
      if (!form.value.id) {
        throw new Error("Supplier ID is missing");
      }

      await request(`customers/${form.value.id}`, "PUT", form.value);
    } else {
      await request("customers", "POST", form.value);
    }

    await getListCustomer();

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
const deleteCustomer = async (id: number) => {
  const res = await Swal.fire({
    title: "Delete Customers?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });
  try {
    if (res.isConfirmed) {
      await request(`customers/${id}`, "DELETE");

      await getListCustomer();
      Swal.fire({
        title: "Deleted!",
        text: "User deleted successfully.",
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
onMounted(() => {
  getListCustomer();
});
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>List Suppliers {{ customers.length }}</h1>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#customerModal"
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
          <th>Phone Number</th>
          <th>Address</th>
          <th>Email</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in customers" :key="item.id">
          <td>{{ index + 1 }}</td>

          <td>{{ item.name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.tel }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.type }}</td>

          <td>
            <button
              class="btn btn-sm btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#customerModal"
              @click="editSupplier(item)"
            >
              Edit
            </button>

            <button
              class="btn btn-sm btn-danger"
              @click="deleteCustomer(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <CustomerModal :form="form" :isEdit="isEdit" @save="saveCustomer" />
  </div>
</template>
