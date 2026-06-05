<script setup lang="ts">
import { useConfigStore } from "../../store/config.store";
import { ref } from "vue";

const configStore = useConfigStore();

const props = defineProps<{
  form: {
    id: number | null;
    category_id: number | null;
    brand: string;
    name: string;
    description: string;
    qty: number;
    price: number;
    discount: number;
    status: boolean;
    image: string;
  };
  isEdit: boolean;
  categories: { id: number; name: string }[];
  brands: { id: number; name: string }[];
}>();

const emit = defineEmits<{
  (e: "save", file: File | null): void;
}>();

const imageFile = ref<File | null>(null);

/**
 * Handle image upload + preview
 */
const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files || !target.files[0]) return;

  const file = target.files[0];
  imageFile.value = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      // preview image only
      props.form.image = e.target.result as string;
    }
  };

  reader.readAsDataURL(file);
};

/**
 * Save handler
 */
const onSave = () => {
  emit("save", imageFile.value);
};
</script>

<template>
  <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- HEADER -->
        <div class="modal-header">
          <h5 class="modal-title">
            {{ props.isEdit ? "Update Product" : "Add Product" }}
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- BODY -->
        <div class="modal-body">
          <!-- Name -->
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input v-model="props.form.name" type="text" class="form-control" />
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label class="form-label">Description</label>
            <input
              v-model="props.form.description"
              type="text"
              class="form-control"
            />
          </div>

          <!-- Qty -->
          <div class="mb-3">
            <label class="form-label">Quantity</label>
            <input
              v-model.number="props.form.qty"
              type="number"
              class="form-control"
            />
          </div>

          <!-- Price -->
          <div class="mb-3">
            <label class="form-label">Price</label>
            <input
              v-model.number="props.form.price"
              type="number"
              class="form-control"
            />
          </div>

          <!-- Discount -->
          <div class="mb-3">
            <label class="form-label">Discount</label>
            <input
              v-model.number="props.form.discount"
              type="number"
              class="form-control"
            />
          </div>

          <!-- Category -->
          <select
            v-model.number="props.form.category_id"
            class="form-select mb-3"
          >
            <option :value="null">Select Category</option>
            <option
              v-for="category in configStore.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>

          <!-- Brand -->
          <select class="form-select">
            <option value="">Select Brand</option>
            <option
              v-for="brand in configStore.brands"
              :key="brand.id"
              :value="brand.id"
            >
              {{ brand.name }}
            </option>
          </select>

          <!-- Status -->
          <div class="form-check mb-3">
            <input
              id="status"
              v-model="props.form.status"
              class="form-check-input"
              type="checkbox"
            />
            <label for="status" class="form-check-label">Active</label>
          </div>

          <!-- IMAGE UPLOAD -->
          <div class="mb-3">
            <label class="form-label">Image</label>

            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="onImageChange"
            />

            <img
              v-if="props.form.image"
              :src="props.form.image"
              class="img-thumbnail mt-2"
              style="width: 120px; height: 120px; object-fit: cover"
            />
          </div>
        </div>

        <!-- FOOTER -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>

          <button class="btn btn-primary" @click="onSave">
            {{ props.isEdit ? "Update" : "Save" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
