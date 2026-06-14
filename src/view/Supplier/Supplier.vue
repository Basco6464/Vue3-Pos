<script setup lang="ts">
import { request } from "../../utill/api";
import { ref, onMounted } from "vue";
import SupplierModal from "./SupplierModal.vue";
import Swal from "sweetalert2";
const suppliers = ref<any[]>([]);
const form = ref({
  id: null,
  name: "",
  code: "",
  address: "",
  tel: "",
  email: "",
  note: "",
});
const isEdit = ref(false);
const getListSupplier = async () => {
  try {
    const res = await request("suppliers", "GET");
    suppliers.value = res.data;
  } catch (error) {
    console.log(error);
  }
};
const openAddModal = () => {
  isEdit.value = false;
  form.value = {
    id: null,
    name: "",
    code: "",
    address: "",
    tel: "",
    email: "",
    note: "",
  };
};
const editSupplier = (item: any) => {
  isEdit.value = true;

  form.value = {
    id: item.id,
    name: item.name,
    code: item.code,
    address: item.address,
    tel: item.tel,
    email: item.email,
    note: item.note,
  };
};
const saveSupplier = async () => {
  try {
    if (isEdit.value) {
      if (!form.value.id) {
        throw new Error("Supplier ID is missing");
      }

      await request(`suppliers/${form.value.id}`, "PUT", form.value);
    } else {
      await request("suppliers", "POST", form.value);
    }

    await getListSupplier();

    Swal.fire({
      title: "Success!",
      text: isEdit.value
        ? "Supplier updated successfully."
        : "Supplier created successfully.",
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
const deleteSupplier = async (id: number) => {
  try {
    await request(`suppliers/${id}`, "DELETE");
    Swal.fire("Deleted!", "Supplier has been deleted.", "success");
    getListSupplier();
  } catch (error) {
    console.log(error);
    Swal.fire("Error", "An error occurred while deleting supplier", "error");
  }
};
onMounted(() => {
  getListSupplier();
});
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>List Suppliers {{ suppliers.length }}</h1>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#supplierModal"
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
          <th>Code</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in suppliers" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.tel }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.note }}</td>

          <td>
            <button
              class="btn btn-sm btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#supplierModal"
              @click="editSupplier(item)"
            >
              Edit
            </button>

            <button
              class="btn btn-sm btn-danger"
              @click="deleteSupplier(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <SupplierModal :form="form" :isEdit="isEdit" @save="saveSupplier" />
  </div>
</template>
