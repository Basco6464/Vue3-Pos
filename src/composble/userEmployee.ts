import { onMounted, ref } from "vue";
import { request } from "../utill/api";
import Swal from "sweetalert2";

export type Employee = {
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

export type EmployeeForm = Omit<Employee, "id"> & { id: number | null };

const createEmptyForm = (): EmployeeForm => ({
  id: null,
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

export const useEmployees = () => {
  const employees = ref<Employee[]>([]);
  const isEdit = ref(false);
  const form = ref<EmployeeForm>(createEmptyForm());

  const resetForm = () => {
    form.value = createEmptyForm();
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
      Swal.fire({
        title: "Error!",
        text: "Save failed.",
        icon: "error",
      });
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

  onMounted(getListEmployees);

  return {
    // State
    employees,
    isEdit,
    form,
    // Methods
    resetForm,
    openAddModal,
    editEmployee,
    saveEmployee,
    deleteEmployees,
    getListEmployees,
  };
};
