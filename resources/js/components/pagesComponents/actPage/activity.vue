<template>
    <page-templates page_identification="activity-page">

        <template slot="page-title">Actividad</template>
        <template slot="page-body">
            <div class="horizontal-container">
                <div class="horizontal-max-content" style="overflow: scroll; min-height: 33%">
                    <div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                        {{parseInt(dish.cantidad)}}
                    </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div><div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                        {{parseInt(dish.cantidad)}}
                    </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div><div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                        {{parseInt(dish.cantidad)}}
                    </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div><div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                        {{parseInt(dish.cantidad)}}
                    </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div>
                </div>
                <image-component :dish="dishForPhoto" :with-chef="false" :is_main_photo="true"></image-component>
            </div>

            <div class="horizontal-container">
                <div class="horizontal-max-content" style="overflow: scroll; min-height: 33%">
                    <div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                        {{parseInt(dish.cantidad)}}
                    </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div><div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                    {{parseInt(dish.cantidad)}}
                </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div><div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                    {{parseInt(dish.cantidad)}}
                </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div><div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                    {{parseInt(dish.cantidad)}}
                </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div>
                </div>
                <image-component :dish="dishForPhoto" :with-chef="false" :is_main_photo="true"></image-component>
            </div>

            <div class="horizontal-container">
                <div class="horizontal-max-content" style="overflow: scroll; min-height: 33%">
                    <div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                        {{parseInt(dish.cantidad)}}
                    </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div><div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                    {{parseInt(dish.cantidad)}}
                </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div><div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                    {{parseInt(dish.cantidad)}}
                </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div><div><strong>Platos reservados: </strong> {{parseInt(dish.reservados)}} /
                    {{parseInt(dish.cantidad)}}
                </div>
                    <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px">
                        <div style="background-color:darkred;border-radius: 10px; height:100%"
                             :style="'width:'+pintar+'%'"></div>
                    </div>
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div>
                </div>
                <image-component :dish="dishForPhoto" :with-chef="false" :is_main_photo="true"></image-component>
            </div>


        </template>

    </page-templates>

</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import recomendedDishes from "../paginaDish/recomendedDishes.vue";
    import {UiModal, UiButton} from "keen-ui";
    import imageComponent from "../../coreComponents/imageComponent.vue";
    import 'keen-ui/dist/keen-ui.css';
    import muiChangePageEvent from "../../../functions/muiChangePageEvent";
    import mainSlider from "../../coreComponents/mainSlider.vue";

    export default {
        name: "dishPage",
        components: {
            'key': 0,
            'page-templates': pageComponent,
            'recomended-dish': recomendedDishes,
            'modal-two': UiModal,
            'button-keen': UiButton,
            'image-component': imageComponent,
            'main-slider-component': mainSlider,
        },
        props: {},
        // created(){
        //     eventBus.$on('act',function () {
        //         // axios.get()
        //     }.bind(this))
        // },
        data() {


            return {
                dish: {},
                dishes: [],
                chef: {},
                carga: 0, //queda
                resenia: "",//queda
                alreadyVoted: false, //porverse
            }
        },
        methods: {
            openModel() {
                this.$refs['modal-add-reseña-plato'].open()

            },
            dishForPhoto(dish) {
                let aux = {_id: dish._id, photo: dish.photo}
                return aux;
            },
            mandarResenaPlato() {


                let contenido = {"rese": this.resenia}

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
            eventBus.$on('act', function ($id, $user) {
                this.chef = $user;
                axios.get('api/pedido/chef').then(response => {
                    console.log(response.data);
                    this.dishes = response.data.data.dish;
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
        height: 210px; /* hay que agregarle el border */
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

    .flex-33:hover{
        background-color: #a50404;
    }
</style>