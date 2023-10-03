<template>
  <div class="wrapper">
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

