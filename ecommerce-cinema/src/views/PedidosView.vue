<template>
  <div class="home p-4">
    <Pedidos></Pedidos>
  </div>
</template>

<script>
import Pedidos from '@/components/Pedidos.vue';
// @ is an alias to /src
export default {
  name: 'PedidosView',
  components: {
    Pedidos
  },
  beforeCreate(){
    if(!this.$store.getters.esAdministrador){
      this.$router.push({path:'/SignIn'})
    }      
  }  
}
</script>
