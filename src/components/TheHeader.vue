<template>
  <header class="header">
    <div class="header__inner">
      <a class="logo" href="https://alef.im">
        <img class="logo__img" src="../assets/images/logo.svg" alt="Логотип">
      </a>
      <nav class="menu">
        <ul class="menu__list">
          <li class="menu__list-item">
            <router-link class="preview-link" to="/form">Форма</router-link>
          </li>
          <li class="menu__list-item">
            <router-link class="preview-link" to="/preview">Превью</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped>
.header__inner {
  padding-bottom: 45px;
  padding-top: 22px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: relative;
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
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
</style>

