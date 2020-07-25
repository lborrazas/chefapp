<template>
    <div>

    <keen-modal  ref="modal" title="Carrito">

        <div>
            <div v-if="carrito.length===0">Carrito vacio</div>
            <div v-else></div>
            <div style="overflow: auto">
                <div v-for="dish in carrito" :id=dish[1] > {{dish[0]}}      -{{dish[2]}} $ </div>
            </div>

            <div class="flex-container"><div style="margin-right: 25%">Total: {{total}}$</div><button style="margin-left:25% " v-if="carrito.length>0" @click="this.$emit('empty-carrito-event)')">Limpiar Carrito</button>
            </div>
            <button @click="this.$emit('buy-items-event')">Comprar</button>
        </div>


    </keen-modal>

    </div>

</template>

<script>

    import {UiModal, UiButton} from "keen-ui";
    import 'keen-ui/dist/keen-ui.css';

    export default {
        name: "carritoComponent",
        data(){
            return {
                hola: 'chau',
            }
        },
        props: {
            carrito: {
                type: Array,
                default: () => ([
                ])
            },
            total: {
                type: Number,
                default:0
            }
        },
        components: {
            'keen-modal': UiModal,
            'button-keen': UiButton,
        },



    }
</script>

<style scoped>

</style>