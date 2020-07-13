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
Vue.component('profile-page-component', require('./components/pagesComponents/ProfilePage/profilePage.vue').default);
Vue.component('dish-page-component', require('./components/pagesComponents/paginaDish/paginaDish.vue').default);
Vue.component('createdish-page-component', require('./components/pagesComponents/crearPlato/createDish.vue').default);


import {UiModal, UiButton} from "keen-ui";
import 'keen-ui/dist/keen-ui.css';
import authMixin from './mixins/auth.js'

const app = new Vue({

    el: '#app',
    data: {
        simple: '',
        carrito:[],
        total:0,
        variableFor:0,
        auxarray:["","",]
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
        sacardish(laid,precio){
            console.log(laid)
            console.log(document.getElementById(laid))
            this.total=this.total-precio;
            document.getElementById(laid).parentNode.removeChild(document.getElementById(laid))
            while (this.variableFor<this.carrito.length){
              //  if(this.carrito[this.variableFor][1]==laid){
              //     this.auxarray
              //  }
                this.variableFor++
            }
            this.variableFor=0
            this.carrito.pop()
        }
    },
    mounted() {
    },
    components:{
        'modal-two': UiModal,
        'button-keen':UiButton,
    },
    mixins: [authMixin],

})

