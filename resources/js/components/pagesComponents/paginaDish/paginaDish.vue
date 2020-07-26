<template>
    <page-templates page_identification="dish-page">

        <template slot="page-title"> Pagina de Plato</template>
        <template slot="page-body">
            <div class="info-holder" style="height:45%">
                <div :key="componentKey2" class="profile-header flex-container" style="height: 100%">

                    <span class="profile-1half">
                        <div class="item-header-main">
                            <div>Platos reservados:{{parseInt(dish.reservado)}} / {{parseInt(dish.cantidad)}}</div>
                            <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px
                        "><div style="background-color:darkred;border-radius: 10px; height:100%"
                               :style="'width:'+pintar+'%'"></div></div>
                        </div>
                        <div class="item-header-main"> {{dish.name}}</div>
                        <div class="item-header-secondary">{{dish.descipcion}}
                    </div></span>
                    <span class="profile-2half">
                        <div class="flex-container profilecont" @click="irperfil"><div class="item-header-main">Perfil del chef:<div>{{this.dish.chefname}}</div></div></div>
                        <div id="profile-photo" :style="'background-image:url('+dish.photo+')'"></div>
                        <div id="price" class="flex-container">
                            <div id="coinimage" class="img-container">
                            </div>
                            <div>
                                {{(parseInt(this.dish.precio))}}$
                            </div>

                        </div>
                        <div id="cart" class="flex-container">
                            <div id="cartimage" class="img-container">
                            </div>
                            <div><button style="background-color: #99999924;border-radius:1%" @click="addToCarrito">
                                Agregar al carrito
                            </button>

                            </div>

                        </div>




                    </span>

                </div>
            </div>


            <div id="reviews">
                <div style="text-decoration-line: underline;color:#adadad" @click="openModel"><a
                        style="font-size: smaller;">Agregar reseña</a></div>
                <div class="mui-scroll-wrapper" style="overflow: scroll;max-height: 160px">
                    <div v-for="reviw in this.dish.reviews" :key="reviw._id">
                        <div>{{reviw.nombre}}</div>
                        <div class="review">{{reviw.resena}}</div>
                    </div>
                </div>
            </div>

            <modal-two ref="modal-add-reseña-plato" title="Crear reseña">
                <div class="container">
                    <div style=" width:100%;height:50px"><input
                            style=" width:70%;background-color: rgba(194,194,194,0.61);border-radius: 2%"
                            v-model="resenia"></input></div>
                    <div>
                        <button @click="mandarResenaPlato">Mandar</button>
                    </div>
                </div>


            </modal-two>


            <recomended-dish></recomended-dish>


        </template>

    </page-templates>

</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import recomendedDishes from "./recomendedDishes.vue";
    import {UiModal, UiButton} from "keen-ui";
    import 'keen-ui/dist/keen-ui.css';
    import muiChangePageEvent from "../../../functions/muiChangePageEvent";

    export default {
        name: "dishPage",
        components: {
            'key': 0,
            'page-templates': pageComponent,
            'recomended-dish': recomendedDishes,
            'modal-two': UiModal,
            'button-keen': UiButton,
        },
        props: {
        },
        data() {


            return {

                dish: {},
                carga: 0, //queda
                resenia: "",//queda
                alreadyVoted: false, //porverse
                componentKey2: 0,

            }
        },
        methods: {
            openModel() {
                    this.$refs['modal-add-reseña-plato'].open()

            },
            mandarResenaPlato() {


                let contenido = {"rese":this.resenia}

                    this.$refs['modal-add-reseña-plato'].close()
                    axios.put('/api/resena/plato/'+this.dish._id, contenido).then( response=>{
                        console.log(response)
                        this.dish.reviews.push(response.data)
                    })

            },
            irperfil() {
               this.$emit('irperfil', this.dish.idchef)
                    muiChangePageEvent('profile-page')

            },
            addToCarrito() {
                this.$store.commit('addCarrito', {dish: this.dish});
            },
            forceRerender() {
                this.componentKey2 += 1;
            },
        },

        computed: {
            pintar() {
                return this.carga = (100 * parseInt(this.dish.reservado)) / parseInt(this.dish.cantidad)
            },
            load() {
                this.alreadyVoted = false

                this.iddelchef = this.dish.chef
            }
        },
        created() {

                eventBus.$on('call-dish-page', function ($id, $user) {
                    alert($id);
                    this.user = $user;
                    axios.get('api/platos/' + $id).then(response => {
                        this.dish = response.data;
                        mui.viewport.showPage('dish-page')
                    });

            }.bind(this));
        }

    }
</script>

<style scoped>


</style>