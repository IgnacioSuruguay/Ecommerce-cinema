<template >

  <section class="list-peliculas container">
    <h1>Peliculas</h1>

        <table class="table table-light table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Película</th>
            <th>Año</th>
            <th>Idioma</th>
            <th>Genero</th>
            <th>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editPeliModal" @click="targetEdit = null" >
                <font-awesome-icon icon="fa-solid fa-plus" />  Nuevo
              </button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pelicula, index) in getProductos()" :key="index">
            <td>{{index+1}}</td>
            <td>{{pelicula.titulo}}</td>
            <td>{{pelicula.anio}}</td>
            <td>{{pelicula.idioma}}</td>
            <td>{{pelicula.genero.join("/")}}</td>
            <td>
              <button class="btn btn-outline-danger mx-1" @click="targetEdit= pelicula" data-bs-toggle="modal" data-bs-target="#deletePeliModal">
                <font-awesome-icon icon="fa-regular fa-trash-can" />
              </button>
              <button class="btn btn-outline-success mx-1" data-bs-toggle="modal" data-bs-target="#editPeliModal" @click="targetEdit= pelicula">
                <font-awesome-icon icon="fa-regular fa-pen-to-square" />
              </button>
            </td>
          </tr>
          <tr v-if="getProductos() == null">
            <td colspan="7">Cargando</td>
          </tr>
          <tr v-else-if="getProductos().length == 0">
            <td colspan="7">No hay peliculas disponibles</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Modal edit -->
      <div class="modal fade modal-lg" id="editPeliModal" tabindex="-1" ref="editPeliModal" aria-labelledby="editPeliModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">            
            <FormPelicula ref="FormPelicula" :pelicula="targetEdit" @setEvent="displayToast($event)"></FormPelicula>
          </div>
        </div>
      </div>      

      <!-- Modal delete -->
      <div class="modal fade" id="deletePeliModal" ref="deletePeliModal" tabindex="-1" aria-labelledby="deletePeliModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminación</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ¿Seguro que deseas eliminar la pelicula <strong>{{ (targetEdit)?targetEdit.titulo: "" }}</strong>?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="EliminarPelicula()" >Confirmar</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
        <div id="ABMtoast" ref="ABMtoast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" >
          <div class="toast-header text-white" :class="toastBkgn">
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body" v-html="toastMsg">            
          </div>
        </div>
      </div>
  </section>

</template>

<script lang="js">

import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import FormPelicula from './FormPelicula.vue';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
  export default  {
    name: "list-peliculas",
    props: [],
    created() {
      this.$store.dispatch('getProductosAction');
      this.list_peliculas = this.getProductos();     
    },
    mounted() {
      this.deletePeliModal = new bootstrap.Modal('#deletePeliModal');
      this.$refs.editPeliModal.addEventListener("hidden.bs.modal", event=>{
        const FormPelicula = event.target.parentElement.__vue__.$refs.FormPelicula;
        const ThisComponent = event.target.parentElement.__vue__;

        ThisComponent.targetEdit = null;
        
        FormPelicula.$refs.errortitulo.innerText="";
        FormPelicula.$refs.erroranio.innerText="";
        FormPelicula.$refs.erroridioma.innerText="";
        FormPelicula.$refs.errorsinopsis.innerText="";      
        FormPelicula.$refs.errorposterurl.innerText="";
        FormPelicula.$refs.errorprecio.innerText="";

        FormPelicula.$refs.titulo.classList.remove("is-invalid");
        FormPelicula.$refs.anio.classList.remove("is-invalid");
        FormPelicula.$refs.idioma.classList.remove("is-invalid");
        FormPelicula.$refs.sinopsis.classList.remove("is-invalid");
        FormPelicula.$refs.generos.forEach(genero => genero.classList.remove("is-invalid"));
        FormPelicula.$refs.genero8.classList.remove("is-invalid");
        FormPelicula.$refs.posterurl.classList.remove("is-invalid");
        FormPelicula.$refs.precio.classList.remove("is-invalid");
        // this.toast.show()
        let trigger = (this.flagUpdate)?"update": false;
        trigger = (trigger == false && this.flagCreate)? "create": false;
        // trigger = (trigger == false && this.flagDelete)? "delete": false;

        this.displayToast({evento: trigger, pelicula: this.targetEdit});
      })
      this.$refs.deletePeliModal.addEventListener("hidden.bs.modal", ()=>{
        if(this.flagDelete ){
          let trigger =  "delete";
          this.displayToast({evento: trigger, pelicula: this.targetEdit});
        }
      })
      
      const toast = this.$refs.ABMtoast;
      this.toast = new bootstrap.Toast(toast);
      toast.addEventListener('hidden.bs.toast', function () {
        
        this.toastMsg = "";
        this.flagUpdate= false;
        this.flagCreate= false;
        this.flagDelete= false;
        this.toastBkgn= "";
      })
    },
    data() {
        return {
            list_peliculas: this.getProductos(),
            targetEdit: null,
            toastMsg: "",
            toast: "",
            flagUpdate: false,
            flagCreate: false,
            flagDelete: false,
            toastBkgn:""
        };
    },
    methods: {
      ...mapActions(['getProductosAction']),
      ...mapGetters(["getProductos"]),
      EliminarPelicula() {
          const idToDelete =this.targetEdit.id;
          const deleteURL = "https://639a6077d514150197347436.mockapi.io/cinema/peliculas" + "/" + idToDelete;
              this.toastMsg = `<strong>${this.targetEdit.titulo}</strong> ha sido eliminado.`;


          axios.delete(deleteURL)
            .then((response) => {
              console.table(response.data);
              this.list_peliculas = this.list_peliculas.filter(e => e.id != idToDelete);
              this.deletePeliModal.hide();
              this.flagDelete = true;
              this.$store.dispatch('getProductosAction');

            })
            .catch((err) => {
              console.error(`${err}`);
              this.deletePeliModal.hide();
              this.flagDelete = true;
            });
      },
      displayToast(dataObj){
        
        switch (dataObj.evento) {
          case "update":
              this.toastMsg = `La película <strong>${dataObj.pelicula.titulo}</strong> ha sido actualida.`;
              this.toastBkgn = "bg-success bg-gradient";
              this.flagUpdate = false;
              this.toast.show();              
              this.$store.dispatch('getProductosAction');
              this.list_peliculas = this.getProductos();
            break;
          case "create":
              this.toastMsg = `La película <strong>${dataObj.pelicula.titulo}</strong>. ha sido creada.`;
              this.toastBkgn = "bg-primary bg-gradient"
              this.flagCreate = false;
              this.toast.show();              
              this.$store.dispatch('getProductosAction');
              this.list_peliculas = this.getProductos();
              break;
          case "delete":
              this.toastMsg = `La película <strong>${dataObj.pelicula.titulo}</strong> ha sido eliminada.`;
              this.toastBkgn = "bg-danger bg-gradient"
              this.flagDelete = false;
              this.toast.show();              
              this.$store.dispatch('getProductosAction');
              this.list_peliculas = this.getProductos();
            break;
        
          default:
            break;
        }
      }
    },
    computed: {},
    components: { FormPelicula }
}


</script>

<style scoped>
  .list-peliculas{
    border: 1px solid lightgrey;
    border-radius: 10px;
    background-color: white;
  }
  th{
    vertical-align: baseline;
  }
</style>
