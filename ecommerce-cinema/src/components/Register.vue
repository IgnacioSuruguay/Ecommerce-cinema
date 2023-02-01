<template>

  <section class="container register" >
    <h1>Registro</h1>
    <form action="" method="post"  @submit.prevent="submit" novalidate class="row">
      <div class="col-md-6">
        <div class="form-floating mb-3">
          <!--<label for="nombre" class="form-label">Nombre</label>-->
          <input type="text" class="form-control" ref="nombre" id="nombre" name="nombre" v-model.trim="nombre" placeholder="Ingrese su nombre">
          <label for="" class="opacity-75">Nombre</label>
          <div class="invalid-feedback text-start" ref="errornombre"></div>        
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-floating mb-3">
          <!--<label for="apellido" class="form-label">Apellido</label>-->
          <input type="text" class="form-control" ref="apellido" id="apellido" name="apellido" v-model.trim="apellido" placeholder="Ingrese su apellido">
          <label for="" class="opacity-75">Apellido</label>
          <div class="invalid-feedback text-start" ref="errorapellido"></div>
        </div>
      </div>
      
      <div class="col-md-12">
        <div class="form-floating mb-3">
          <!--<label for="email" class="form-label">Correo electrónico</label>-->
          <input type="email" class="form-control" ref="email" id="email" name="email" v-model.trim="email" placeholder="Ingrese su correo electrónico">
          <label for="" class="opacity-75">Correo electrónico</label>
          <div class="invalid-feedback text-start" ref="erroremail"></div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="form-floating ">
          <!--<label for="password" class="form-label">Contraseña</label>-->
          <input type="password" class="form-control" ref="password" id="password" name="password" v-model.trim="password" placeholder="Ingrese su contraseña">
          <label for="" class="opacity-75">Contraseña</label>
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
         
      </div>

      <div class="col-md-6">
        <div class="form-floating">
          <!--<label for="password" class="form-label">Confirmar contraseña</label>-->
          <input type="password" class="form-control" ref="repassword" id="repassword" name="repassword"  v-model.trim="repassword" placeholder="Ingrese su contraseña nuevamente">
          <label for="" class="opacity-75">Repetir contraseña</label>
          <div class="text-start small m-1 showpassword">
            <input class="form-check-input d-none" type="checkbox" value="" id="showrepassword" ref="showrepassword" v-model="showrepassword" @change="showRepassword($event)">
            <label class="form-check-label" for="showrepassword">   
              <span class="m-auto">
                <font-awesome-icon icon="fa-solid fa-eye" v-show="!showrepassword" />
                <font-awesome-icon icon="fa-solid fa-eye-slash" v-show="showrepassword"/>
              </span>
              Mostrar
            </label>
          </div> 
          <div class="invalid-feedback text-start" ref="errorrepassword"></div>
        </div>
      </div>
      
      <div class="col-md-12">
        <div class="form-floating mb-3">
          <div>
            <input class="form-check-input m-1" type="checkbox" id="esAdmin" name="esAdmin" v-model="esAdmin" >
            <label for="esAdmin" class="form-check-label"> ¿Es administrador?</label>
          </div>
        </div>
      </div>
      <div class="">
        <button type="submit" class="btn btn-primary m-1">Registrarse</button>
        <button class="btn btn-secondary m-1" @click="volver()">Volver al login</button>
      </div>
    </form>
  </section>
  

</template>

<script lang="js">
  // class Usuario {
  //   constructor(nom, apel, mail, pass) {
  //     this.nombre = nom;
  //     this.apellido = apel;
  //     this.email = mail;
  //     this.password = pass;
  //   }
  // }
  
  import Usuario from '../class';
  import axios  from 'axios';
  export default  {
    name: 'Register',
    props: {
      register: Boolean,
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
    mounted () {

    },
    data () {
      return {
        nombre:"",
        apellido:"",
        email:"",
        password:"",
        repassword:"",
        esAdmin: false,
        // usuarios:[
        //   {            
        //     nombre:"Admin",
        //     apellido:"Admin",
        //     email:"admin@admin.com",
        //     password:"Password01."
        //   }
        // ]
        usuarios: [],
        showpassword:false,
        showrepassword:false,
        flagError:null
      } 
    },
    methods: {
      async submit(){
        this.flagError = false;

        this.$refs.errornombre.innerText="";
        this.$refs.errorapellido.innerText="";
        this.$refs.erroremail.innerText="";
        this.$refs.errorpassword.innerText="";
        this.$refs.errorrepassword.innerText="";

        this.$refs.nombre.classList.remove("is-invalid");
        this.$refs.apellido.classList.remove("is-invalid");
        this.$refs.email.classList.remove("is-invalid");
        this.$refs.password.classList.remove("is-invalid");
        this.$refs.repassword.classList.remove("is-invalid");

        this.validacionesNombre();
        this.validacionesApellido();
        this.validacionesEmail();
        this.validacionesPassword();
        this.validacionesRepassword();

        if (this.flagError) {
          return;
        }

        if(this.usuarios.find((e)=> e.email === this.email)){
          this.$refs.email.classList.add("is-invalid");
          this.$refs.erroremail.innerText="El correo electrónico ya se encuentra registrado";
          this.flagError = true;
          return 
        }

        let user = new Usuario(this.nombre, this.apellido, this.email, this.password);
        let URLpost = "https://639a6077d514150197347436.mockapi.io/cinema/usuarios";
        // await axios.post(URLpost, user)
        // .then((response) =>{
        //   debugger
        //   newUser= response
        //   console.table(response.data)
        // })
        // .catch((err) => {
        //   debugger
        //   console.error(`${err}`)
        // })
        
        try{
          const coso = await axios.post(URLpost, user);
          if(coso.status == 201){
            Object.assign(this.$data, this.$options.data());
            this.$parent.toastCreate.show();
            this.volver();
          }
        }
        catch(err){
            this.$parent.toastError.show();
        }
      },
      validacionesNombre(){
        if(!this.nombre){
          this.$refs.nombre.classList.add("is-invalid");
          this.$refs.errornombre.innerText="Campo obligatorio";
          this.flagError = true;
          return 
        }
        let regex = /(?=.*[0-9])/;
        if(regex.test(this.nombre)){
          this.$refs.nombre.classList.add("is-invalid");
          this.$refs.errornombre.innerText="Este campo no admite caracteres numéricos";
          this.flagError = true;
        }
      },
      validacionesApellido(){
        if(!this.apellido){
          this.$refs.apellido.classList.add("is-invalid");
          this.$refs.errorapellido.innerText="Campo obligatorio";
          this.flagError = true;
          return 
        }
        let regex = /(?=.*[0-9])/;
        if(regex.test(this.apellido)){
          this.$refs.apellido.classList.add("is-invalid");
          this.$refs.errorapellido.innerText="Este campo no admite caracteres numéricos";
          this.flagError = true;
        }
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
        let validaciones = '';
        let regex = null;
        // ^	                The password string will start this way
        // (?=.*[a-z])	      The string must contain at least 1 lowercase alphabetical character
        // (?=.*[A-Z])	      The string must contain at least 1 uppercase alphabetical character
        // (?=.*[0-9])	      The string must contain at least 1 numeric character
        // (?=.*[!@#$%^&*])   The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict. (?=.*[\.!@#\$%\^&\*])
        // (?=.{8,})	        The string must be eight characters or longer
        regex = /(?=.*[a-z])/;
        if(! regex.test(this.password)) {
          this.$refs.password.classList.add("is-invalid");
          validaciones+=`<li>Minusculas</li>`;
          this.flagError = true;
        }
        regex = /(?=.*[A-Z])/;
        if(! regex.test(this.password)) {
          this.$refs.password.classList.add("is-invalid");
          validaciones+=`<li>Mayusculas</li>`;
          this.flagError = true;
        }
        regex = /(?=.*[0-9])/;
        if(! regex.test(this.password)) {
          this.$refs.password.classList.add("is-invalid");
          validaciones+=`<li>Numeros</li>`;
          this.flagError = true;
        }
        regex = /(?=.*[.!@#$%^&*])/;
        if(! regex.test(this.password)) {
          this.$refs.password.classList.add("is-invalid");
          validaciones+=`<li>Los siguientes caracteres especiales .!@#$%^&* </li>`;
          this.flagError = true;
        }
        regex = /(?=.{8,})/;
        if(! regex.test(this.password)) {
          this.$refs.password.classList.add("is-invalid");
          validaciones+=`<li>Al menos 8 caracteres</li>`;
          this.flagError = true;
        }
        this.$refs.errorpassword.innerHTML=`La contraseña debe contener: <ul>${validaciones}</ul>`;

      },
      validacionesRepassword(){
        if(!this.repassword){
          this.$refs.repassword.classList.add("is-invalid");
          this.$refs.errorrepassword.innerText="Campo obligatorio";
          this.flagError = true;
          return 
        }
        

        let validaciones = '';
        let regex = null;
        regex = /(?=.*[a-z])/;
        if(! regex.test(this.repassword)) {
          this.$refs.repassword.classList.add("is-invalid");
          validaciones+=`<li>Minusculas</li>`;
          this.flagError = true;
        }
        regex = /(?=.*[A-Z])/;
        if(! regex.test(this.repassword)) {
          this.$refs.repassword.classList.add("is-invalid");
          validaciones+=`<li>Mayusculas</li>`;
          this.flagError = true;
        }
        regex = /(?=.*[0-9])/;
        if(! regex.test(this.repassword)) {
          this.$refs.repassword.classList.add("is-invalid");
          validaciones+=`<li>Numeros</li>`;
          this.flagError = true;
        }
        regex = /(?=.*[.!@#$%^&*])/;
        if(! regex.test(this.repassword)) {
          this.$refs.repassword.classList.add("is-invalid");
          validaciones+=`<li>Los siguientes caracteres especiales .!@#$%^&* </li>`;
          this.flagError = true;
        }
        regex = /(?=.{8,})/;
        if(! regex.test(this.repassword)) {
          this.$refs.repassword.classList.add("is-invalid");
          validaciones+=`<li>Al menos 8 caracteres</li>`;
          this.flagError = true;
        }
        this.$refs.errorrepassword.innerHTML=`La contraseña debe contener: <ul>${validaciones}</ul>`;

        regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])(?=.{8,})/

        if(regex.test(this.repassword) && this.repassword != this.password){
          this.$refs.repassword.classList.add("is-invalid");
          this.$refs.errorrepassword.innerText="Las contraseñas deben ser iguales";
          this.flagError = true;
        }

      },
      volver(){
        this.$emit("register", true);
      },
      showPassword(evt){
        if(evt.target.checked)
          this.$refs.password.type="text";
        else
          this.$refs.password.type="password";

      },
      showRepassword(evt){
        if(evt.target.checked)
          this.$refs.repassword.type="text";
        else
          this.$refs.repassword.type="password";

      }
    },
    computed: {

    }
}
</script>

<style scoped>
.register{
  border: 1px solid lightgrey;
  border-radius: 10px;
  max-width: fit-content;
  background-color: white;
}
.register form{
  width: 550px;
  margin: 10px auto;
}
</style>
