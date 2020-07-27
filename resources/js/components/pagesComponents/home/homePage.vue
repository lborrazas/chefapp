<template>
    <page-template page_identification="home-page">

        <template slot="page-title">Home page</template>
        <template slot="page-body">
            <!--<button @click="evento">APRETAME PARA PROBAR</button>-->

            <!-- Main -->
            <div id="main">
                <template v-for="list in lists">
                    <main-slider v-if="list.dishes.length > 0" :key="list.name" :dishlist="list"></main-slider>
                </template>
                <!-- <main-slider></main-slider>-->
            </div>


        </template>
    </page-template>
</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import mainSlider from "../../coreComponents/mainSlider.vue";
    import muiChangePageEvent from "../../../functions/muiChangePageEvent";

    export default {
        name: "homePage.vue",
        data() {
            return {
                id: 'template-page',
                lists: {},

            }
        },
        components: {
            'page-template': pageComponent,
            'main-slider': mainSlider,
        },
        created() {
            eventBus.$on('call-home-page', function () {
                axios.get('api/platos/main/call/').then(response => {
                    console.log(response)
                    this.lists = response.data.data;
                    mui.viewport.showPage('home-page')
                })
            }.bind(this));
        },
        methods: {
            change() {
                muiChangePageEvent("option-chef-page")
            },
            irperfil() {
                this.$emit('irperfil', this.elplatito.chef)
                muiChangePageEvent('profile-page')
            },
            /* openDish(clave) {
                 console.log(clave)
                 this.$emit("cargar-plato", clave)
                 muiChangePageEvent("dish-page")

             },*/
            /* evento(){
                 eventBus.$emit('eventBusEmission')
             }*/
        },
        props: {
            chefboolean: "",
        }
    }

</script>

<style scoped>
    .horizontal-container {
        display: flex;
        position: relative;
        overflow-x: auto;
        width: 100%;
        height: 195px; /* hay que agregarle el border */
        background-color: white;
        border-top: #e5bf32 5px solid;
    }

    .horizontal-content {
        position: relative;
        min-width: 140px;
        background-color: black;
        margin-left: 10px;
        margin-bottom: 5px;
        margin-top: 5px;
        height: 180px;
    }

    .for-sticky {
        position: relative;
        width: 100%;
        height: 195px; /* hay que agregarle el border */
    }

    .horizontal-content > .circle {
        position: absolute;
        width: 35px;
        height: 35px;
        top: 0;
        left: 0;
        margin: 10px;
        border-radius: 100%;
        background-color: whitesmoke;
    }

    .for-sticky > .content-title {
        position: absolute;
        width: 120px;
        height: 35px;
        background-color: darkred;
        color: white;
        bottom: 0;
        left: 0;
        margin-bottom: 10px;
        box-shadow: 0 0 10px black;
    }
</style>