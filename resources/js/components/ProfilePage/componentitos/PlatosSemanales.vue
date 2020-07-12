<template class="mui-page-body-content">

    <div id="dish-wrapper" class="flex-container">
        <span class="img-container" v-for="dish in featuredDishes" ><img :src="dish.imgurl"></span>
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