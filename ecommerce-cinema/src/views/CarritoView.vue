<template>
  <div class="p-4">
    <carrito></carrito>
  </div>
</template>
<script>
import Carrito from '../components/Carrito.vue'
export default {
  name:"CarritoView",
  components:{
    Carrito
  },
  beforeCreate(){
    if(this.$store.getters.getUser != null && this.$store.getters.esAdministrador){
      this.$router.push({path:'/SignIn'})
    }
  },
}
</script>