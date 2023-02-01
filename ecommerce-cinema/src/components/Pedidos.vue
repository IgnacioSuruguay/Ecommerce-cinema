<template >

  <section class="carrito container">
    <h1>Pedidos</h1>

    <table class="table table-light table-striped">
      <thead>
        <tr>
          <th>ID Pedido</th>
          <th>Usuario ID</th>
          <th>Peliculas</th>
          <th>Total</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getPedidos()" :key="index" >
          <td>{{item.id}}</td>
          <td>{{item.user}}</td>
          <td>{{item.peliculas.map(e => e.titulo).join(" / ") }}</td>
          <td>${{item.costoFinal}}</td>
          <td>{{item.estado}}</td>
          <td><button class="btn" :class="(item.estado == 'Entregado')? 'disabled btn-secondary' : 'btn-primary'"  @click="entregar(item)" >Entregar</button></td>
        </tr>
        <tr v-if="$store.state.pedidos == null">
          <td colspan="7">Cargando ...</td>
        </tr>
        <tr v-else-if="$store.state.pedidos.length == 0">
          <td colspan="7">No hay elementos seleccionados</td>
        </tr>
      </tbody>
    </table>
  </section>

</template>

<script lang="js">
  import axios from 'axios';
  import { mapActions, mapGetters } from 'vuex';
  export default  {
    name: 'pedidos',
    props: [],
    created(){
      console.log("calling getProductosAction");
      // axios.get("https://639a6077d514150197347436.mockapi.io/cinema/pedidos")
      // .then((response) => {
      //   console.table(response.data);
      //   this.pedidos = response.data;
      // })
      // .catch((err) => { console.error(`error get pedidos: ${err}`); });
      this.$store.dispatch('getPedidosAction');

    },
    mounted () {

    },
    data () {
      return {
        pedidos : [],
      }
    },
    methods: {
      ...mapActions(["getPedidosAction"]),
      ...mapGetters(["getPedidos"]),
      entregar(item){
        if(item.estado == "Entregado") return
        
        item.estado = "Entregado";
      
        axios.put("https://639a6077d514150197347436.mockapi.io/cinema/pedidos/"+item.id, item)
        .then((response) =>{
          console.log("updated" + response.data);
          Object.assign(this.$data, this.$options.data());
          localStorage.removeItem("carrito");
          this.carrito = [];
        })
        .catch((err) => {
          console.error(`${err}`)
        });
      }
    },
    computed: {
      obtenerTitulos(arr_peliculas){
        
        console.log(arr_peliculas);
        return "a"
      }
    }
}


</script>

<style scoped>
  .carrito {
    border: 1px solid lightgrey;
    border-radius: 10px;
    background-color: white;
  }
  .btn.disabled:hover{
    cursor:not-allowed;
  }
</style>
