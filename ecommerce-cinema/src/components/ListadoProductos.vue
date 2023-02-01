<template>
  <section class="listado-productos container">
    <!-- <h1>Peliculas</h1> -->
    <div class="row">
      <div class="col-3" v-for="(pelicula, index) in getProductos()" :key="index" :ref="'peli-item-'+pelicula.id ">
        <div class="card item" :class="{'agregado': inCart(pelicula)}">
          <img :src="pelicula.posterUrl" class="card-img-top" alt="..." loading="lazy">
          <div class="card-body">
            <h5 class="card-title"><strong>{{pelicula.titulo}}</strong></h5>
            <p class="card-text">{{pelicula.genero.join(" - ")}}</p>
            <p class="list-group-item">${{pelicula.precio}}</p>
            <div>
              <button  v-if="$store.getters.getUser && !$store.getters.esAdministrador" class="btn m-1 btn-agregar" 
                :class="(!inCart(pelicula))?'btn-primary': 'btn-secondary disabled'" 
                @click="AgregarAlCarrito(pelicula)">
                {{ (!inCart(pelicula))? "Agregar": "Agregado" }}
              </button>
              <button class="btn btn-secondary m-1" @click="targetDetalle = pelicula " data-bs-toggle="modal" data-bs-target="#detalleModal">Info</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if=" getProductos() == null" class="alert alert-light" role="alert">
        Cargando ...
      </div>
      <div v-else-if="getProductos().length == 0" class="alert alert-light" role="alert">
        no hay productos cargados en el sistema
      </div>
    </div>
      <!-- Modal -->
      <div class="modal fade modal-lg" id="detalleModal" tabindex="-1" ref="detalleModal" aria-labelledby="detalleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <InfoProducto :pelicula="targetDetalle" @agregar="AgregarAlCarrito($event)" :agregado="((targetDetalle == null)? null : inCart(targetDetalle))" ></InfoProducto>
          </div>
        </div>
      </div>
  </section>

</template>

<script lang="js">
  // import {Pelicula} from "../class"
  import { mapActions, mapGetters } from 'vuex';
  import InfoProducto from './InfoProducto.vue';

  export default  {
    name: "listado-productos",
    props: [],
    created () {
      console.log("calling getProductosAction");
      // this.getProductosAction();
      this.$store.dispatch('getProductosAction');
      console.log("called getProductosAction");
    },
    mounted() {},
    data() {
        return {
            targetDetalle: null,
            pelisCarrito: JSON.parse(localStorage.getItem("carrito"))||[]
        };
    },
    methods: {
      ...mapActions(['getProductosAction']),
      ...mapGetters(["getProductos"]),
        AgregarAlCarrito(el) {
          
          this.$refs["peli-item-"+el.id][0].querySelector(".card.item").classList.add("agregado");
          window.event.target.classList.toggle("btn-primary");
          window.event.target.classList.toggle("btn-secondary");
          window.event.target.classList.add("disabled");
          window.event.target.innerText = "Agregado"
          let arr_carrito = [];
            // let item = {
            //   id_pelicula : el.id,
            //   precio : el.precio,
            //   dias: 1
            // }
            let item = el;
            item.dias = 0;
            let storage_carrito = localStorage.getItem("carrito");
            if (storage_carrito) {
                arr_carrito = JSON.parse(storage_carrito);
            }            
            let indexPeli = arr_carrito.findIndex((item) => item.id == el.id);
            if (indexPeli != -1) {
                arr_carrito[indexPeli].dias += 1;
            }
            else {
                arr_carrito.push(item);
            }
            localStorage.setItem("carrito", JSON.stringify(arr_carrito));
            this.pelisCarrito =arr_carrito;
        },
      inCart(pelicula){        
        return this.pelisCarrito.some( e => e.id == (pelicula|| false).id);
      }
    },
    computed: {},
    components: { InfoProducto }
}


</script>

<style scoped>
  .listado-productos ul{
    display: flex;
  }
  .listado-productos ul li{
    display: inline-flex;
  }
  .card.item.agregado{
  transition: all 1s;
  position: relative;
  }
  .card.item.agregado{
    content: "Agregado";
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    /* font-weight: bold;
    position: absolute; */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 5px;
    transition: all 1s;
  }
  .card.item.agregado img{
    filter: grayscale(1);
    transition: all 1s;
  }
  .card.item .btn-primary{
    transition: all 1s;
  }

</style>
