<template>
    <main class="personal-data">
    <div class="container">
      <h2 class="title personal-data__title">Персональные данные</h2>
      <div class="name-age">{{ parentName || 'Василий' }}, {{ parentAge || 30 }} лет </div>
      <h2 class="child-title personal-data__title">Дети</h2>
      <div class="children">
        <div class="child-info" v-for="(child, index) in children" :key="index">
          <span>{{ child.childName }}, &nbsp; </span>
          <span>{{ child.childAge }}&nbsp;лет</span>
        </div>
      </div>
    </div>
  </main>
  <!--  Footer-->
  <footer class="footer">
    <p>all rights reserved</p>
  </footer>
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


<style>
.container {
  max-width: 917px;
  padding: 0 10px;
  margin: 0 auto;
}

.header__inner {
  padding-bottom: 45px;
  padding-top: 22px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: relative;
}

.logo__img {
  padding: 0 41px 0 41px;
}

.logo {
  position: absolute;
  left: 190px;
}

.menu__list {
  display: flex;
}

.menu__list-item {
}

.menu__list-item + .menu__list-item {
  margin-left: 24px;
}

.preview-link {
  padding: 7px 0 7px;
  font-size: 14px;
  line-height: 24px;
  word-wrap: break-word;
}

.personal-data {
  flex: 1 1 auto;
  color: #111111;
  font-weight: 600;
}

.personal-data__title {
  margin-bottom: 20px;
  color: #111111;
  font-size: 16px;
  font-weight: 550;
  line-height: 24px;
  word-wrap: break-word;
}

.child-title {
  margin-top: 60px;
  margin-bottom: 20px;
}

.children {
  margin-top: 10px;
  width: max-content;

}

.child-info {
  display: flex;
  justify-content: center;
  flex-direction: row;
  min-height: 44px;
  border-radius: 5px;
  background: #F1F1F1;
  align-items: center;
  margin-bottom: 20px;
}

.child-info:last-child {
  margin-bottom: 0; /* Убираем маргин у последнего блока */
  background: #F1F1F1;

}
</style>
