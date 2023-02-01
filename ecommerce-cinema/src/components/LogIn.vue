<template>

  <section class="log-in container" >
    <h1>Login</h1>
    <form action="" method="post"  @submit.prevent="submit" novalidate>
        <!-- <label for="" class="opacity-75">Usar: admin@test.com / nachosuru@test.com</label> -->
      <div class="form-floating mb-3">
        <input type="email" class="form-control" ref="email" id="email" name="email" v-model.trim="email" placeholder="Correo electrónico" required>
        <label for="email" class="opacity-75">Correo electrónico</label>
        <div class="invalid-feedback text-start" ref="erroremail"></div>
      </div>
      <!-- <label for="" class="opacity-75">Password01.</label> -->
      <div class="form-floating mb-3">
          <input type="password" class="form-control" ref="password" id="password" name="password" v-model.trim="password" placeholder="Contraseña">
          <label for="password" class="opacity-75">Contraseña</label>
          
<div class="text-start small m-1 showpassword">
  <input class="form-check-input d-none" type="checkbox" value="" id="showpassword" ref="showpassword" v-model="showpassword" @change="showPassword($event)">
  <label class="form-check-label" for="showpassword">   
    <span class="m-auto">

      <font-awesome-icon icon="fa-solid fa-eye" v-show="!showpassword" />
      <font-awesome-icon icon="fa-solid fa-eye-slash" v-show="showpassword"/>
    </span>
    Mostrar
  </label>
</div> 
        <div class="invalid-feedback text-start" ref="errorpassword"></div>
      </div>

      <button class="btn btn-primary m-1" type="submit">Iniciar sesión</button>
      <button class="btn btn-secondary m-1"  @click="enviarRegister()">Registrarse</button>
    </form>
  </section>

</template>

<script lang="js">

  import { mapMutations } from 'vuex';
  import axios from 'axios'
  export default  {
    name: 'log-in',
    props: [],
    mounted () {

    },
    created(){
      const usuariosEndPoint = "https://639a6077d514150197347436.mockapi.io/cinema/usuarios";
      axios.get(usuariosEndPoint)
      .then((response) => {
        // console.table(response.data);
        this.usuarios = response.data;
      })
      .catch((err) => {console.error(`${err}`)})

    },
    data () {
      return {
        email:"",
        password:"",
        usuarios:[],
        flagError: null,
        showpassword:false
      }
    },
    methods: {
      ...mapMutations(['setUser']),
      submit(){
        this.flagError = false;

        this.$refs.erroremail.innerText="";
        this.$refs.errorpassword.innerText="";

        this.$refs.email.classList.remove("is-invalid");
        this.$refs.password.classList.remove("is-invalid");

        this.validacionesEmail();
        this.validacionesPassword();
        
        if (this.flagError) {
          return;
        }
        let user = this.usuarios.find((e)=> e.email === this.email && e.password === this.password);
        if(!user){
          this.$refs.email.classList.add("is-invalid");
          this.$refs.erroremail.innerText="Credenciales incorrectas";

          this.$refs.password.classList.add("is-invalid");
          this.$refs.errorpassword.innerText="Credenciales incorrectas";
          return
        }
        localStorage.setItem("user", JSON.stringify(user));
        this.setUser(user);
        //alert(`Bienvenido ${user.nombre} ${user.apellido}` );
        this.$router.push({path:'/'})

      },
      validacionesEmail(){
        if(!this.email){
          this.$refs.email.classList.add("is-invalid");
          this.$refs.erroremail.innerText="Campo obligatorio";
          this.flagError = true;
          return 
        }
        let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/ ;
        if(!regex.test(this.email)){
          this.$refs.email.classList.add("is-invalid");
          this.$refs.erroremail.innerText="Ingrese un email válido";
          this.flagError = true;
        }
      },
      validacionesPassword(){
        if(!this.password){
          this.$refs.password.classList.add("is-invalid");
          this.$refs.errorpassword.innerText="Campo obligatorio";
          this.flagError = true;
          return 
        }
      },
      enviarRegister(){
        this.$emit("register", false);
      },
      showPassword(evt){
        if(evt.target.checked)
          this.$refs.password.type="text";
        else
          this.$refs.password.type="password";

      }
    },
    computed: {

    }
}


</script>

<style scoped >
  .log-in {
    border: 1px solid lightgrey;
    border-radius: 10px;
    max-width: fit-content;
    background-color: white;
  }
  .log-in form{
    width: 400px;
    margin: 10px auto;
  }
  .showpassword{
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
  }
</style>
