<template>
  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Age</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.gender }}</td>
        <td>{{ student.age }}</td>
        <td>{{ student.phone }}</td>

        <td>
          <button @click="$emit('edit', student)">Edit</button>

          <button @click="$emit('delete', student.id)">Delete</button>
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
