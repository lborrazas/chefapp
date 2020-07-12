<template>
   <page-template page_identification="chef-page">
       <template slot="page-title"> La Pag del Chef</template>
       <template slot="page-body">
           <complejito v-on:juanito-evento="llamarGrande"></complejito>


       </template>
   </page-template>

</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import complejito from "./complejito.vue";

    export default {
        name: "chefPage",
        components:{
            'page-template1': pageComponent,
            'complejito':complejito,
        },
        methods:{
            llamarGrande($nombre){
                alert('estamos en el padre de ' + $nombre);
                axios.get('/hello/world');
            }
        }
    }
</script>

<style scoped>

</style>