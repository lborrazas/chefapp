export default ({
    data() {
        return {
            carrito: [],
            total: 0,
            carritov2: {
                items: [],
                total: 0
            }
        }
    },
    methods: {
        openModal(){
            this.$refs[laid].open()
        },
        agregaracarrito(args) {
            this.total = this.total + args[2]
            this.carrito.push([args[0], args[1], args[2]]) //nombre-id-precio
        },
        emptyCarrito() {
            this.carrito = []
            this.total = 0;
        },
        buyItems() {
            console.log(this.carrito)
            let data = this.carrito
            axios.post("/api/pedido/" + this.idUsuario, data).then(response => {
                this.carrito = []
                this.total = 0;
                this.$refs['modal'].close()
            })
            //
        },
    },
    mounted() {
    },
    computed: {}
});