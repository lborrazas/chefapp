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
Vue.component('profile-page-component', require('./components/pagesComponents/ProfilePage/profilePage.vue').default);
Vue.component('dish-page-component', require('./components/pagesComponents/paginaDish/paginaDish.vue').default);
Vue.component('createdish-page-component', require('./components/pagesComponents/crearPlato/createDish.vue').default);
Vue.component('weekdish-page-component', require('./components/pagesComponents/weekDish/weekDish.vue').default);


import {UiModal, UiButton} from "keen-ui";
import 'keen-ui/dist/keen-ui.css';
import authMixin from './mixins/auth.js'
import muiChangePageEvent from "./functions/muiChangePageEvent.js"

const app = new Vue({
    el: '#app',
    data: {
        simple: '',
        clave:"",
        carrito:[],
        total:0,

        auxarray:["","",],
        idsolutions:0
    },
    methods: {
        agregaracarrito(args){
            console.log(args[2])
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
            for (let i=0;i<this.carrito;i++){
                axios.post("/appi/pedido"+this.carrito[i][1],"Total:"+this.total+",Cliente:"+this.clave)
                //
            }
        }
    },
    computed:{
        idsolution(){
            var i=0
            var j=0
            for(;i<this.carrito.length;i++){
                for(;j<this.carrito.length;j++){
                    if (this.carrito[j][1]==this.carrito[i][1]){
                        this.carrito[j][1]=this.carrito[j][1]+this.idsolutions
                        this.idsolutions++
                    }
                }
            }
        }
    },
    mounted() {
        muiChangePageEvent('login-page')
    },
    components:{
        'modal-two': UiModal,
        'button-keen':UiButton,
    },
    mixins: [authMixin],

})

