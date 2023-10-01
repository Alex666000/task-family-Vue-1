<template>
  <div>
    <h2>Персональные данные</h2>
    <div>Родитель: {{ parentName || 'Василий' }}, {{ parentAge || 30 }} лет</div>
    <div v-for="(child, index) in children" :key="index">Ребенок: {{ child.childName }}, {{ child.childAge }} лет</div>
  </div>
</template>

<script>
export default {
  name: 'preview',
  props: {
    parentName: String,
    parentAge: Number,
  },
  data () {
    return {
      title: 'Персональные данные',
      name: 'Василий', // Установите имя родителя по умолчанию
      age: 30, // Установите возраст родителя по умолчанию
      children: [], // Данные детей будут загружены из параметров маршрута
    }
  },
  created () {
    // Парсим строку JSON, переданную через параметры маршрута, обратно в объект
    const childrenJson = this.$route.query.children
    if (childrenJson) {
      this.children = JSON.parse(childrenJson)
    }
  }
}
</script>
