<template>
    <page-template page_identification="register-page">
        <template slot="page-title">Registrate</template>
            <template slot="page-body">
            <div class="limiter">
                <div class="container-login100" style="background-image: url('/custom/view/images/register-bg.jpg');">
                    <div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
					<span class="login100-form-title p-b-53">
						Registrate con
					</span>

                            <a href="#" class="btn-face m-b-20">
                                <i class="fa fa-facebook-official"></i>
                                Facebook
                            </a>

                            <a href="#" class="btn-google m-b-20">
                                <img src="/custom/view/images/icon-google.png" alt="GOOGLE">
                                Google
                            </a>

                            <div class="p-t-31 p-b-9">
						<span class="txt1">
							Usuario
						</span>
                            </div>
                            <div class="wrap-input100 validate-input" data-validate="Username is required">
                                <input class="input100" type="text" name="username" v-model="username">
                                <span class="focus-input100"></span>
                            </div> <div class="p-t-31 p-b-9">

                            <span class="txt1">
							Nombre
						</span>
                            </div>
                            <div class="wrap-input100 validate-input" data-validate="Username is required">
                                <input class="input100" type="text" name="username" v-model="nombre">
                                <span class="focus-input100"></span>
                            </div>


                            <div class="p-t-31 p-b-9">
						<span class="txt1">
							Correo
						</span>
                            </div>
                            <div class="wrap-input100 validate-input" data-validate="Username is required">
                                <input class="input100" type="email" name="username" v-model="correo">
                                <span class="focus-input100"></span>
                            </div>

                            <div class="p-t-13 p-b-9">
						<span class="txt1">
							Contraseña
						</span>

                            </div>
                            <div class="wrap-input100 validate-input" data-validate="Password is required">
                                <input class="input100" type="password" name="pass" v-model="pass1">
                                <span class="focus-input100"></span>
                            </div>
                            <div class="p-t-13 p-b-9">
						<span class="txt1">
							Confirmar contraseña
						</span>
                            </div>
                            <div class="wrap-input100 validate-input" data-validate="Password is required">
                                <input class="input100" type="password" name="username" v-model="pass2">
                                <span class="focus-input100"></span>
                            </div>

                            <div class="p-t-13 p-b-9">
						<span class="txt1">
							Rol
						</span>
                                <div class="control">
                                    <input type="radio" value="Comprador" name="answer" v-model="clase">
                                    Comprador
                                    <input type="radio" value="Chef" name="answer" v-model="clase">
                                    Chef
                                </div>
                            </div>

                            <div class="container-login100-form-btn m-t-17">
                                <button class="login100-form-btn" @click="registrarse">
                                    Registrarme
                                </button>
                            </div>
                    </div>
                </div>
            </div>

            <div id="dropDownSelect1"></div>





        </template>
    </page-template>
</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import {UiModal, UiButton} from "keen-ui";
    import 'keen-ui/dist/keen-ui.css';

    export default {
        name: "registerPage.vue",
        data() {
            return {
                nombre:"",
                username:"",
                pass1:"",
                pass2:"",
                correo:"",
                clase:"",
                id: 'template-page',
                photograph:"",
                descripcion:"",
            }
        },
        components: {
            'page-template': pageComponent,

            'modal-two': UiModal,
            'button-keen':UiButton,
        },
        props: {
            register_page: '',
        },
        methods:{
            savefile(){
                this.photograph=event.target.files[0]
            },
            registrarse(){
                if (this.pass1===this.pass2){
                if (this.clase && this.username && this.correo) {
                    let clientecito = ""
                    if(this.clase ==="Comprador"){
                        clientecito="cliente"

                    }else if(this.clase ==="Chef"){
                        clientecito="cliente"
                        this.photograph="data:image/jpeg;base64,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"
                    }
                    let body={
                        user:this.username,
                        email:this.correo,
                        password:this.pass1,
                        type:"cliente",
                        name:this.nombre,
                        photo:"",
                        carrito:[],
                        reviews:[],
                        platos:[],
                        suscriptores:0,
                        bio:"",
                        status:""
                    }
                    axios.post("/users",body).then(response=>{
                        mui.viewport.showPage("login-page")
                    })
                }else{
                    let text="Las contraseñas no coinciden"
                    new Noty({
                        type: "error",
                        text: "<strong style='color: whitesmoke'>Error: </strong><br>" +text ,
                        progressBar: true,
                        timeout: 3500,
                    }).show();
                }
            }
        }
        }
    }
</script>

<style scoped>

</style>