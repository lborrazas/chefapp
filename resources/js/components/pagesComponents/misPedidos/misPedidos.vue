<template>

    <page-template page_identification="mis-pedidos-page">
        <template slot="page-title"> Mis pedidos</template>
        <template slot="page-body">
            <div>
                <div v-for="pedido in pedidos">
                    <div class="horizontal-container flex-container container">
                        <div class="horizontal-max-content" style="display: flex; flex-direction: column;">
                            <div style="width: 100%;"><strong>Plato pedido: </strong>
                                {{pedido.platos[0].name}}
                            </div>
                            <div style="width: 65%;"><strong>Precio: </strong>{{pedido.platos[0].precio }}</div>
                        </div>
                        <div class="form-group float-right;" style="background-color: lightgoldenrodyellow; margin: 24px;">
                            <label for="formControlRange" style="font-weight: bold;">Califica el pedido:</label>
                            <input type="range" class="form-control-range" id="formControlRange">
                        </div>
                        <div @click="pedido.platos[0]._id" style="display: flex; width: 100%;">
                            <img class="float-right" :src="pedido.platos[0].photo" alt=""
                                 style="width: 100%; max-height: 75%; border: black 5px solid;">
                        </div>
                    </div>
                </div>

            </div>

        </template>
    </page-template>

</template>

<script>
    import pageComponent from "../../pageComponent.vue";

    export default {
        name: "misPedidos",

        components:{
            'page-template': pageComponent,
        },
        data(){
            return{
                pedidos:[]
            }
        },


        created() {
            eventBus.$on('cargar-pedidos',function () {
                axios.get("/api/pedido").then($response=>{
                    this.pedidos =$response.data.data
                })
            }.bind(this))
        }


    }
</script>

<style scoped>

</style>