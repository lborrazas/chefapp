<template>
        <div class="for-sticky">
            <div  class="horizontal-container">
                <div v-for="dish in dishlist.items" class="horizontal-content"  @click="openDishPage(dish.id, dish.user)">
                    <div class="circle" @click="openChefPage(dish.id)"></div>
                </div>
            </div>
            <div class="content-title" >{{dishlist.name}} </div>
        </div>
</template>

<script>
    export default {
        name: "mainSlider",
        props: {
            dishlist: {type: Object, default: {items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}], name: "the name"}},
        },
        methods:{
            openChefPage($id){
                eventBus.$emit('call-chef-page',  $id);
            },
            openDishPage($id, $chef){
                eventBus.$emit('call-dish-page', $id, $chef)
            }
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
        border: black 2px solid;
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
        border: darkred 2px solid;
    }

    .for-sticky > .content-title {
        position: absolute;
        width: 130px;
        height: 35px;
        background-color: darkred;
        color: white;
        bottom: 0;
        left: 0;
        margin-bottom: 10px;
        box-shadow: 0 0 10px black;
    }
</style>