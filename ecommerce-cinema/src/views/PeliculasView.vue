<template>
  <div class="home p-4">
    <ListPeliculas></ListPeliculas>
  </div>
</template>

<script>
// @ is an alias to /src

import ListPeliculas from '@/components/ListPeliculas.vue';

export default {
  name: 'PeliculasView',
  beforeCreate(){
    if(!this.$store.getters.esAdministrador){
      this.$router.push({path:'/SignIn'})
    }      
  },
  components: {
    ListPeliculas
}
}
</script>
