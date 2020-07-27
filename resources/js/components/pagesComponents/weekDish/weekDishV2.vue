<template>
    <page-template page_identification="v2-week-page">
        <template slot="page-title">Platos Semanales</template>
        <template slot="page-body">
            <div class="horizontal-container" v-for="dish in dishes" :key="dish._id">
                <div class="horizontal-max-content">
                    <div><strong>Nombre: </strong> {{dish.name}}</div>
                    <div><strong>Descripción: </strong>{{dish.descripcion}}</div>

                    <div><strong>Seleccionar Cantidad:</strong></div>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" placeholder="cantidad" aria-label="cantidad"
                               aria-describedby="basic-addon1" v-model="dish.cantidad">
                    </div>

                    <button class="btn btn-app-red" @click="addKey(dish)">{{dish.esDeSemana ? 'Sacar de semanales' :
                        'Agregar a semanales'}}
                    </button>

                </div>
                <image-component :dish="{_id: dish._id, photo: dish.photo}" :with-chef="false"></image-component>
            </div>


            <button class="btn btn-app-red" style="position: fixed; bottom: 0px; right: 0px; margin: 10px;"
                    @click="confirmWeekDishes">Finalizar Selección
            </button>
        </template>
    </page-template>


</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import imageComponent from "../../coreComponents/imageComponent.vue";
    import displayMessages from "../../../functions/message.js";

    export default {
        name: "weekDishV2.vue",
        data() {
            return {
                dishes: {},
                keys: [],
                chef_id: {},
            }
        },
        components: {
            'page-template': pageComponent,
            'image-component': imageComponent
        },
        created() {
            eventBus.$on('cargar-plato-week', function (dishes) {
                dishes.forEach(dish => dish.cantidad = 0);
                this.dishes = dishes;
                mui.viewport.showPage('v2-week-page');
            }.bind(this));
        },
        methods: {
            addKey(dish) {
                let myKey = this.keys.find(key => key._id == dish._id)
                alert(myKey);
                if (!myKey) {
                    this.keys.push({_id: dish._id, cantidad: dish.cantidad});
                    dish.esDeSemana = true;
                } else {
                    this.keys = this.keys.filter(key => key._id != dish._id)
                    dish.esDeSemana = false;
                }
            },
            confirmWeekDishes() {
                if (this.keys.length != 3) {
                    new Noty({
                        type: "error",
                        text: "<strong style='color: whitesmoke'>Error: </strong><br>" + 'la cantidad de platos debe ser 3',
                        progressBar: true,
                        timeout: 2000,
                    }).show();
                } else {
                    axios.post('/api/platos/semanal/999', {keys: this.keys}).then(response => {
                        displayMessages(response)
                        eventBus.$emit('open-profile-page-4-panel');
                    })
                }
            }
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


    .horizontal-max-content {
        position: relative;
        margin-bottom: 5px;
        margin-top: 5px;
        flex: auto;
    }


</style>