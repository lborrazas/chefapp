window.Vue = require('vue')

Vue.component('first-component', require('./components/firstComponent.vue').default);

Vue.component('tab-bar-compnent', require('./components/tabBarComponent.vue').default);
Vue.component('mui-panel-component', require('./components/muiPanelComponent.vue').default);
Vue.component('mui-page-component', require('./components/pageComponent.vue').default);
Vue.component('chef-page-component', require('./components/pagesComponents/paginaDelChef/chefPage.vue').default);
Vue.component('profile-page-component', require('./components/pagesComponents/ProfilePage/profilePage.vue').default);
Vue.component('dish-page-component', require('./components/pagesComponents/paginaDish/paginaDish.vue').default);
const app = new Vue({
    el: '#app',
    data: {
        simple: '',
        carrito:[],
    },
    methods: {
        agregaracarrito(nombre,id,precio){
            this.carrito.push(nombre+" - "+precio+"$")
        }
    },
    mounted() {
    },

})

