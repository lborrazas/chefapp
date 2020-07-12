<template >

    <div id="recomended-dish" class="flex-container">
        <span class="img-container" v-for="dish in featuredDishes"  :style="'background-image:url('+dish.imgurl+')'" ></span>
        <button class="more"></button>
    </div>
</template>

<script>
    export default {
        name: "recomendedDishes",

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
            moreDishes(){

            }


        }

    }

</script>

<style scoped>

</style>