<template>
  <div class="wrapper">
    <the-header></the-header>
    <router-view :parentName="parentName" :parentAge="parentAge"></router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  components: {TheHeader, TheFooter},

  data () {
    return {
      parentName: '',
      parentAge: 0,
    }
  },
}
</script>

