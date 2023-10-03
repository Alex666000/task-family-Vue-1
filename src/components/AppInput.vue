<template>
  <div class="form-control" :class="{ userNameInput: error }">
    <label class="input-label" :for="id">{{ label }}</label>
    <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        @input="change"
    >
    <small v-if="error">{{ error }}</small>
  </div>
</template>

<script>
export default {
  emits: ['update:value'],
  props: {
    type: String,
    value: String,
    error: String,
    label: String,
    placeholder: String
  },
  data () {
    return {
      id: 'input-' + Math.random()

    }
  },
  methods: {
    change (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }

}
</script>

<style scoped>

</style>
