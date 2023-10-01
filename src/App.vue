<template>
  <div class="container">
    <!-- Ссылка "Форма" -->
    <router-link to="/form">Форма</router-link>
    <!-- Ссылка "Превью" -->
    <router-link to="/preview">Превью</router-link>
    <!-- Рендеринг компонентов для текущего маршрута -->
    <router-view :parentName="parentName" :parentAge="parentAge"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      parentName: '',
      parentAge: 0,
    }
  },
}
</script>

