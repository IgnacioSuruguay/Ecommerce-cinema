import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse( localStorage.getItem("user")),
    productos: null,
    pedidos: null,
  },
  getters: {
    /* Getters usuarios*/
    getUser(state){
      return state.user;
    },
    esAdministrador(state){
      return (state.user)? state.user.esAdmin : null;
    },
    getNombre(state){
      return (state.user)? state.user.nombre : null;
    },
    /* getters productos*/
    getProductos(state){
      return state.productos;
    },
    getPedidos(state){
      return state.pedidos;
    },
  },
  //setters.
  mutations: {
    setUser(state, usuario){
      state.user = usuario;
    },
    setProductos(state, data){
      state.productos = data;
    },
    setPedidos(state, data){
      state.pedidos = data;
    },
  },
  //metodo publico que invoca a los setters
  actions: {
    getProductosAction({commit}){
      console.log("getProductosAction being");
      const peliculasEndPoint = "https://639a6077d514150197347436.mockapi.io/cinema/peliculas";
        axios.get(peliculasEndPoint)
        .then((response) => {
          commit('setProductos',response.data);
          localStorage.setItem("productos", JSON.stringify(response.data));
        })
        .catch((err) => { 
          console.error(`${err}`); 
          let data = [
            {
                "titulo": "IT chapter one",
                "anio": "2017",
                "sinopsis": "Varios niños de una pequeña ciudad del estado de Maine se alían para combatir a una entidad diabólica que adopta la forma de un payaso y desde hace mucho tiempo emerge cada 27 años para saciarse de sangre infantil.",
                "genero": [
                    "Terror",
                    "Suspenso"
                ],
                "precio": "50",
                "posterUrl": "https://http2.mlstatic.com/D_NQ_NP_809718-MLA41881336198_052020-O.jpg",
                "idioma": "Inglés",
                "id": "3"
            },
            {
                "titulo": "Doctor Sleep",
                "anio": "2019",
                "sinopsis": "Dan, alcohólico y traumatizado por lo que le pasó siendo un niño en el hotel Overlook, conoce a Abra, una adolescente que posee el mismo don que él. Dan tratará de salvar a Abra de un grupo de siniestros personajes que ansían la inmortalidad y aspiran alcanzarla alimentándose de los poderes psíquicos de gente como ellos.",
                "genero": [
                    "Acción",
                    "Terror",
                    "Suspenso"
                ],
                "precio": "33.3",
                "posterUrl": "https://m.media-amazon.com/images/M/MV5BYmY3NGJlYTItYmQ4OS00ZTEwLWIzODItMjMzNWU2MDE0NjZhXkEyXkFqcGdeQXVyMzQzMDA3MTI@._V1_.jpg",
                "idioma": "Inglés",
                "id": "4"
            },
            {
                "titulo": "Hellraiser",
                "anio": "2022",
                "sinopsis": "Una joven debe enfrentarse a las fuerzas sádicas y sobrenaturales que hay detrás de una enigmática caja rompecabezas responsable de la desaparición de su hermano.",
                "genero": [
                    "Terror"
                ],
                "precio": "100",
                "posterUrl": "https://www.themoviedb.org/t/p/original/um4z72Zv0doAgzTWsHfqYFJkpv6.jpg",
                "idioma": "Inglés",
                "id": "5"
            }
        ];
          commit('setProductos',data);
          localStorage.setItem("productos", JSON.stringify(data));
        });
        console.log("getProductosAction end");

    },
    getPedidosAction({commit}){
        const pedidosEndPoint = "https://639a6077d514150197347436.mockapi.io/cinema/pedidos";
          axios.get(pedidosEndPoint)
          .then((response) => {
            commit('setPedidos',response.data);
            localStorage.setItem("pedidos", JSON.stringify(response.data));
          })
          .catch((err) => { console.error(`${err}`); });
    }
  },
  modules: {
  }
})
