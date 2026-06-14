<script setup lang="ts">
const props = defineProps<{
  form: {
    id: number | null;
    category_id: null;
    brand: string;
    name: string;
    description: string;
    qty: number;
    price: number;
    discount: number;
    status: boolean;
    image: string;
    imageFile: File | null;
  };
  isEdit: boolean;
  categories: { id: number; name: string }[];
  brands: { id: number; name: string }[];
}>();

const emit = defineEmits<{
  (e: "save"): void;
}>();

const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || !target.files[0]) return;

  const file = target.files[0];
  props.form.imageFile = file; // ✅ store file in form directly

  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      props.form.image = e.target.result as string; // preview only
    }
  };
  reader.readAsDataURL(file);
};

const onSave = () => {
  emit("save"); // ✅ simple emit, no args
};
</script>

<template>
  <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
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
          <div class="mb-3">
            <label class="form-label">Category</label>

            <select v-model.number="props.form.category_id" class="form-select">
              <option :value="null" disabled>Select Category</option>

              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Brand ✅ fixed: added v-model -->
          <div class="mb-3">
            <label class="form-label">Brand</label>
            <select v-model="props.form.brand" class="form-select">
              <option value="" disabled>Select Brand</option>
              <option
                v-for="brand in brands"
                :key="brand.id"
                :value="brand.name"
              >
                {{ brand.name }}
              </option>
            </select>
          </div>

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

          <!-- Image -->
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
