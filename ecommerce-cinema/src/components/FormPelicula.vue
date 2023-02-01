<template>
	<section class="form-edit-pelicula container">
		<h1 v-if="this.pelicula">Formulario de modificación</h1>
		<h1 v-else>Formulario de creación</h1>

		<!-- <form action="" method="post" @submit.prevent="submit()" id="form1" class="needs-validation" novalidate> -->
		<form action="" method="post" @submit.prevent="submit()" id="form1" novalidate>
    <!-- fila 1 -->
			<div class="row g-3" >
				<!-- pelicula  -->
        <div class="form-floating mb-3 col-md-6" id="input-titulo">
					<input id="titulo" ref="titulo" v-model="peli_titulo" class="form-control input-group-sm" type="text" required/>      
					<label for="">
            Pelicula
          </label>
					<div class="invalid-feedback text-start" ref="errortitulo"></div>
				</div>
        <!-- anio -->
				<div class="form-floating mb-3 col-md-3">
					<input class="form-control input-group-sm has-validation" type="number"  pattern="\d*" @keydown="isInteger($event)" value="" v-model="peli_anio" ref="anio">
					<label class="" for="anio">
					Año
					</label>
					<div class="invalid-feedback text-start" ref="erroranio"></div>
				</div>
        <!-- idioma -->
				<div class="form-floating mb-3 col-md-3">
					<select class="form-select input-group-sm has-validation" ref="idioma" v-model="peli_idioma" required>
						<option v-for="(idioma, index) in list_idiomas" :key="index" :value="idioma">{{ idioma }}</option>
					</select>
					<label for="">Idioma</label>
					<div class="invalid-feedback text-start" ref="erroridioma"></div>
				</div>
			</div>
      <!-- fila 2 -->
			<div class="row g-3">
        <!-- sinopsis -->
        <div class="form-floating col-md-6">
					<textarea  name="sinopsis" ref="sinopsis" style="height: 200px;" class="form-control input-group-sm has-validation" v-model="peli_sinopsis" required></textarea>
					<label for="inicio-fecha">Sinopsis</label>
					<div class="invalid-feedback" ref="errorsinopsis"></div>
				</div>
        <!-- generos -->
        <div class="col-md-3">
          <div class="form-check text-start" v-for="(gene, index) in list_generos" :key="index">
            <input class="form-check-input" type="checkbox" name="genero" :id="'genero'+index" ref="generos" :value="gene" v-model="peli_genero" required>
            <label class="form-check-label" :for="'genero'+index">
            {{gene}}
            </label>
          </div> 
          <div class="form-check text-start" >
            <input class="form-check-input" type="checkbox" ref="genero8" id="genero8" hidden >
            <label class="form-check-label" for="genero8" hidden>
            dummy
            </label>
            <div class="invalid-feedback" ref="errorgenero"></div>
          </div>
        </div>
        <!-- precio -->
        <div class="form-floating mb-3 col-md-3">
          <input class="form-control input-group-sm has-validation" type="number"  pattern="\d*" @keypress="isFloat($event)" value=""  v-model="peli_precio" ref="precio" required> 
          <!-- <input type="text" inputmode="numeric" pattern="\d*"  required/> -->          
          <label class="" for="precio">
          Precio (Ej: 10.00)
          </label>
          <div class="invalid-feedback text-start" ref="errorprecio"></div>
        </div>
			</div>
			<div class="row g-3">
      <!-- url -->
          <!-- https://http2.mlstatic.com/D_NQ_NP_809718-MLA41881336198_052020-O.jpg -->
        <div class="form-floating mb-3 col-md-6">
          <input class="form-control input-group-sm has-validation" type="url" value="" v-model="peli_posterurl" ref="posterurl"> 
          <label class="" for="precio">
          URL Poster
          </label>
          <div class="invalid-feedback text-start" ref="errorposterurl"></div>
        </div>
        <div class="mb-3 col-md-6">
          <div class="card" style="width: 18rem;">
            <img :src="peli_posterurl" class="card-img-top" alt="..." onerror="this.src='https://www.loscotos.es/module/shop/img/no-normal.jpg'"/>
          </div>
        </div>
      </div>
			<button class="btn btn-primary m-1" >{{ (pelicula) ? "Actualizar": "Crear"}}</button>
      <button type="button" class="btn btn-secondary  m-1" data-bs-dismiss="modal">Cancelar</button>
		</form>
	</section>
</template>

<script lang="js">

class Pelicula{
  constructor(titulo, anio, idioma, sinopsis, genero, precio, posterUrl){
    this.titulo = titulo;
    this.anio = anio;
    this.idioma  =idioma;
    this.sinopsis = sinopsis;
    this.genero = genero;
    this.precio = precio;
    this.posterUrl = posterUrl
  }
}
import axios from 'axios';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
export default  {
  name: 'form-edit-pelicula',
  props: {
    pelicula: Object
  },
  created(){

  },
  mounted () {
    this.editPeliModal = new bootstrap.Modal('#editPeliModal');
  },
  data () {
    return {
      peli_titulo: (this.pelicula) ? this.pelicula.titulo : '' ,
      peli_anio: (this.pelicula) ? this.pelicula.anio :'',
      peli_idioma: (this.pelicula) ? this.pelicula.idioma :'',
      peli_sinopsis: (this.pelicula) ? this.pelicula.sinopsis :'',
      peli_genero:(this.pelicula) ? this.pelicula.genero : [],
      peli_precio: (this.pelicula) ? this.pelicula.precio :"",
      peli_posterurl:(this.pelicula) ? this.pelicula.posterUrl :"",
      list_idiomas:
      [
        "Castellano",
        "Inglés",
        "Italiano",
        "Francés",
        "Ruso"
      ],
      list_generos: 
      [
        'Acción',
        'Terror',
        'Suspenso',
        'Drama',
        'Romance',
        'Animacion',
        'Comedia',
        'Aventura',
        'Ciencia ficción',
        'Fantasía'
      ],
      flagError: null,
      editPeliModal: ''
    }
  },
  methods: {
    isInteger(evt) {
      evt = (evt) ? evt : window.event;
      if (/\d/.test(evt.key)) {
        return true;
      }
      else if (evt.keyCode == 8 || evt.keyCode == 9 || evt.keyCode == 13){
        return true;
      }
      else {
        evt.preventDefault();
      }
    },
    isFloat(evt) {
      evt = (evt) ? evt : window.event;
      if (/^-?\d*\.?\d*$/.test(evt.key)) {
        return true;
      }
      else if (evt.keyCode == 8 || evt.keyCode == 9 || evt.keyCode == 13 || evt.keyCode == 188){
        return true;
      }
      else {
        evt.preventDefault();
      }
    },
    submit(){
      this.flagError= false;

      this.$refs.errortitulo.innerText="";
      this.$refs.erroranio.innerText="";
      this.$refs.erroridioma.innerText="";
      this.$refs.errorsinopsis.innerText="";      
      this.$refs.errorposterurl.innerText="";
      this.$refs.errorgenero.innerText="";
      this.$refs.errorprecio.innerText="";
      
      this.$refs.titulo.classList.remove("is-invalid");
      this.$refs.anio.classList.remove("is-invalid");
      this.$refs.idioma.classList.remove("is-invalid");
      this.$refs.sinopsis.classList.remove("is-invalid");
      this.$refs.generos.forEach(genero => genero.classList.remove("is-invalid"));
      this.$refs.genero8.classList.remove("is-invalid");
      this.$refs.posterurl.classList.remove("is-invalid");
      this.$refs.precio.classList.remove("is-invalid");
      
      this.validacionesTitulo();
      this.validacionesAnio();
      this.validacionesIdioma();
      this.validacionesSinopsis();
      this.validacionesPrecio();
      this.validacionesPoster();
      this.validacionesGenero();
      // let form = document.getElementById('form1');
      // form.classList.add('was-validated');

      if (this.flagError) {
        return;
      }

      let pelicula = new Pelicula(this.peli_titulo, this.peli_anio, this.peli_idioma, this.peli_sinopsis, this.peli_genero, this.peli_precio, this.peli_posterurl);

      if(!this.pelicula){
        axios.post("https://639a6077d514150197347436.mockapi.io/cinema/peliculas", pelicula)
        .then((response) =>{
          console.log("created" + response.data);
          Object.keys(this.$data).forEach(e => { this[e]= (e == "editPeliModal" || e == "list_idiomas" || e == "list_generos")? this[e] : null; }),
          this.editPeliModal.hide();
          this.$emit("setEvent", {evento:"create", pelicula: pelicula});
        })
        .catch((err) => {
          console.error(`${err}`)
        }); 
      }
      else{
        axios.put("https://639a6077d514150197347436.mockapi.io/cinema/peliculas/"+this.pelicula.id, pelicula)
        .then((response) =>{
          console.log("created" + response.data);
          // Object.assign(this.$data, this.$options.data());
          
          this.editPeliModal.hide();
          this.$emit("setEvent", {evento:"update", pelicula: pelicula});
        })
        .catch((err) => {
          console.error(`${err}`)
        });         
      }
    },
    validacionesTitulo(){
      let min = 2;
      if(!this.peli_titulo){
        this.$refs.titulo.classList.add("is-invalid");
        this.$refs.errortitulo.innerText="Campo obligatorio";
        this.flagError = true;
        return
      }
      if(this.peli_titulo.length < min){
        this.$refs.titulo.classList.add("is-invalid");
        this.$refs.errortitulo.innerText=`Este campo debe contener al menos ${min} caracteres`;
        this.flagError = true;
      }
    },
    validacionesAnio(){
      if(!this.peli_anio){
        this.$refs.anio.classList.add("is-invalid");
        this.$refs.erroranio.innerText="Campo obligatorio";
        this.flagError = true;
        return
      }
      if(this.peli_anio < 1900){
        this.$refs.anio.classList.add("is-invalid");
        this.$refs.erroranio.innerText="El año no puede ser menor a 1900";
        this.flagError = true;
      }
      if(this.peli_anio > new Date().getFullYear()){
        this.$refs.anio.classList.add("is-invalid");
        this.$refs.erroranio.innerText="El año no puede ser mayor al actual";
        this.flagError = true;
      }
    },
    validacionesIdioma(){
      if(!this.peli_idioma){
        this.$refs.idioma.classList.add("is-invalid");
        this.$refs.erroridioma.innerText="Campo obligatorio";
        this.flagError = true;
        return
      }
    },
    validacionesSinopsis(){
      let min = 10;
      if(!this.peli_sinopsis){
        this.$refs.sinopsis.classList.add("is-invalid");
        this.$refs.errorsinopsis.innerText="Campo obligatorio";
        this.flagError = true;
        return
      }
      if(this.peli_sinopsis.length < min){
        this.$refs.sinopsis.classList.add("is-invalid");
        this.$refs.errorsinopsis.innerText=`Este campo debe contener al menos ${min} caracteres`;
        this.flagError = true;
      }
    },
    validacionesGenero(){
      if(!this.peli_genero.length){
        this.$refs.generos.forEach(genero => genero.classList.add("is-invalid"));
        this.$refs.genero8.classList.add("is-invalid");
        this.$refs.errorgenero.innerText = "Debe seleccionar al menos un género";
        this.flagError = true;
        return
      }
    },
    validacionesPrecio()
    {
      this.peli_precio = parseFloat(this.peli_precio);
      
      if(this.peli_precio === 0){
        this.$refs.precio.classList.add("is-invalid");
        this.$refs.errorprecio.innerText="El campo no puede ser cero";
        this.flagError = true;
        return
      }
      if(!this.peli_precio){
        this.$refs.precio.classList.add("is-invalid");
        this.$refs.errorprecio.innerText="Campo obligatorio";
        this.flagError = true;
        return
      }
      
    },
    validacionesPoster(){
      if(!this.peli_posterurl){
        this.$refs.posterurl.classList.add("is-invalid");
        this.$refs.errorposterurl.innerText="Campo obligatorio";
        this.flagError = true;
        return
      }
      let regex = /^(http|https):\/\/./g;
      if(!regex.test(this.peli_posterurl)) {
        this.$refs.posterurl.classList.add("is-invalid");
        this.$refs.errorposterurl.innerText="La URL debe empezar con http or https";
        this.flagError = true;
        return
      }
      regex = /^(http|https):\/\/.([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g;
      // if(! /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(this.peli_posterurl)) {
      if(! regex.test(this.peli_posterurl)) {
        this.$refs.posterurl.classList.add("is-invalid");
        this.$refs.errorposterurl.innerText="Ingrese un URL valida";
        this.flagError = true;
      }
    }
  },
  computed: {

  },
  watch:{
    pelicula(newData ){
      console.log("prop PELICULA actualiza");
      console.log(newData);
      this.peli_titulo =  (this.pelicula) ? this.pelicula.titulo : '' ;
      this.peli_anio =  (this.pelicula) ? this.pelicula.anio :'';
      this.peli_idioma =  (this.pelicula) ? this.pelicula.idioma :'';
      this.peli_sinopsis =  (this.pelicula) ? this.pelicula.sinopsis :'';
      this.peli_genero = (this.pelicula) ? this.pelicula.genero :[];
      this.peli_precio =  (this.pelicula) ? this.pelicula.precio :"";
      this.peli_posterurl = (this.pelicula) ? this.pelicula.posterUrl :"";
    }
  }
}


</script>

<style scoped >
  .form-edit-pelicula {
    border: 1px solid lightgrey;
    border-radius: 10px;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  /* input[type=number] {
    -moz-appearance: textfield;
  } */
</style>
