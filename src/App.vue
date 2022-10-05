<template>
  <div id="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        
      }
    },
    components: {
     
    },
    methods: {

    },
    mounted() {
      this.$router.push({
            path: '/start',
            query: { step: 1 }
        }).catch(()=>{})
    }
  }
</script>

<style>
  #wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    background: white;
    margin: 4px;
  }
</style>
