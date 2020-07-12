<template>
    <page-templates page_identification="dish-page">
        <template slot="page-title"> La Pagina Del palto </template>
        <template slot="page-body">
            <div class="info-holder" style="height:45%">
                <div class="profile-header flex-container" style="height: 100%">

                    <span class="profile-1half" style="width: 70%">
                        <div class="item-header-main">
                            <div>Platos reservados hoy:{{reserved}} / {{total}}</div>
                            <div style="border-radius: 10px; border: black" ><span :style="'width:'+carga+'%'"></span></div>
                        </div>
                        <div class="item-header-main"> {{dishName}}</div>
                        <div class="item-header-secondary">{{description}}
                    </div></span>
                    <span class="profile-2half"><div id="profile-photo" :style="'background-image:url('+dishPic+')'"></div>
                        <div id="popularity" style="height: 100%"><div id="subsHolder"><button @click="changeSubButton" id="subscrito" style="min-width: 70%;height: 100%"></button></div>{{subscriptores}}</div>

                    </span>

                </div>
            </div>

            <div id="reviews" >
                <div class="mui-scroll-wrapper" style="overflow: scroll;max-height: 160px"><div v-for="reviw in reviews">
                    <div class="review">{{reviw.text}}</div>
                </div>
                </div>
            </div>



        </template>

    </page-templates>

</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    export default {
        name: "dishPage",
        components:{
            'page-templates':pageComponent,

        },
        data(){
            return{
                carga:0,
                description:"texto",
                total:15,
                reserved:1,
                dishName:"Arroz con tuco",
                dishPic:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRf0UjX6SbDijhHx2UuZ_1SvHB3MGKS5ywLlQ&usqp=CAUca",
                subscriptores:0,
                popularity:{
                    likes:0,
                    dislikes:0
                },

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
                }
                else {
                    document.getElementById("subscrito").classList.remove("sus")
                    document.getElementById("subscrito").classList.add("unsus")
                }
            }
        },
        computed:{
            pintar(){+
                this.carga=(100*this.reserved.number)/this.total.number

            }

        }

    }
</script>

<style scoped>


</style>