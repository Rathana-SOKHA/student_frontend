<template>
  <div class="container mt-5">
    <div class="card shadow-lg border-0">
      <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white py-3">
        <h3 class="mb-0"><i class="bi bi-mortarboard me-2"></i>Student Management</h3>
        <button class="btn btn-light btn-lg" @click="openCreate">
          <i class="bi bi-plus-circle me-1"></i>
          Add Student
        </button>
      </div>

      <div class="card-body p-0">
        <StudentTable :students="students" @view="viewStudent" @edit="editStudent" @delete="confirmDelete" />
      </div>
    </div>

    <!-- Create Modal -->
    <transition name="modal-fade">
      <div v-if="showCreateModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title"><i class="bi bi-plus-circle me-2"></i>Create Student</h5>
              <button type="button" class="btn-close btn-close-white" @click="showCreateModal = false"></button>
            </div>
            <div class="modal-body">
              <StudentForm :form="createForm" :errors="createErrors" :isEdit="false" @save="createStudent" />
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showCreateModal = false">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Edit Modal -->
    <transition name="modal-fade">
      <div v-if="showEditModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header bg-warning text-white">
              <h5 class="modal-title"><i class="bi bi-pencil me-2"></i>Edit Student</h5>
              <button type="button" class="btn-close btn-close-white" @click="showEditModal = false"></button>
            </div>
            <div class="modal-body">
              <StudentForm :form="editForm" :errors="editErrors" :isEdit="true" @save="updateStudent" />
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showEditModal = false">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- View Modal -->
    <transition name="modal-fade">
      <div v-if="showViewModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header bg-info text-white">
              <h5 class="modal-title"><i class="bi bi-eye me-2"></i>View Student</h5>
              <button type="button" class="btn-close btn-close-white" @click="showViewModal = false"></button>
            </div>
            <div class="modal-body">
              <div class="row mb-3">
                <div class="col-4 fw-bold text-muted">ID:</div>
                <div class="col-8 fs-5">{{ viewStudentData.id }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-4 fw-bold text-muted">Name:</div>
                <div class="col-8 fs-5">{{ viewStudentData.name }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-4 fw-bold text-muted">Email:</div>
                <div class="col-8 fs-5">{{ viewStudentData.email }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-4 fw-bold text-muted">Gender:</div>
                <div class="col-8 fs-5">{{ viewStudentData.gender }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-4 fw-bold text-muted">Age:</div>
                <div class="col-8 fs-5">{{ viewStudentData.age }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-4 fw-bold text-muted">Phone:</div>
                <div class="col-8 fs-5">{{ viewStudentData.phone }}</div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showViewModal = false">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="modal-fade">
      <div v-if="showDeleteModal" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title"><i class="bi bi-exclamation-triangle me-2"></i>Confirm Delete</h5>
              <button type="button" class="btn-close btn-close-white" @click="showDeleteModal = false"></button>
            </div>
            <div class="modal-body">
              <p class="mb-0 fs-5">Are you sure you want to delete student "<strong>{{ deleteStudentData.name }}</strong>"?</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showDeleteModal = false">Cancel</button>
              <button class="btn btn-danger" @click="deleteStudent"><i class="bi bi-trash me-1"></i>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div v-if="showCreateModal || showEditModal || showViewModal || showDeleteModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import StudentTable from "../components/StudentTable.vue";
import StudentForm from "../components/StudentForm.vue";
import studentService from "../services/studentService";

const students = ref([]);

// Create modal
const showCreateModal = ref(false);
const createErrors = reactive({});
const createForm = reactive({
  id: null,
  name: "",
  email: "",
  gender: "",
  age: "",
  phone: "",
});

// Edit modal
const showEditModal = ref(false);
const editErrors = reactive({});
const editForm = reactive({
  id: null,
  name: "",
  email: "",
  gender: "",
  age: "",
  phone: "",
});

// View modal
const showViewModal = ref(false);
const viewStudentData = ref({});

// Delete modal
const showDeleteModal = ref(false);
const deleteStudentData = ref({});

onMounted(() => {
  loadStudents();
});

const loadStudents = async () => {
  const response = await studentService.getAll();
  students.value = response.data.data;
};

const clearCreateForm = () => {
  createForm.id = null;
  createForm.name = "";
  createForm.email = "";
  createForm.gender = "";
  createForm.age = "";
  createForm.phone = "";
  Object.keys(createErrors).forEach((key) => {
    delete createErrors[key];
  });
};

const clearEditForm = () => {
  editForm.id = null;
  editForm.name = "";
  editForm.email = "";
  editForm.gender = "";
  editForm.age = "";
  editForm.phone = "";
  Object.keys(editErrors).forEach((key) => {
    delete editErrors[key];
  });
};

const openCreate = () => {
  clearCreateForm();
  showCreateModal.value = true;
};

const createStudent = async () => {
  try {
    Object.keys(createErrors).forEach((key) => {
      delete createErrors[key];
    });

    await studentService.create(createForm);
    await loadStudents();
    clearCreateForm();
    showCreateModal.value = false;
  } catch (error) {
    if (error.response?.status === 422) {
      Object.assign(createErrors, error.response.data.errors);
    }
  }
};

const viewStudent = (student) => {
  viewStudentData.value = { ...student };
  showViewModal.value = true;
};

const editStudent = (student) => {
  editForm.id = student.id;
  editForm.name = student.name;
  editForm.email = student.email;
  editForm.gender = student.gender;
  editForm.age = student.age;
  editForm.phone = student.phone;
  showEditModal.value = true;
};

const updateStudent = async () => {
  try {
    Object.keys(editErrors).forEach((key) => {
      delete editErrors[key];
    });

    await studentService.update(editForm.id, editForm);
    await loadStudents();
    clearEditForm();
    showEditModal.value = false;
  } catch (error) {
    if (error.response?.status === 422) {
      Object.assign(editErrors, error.response.data.errors);
    }
  }
};

const confirmDelete = (student) => {
  deleteStudentData.value = { ...student };
  showDeleteModal.value = true;
};

const deleteStudent = async () => {
  await studentService.delete(deleteStudentData.value.id);
  await loadStudents();
  showDeleteModal.value = false;
  deleteStudentData.value = {};
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.9) translateY(-20px);
}

.card {
  border-radius: 0.75rem;
  overflow: hidden;
}

.table {
  margin-bottom: 0;
}

.table th,
.table td {
  padding: 1rem 0.75rem;
}
</style>