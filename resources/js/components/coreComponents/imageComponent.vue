<template>
    <div>
        <div class="horizontal-content">
            <div class="circle" @click="openChefPage(dish.chef.id)">
                <div style="width: 100%; height: 100%;">
                    <img :src="dish.chef.photo" alt=""
                         style="height: 100%; width: 100%; object-fit: cover; border-radius: 100%">
                </div>
            </div>
            <div style="width: 100%; height: 100%;" @click="openDishPage(dish._id, dish.chef)">
                <img :src="dish.photo" alt="" style="height: 100%; width: 100%; object-fit: cover;">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "imageComponent.vue",
        props: {
            dish: {
                type: Object, default() {
                    return {_id: '1', photo: 'la foto', chef: {id: '1', photo: 'foto chef'}}
                }
            },
            is_main_photo: {Boolean, default: false}
        },
        methods: {
            openChefPage($id) {
                eventBus.$emit('call-chef-page', $id);
            },
            openDishPage($id, $chef) {
                if(!this.is_main_photo){
                    eventBus.$emit('call-dish-page', $id, $chef)
                }
            }
        }
    }
</script>

<style scoped>

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

</style>