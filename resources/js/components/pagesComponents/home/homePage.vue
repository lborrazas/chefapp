<template>
    <page-template page_identification="home-page">

        <template slot="page-title">Home page</template>
        <template slot="page-body">

            <!-- Main -->
            <div id="main">
                <div class="for-sticky">
                    <div  class="horizontal-container">
                    <!--div v-for="platos in platosColectionTop" class="horizontal-container"-->
                        <div class="horizontal-content" @click="openDish(product._id)">
                            <div class="circle" @click="openChef()"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                    </div>
                    <div class="content-title">Top Dishes</div>
                </div>

                <div class="for-sticky">
                    <div class="horizontal-container">
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                    </div>
                    <div class="content-title">Vegan</div>
                </div>
                <div class="for-sticky">
                    <div class="horizontal-container">
                        <div class="horizontal-content" @click="openDish(product._id)">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>

                    </div>
                    <div class="content-title">From the sea</div>
                </div>


                <div class="for-sticky">
                    <div class="horizontal-container">
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>
                        <div class="horizontal-content">
                            <div class="circle"></div>
                        </div>

                    </div>
                    <div class="content-title">Steaks</div>
                </div>


                <div class="container flex-container">
                    <header>
                        <h2>Más pedidos</h2>
                    </header>
                    <div class="row">
                        <div class="3u flex-content-25" style=" border-bottom: 1px solid rgba(139,139,139,0.42);"
                             v-for="product in array">
                            <section>
                                <p>{{product.name}}</p>
                                <a class="image full"><img :src="product.photo" alt=""/></a>
                                <span class="flex-container" style="min-height: 30px">
                                    <div class="dotType"
                                         style="background-color: #efbd59 ;border: 20px solid rgba(255,232,192,0.85); border-left:25px;border-right:25px; "
                                         v-if="product.paraCeliacos">
                                        <div style="border: 5px solid #efbd59;border-radius: 100%"></div>
                                    </div>
                                    <div class="dotType"
                                         style="background-color: #339dee ;border: 5px solid rgba(142,203,250,0.63)"
                                         v-if="product.paraVegetarianos">
                                        <div style="border: 5px solid #339dee;border-radius: 100%"></div>
                                    </div>
                                    <div class="dotType"
                                         style="background-color: #1f9a05 ;border: 5px solid rgba(133,250,87,0.63)"
                                         v-if="product.paraVeganos">
                                        <div style="border: 5px solid #1f9a05;border-radius: 100%"></div>
                                    </div>
                                </span>
                                <a :id="product._id" class="button btn-plus" @click="openDish(product._id)">Read
                                    More</a>

                            </section>
                        </div>
                    </div>

                    <!--Carrusel de promociones-->
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <a href="#"><img class="d-block w-100 carrousel-promo"
                                                 src="/custom/view/images/home-bg.jpg" alt="First slide"></a>
                            </div>
                            <div class="carousel-item">
                                <a href="#"><img class="d-block w-100 carrousel-promo"
                                                 src="/custom/view/images/home-bg.jpg" alt="Second slide"></a>
                            </div>
                            <div class="carousel-item">
                                <a href="#"><img class="d-block w-100 carrousel-promo"
                                                 src="/custom/view/images/home-bg.jpg" alt="Third slide"></a>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button"
                           data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button"
                           data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <!--endCarrusel-->

                    <div class="container flex-container">
                        <header>
                            <h2>Quiza te guste</h2>
                        </header>
                    </div>
                </div>
            </div>
        </template>
    </page-template>
</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import muiChangePageEvent from "../../../functions/muiChangePageEvent";

    export default {
        name: "homePage.vue",
        data() {
            return {
                id: 'template-page',
                array: [
                    ['/custom/view/images/home-bg.jpg', 'nombre', "genericid"],
                    ['/custom/view/images/home-bg.jpg', 'nombre1', "genericid1"],
                ]

            }
        },
        components: {
            'page-template': pageComponent,
        },
        created() {
            console.log("entro a crear")
            /*  axios.get("/api/platosparapedir/").then(response =>{
                  console.log(response.data)
                  this.array=response.data
              })*/

        },
        methods: {
            change() {
                muiChangePageEvent("option-chef-page")
            },
            irperfil(){
                    this.$emit('irperfil',this.elplatito.chef)
                    muiChangePageEvent('profile-page')
            },
            openDish(clave) {
                console.log(clave)
                this.$emit("cargar-plato", clave)
                muiChangePageEvent("dish-page")

            }
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
    }
</style>