<template>
  <main class="personal-data">
    <div class="container">
      <h2 class="title personal-data__title">Персональные данные</h2>
      <form class="form" @submit.prevent="submitHandler">
        <app-input
            :type="'text'"
            :placeholder="'Введите имя'"
            :error="errors.userName"
            :label="'Имя'"
            v-model:value="name"
        >
        </app-input>
        <app-input
            :type="'number'"
            :placeholder="'Введите возраст'"
            :error="errors.userAge"
            :label="'Возраст'"
            v-model.number:value="age"
            max="99"
        >
        </app-input>

        <div class="children-button">
          <h2 id="title-for-children" class="title personal-data__title">Дети (макс. 5)</h2>
          <button type="button" class="button" @click="addChild" :disabled="isAddChildButtonDisabled">Добавить ребенка</button>
        </div>

        <!-- Блок для добавления детей -->
        <div class="form-control-children" v-for="(child, index) in children" :key="index">
          <div class="form-control" :class="{ childNameInput: childErrors[index].childName }">
            <label class="input-label" :for="'childName' + index">Имя</label>
            <input
                type="text"
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
</template>

<script>
import AppInput from '@/components/AppInput'

export default {
  name: 'form',
  components: {AppInput},
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
