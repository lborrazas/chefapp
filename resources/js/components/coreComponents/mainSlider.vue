<template>
    <div class="for-sticky">
        <div class="horizontal-container">
            <image-component v-for="dish in dishlist.dishes" :dish="dish" :key="dish._id" :with-chef="with_chef"></image-component>
        </div>
        <div class="content-title">{{dishlist.name}}</div>
    </div>
</template>

<script>
    import imageComponent from "./imageComponent.vue";
    export default {
        name: "mainSlider",
        components: {'imageComponent': imageComponent},
        props: {
            dishlist: {
                type: Object,
                default() {
                    return {
                        dishes: [{_id: 1, photo: 'foto', chef: {id: 1, photo: 10}}, {
                            _id: 2,
                            photo: 'foto',
                            chef: {id: 1, photo: 10}
                        }, {_id: 3, photo: 'foto', chef: {id: 1, photo: 10}}, {
                            _id: 4,
                            photo: 'foto',
                            chef: {id: 1, photo: 10}
                        }, {_id: 5, photo: 'foto', chef: {id: 1, photo: 10}}], name: "the name"
                    }
                }
            },
            with_chef: {type: Boolean, default:true}
        },
        methods: {
            openChefPage($id) {
                eventBus.$emit('call-chef-page', $id);
            },
            openDishPage($id, $chef) {
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
        width: 140px;
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
        border: black 2px solid;
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