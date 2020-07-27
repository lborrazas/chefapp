<template>
    <div>

        <keen-modal ref="modal" title="Carrito">

                <div v-if="carrito.length===0">Carrito vacio</div>
                <div v-else>
                    <div style="overflow: auto">
                        <div v-for="dish in carrito" :id=dish._id> {{dish.name}} - {{dish.price}} $</div>
                    </div>

                    <div class="flex-container">
                        <div style="margin-right: 25%">Total: {{total}}$</div>
                        <button style="margin-left:25% " v-if="carrito.length>0"
                                @click="emptyCarrito">Limpiar Carrito
                        </button>
                    </div>

                <div style="height: 30px; position: relative">
                    <button  style="position: absolute; bottom: 0; right: 0;" class="btn btn-app-red" @click="comprar">Comprar</button>
                </div>
                </div>
        </keen-modal>
        <keen-modal ref="creditoModal">
            <div>
                <div>Tarjeta de credito
                    <div>
                        <input type="number" style="background-color: #999999" v-model="tarjetacredito">
                    </div>
                </div>
                <div>
                    Monto Total: ${{total}}
                </div>

                <button class="btn btn-app-red"  v-if="tarjetacredito" v-on:click="realizar_pedido"> pealizar Pedido</button>

            </div>
        </keen-modal>
    </div>

</template>

<script>

    import {UiModal, UiButton} from "keen-ui";
    import 'keen-ui/dist/keen-ui.css';

    export default {
        name: "carritoComponent",
        data() {
            return {
                tarjetacredito:"",
            }
        },
        components: {
            'keen-modal': UiModal,
            'button-keen': UiButton,
        },
        methods:{
            comprar(){
                this.$refs['modal'].close()
                this.$refs['creditoModal'].open()

            },
            realizar_pedido(){
                alert("compre")
                let data = {platos: this.$store.state.carrito}
                axios.post("/api/pedido",data).then(
                    response=>{
                        this.$refs['creditoModal'].close
                    }
                )
            },
            emptyCarrito(){
                this.$store.commit('emptyCarrito')
            }
        },
        computed: {
            total(){
                let $total = 0;
                if(this.carrito.length > 0)
                    $total = this.$store.state.carrito.map(item => item.precio).reduce((prev, next) => prev + next);
                return $total;
            },
            carrito(){
                return this.$store.state.carrito;
            }

        }


    }
</script>

<style scoped>


</style>