<template>
  <table class="table table-striped table-hover mb-0">
    <thead class="table-dark">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Age</th>
        <th>Phone</th>
        <th width="150">Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="student in students" :key="student.id" class="align-middle">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.gender }}</td>
        <td>{{ student.age }}</td>
        <td>{{ student.phone }}</td>
        <td>
          <div class="d-inline-flex gap-1">
            <button
              class="btn btn-info btn-sm"
              @click="$emit('view', student)"
              title="View Student"
            >
              <i class="bi bi-eye"></i>
            </button>

            <button
              class="btn btn-warning btn-sm"
              @click="$emit('edit', student)"
              title="Edit Student"
            >
              <i class="bi bi-pencil"></i>
            </button>

            <button
              class="btn btn-danger btn-sm"
              @click="$emit('delete', student)"
              title="Delete Student"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  students: Array,
});
</script>