<template>
    <page-template page_identification="home-page">
        <template slot="page-title">Home page</template>
        <template slot="page-body">

            <!-- Main -->
            <div id="main">
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
                        <div class="3u flex-content-25" v-for="product in array">
                            <section>
                                <a class="image full"><img :src="product[0]" alt=""/></a>
                                <p>{{product[1]}}</p>
                                <a :id="product[3]" class="button btn-plus" @click="openDish(product[3])">Read More</a>
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
        methods: {
            openDish(clave) {
                muiChangePageEvent("dish-page")
                axios.get('api/dishes' + clave).then($response => {
                    this.dish = $response.data
                    this.isLoading = false;

                }).catch(error => {
                    alert('error')
                    sleep(20);
                    this.isLoading = false;
                })
            }
        },
        props: {
            home_page: '',
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