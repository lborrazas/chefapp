window.Vue = require('vue')
window.axios = require('axios')
window.Noty = require('noty');

import 'noty/lib/noty.css'; //css manually for webpack :)
import 'noty/lib/themes/mint.css'; // css manually for webpack :)

import Vuex from 'vuex'
import VueCroppie from "vue-croppie";
import 'croppie/croppie.css' //css manually for webpack :)
Vue.use(Vuex)
Vue.use(VueCroppie)



window.eventBus = new Vue;


const store = new Vuex.Store({
    state: {
        count: 0,
        carrito: [],
        user: {},
    },
    mutations: {
        increment(state) {
            state.count++
        },
        addCarrito(state, payload) {
            state.carrito.push(payload.dish);
        },
        removeCarrito(state, payload) {
            //not so efficent but it is smol so its ok, i wanted to keep same array on fear of reactivity
            index = state.carrito.map(function (item) {
                return item._id
            }).indexOf(payload.id);
            state.carrito.splice(index);
        },
        emptyCarrito(state){
            state.carrito = [];
        },
    }
})


Vue.component('first-component', require('./components/firstComponent.vue').default);
Vue.component('tab-bar-compnent', require('./components/tabBarComponent.vue').default);
Vue.component('mui-panel-component', require('./components/muiPanelComponent.vue').default);
Vue.component('mui-page-component', require('./components/pageComponent.vue').default);
Vue.component('chef-page-component', require('./components/pagesComponents/paginaDelChef/chefPage.vue').default);
Vue.component('login-page-component', require('./components/pagesComponents/login/loginPage.vue').default);
Vue.component('forgot-page-component', require('./components/pagesComponents/login/forgotPage.vue').default);
Vue.component('register-page-component', require('./components/pagesComponents/login/registerPage.vue').default);
Vue.component('home-page-component', require('./components/pagesComponents/home/homePage.vue').default);
Vue.component('product-page-component', require('./components/pagesComponents/home/homePage.vue').default);
Vue.component('profile-page-component', require('./components/pagesComponents/profilePage/profilePage.vue').default);
Vue.component('dish-page-component', require('./components/pagesComponents/paginaDish/paginaDish.vue').default);
Vue.component('createdish-page-component', require('./components/pagesComponents/crearPlato/createDish.vue').default);
Vue.component('weekdish-page-component', require('./components/pagesComponents/weekDish/weekDish.vue').default);
Vue.component('chef-option-page-component', require('./components/pagesComponents/chefOptions/chefOptions.vue').default);
Vue.component('carrito-component', require('./components/coreComponents/carritoComponent.vue').default);
Vue.component('start-page-component', require('./components/pagesComponents/startPage/startPageComponent.vue').default);
Vue.component('week-v2-component', require('./components/pagesComponents/weekDish/weekDishV2.vue').default);
Vue.component('pedidos-component', require('./components/pagesComponents/misPedidos/misPedidos.vue').default);
Vue.component('activity-page-component', require('./components/pagesComponents/actPage/activity.vue').default);

import weekDish from "../../resources/js/components/pagesComponents/weekDish/weekDish.vue";
import paginaDish from "./components/pagesComponents/paginaDish/paginaDish.vue";
import {UiModal, UiButton} from "keen-ui";
import 'keen-ui/dist/keen-ui.css';
import authMixin from './mixins/auth.js'
import sessionMixin from "./mixins/session.js";

const app = new Vue({
    el: '#app',
    store,
    data: {},
    methods: {

        cargarDish(clave) {
            axios.get('api/dishes/' + clave).then($response => {
                this.elplato = $response.data[0]

                axios.get("/api/usuarios/name/" + this.elplato.chef).then(response => {
                    this.nombrechef = response.data[0].user
                })
                axios.get("/api/plato/review/" + this.elplato._id).then(response => {
                    console.log(response.data)
                    console.log(this.elplato._id)
                    this.elplatoreviews = response.data
                })
            })
        },

    },
    computed: {},
    mounted() {
    },
    created(){
       /* eventBus.$on('eventBushEmission', function () {
            alert('hola');
        }.bind(this));*/
    },
    mixins: [authMixin, sessionMixin],

})

