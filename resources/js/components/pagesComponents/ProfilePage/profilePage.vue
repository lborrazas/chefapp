<template>
    <page-template page_identification="profile-page">
        <template slot="page-title"> Perfil </template>
        <template slot="page-body">
            <div class="info-holder" style="height:45%">
                <div class="profile-header flex-container" style="height: 100%">

                    <span class="profile-1half"><div class="item-header-main"> {{usuario}}</div>
                    <div class="item-header-secondary">{{bio}}
                    </div></span>
                    <span class="profile-2half"><div id="profile-photo" :style="'background-image:url('+profilePic+')'"></div>
                        <div id="popularity" style="height: 100%"><div id="subsHolder"><button @click="changeSubButton" id="subscrito" >{{this.subscribirse}}</button></div>  Subs:{{subscriptores}}</div>

                    </span>

                </div>
            </div>

            <div id="reviews" >
                <div class="mui-scroll-wrapper" style="overflow: scroll;max-height: 160px"><div v-for="reviw in reviews">
                <div class="review">{{reviw.text}}</div>
                </div>
                </div>
            </div>


        <platos-semanales></platos-semanales>


        </template>

    </page-template>

</template>

<script>
    import platosSemanales from "./platosSemanales.vue";
    import pageComponent from "../../pageComponent.vue";
    export default {
        name: "profilePage",
        components:{
        'page-template':pageComponent,
        'platos-semanales': platosSemanales,

        },
        data(){
            return{
                subscribirse:"Subscribirse",
                usuario:"Juanito Comunica",
                bio:"mucho texto asd asd asdas dasd as das da sd ",
                profilePic:"https://i.guim.co.uk/img/media/893dfe641d6a71ad69a5ed05c34d5df275d905ee/0_165_6000_3600/master/6000.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=36e045a1afc8172c1e05744fa49d017d",
                subscriptores:28023,
                subscibed:false,
                reviews:{
                    review1:{
                        text:"estaba muy ruco",
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
        methods:{  changeSubButton(){
                this.subscibed=!this.subscibed
                if(this.subscibed){
                    document.getElementById("subscrito").classList.remove("unsus")
                    document.getElementById("subscrito").classList.add("sus")
                    this.subscribirse="Subscrito"
                }
                else {
                    document.getElementById("subscrito").classList.remove("sus")
                    document.getElementById("subscrito").classList.add("unsus")
                    this.subscribirse="Subscribirse"
                }
            }
                },
        computed:{

        }

    }
</script>

<style scoped>


</style>