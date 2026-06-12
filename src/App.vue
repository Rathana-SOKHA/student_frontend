<template>
  <div class="container">
    <StudentForm
      :form="form"
      :errors="errors"
      :isEdit="isEdit"
      @save="saveStudent"
    />

    <hr />

    <StudentTable
      :students="students"
      @edit="editStudent"
      @delete="deleteStudent"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import StudentForm from "./components/StudentForm.vue";
import StudentTable from "./components/StudentTable.vue";

import studentService from "./services/studentService";

const students = ref([]);

const isEdit = ref(false);

const errors = reactive({});

const form = reactive({
  id: null,
  name: "",
  email: "",
  gender: "",
  age: "",
  phone: "",
});

onMounted(() => {
  loadStudents();
});

const loadStudents = async () => {
  const response = await studentService.getAll();
  students.value = response.data.data;
};

const clearForm = () => {
  form.id = null;
  form.name = "";
  form.email = "";
  form.gender = "";
  form.age = "";
  form.phone = "";

  Object.keys(errors).forEach((key) => {
    delete errors[key];
  });

  isEdit.value = false;
};

const saveStudent = async () => {
  try {
    Object.keys(errors).forEach((key) => {
      delete errors[key];
    });

    if (isEdit.value) {
      await studentService.update(form.id, form);
    } else {
      await studentService.create(form);
    }

    await loadStudents();
    clearForm();
  } catch (error) {
    if (error.response?.status === 422) {
      Object.assign(errors, error.response.data.errors);
    }
  }
};

const editStudent = (student) => {
  form.id = student.id;
  form.name = student.name;
  form.email = student.email;
  form.gender = student.gender;
  form.age = student.age;
  form.phone = student.phone;

  isEdit.value = true;
};

const deleteStudent = async (id) => {
  if (!confirm("Delete Student?")) {
    return;
  }

  await studentService.delete(id);
  await loadStudents();
};
</script>
