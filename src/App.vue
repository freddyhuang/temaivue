<template>
  <div id="app">
    <nav-header></nav-header>
    
    <router-view/>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/header/header';
import NavFooter from '@/components/footer/footer';
export default {
  name: 'App',
   components:{
        NavHeader,
        NavFooter
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
