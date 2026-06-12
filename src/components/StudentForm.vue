<template>
  <div>
    <h2>{{ isEdit ? "Edit Student" : "Create Student" }}</h2>

    <form @submit.prevent="submitForm">
      <input v-model="form.name" placeholder="Name" />

      <p v-if="errors.name">
        {{ errors.name[0] }}
      </p>

      <input v-model="form.email" placeholder="Email" />

      <p v-if="errors.email">
        {{ errors.email[0] }}
      </p>

      <select v-model="form.gender">
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <p v-if="errors.gender">
        {{ errors.gender[0] }}
      </p>

      <input type="number" v-model="form.age" placeholder="Age" />

      <p v-if="errors.age">
        {{ errors.age[0] }}
      </p>

      <input v-model="form.phone" placeholder="Phone" />

      <p v-if="errors.phone">
        {{ errors.phone[0] }}
      </p>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  form: Object,
  errors: Object,
  isEdit: Boolean,
});

const emit = defineEmits(["save"]);

const submitForm = () => {
  emit("save");
};
</script>
