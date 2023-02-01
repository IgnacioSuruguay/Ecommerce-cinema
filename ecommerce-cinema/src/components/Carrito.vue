<template >

  <section class="carrito container">
    <h1>Carrito</h1>
    <p class="text-start blockquote-footer mt-3" >
      Recordá que podés compartir el link de la película con tus amigos hasta 3 veces por un costo adicional (%30).
    </p>
    <table class="table table-light table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Película</th>
          <th>Género</th>
          <th>Precio unitario</th>
          <th>Compartir</th>
          <th>Sub Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in carrito" :key="index" >
          <td>{{index + 1}}</td>
          <td>{{item.titulo}}</td>
          <td>{{item.genero.join(" / ")}}</td>
          <td>${{item.precio}}</td>
          <td >
            <button class="btn btn-sm rounded-circle bg-secondary bg-gradient bg-opacity-25 m-auto" @click="(item.dias > 0)? item.dias-- : 0">
              <font-awesome-icon icon="fa-solid fa-minus" />
            </button>
            <span class="m-2">{{ item.dias }}</span>
            <button class="btn btn-sm rounded-circle bg-secondary bg-gradient bg-opacity-25 m-auto" @click="(item.dias < 3)? item.dias++ : 3">
              <font-awesome-icon icon="fa-solid fa-plus"/>
            </button>
          </td>
          <td>${{ calcularSubTotal(item)}}</td>
          <td><button class="btn btn-secondary"  @click="Quitar(item)" >Quitar</button></td>
        </tr>
        <tr v-if="carrito.length == 0">
          <td colspan="7">No hay elementos seleccionados</td>
        </tr>
      </tbody>
      <tfoot  v-if="carrito.length > 0">
        <tr>
          <td colspan="4"></td>
          <td><strong>Total</strong></td>
          <td><strong>${{calcularTotal}}</strong></td>
          <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalConfirm" >Finalizar compra</button></td>
        </tr>
      </tfoot>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="modalConfirm" ref="modalConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalConfirmLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalConfirmLabel">Confirmar</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ¿Está seguro que desea finalizar la compra?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"  @click="FinalizarCompra()" >Confirmar</button>
            <button type="button" class="btn btn-secondary" ref="modal-close" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
      <div id="toastCreate" ref="toastCreate" class="toast" role="alert" aria-live="assertive" aria-atomic="true" >
        <div class="toast-header text-white bg-primary bg-gradient" >
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div> 
        <div class="toast-body">El pedido fue enviado exitosamente</div>
      </div>
    </div>
  </section>

</template>

<script lang="js">
  import axios from 'axios';
  import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
  export default  {
    name: 'carrito',
    props: [],
    created(){
      axios.get("https://639a6077d514150197347436.mockapi.io/cinema/peliculas")
      .then((response) => {
        // console.table(response.data);
        this.list_peliculas = response.data;
      })
      .catch((err) => { console.error(`${err}`); });
    },
    mounted () {
      const toastCreate = this.$refs.toastCreate;
      this.toastCreate = new bootstrap.Toast(toastCreate);
      this.modal = new bootstrap.Modal('#modalConfirm');
    },
    data () {
      return {
        carrito : JSON.parse( localStorage.getItem("carrito")) || [],
        toastCreate: null,
      }
    },
    methods: {
      calcularSubTotal(item){
        let precio = parseFloat(item.precio);
        let veces = item.dias;
        return  (precio +(precio*0.30)*veces).toFixed(2);
      },
      Quitar(item){
        let newCarrito = this.carrito.filter((e)=> e.id !== item.id);
        this.carrito = newCarrito;
        localStorage.setItem("carrito", JSON.stringify(this.carrito));


      },
      async FinalizarCompra(){
        let p = [];
        this.carrito.forEach(e => {
          p.push({
            id_pelicula : e.id,
            titulo : e.titulo,
            precio : e.precio,
            compartir: e.dias
          });
        });
  
        let pedido = {
          user: this.$store.state.user.id,
          peliculas: p,
          costoFinal: this.calcularTotal,
          estado: "pendiente"
        };
        await axios.post("https://639a6077d514150197347436.mockapi.io/cinema/pedidos", pedido)
        .then((response) =>{
          console.log("created" + response.data);
          localStorage.removeItem("carrito");
          this.carrito = [];
          this.modal.hide();
          this.toastCreate.show();
        })
        .catch((err) => {
          console.error(`${err}`)
        });
        
      }
    },
    computed: {
      calcularTotal(){
        let total = 0;
        this.carrito.forEach(e => total += parseFloat(this.calcularSubTotal(e)));
        return total;
      }
    },
    watch: {
    }
}


</script>

<style scoped>
  .carrito {
    border: 1px solid lightgrey;
    border-radius: 10px;
    background-color: white;
  }
</style>
