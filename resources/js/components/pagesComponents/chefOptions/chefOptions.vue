<template>

        <page-template page_identification="option-chef-page">
            <template slot="page-title">Modo Chef</template>
            <template slot="page-body">
                <div>
                    <ul class='mui-list'>
                        <li  class="centereli chefoptionbutton"><a class="centerA" id='crearPlato' href="#">Crear Plato</a></li>
                        <li  class="centereli chefoptionbutton"><a class="centerA" id='definirSemanales' href="#">Platos Semanales</a></li>
                    </ul>
                </div>

            </template>
        </page-template>
</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    export default {
        name: "chefOptions",
        data(){
            return{

            }
        },
        methods:{

        },
        props:{
            'idchef':'',
            'semanalbool':""
        },
        components:{
            "page-template":pageComponent
        }
    }
</script>

<style scoped>

</style>