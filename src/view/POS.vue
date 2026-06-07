<template>
  <div class="modal fade" id="productModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content shadow border-0">
        <!-- Header -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <i class="bi bi-box-seam me-2"></i>
            Product Information
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- Form -->
        <form>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter product name"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Brand</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter brand"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Category</label>
                <select class="form-select">
                  <option>Select Category</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label">Quantity</label>
                <input type="number" class="form-control" placeholder="0" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Price ($)</label>
                <input type="number" class="form-control" placeholder="0.00" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Discount ($)</label>
                <input type="number" class="form-control" placeholder="0.00" />
              </div>

              <div class="col-12">
                <label class="form-label">Description</label>
                <textarea
                  rows="3"
                  class="form-control"
                  placeholder="Product description..."
                ></textarea>
              </div>

              <div class="col-12">
                <label class="form-label">Product Image</label>
                <input type="file" class="form-control" />
              </div>

              <div class="col-12">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" />
                  <label class="form-check-label"> Active Product </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-light border"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button type="submit" class="btn btn-primary">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
