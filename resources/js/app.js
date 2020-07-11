window.Vue = require('vue')

Vue.component('first-component', require('./components/firstComponent.vue').default);


const app = new Vue({
    el: '#app',
    data: {
        simple: '',
    },
    methods: {},
    mounted() {
    },
})

