<!-- src/views/Preview.vue -->
<template>
  <div>
    <h2>Персональные данные</h2>
    <div>{{ parentName }}, {{ parentAge }} лет</div>
  </div>
</template>

<script>
export default {
  props: {
    parentName: String,
    parentAge: Number,
  },
}
</script>
