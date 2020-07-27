<template>

        <page-template page_identification="mis-pedidos-page">
            <template slot="page-title"> Mis pedidos</template>
            <template slot="page-body">
                <div>
                    <div v-for="pedido in pedidos">
                        <div>Platos:
                            {{pedido.platos[0].name}}
                        </div>
                     <div>Precio:
                            {{pedido.platos[0].precio }}
                        </div>
                     <div>
                         <div  @click="irplato(pedido.platos[0]._id)" style="width: 100%; height: 100%;">
                             <img :src="pedido.platos[0].photo" alt=""
                                  style="height: 100%; width: 100%; object-fit: cover; border-radius: 100%">
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
        methods:{
            irplato(){

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