

window.Vue = require('vue')
window.axios = require('axios')

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

import weekDish from "../../resources/js/components/pagesComponents/weekDish/weekDish.vue";
import paginaDish from "./components/pagesComponents/paginaDish/paginaDish.vue";
import {UiModal, UiButton} from "keen-ui";
import 'keen-ui/dist/keen-ui.css';
import authMixin from './mixins/auth.js';

const app = new Vue({
    el: '#app',
    data: {
        idUsuario:"5f1a45e1142ba0d5fd62eb58",//--
        esChef:true,//--
        carrito:[],
        total:0,
        platoide:[],
        elplato:[],
        nombrechef:[],
        leprofile:[],
        leprofilereviews:[],
        elplatoreviews:[],
        subioSemanal:false, //--
        estasubscrito:false,
    },
    methods: {
        agregaracarrito(args){

            this.total=this.total+args[2]
            this.carrito.push([args[0],args[1],args[2]]) //nombre-id-precio
        },
        abrir(laid){
            this.$refs[laid].open()
        },
        sacardish(){
            this.carrito=[]
            this.total=0;
        },
        comprar(){
            console.log(this.carrito)
                let data=this.carrito
                axios.post("/api/pedido/"+this.idUsuario,data).then(response =>{
                    this.carrito=[]
                    this.total=0;
                    this.$refs['modal'].close()
                })
                //
            }
            ,
        goprofile(calveChef){

            axios.get('api/profile/review/'+calveChef).then($response => {
                    console.log($response.data)
                    this.leprofilereviews=$response.data
            })
            axios.get('api/profile/'+calveChef).then($response => {
                this.leprofile=$response.data[0]
                axios.get('api/issubscibed/'+this.leprofile._id+"/"+this.idUsuario).then($response => {
                    console.log($response)
                    this.estasubscrito=$response.data

                })
            })
        },
        cargarDish(clave){
            axios.get('api/dishes/'+clave).then($response => {
                this.elplato=$response.data[0]

                axios.get("/api/usuarios/name/"+this.elplato.chef).then(response =>{
                    this.nombrechef = response.data[0].user
                })
               axios.get("/api/plato/review/"+this.elplato._id).then(response =>{
                   console.log(response.data)
                   console.log(this.elplato._id)
                    this.elplatoreviews = response.data
                })
            })
        },
        cargarforweek(args){

            let auxiliar =null
            axios.get("/api/platosporidchef/"+args).then(response =>{
                this.platoide=response.data
            })
        }
    },
    computed:{

    },
    mounted() {
    },
    components:{
        'modal-two': UiModal,
        'button-keen':UiButton,
    },
    mixins: [authMixin],

})

