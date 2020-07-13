<template>
    <page-template page_identification="login-page">
        <template slot="page-title">Login</template>
        <template slot="page-body">
            <div class="limiter">
                <div class="container-login100"
                     style="background-image: url('/custom/view/images/login-background.jpg');">
                    <div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">

					<span class="login100-form-title p-b-53">
						Sign In With
					</span>

                        <div class="flex-container-login">

                            <div class="flex-content-50">
                                <span>
                                    <a href="#" class="btn-face m-b-20">
                                    <i class="fa fa-facebook-official"></i>
                                    Facebook
                                </a>
                                </span>
                            </div>




                            <div class="flex-content-50">
                                <span>
                                <a href="#" class="btn-google m-b-20">
                                    <img src="/custom/view/images/icon-google.png" alt="GOOGLE">
                                    Google
                                </a>
                                    </span>
                            </div>


                        </div>

                        <div class="p-t-31 p-b-9">
						<span class="txt1">
							Correo electrónico
						</span>
                        </div>
                        <div class="wrap-input100 validate-input" data-validate="Username is required">
                            <input class="input100" type="text" name="Correo Electrónico" v-model="user.email">
                            <span class="focus-input100"></span>
                        </div>

                        <div class="p-t-13 p-b-9">
						<span class="txt1">
							Password
						</span>

                            <a id="option-forgot" href="#" class="link">
                                Forgot?
                            </a>
                        </div>
                        <div class="wrap-input100 validate-input" data-validate="Password is required">
                            <input class="input100" type="password" name="pass" v-model="user.password">
                            <span class="focus-input100"></span>
                        </div>

                        <div class="container-login100-form-btn m-t-17">
                            <button class="login100-form-btn" @click="signCall">
                                Sign In
                            </button>
                        </div>

                        <div class="w-full text-center p-t-55">
						<span class="txt2">
							Not a member?
						</span>

                            <a id="option-register" href="#" class="link">
                                Sign up now
                            </a>
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

    export default {
        name: "loginPage.vue",
        data() {
            return {
                user: {email: null, password: null}
            }
        },
        components: {
            'page-template': pageComponent,
        },
        props: {
            login_page: '',
        },
        methods: {
            signCall() {
               // window.dispatchEvent(new Event('uff'));
               /* axios.post('/login', {email: this.email, password: this.password}).then(
                   mui.viewport.showPage('home-page', "SLIDE-LEFT");
                )*/

            }
        }
    }
</script>

<style scoped>
    .flex-container-login {
        display: flex;
        flex-wrap: wrap;
    }

    .flex-content-50 {
        flex: 1 0 49%;
        padding-left: 2%;
        padding-right: 2%;
        min-width: 230px;
        margin-top: 20px;
    }

    .flex-content-33{
        flex: 1 0 32%;
        padding-left: 2%;
        padding-right: 2%;
        min-width: 230px;
        margin-top: 20px;
    }


</style>