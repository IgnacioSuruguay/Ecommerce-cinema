<template>
  <div class="home">
    <log-in v-if="visible" @register="visible = $event"></log-in>
    <Register v-else @register="visible = $event" ></Register>
    
      <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
        <div id="toastCreate" ref="toastCreate" class="toast" role="alert" aria-live="assertive" aria-atomic="true" >
          <div class="toast-header text-white bg-primary bg-gradient" >
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">Usuario creado correctamente</div>
        </div>
      </div>
      
      <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
        <div id="toastError" ref="toastError" class="toast" role="alert" aria-live="assertive" aria-atomic="true" >
          <div class="toast-header text-white bg-danger bg-gradient" >
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">No se pudo crear el usuario</div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Register.vue';
import LogIn from '../components/LogIn.vue'
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

export default {
  name: 'SignInView',
  components: {
    Register,
    LogIn
  },
  mounted(){    
    const toastError = this.$refs.toastError;
    this.toastError = new bootstrap.Toast(toastError);

    const toastCreate = this.$refs.toastCreate;
    this.toastCreate = new bootstrap.Toast(toastCreate);
  },
  data(){
    return {
      usuario: null,
      visible: true,
      toastCreate: null,
      toastError: null,
    }
  },
  methods:{

  }
}
</script>
<style scoped>
  .home{
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>