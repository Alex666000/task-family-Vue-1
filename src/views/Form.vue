<template>
  <!--  Header-->
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
  <!--Главный блок-->
  <main class="personal-data">
    <div class="container">
      <h2 class="title personal-data__title">Персональные данные</h2>
      <form class="form" @submit.prevent="submitHandler">
        <!-- Блок для Родителя -->
        <!-- Имя-->
        <div class="form-control" :class="{ userNameInput: errors.userName }">
          <label class="input-label" for="name">Имя</label>
          <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Введите имя"
          >
          <small v-if="errors.userName">{{ errors.userName }}</small>
        </div>
        <!-- Возраст-->
        <div class="form-control" :class="{ userAgeInput: errors.userAge }">
          <label class="input-label" for="age">Возраст</label>
          <input
              type="number"
              id="age"
              max="99"
              v-model.number="age"
              placeholder="Введите возраст"
          >
          <small v-if="errors.userAge">{{ errors.userAge }}</small>
        </div>
        <div class="children-button">
          <h2 id="title-for-children" class="title personal-data__title">Дети (макс. 5)</h2>
          <button type="button" class="button" @click="addChild" :disabled="isAddChildButtonDisabled">Добавить ребенка</button>
        </div>

        <!-- Блок для добавления детей -->
        <div class="form-control-children" v-for="(child, index) in children" :key="index">
          <div class="form-control" :class="{ childNameInput: childErrors[index].childName }">
            <label class="input-label" :for="'childName' + index">Имя</label>
            <input
                :type="'text'"
                :id="'childName' + index"
                v-model="child.childName"
            >
            <small v-if="childErrors[index].childName">{{ childErrors[index].childName }}</small>
          </div>
          <div class="form-control" :class="{ childAgeInput: childErrors[index].childAge }">
            <label class="input-label" :for="'childAge' + index">Возраст</label>
            <input
                :type="'number'"
                :id="'childAge' + index"
                max="99"
                v-model.number="child.childAge"
            >
            <small v-if="childErrors[index].childAge">{{ childErrors[index].childAge }}</small>
          </div>
          <button type="button" class="remove-button" @click="removeChild(index)">Удалить</button>
        </div>

        <button type="submit" class="save-button">Сохранить</button>
      </form>
    </div>
  </main>
  <!--  Footer-->
  <footer class="footer">
    <p>all rights reserved</p>
  </footer>
</template>

<script>
export default {
  name: 'form',
  created () {
    this.initChildErrors()
  },
  props: {
    parentName: String,
    parentAge: Number,
  },
  data () {
    return {
      title: 'Персональные данные',
      name: 'Пётр',
      age: 99,
      isChildValid: false,
      hasInvalidChild: false,
      maxChildren: 5,
      children: [],
      errors: {
        userName: '',
        userAge: '',
        childName: 'Пётр',
        childAge: '99',
      },
      childErrors: [], // Массив для хранения ошибок для каждого ребенка
    }
  },
  computed: {
    isAddChildButtonDisabled () {
      return this.children.length >= this.maxChildren
    },
  },
  methods: {
    initChildErrors () {
      for (let i = 0; i < this.maxChildren; i++) {
        this.childErrors.push({
          childName: '',
          childAge: '',
        })
      }
    },
    addChild () {
      if (!this.formUserIsValidate()) {
        return
      }

      const currentIndex = this.children.length

      if (
          this.childErrors[currentIndex].childName ||
          this.childErrors[currentIndex].childAge
      ) {
        return
      }

      if (this.children.length < this.maxChildren) {
        this.children.push({
          childName: '',
          childAge: 0,
        })
        this.errors.userName = ''
        this.errors.userAge = ''
        this.childErrors.push({
          childName: '',
          childAge: '',
        })
      }
    },
    removeChild (index) {
      this.children.splice(index, 1)
      this.childErrors.splice(index, 1)
    },
    childFormIsValid (index) {
      let isValid = true

      const child = this.children[index]
      const firstChar = child.childName.charAt(0)
      const restOfName = child.childName.slice(1)

      if (
          !child.childName ||
          firstChar !== firstChar.toUpperCase() ||
          restOfName !== restOfName.toLowerCase() ||
          child.childName.length > 15
      ) {
        this.childErrors[index].childName = 'Введите имя ребенка корректно!'
        isValid = false
      } else {
        this.childErrors[index].childName = ''
      }

      if (!child.childAge || child.childAge <= 0 || child.childAge > 99 || !Number.isInteger(child.childAge)) {
        this.childErrors[index].childAge = 'Введите корректный возраст ребенка!'
        isValid = false
      } else {
        this.childErrors[index].childAge = ''
      }

      return isValid
    },
    formUserIsValidate () {
      let isValid = true
      const firstChar = this.name.charAt(0)
      const restOfName = this.name.slice(1)

      if (
          this.name.length === 0 ||
          firstChar !== firstChar.toUpperCase() ||
          restOfName !== restOfName.toLowerCase() ||
          this.name.length > 15
      ) {
        this.errors.userName = 'Заполните Имя'
        isValid = false
      } else {
        this.errors.userName = ''
      }

      if (this.age <= 0 || this.age > 99 || !Number.isInteger(this.age)) {
        this.errors.userAge = 'Заполните возраст'
        isValid = false
      } else {
        this.errors.userAge = ''
      }

      return isValid
    },
    submitHandler () {
      let isValid = true

      if (!this.formUserIsValidate()) {
        isValid = false
      }
      this.children.forEach((child, index) => {
        if (!this.childFormIsValid(index)) {
          isValid = false
          this.isChildValid = false
        }
      })

      if (isValid) {
        // Выполнить перенаправление на страницу Preview только после успешной валидации
        this.$router.push({
          name: 'preview',
          query: {
            parentName: this.name,
            parentAge: this.age,
            children: JSON.stringify(this.children),
          },
        })
      }
    },
  },
}
</script>

<style lang="scss">
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

.form {
  max-width: 616px;
}

.form input {
  display: block;
  width: 100%;
  border: 1px #F1F1F1 solid;
  background: white;
  border-radius: 4px;
  height: 56px;
  padding-left: 16px;
  margin-bottom: 10px;
}

.form input::placeholder {
  word-wrap: break-word;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}

.form-control {
  position: relative;
}

.input-label {
  position: absolute;
  padding: 8px 16px 32px 16px;
  top: -12px;
  font-size: 13px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

.children-button {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.children-button h2 {
  display: inline-block;
  margin-top: 33px;
}

.children-button button {
  display: block;
  height: 45px;
  position: absolute;
  left: 68%;
  padding: 10px 20px;
  color: #01A7FD;
  font-size: 14px;
  line-height: 24px;
  word-wrap: break-word;
  background: none;
  border: 2px solid #01A7FD;
  border-radius: 25px;
  cursor: pointer;
}

.children-button button::before {
  content: "+";
  font-size: 24px;
  position: absolute;
  top: 50%;
  left: 6%;
  transform: translate(-50%, -50%);
}

.form-control-children {
  display: flex;
}

.form-control {
  margin-right: 18px; /* Отступ между инпутами */
}

.form-control:last-child {
  margin-right: 0; /* Убираем отступ справа для последнего инпута */
}

.remove-button {
  cursor: pointer;
}

.form-control-children .remove-button {
  background: none;
  border: none;
  color: #01A7FD;
  font-size: 14px;
  line-height: 24px;
  word-wrap: break-word;
}

.save-button {
  padding: 10px 20px;
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
  background: #01A7FD;
  border: 2px solid #01A7FD;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 30px;
}

.footer {
  width: 100%;
  min-height: 76px;
  font-weight: 500;
  background: #FAFAFA;
  box-shadow: 0px 1px 0px 0px rgba(17, 17, 17, 0.10);
}

.footer p {
  padding: 30px 10px;
  text-align: center;
  color: #111111;
}

//-------------------------------------------------------------------------------
.form-control small {
  display: block;
  color: #b40b05;
  margin-bottom: 5px;
}

.form-control.userNameInput input,
.form-control.userAgeInput input {
  border-color: #b40b05;
  padding-bottom: 10px;
}

.button:disabled {
  opacity: 0.4;
}
</style>
