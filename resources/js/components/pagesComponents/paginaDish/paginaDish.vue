<template>
    <page-templates page_identification="dish-page">

        <template slot="page-title"> Pagina de Plato
            <button id="micarrito" @click="mandar('modal')" >
            </button></template>
        <template slot="page-body">
            <div class="info-holder" style="height:45%">
                <div class="profile-header flex-container" style="height: 100%">

                    <span class="profile-1half" >
                        <div class="item-header-main">
                            <div>Platos reservados hoy:{{reserved}} / {{total}}</div>
                            <div style="border-radius: 10px; border: black; background-color: #575757; height: 10px
                        " ><div style="background-color:darkred;border-radius: 10px; height:100%" :style="'width:'+pintar+'%'"></div></div>
                        </div>
                        <div class="item-header-main"> {{dishName}}</div>
                        <div class="item-header-secondary">{{description}}
                    </div></span>
                    <span class="profile-2half">
                        <div id="profile-photo" :style="'background-image:url('+dishPic+')'"></div>
                        <div id="price" class="flex-container">
                            <div id="coinimage" class="img-container">
                            </div>
                            <div>
                                {{price}}$
                            </div>

                        </div>
                        <div id="cart" class="flex-container">
                            <div id="cartimage" class="img-container">
                            </div>
                            <div><button @click="add">
                                Add
                            </button>

                            </div>

                        </div>
                        <div id="popularity" class="flex-container" style="height: 15%">
                            <div class="popuHold" ><button id="likes" style="min-width: 50%;height: 100%">👍</button>{{popularity.likes}}</div>
                            <div class="popuHold"><button id="dislikes" style="min-width: 50%;height: 100%">👎</button>{{popularity.dislikes}}</div>
                        </div>



                    </span>

                </div>
            </div>

            <div id="reviews" >
                <div class="mui-scroll-wrapper" style="overflow: scroll;max-height: 160px"><div v-for="reviw in reviews">
                    <div class="review">{{reviw.text}}</div>
                </div>
                </div>
            </div>
            <recomended-dish></recomended-dish>


        </template>

    </page-templates>

</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import recomendedDishes from "./recomendedDishes.vue";
    import {UiModal, UiButton} from "keen-ui";
    import 'keen-ui/dist/keen-ui.css';
    export default {
        name: "dishPage",
        components:{
            'page-templates':pageComponent,
            'recomended-dish':recomendedDishes,
            'modal-two': UiModal,
            'button-keen':UiButton,
        },
        data(){
            return{
                price:250,
                carga:0,
                id:"genericid",
                description:"texto",
                total:15,
                reserved:5,
                dishName:"Arroz con tuco",
                dishPic:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRf0UjX6SbDijhHx2UuZ_1SvHB3MGKS5ywLlQ&usqp=CAUca",
                subscriptores:0,
                popularity:{
                    likes:0,
                    dislikes:0
                },
                alreadyVoted:false,
                reviews:{
                    review1:{
                        text:"estaba muy ruco",
                        img:""
                    },
                    review2:{
                        text:"estaba muy ruco",
                    },
                    review3:{
                        text:"estaba muy ruco",
                    },
                    review4:{
                        text:"estaba muy ruco",
                    },
                    review5:{
                        text:"estaba muy ruco",
                    },
                    review6:{
                        text:"estaba muy ruco",
                    },
                    review7:{
                        text:"estaba muy ruco",
                    },

                }
            }
        },
        methods:{

                add(){
                this.$emit('addcarrito',[this.dishName,this.id,this.price])
                },
                mandar(laid){
                    this.$emit('mandar',laid)

                },

        },
        computed:{
            pintar(){

                return this.carga=(100*this.reserved)/this.total

            }

        }

    }
</script>

<style scoped>


</style>