<template>

    <page-template page_identification="profile-page">
        <template slot="page-title"> Perfil</template>
        <template slot="page-body">
        <div  class="flex-content;" style="display: flex;">
            <div class="flex-container" style="padding-top:25px; flex-direction: column; background-color: lightgoldenrodyellow; width: 33%; min-height: 45%;">
                <div class="item-header-main align-middle" style="font-size: large; color: black; text-align: center;">Puntuacion</div>
                    <div class="d-block mx-auto align-middle" style="color: black; font-weight: bold; font-size: x-large">69%</div>
            </div>
            <div class="flex-container" style="flex-direction: column; background-color: lightgoldenrodyellow; width: 34%; min-height: 45%;">
                <div class="item-header-main" style="font-size: large; color: black; text-align: center;">{{this.chef.name}}</div>
                <div id="profile-photo" class="d-block mx-auto" style="" :style="'background-image:url('+this.chef.photo+');'"></div>
            </div>
            <div class="flex-container" style="padding-top: 20px; flex-direction: column; background-color: lightgoldenrodyellow; width: 33%; min-height: 45%;">
               <div class="item-header-main" style="font-size: large; color: black; text-align: center;">Subscriptores</div>
                <div class="d-block mx-auto"><button class="btn-link" @click="changeSubButton" id="subscrito">{{this.subscribirse}}</button></div>
                <span class="d-block mx-auto" style="margin-left:26%;background-color: #e5b31b;border-radius:10%"> Subs:{{this.chef.subscriptores}}</span>
            </div>
        </div>
        <div>
            <div class="item-header-main according-chef" onclick="acc123()">Biografìa</div>
            <div class="item-header-secondary text-center panel-chef" style="color: black; background-color: lightgoldenrodyellow"><div class="container">{{this.chef.bio}}</div></div>
        </div>
            <div id="reviews">
                <div class="" style="text-decoration-line: underline;color:#adadad">
                    <a class="text-center" style="font-size: smaller; background-color: black; color: #e5b31b; font-weight: bold;"><div class="d-block mx-auto" style="width: 26%;" @click="$refs['modal-add-reseña-profile'].open()">Agregar reseña</div></a>
                </div>
                <div class="" style="overflow: scroll;max-height: 260px;margin-bottom:5px; min-height: 260px">
                    <div class="" v-for="reviw in this.chef.reviews" :key="reviw._id">
                        <div class="container">•&nbsp {{reviw.nombre}}:</div>
                        <div class="review"><div class="container">&nbsp&nbsp&nbsp&nbsp {{reviw.resena}}</div></div>
                    </div>
                </div>
            </div>

            <modal-two ref="modal-add-reseña-profile" title="Crear reseña">
                <div class="container">
                    <div style=" width:100%;height:50px">
                        <textarea v-model="reseña" style="background-color: lightgoldenrodyellow; width: 100%; border-radius: 5px; border: black;" placeholder="Ingrese su reseña.">
                        </textarea>
                    </div>
                <div>
                        <button class="btn-secondary float-right" style="border-radius: 3px; width: 27%" @click="mandarResena">Mandar</button>
                    </div>
                </div>
            </modal-two>

            <div><div v-if="perfilpropio">
                <button @click="cargarPlatos" v-if="semanalbool === false">
                    boton para ir a cambiar semanales [semanales]
                </button>
            </div>
                <div onclick="acc1()" class="item-header-main according-chef3" style="font-size: large; color: black; text-align: center; background-color: #e5b31b; margin-top: 0%; ">Platillos</div>
                <div class="for-sticky">
                    <div  class="horizontal-container">
                        <div   v-for="dish in chef.platos" v-if="dish.esDeSemana"  :key="dish._id" class="horizontal-content">
                            <div class="circle">
                                <div style="width: 100%; height: 100%;">
                                    <img :src="chef.photo" alt="" style="height: 100%; width: 100%; object-fit: cover; border-radius: 100%" >
                                </div>
                            </div>
                            <div style="width: 100%; height: 100%;" @click="openDishPage(dish._id, chef._id)">
                                <img :src="dish.photo" alt="" style="height: 100%; width: 100%; object-fit: cover;" >
                            </div>
                        </div>
                    </div>
                    <div class="content-title" >Semanales </div>
                </div>
            </div>
        </template>

    </page-template>

</template>

<script>
    import platosSemanales from "./platosSemanales.vue";
    import pageComponent from "../../pageComponent.vue";
    import {UiModal, UiButton} from "keen-ui";
    import 'keen-ui/dist/keen-ui.css';

    export default {
        name: "profilePage",
        components: {
            'page-template': pageComponent,
            'platos-semanales': platosSemanales,
            'modal-two': UiModal,
            'button-keen': UiButton,
        },
        data() {
            return {
                chef:{},
                semanalbool:false,
                subscribirse: "Subscribirse",
                reseña: "",
                perfilpropio:"",

            }
        },
        props: {
        },
        methods: {
            cargarPlatos(){
                if(!this.semanalbool){
                eventBus.$emit("cargar-plato-week")
                    mui.viewport.showPage('week-page')
                }else{
                alert("Ya se han declarado los platos semanales")
                }
            },
            openDishPage($id,$chef){
                eventBus.$emit('call-dish-page', $id, $chef)
            },
            mandarResena() {

                    let contenido = {"rese":this.reseña}
                    console.log(contenido)
                    axios.put('/api/resena/chef/'+this.chef._id, contenido).then(response => {
                        console.log(response.data)
                        this.chef.reviews.push(response.data)
                    })
                    this.$refs['modal-add-reseña-profile'].close()
            },

            changeSubButton() {
                this.subscibed = !this.subscibed
                let envio = {
                    iduser: this.chef._id,
                    idchef: this.visita
                }
                if (this.subscibed) {
                    axios.post("api/subscribe/" + this.chef._id, envio).then(respons => {
                        document.getElementById("subscrito").classList.remove("unsus")
                        document.getElementById("subscrito").classList.add("sus")
                        this.subscribirse = "Subscrito"
                        this.datosprofile.subscriptores = this.datosprofile.subscriptores + 1
                    })
                } else {
                    axios.post("api/unsubscribe/" + this.datosprofile._id, envio).then(response => {
                        document.getElementById("subscrito").classList.remove("sus")
                        document.getElementById("subscrito").classList.add("unsus")
                        this.subscribirse = "Subscribirse"
                        this.datosprofile.subscriptores = this.datosprofile.subscriptores - 1

                    })

                }
            },
        },

        created() {
            eventBus.$on('call-chef-page', function ($id) {
                axios.get('api/users/' + $id).then(response => {
                    this.chef = response.data.data;
                    this.perfilpropio=false;
                });
                //get is subcbribed
                mui.viewport.showPage('profile-page')
            }.bind(this));
            eventBus.$on('open-profile-page-4-panel', function () {
                axios.get('api/profile').then(response => {
                    this.chef = response.data.data;
                    this.perfilpropio = true
                });
                //get is subcbribed
                //get semanalbool
                axios.get('api/user/semanalesbool').then(response => {
                    this.semanalbool = response.data;
                });
                mui.viewport.showPage('profile-page')
            }.bind(this));
        },
        computed: {
        },

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
        min-width: 32%;
        background-color: #1E1F00;
        margin-left: 10px;
        margin-bottom: 5px;
        margin-top: 5px;
        height: 180px;
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
    }

    .for-sticky > .content-title {
        position: absolute;
        width: 120px;
        height: 35px;
        background-color: darkred;
        color: white;
        bottom: 0;
        left: 0;
        margin-bottom: 10px;
    }
</style>