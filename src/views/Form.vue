<template>
  <div>
    <div class="container">
      <!--  Форма-->
      <form class="card" @submit.prevent="submitHandler">
        <h1>Персональные данные</h1>
        <!-- Блок для Родителя -->
        <div class="form-control" :class="{ userNameInput: errors.userName }">
          <label for="name">Имя</label>
          <input
              type="text"
              id="name"
              placeholder="Имя"
              v-model="name"
          >
          <small v-if="errors.userName">{{ errors.userName }}</small>
        </div>
        <div class="form-control" :class="{ userAgeInput: errors.userAge }">
          <label for="age">Возраст</label>
          <input
              type="number"
              id="age"
              placeholder="Возраст"
              max="99"
              v-model.number="age"
          >
          <small v-if="errors.userAge">{{ errors.userAge }}</small>
        </div>

        <hr>
        <button type="button" class="btn primary" @click="addChild" :disabled="isAddChildButtonDisabled">+ Добавить ребенка</button>
        <hr>

        <!-- Блок для добавления детей -->
        <div v-for="(child, index) in children" :key="index">
          <div class="form-control" :class="{ childNameInput: childErrors[index].childName }">
            <label :for="'childName' + index">Имя</label>
            <input
                :type="'text'"
                :id="'childName' + index"
                :placeholder="'Имя ' + (index + 1)"
                v-model="child.childName"
            >
            <small v-if="childErrors[index].childName">{{ childErrors[index].childName }}</small>
          </div>
          <div class="form-control" :class="{ childAgeInput: childErrors[index].childAge }">
            <label :for="'childAge' + index">Возраст</label>
            <input
                :type="'number'"
                :id="'childAge' + index"
                :placeholder="'Возраст ' + (index + 1)"
                max="99"
                v-model.number="child.childAge"
            >
            <small v-if="childErrors[index].childAge">{{ childErrors[index].childAge }}</small>
          </div>
          <button type="button" class="btn primary" @click="removeChild(index)">Удалить</button>
        </div>

        <button type="submit" class="btn primary">Сохранить</button>
      </form>
    </div>
  </div>
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
      name: '',
      age: 0,
      isChildValid: false,
      hasInvalidChild: false,
      maxChildren: 5,
      children: [],
      errors: {
        userName: '',
        userAge: '',
        childName: '',
        childAge: '',
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
            children: JSON.stringify(this.children)
          }
        })
      }
    },
  },
}
</script>

<style lang="scss">
.form-control small {
  color: #b40b05;
}

.form-control.userNameInput input,
.form-control.userAgeInput input {
  border-color: #b40b05;
}
</style>
