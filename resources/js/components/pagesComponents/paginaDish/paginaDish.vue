<template>
    <page-templates page_identification="dish-page">

        <template slot="page-title"> Pagina de Plato</template>
        <template slot="page-body">

            <div class="horizontal-container">
                <div class="horizontal-max-content">
                    <div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                        {{parseInt(dish.cantidad)}}
                    </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div>
                </div>
                <image-component :dish="dishForPhoto" :is_main_photo="true"></image-component>
            </div>

            <div class="flex-container-buttons">
                <div class="flex-33"> <i class="fa fa-cart-plus" @click="addToCarrito"></i> </div>
                <div class="flex-33"> <i class="fa fa-money"></i> <strong style="color: whitesmoke">{{dish.price}}</strong>  </div>
                <div class="flex-33"> <i :class="isFavorite ? 'fa fa-heart' : 'fa fa-heart-o'"></i></div>
            </div>
            


            <div id="reviews">
                <div style="text-decoration-line: underline;color:#adadad" @click="openModel"><a
                        style="font-size: smaller;">Agregar reseña</a></div>
                <div class="mui-scroll-wrapper" style="overflow: scroll;max-height: 160px">
                    <div v-for="reviw in this.dish.reviews" :key="reviw._id">
                        <div>{{reviw.nombre}}</div>
                        <div class="review">{{reviw.rese}}</div>
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
    import imageComponent from "../../coreComponents/imageComponent.vue";
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
            'image-component': imageComponent,
        },
        props: {},
        data() {


            return {
                dish: {},
                chef: {},
                carga: 0, //queda
                resenia: "",//queda
                alreadyVoted: false, //porverse
                reviews: null, //por
            }
        },
        methods: {
            openModel() {
                this.$refs['modal-add-reseña-plato'].open()

            },
            mandarResenaPlato() {


                let contenido = {"rese": this.resenia}

                this.$refs['modal-add-reseña-plato'].close()
                axios.put('/api/resena/plato/' + this.dish._id, contenido)

            },
            irperfil() {
                this.$emit('irperfil', this.dish.idchef)
                muiChangePageEvent('profile-page')

            },
            addToCarrito() {
                this.$store.commit('addCarrito', {dish: this.dish});
                new Noty({
                    type: "success",
                    text: "<strong style='color: whitesmoke !important;'>Plato Ingresado al Carrito </strong><br>",
                    progressBar: true,
                    timeout: 1500,
                }).show();
            },
            forceRerender() {
                this.componentKey2 += 1;
            },
        },

        computed: {
            pintar() {
                return this.carga = (100 * parseInt(this.dish.reservados)) / parseInt(this.dish.cantidad)
            },
            dishForPhoto() {
                let aux = {_id: this.dish._id, photo: this.dish.photo}
                aux.chef = this.chef;
                return aux;
            },
            isFavorite(){
                return false;
            }

        },
        created() {

            eventBus.$on('call-dish-page', function ($id, $user) {
                this.chef = $user;
                axios.get('api/platos/' + $id).then(response => {
                    this.dish = response.data.data;
                    mui.viewport.showPage('dish-page')
                });

            }.bind(this));
        }

    }
</script>

<style scoped>
    .horizontal-container {
        display: flex;
        position: relative;
        width: 100%;
        height: 195px; /* hay que agregarle el border */
        background-color: white;
        border-top: #e5bf32 5px solid;
        padding-right: 5px;
        padding-left: 5px;
    }

    .horizontal-container-small {
        display: flex;
        position: relative;
        width: 100%;
        height: 60px; /* hay que agregarle el border */
        background-color: white;
        border-top: #e5bf32 5px solid;
        padding-right: 5px;
        padding-left: 5px;
    }

    .horizontal-max-content {
        position: relative;
        margin-bottom: 5px;
        margin-top: 5px;
        flex: auto;
    }


    .flex-container-buttons {
        display: flex;
        flex-direction: row-reverse;
        height: 40px;
        box-shadow: 0 0 10px black;
    }

    .flex-33 {
        height: 100%;
        min-width: 30%;
        width: 100%;
        background-color: darkred;
        text-align: center;
        color: #e5bf32;
        padding-top: 7px;

    }
</style>