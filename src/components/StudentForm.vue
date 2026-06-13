<template>
  <form @submit.prevent="submitForm">
    <div class="row g-3">
      <!-- Name -->
      <div class="col-md-6">
        <label class="form-label">Name</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-person"></i></span>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
            placeholder="Enter student name"
          />
        </div>
        <div v-if="errors.name" class="invalid-feedback d-block">
          {{ errors.name[0] }}
        </div>
      </div>

      <!-- Email -->
      <div class="col-md-6">
        <label class="form-label">Email</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-envelope"></i></span>
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
            placeholder="Enter email address"
          />
        </div>
        <div v-if="errors.email" class="invalid-feedback d-block">
          {{ errors.email[0] }}
        </div>
      </div>

      <!-- Gender -->
      <div class="col-md-4">
        <label class="form-label">Gender</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-gender-ambiguous"></i></span>
          <select
            v-model="form.gender"
            class="form-select"
            :class="{ 'is-invalid': errors.gender }"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div v-if="errors.gender" class="invalid-feedback d-block">
          {{ errors.gender[0] }}
        </div>
      </div>

      <!-- Age -->
      <div class="col-md-4">
        <label class="form-label">Age</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-calendar"></i></span>
          <input
            v-model="form.age"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': errors.age }"
            placeholder="Enter age"
          />
        </div>
        <div v-if="errors.age" class="invalid-feedback d-block">
          {{ errors.age[0] }}
        </div>
      </div>

      <!-- Phone -->
      <div class="col-md-4">
        <label class="form-label">Phone</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-telephone"></i></span>
          <input
            v-model="form.phone"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.phone }"
            placeholder="Enter phone number"
          />
        </div>
        <div v-if="errors.phone" class="invalid-feedback d-block">
          {{ errors.phone[0] }}
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex gap-2">
      <button type="submit" class="btn btn-primary">
        <i class="bi bi-save me-1"></i>
        {{ isEdit ? "Update Student" : "Save Student" }}
      </button>
    </div>
  </form>
</template>

<script setup>
defineProps({
  form: Object,
  errors: Object,
  isEdit: Boolean,
});

const emit = defineEmits(["save"]);

const submitForm = () => {
  emit("save");
};
</script>