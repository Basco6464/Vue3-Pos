<script setup lang="ts">
import { ref } from "vue";
import { request } from "../../utill/api";
import { useRouter } from "vue-router";
import { setAccessToken, setProfile } from "../../store/profile.stroe";
const showPassword = ref(false);
const form = ref({
  username: "",
  password: "",
});
const router = useRouter();
const handleLogin = async () => {
  try {
    const payload = {
      username: form.value.username,
      password: form.value.password,
    };

    const res = await request("auth/login", "POST", payload);

    if (res && !res.error) {
      setAccessToken(res.access_token);
      setProfile(JSON.stringify(res.data));

      router.push("/");
    } else {
      alert(JSON.stringify(res));
    }
  } catch (error: any) {
    console.log("LOGIN ERROR:", error.response?.data);
    alert(JSON.stringify(error.response?.data));
  }
};
</script>

<template>
  <div
    class="min-vh-100 d-flex align-items-center justify-content-center bg-light"
  >
    <div class="card shadow-sm" style="width: 100%; max-width: 420px">
      <div class="card-body p-4 p-md-5">
        <!-- Header -->
        <div class="text-center mb-4">
          <div
            class="bg-primary text-white rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
            style="width: 52px; height: 52px; font-size: 22px"
          >
            ⬡
          </div>
          <h4 class="fw-bold mb-1">Welcome back</h4>
          <p class="text-muted small mb-0">Sign in to your account</p>
        </div>

        <!-- Form -->
        <form>
          <!-- Username -->
          <div class="mb-3">
            <label for="username" class="form-label fw-medium">Username</label>
            <div class="input-group">
              <span class="input-group-text bg-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                id="username"
                type="text"
                class="form-control"
                placeholder="your@email.com"
                v-model="form.username"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label fw-medium">Password</label>
            <div class="input-group">
              <span class="input-group-text bg-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                placeholder="••••••••"
                v-model="form.password"
              />
              <button
                type="button"
                class="input-group-text bg-white border-start-0"
                style="cursor: pointer"
                @click="showPassword = !showPassword"
              >
                <svg
                  v-if="!showPassword"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                  />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember me + Forgot -->
          <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="form-check mb-0">
              <input class="form-check-input" type="checkbox" id="remember" />
              <label class="form-check-label small text-muted" for="remember"
                >Remember me</label
              >
            </div>
            <a href="#" class="small text-primary text-decoration-none"
              >Forgot password?</a
            >
          </div>

          <!-- Submit -->
          <button
            type="button"
            class="btn btn-primary w-100"
            @click="handleLogin()"
          >
            Sign In
          </button>
        </form>

        <!-- Sign up -->
        <p class="text-center text-muted small mt-4 mb-0">
          Don't have an account?
          <a href="#" class="text-primary text-decoration-none fw-medium"
            >Create one</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
