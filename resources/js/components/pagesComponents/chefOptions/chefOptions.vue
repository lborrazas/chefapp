<template>

        <page-template page_identification="option-chef-page">
            <template slot="page-title">Modo Chef</template>
            <template slot="page-body">
                <div>
                    <ul class='mui-list'>
                        <li  class="centereli chefoptionbutton"><a class="centerA" id='crearPlato' href="#">Crear Plato</a></li>
                        <li  class="centereli chefoptionbutton"><a @click="cargarPlatos" class="centerA" id='definirSemanales' href="#">Platos Semanales</a></li>
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
            cargarPlatos(){
                this.$emit("cargar-plato-week",this.idchef)
            },
        },
        props:{
            'idchef':''
        },
        components:{
            "page-template":pageComponent
        }
    }
</script>

<style scoped>

</style>