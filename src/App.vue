<template>
  <div class="container">
    <form class="card" @submit.prevent="submitHandler">
      <h1>Персональные данные</h1>
      <!-- Блок для Родителя____!-->
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

      <!-- Блок для добавления детей-->
      <div v-for="(child, index) in children" :key="index">
        <div class="form-control" :class="{ childNameInput: errors.childName }">
          <label :for="'childName' + index">Имя</label>
          <input
              :type="'text'"
              :id="'childName' + index"
              :placeholder="'Имя ' + (index + 1)"
              v-model="child.childName"
          >
          <small v-if="errors.childName">{{ errors.childName }}</small>
        </div>
        <div class="form-control" :class="{ childAgeInput: errors.childAge }">
          <label :for="'childAge' + index">Возраст</label>
          <input
              :type="'number'"
              :id="'childAge' + index"
              :placeholder="'Возраст ' + (index + 1)"
              max="99"
              v-model.number="child.childAge"
          >
          <small v-if="errors.childAge">{{ errors.childAge }}</small>
        </div>
        <button type="button" class="btn primary" @click="removeChild(index)">Удалить</button>
      </div>

      <button type="submit" class="btn primary">Сохранить</button>
    </form>
  </div>
</template>

<script>
export default {
  created () {
    this.initChildErrors()
  },
  data () {
    return {
      title: 'Персональные данные',
      name: '',
      age: 0,
      isChildValid: false, // Флаг валидности данных о ребенке
      maxChildren: 5, // Максимальное количество детей
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
      // Проверяем валидность данных родителя
      if (!this.formUserIsValidate()) {
        // Если есть ошибки в данных родителя, выходим из функции
        return
      }

      if (this.children.length < this.maxChildren) {
        // Создаем нового ребенка только если не достигнуто максимальное количество
        this.children.push({
          childName: '',
          childAge: 0,
        })
// Очищаем поля пользователя при добавлениии ребенка
        this.errors.userName = ''
        this.errors.userAge = ''

        // Сбрасываем ошибки для нового ребенка
        this.childErrors.push({
          childName: '',
          childAge: '',
        })

        // При добавлении следующего ребенка зачищаем предыд состояния:
      }
    },
    removeChild (index) {
      // Используем метод splice для удаления ребенка из массива по индексу
      this.children.splice(index, 1)

      // Удаляем ошибки для удаленного ребенка
      this.childErrors.splice(index, 1)
    },
    childFormIsValid (index) {
      let isValid = true

      const child = this.children[index]
      const firstChar = child.childName.charAt(0)
      const restOfName = child.childName.slice(1)

      // Проверка имени ребенка
      if (
          !child.childName ||
          firstChar !== firstChar.toUpperCase() || // Проверка первой заглавной буквы
          restOfName !== restOfName.toLowerCase() || // Проверка остальных маленьких букв
          child.childName.length > 15
      ) {
        this.errors.childName = 'Введите имя ребенка корректно!'
        isValid = false
      } else {
        this.errors.childName = ''
      }

      // Проверка возраста ребенка
      if (!child.childAge || child.childAge <= 0 || child.childAge > 99 || !Number.isInteger(child.childAge)) {
        this.errors.childAge = 'Введите корректный возраст ребенка!'
        isValid = false
      } else {
        this.errors.childAge = ''
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
      // общий флаг для formUserIsValidate() и childFormIsValid(index)
      let isValid = true

      // Проверка данных о родителе - отрицательный кейс сначала проверям...
      if (!this.formUserIsValidate()) {
        isValid = false
      }

      // Проверка данных о детях - отрицательный кейс сначала проверям...
      this.children.forEach((child, index) => {
        if (!this.childFormIsValid(index)) {
          // устаавливаем 2 флага в false
          isValid = false
          this.isChildValid = false
        }
      })

      if (isValid) {
        // Все данные корректны, можно отправлять форму
        console.log('Name:', this.name)
        console.log('Age:', this.age)

        // Вывести данные о детях, только если флаг валидности данных о ребенке true
        if (!this.isChildValid) {
          this.children.forEach((child, index) => {
            console.log(`Child ${index + 1} Name:`, child.childName)
            console.log(`Child ${index + 1} Age:`, child.childAge)
          })
        } else {
          console.log('Заполните поля формы правильно!')
        }
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
