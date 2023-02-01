<template>
  <div class="home p-4">
    <listado-productos></listado-productos>
  </div>
</template>

<script>
import ListadoProductos from '../components/ListadoProductos.vue';
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    ListadoProductos,
  },
  beforeCreate(){
    this.user = this.$store.getters.getUser;
  },
  data() {
    return {
      user:null
    };
  },
  
}
</script>
