<template >

    <div id="dish-wrapper">
        <!--Carrusel de promociones-->
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" v-for="dish in featuredDishes" >
                    <a href="#" ><img class="d-block w-100 carrousel-promo" src="/custom/view/images/home-bg.jpg" alt="First slide"></a>
                </div>
                <div class="carousel-item " v-for="dish in featuredDishes" >
                    <a href="#" ><img class="d-block w-100 carrousel-promo" :src="dish.imgurl" alt="First slide"></a>
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
    </div>
</template>

<script>
    export default {
        name: "TopDishes",

    data() {
        return {
            featuredDishes:{
                dish1: {
                    imgurl: "https://via.placeholder.com/200x100",
                    profile: "",
                },
                dish2: {
                    imgurl: "https://via.placeholder.com/200x100",
                    profile: "",
                },
                dish3: {
                    imgurl: "https://via.placeholder.com/200x100",
                    profile: "",
                }}
        }
    },
    methods:{


    }

}

</script>

<style scoped>

</style>