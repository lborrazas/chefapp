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
                                @click="$store.commit('emptyCarrito')">Limpiar Carrito
                        </button>
                    </div>

                <div style="height: 30px; position: relative">
                    <button  style="position: absolute; bottom: 0; right: 0;" class="btn btn-app-red" @click="this.$emit('buy-items-event')">Comprar</button>
                </div>
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
                hola: 'chau',
            }
        },
        components: {
            'keen-modal': UiModal,
            'button-keen': UiButton,
        },
        computed: {
            total(){
                let $total = 0;
                if(this.carrito.length > 0)
                    $total = this.$store.state.carrito.map(item => item.price).reduce((prev, next) => prev + next);
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