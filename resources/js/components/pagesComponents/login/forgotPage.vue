<template>
    <page-template page_identification="forgot-page">
        <template slot="page-title">Olvide mi contraseña</template>
        <template slot="page-body">
            <div class="limiter">
                <div class="container-login100" style="background-image: url('/custom/view/images/forgot-bg.jpg');">
                    <div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                        <form class="login100-form validate-form flex-sb flex-w">
					<span class="login100-form-title p-b-53">
						Escriba su correo para recuperar su contraseña.
					</span>

                            <div class="p-t-31 p-b-9">
						<span class="txt1">
							Correo
						</span>
                            </div>
                            <div class="wrap-input100 validate-input" data-validate = "Username is required">
                                <input class="input100" type="text" name="username" >
                                <span class="focus-input100"></span>
                            </div>

                            <div class="container-login100-form-btn m-t-17">
                                <button class="forgot100-form-btn">
                                    Enviar
                                </button>
                            </div>

                        </form>
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
        name: "forgotPage.vue",
        data() {
            return {
                id: 'template-page'
            }
        },
        components: {
            'page-template': pageComponent,
        },
        props: {
            forgot_page: '',
        }
    }
</script>