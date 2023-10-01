<template>
  <div>
    <h2>Персональные данные</h2>
    <div>Родитель: {{ parentName || 'Василий' }}, {{ parentAge || 30 }} лет</div>
    <p>Дети</p>
    <div v-for="(child, index) in children" :key="index">Ребенок: {{ child.childName }}, {{ child.childAge }} лет</div>
  </div>
</template>

<script>
export default {
  name: 'preview',
  data () {
    return {
      parentName: '',
      parentAge: 0,
      children: []
    }
  },
  created () {
    // Проверяем, есть ли параметры маршрута, прежде чем их использовать
    if (this.$route.query.parentName) {
      this.parentName = this.$route.query.parentName
    }
    if (this.$route.query.parentAge) {
      this.parentAge = parseInt(this.$route.query.parentAge)
    }
    if (this.$route.query.children) {
      try {
        this.children = JSON.parse(this.$route.query.children)
      } catch (error) {
        console.error('Ошибка разбора JSON:', error)
      }
    }
  }
}
</script>
