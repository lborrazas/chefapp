<template>

    <page-template page_identification="profile-page">
        <template slot="page-title"> Perfil</template>
        <template slot="page-body">
            <div class="info-holder" style="height:45%">
                <div class="profile-header flex-container" style="height: 100%">
                    <span class="profile-1half"><div class="item-header-main" style="font-size: large">{{this.datosprofile.user}}</div>
                    <div class="item-header-secondary">{{this.datosprofile.bibliografia}}
                    </div></span>
                    <span class="profile-2half"><div id="profile-photo"
                                                     :style="'background-image:url('+this.datosprofile.photo+')'"></div>
                        <div id="popularity" style="height: 100%"><div id="subsHolder"><button @click="changeSubButton"
                                                                                               id="subscrito">{{this.subscribirse}}</button></div><span
                                style="margin-left:18%;background-color: #99999924;border-radius:10%"> Subs:{{this.datosprofile.subscriptores}}</span></div>
                    </span>

                </div>
            </div>
            <div id="reviews">
                <div style="text-decoration-line: underline;color:#adadad"
                     @click="$refs['modal-add-reseña-profile'].open()"><a style="font-size: smaller;">Agregar reseña</a>
                </div>
                <div class="mui-scroll-wrapper" style="overflow: scroll;max-height: 160px;margin-bottom:5px">
                    <div v-for="reviw in this.reviewsprofile" :key="reviw._id">
                        <div>{{reviw.nombre}}</div>
                        <div class="review">{{reviw.rese}}</div>
                    </div>
                </div>
            </div>


            <modal-two ref="modal-add-reseña-profile" title="Crear reseña">
                <div class="container">
                    <div style=" width:100%;height:50px"><input
                            style=" width:70%;background-color: rgba(194,194,194,0.61);border-radius: 2%"
                            v-model="reseña"></input></div>
                    <div>
                        <button @click="mandarResena">Mandar</button>
                    </div>
                </div>


            </modal-two>
            <div><div class="for-sticky">
                <div class="horizontal-container">
                    <div class="horizontal-content">

                    </div>
                    <div class="horizontal-content">

                    </div>
                    <div class="horizontal-content">

                    </div>
                </div>
                <div class="content-title">Semanales</div>
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
                auxbool: true,
                subscribirse: "Subscribirse",
                reseña: "",

            }
        },
        props: {
            visita: {},
            datosprofile: {},
            reviewsprofile: {},
            subscibed: {}
        },
        methods: {
            mandarResena() {
                axios.get("/api/usuarios/name/" + this.datosprofile._id).then(response => {
                    response.data[0].user

                    console.log("mandando")
                    let contenido = {
                        "iduser": this.visita,
                        "idperfil": this.datosprofile._id,
                        "rese": this.reseña,
                        "nombre": response.data[0].user
                    }
                    axios.put('/api/resena/perfil', contenido)
                    this.$refs['modal-add-reseña-profile'].close()
                })
            },

            changeSubButton() {
                this.subscibed = !this.subscibed
                let envio = {
                    iduser: this.datosprofile._id,
                    idchef: this.visita
                }
                if (this.subscibed) {
                    axios.post("api/subscribe/" + this.datosprofile._id, envio).then(respons => {
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
        beupdated() {
            {
                console(this.subscibed)
                if (this.subscibed) {
                    document.getElementById("subscrito").classList.remove("unsus")
                    document.getElementById("subscrito").classList.add("sus")
                    this.subscribirse = "Subscrito"
                } else {
                    document.getElementById("subscrito").classList.remove("sus")
                    document.getElementById("subscrito").classList.add("unsus")
                    this.subscribirse = "Subscribirse"
                }
            }
        },
        created() {
            /*  console.log(this.subscibed)
              {
                  if (this.subscibed) {
                      document.getElementById("subscrito").classList.remove("unsus")
                      document.getElementById("subscrito").classList.add("sus")
                      this.subscribirse = "Subscrito"
                  } else {
                      document.getElementById("subscrito").classList.remove("sus")
                      document.getElementById("subscrito").classList.add("unsus")
                      this.subscribirse = "Subscribirse"
                  }
              }*/
        },

        computed: {

            /* funcion() {
                 if (this.subscibed) {
                     document.getElementById("subscrito").classList.remove("unsus")
                     document.getElementById("subscrito").classList.add("sus")
                     this.subscribirse = "Subscrito"
                 } else {
                     document.getElementById("subscrito").classList.remove("sus")
                     document.getElementById("subscrito").classList.add("unsus")
                     this.subscribirse = "Subscribirse"
                 }
             }*/
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