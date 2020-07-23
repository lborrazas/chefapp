<template>
    <page-template page_identification="home-page">
        <template slot="page-title">
            <button id="chefoption" @click="change" ></button>
                Home page</template>
        <template slot="page-body">

            <!-- Search form -->
            <form class="form-inline d-flex justify-content-center md-form form-sm mt-0 home-heder">
                <i class="fa fa-search" aria-hidden="true"></i>
                <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                       aria-label="Search">
            </form>
            <!-- Header -->
            <div id="header">
                    <!-- Logo -->
                    <img src="/custom/view/images/homer-heder.jpg" style="max-height: 620px; min-width: 100%; background-color: #e5c76b; opacity: 0.8;">
            </div>
            <!-- Header -->

            <!-- Main -->
            <div id="main">
                <div class="container flex-container">
                    <header>
                        <h2>Más pedidos</h2>
                    </header>
                    <div class="row">
                        <div class="3u flex-content-25" style=" border-bottom: 1px solid rgba(139,139,139,0.42);" v-for="product in array">
                            <section >
                                <p>{{product.name}}</p>
                                <a  class="image full"><img :src="product.photo" alt="" /></a>
                                <a :id="product._id" class="button btn-plus" @click="openDish(product._id)">Read More</a>
                            </section>
                        </div>
                    </div>

                <!--Carrusel de promociones-->
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <a href="#"><img class="d-block w-100 carrousel-promo" src="/custom/view/images/home-bg.jpg" alt="First slide"></a>
                        </div>
                        <div class="carousel-item">
                            <a href="#"><img class="d-block w-100 carrousel-promo" src="/custom/view/images/home-bg.jpg" alt="Second slide"></a>
                        </div>
                        <div class="carousel-item">
                            <a href="#"><img class="d-block w-100 carrousel-promo" src="/custom/view/images/home-bg.jpg" alt="Third slide"></a>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
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
    import muiChangePageEvent from "../../../functions/muiChangePageEvent.js";
    export default {
        name: "homePage.vue",
        data() {
            return {
                id: 'template-page',
                array:{},

            }
        },
        components: {
            'page-template': pageComponent,
        },
        created() {
            console.log("entro a crear")
            axios.get("/api/platosparapedir/").then(response =>{
                console.log(response.data)
                this.array=response.data
            })

        },
        methods:{
            change(){
                muiChangePageEvent("option-chef-page")
            },
            openDish(clave){
                console.log(clave)
                this.$emit("cargar-plato",clave)
                muiChangePageEvent("dish-page")

            }
        },
        props: {
            home_page: '',
        }
    }
</script>

<style scoped>

</style>