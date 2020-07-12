<template>
    <page-template page_identification="create-dish">
        <template slot="page-title">Crear Plato</template>
        <template slot="page-body">
            <div>Nombre:<input v-model="nombre"/></div>
            <div>Precio:<input v-model="precio"/></div>
            <div>Descripcion<input v-model="descripcion"/></div>
            <input type="checkbox" id="Celiaco" value="Celiaco" v-model="checkedNames">
            <label>Celiaco</label>
            <input type="checkbox" id="Vegano" value="Vegano" v-model="checkedNames">
            <label>Vegano</label>
            <input type="checkbox" id="Vegetariano" value="Vegetariano" v-model="checkedNames">
            <label>Vegetariano</label>
            <br>
            <span>Checked names:<span v-for="names in checkedNames"> {{ names }}</span></span>


        </template>
    </page-template>

</template>
<script>
    import pageComponent from "../../pageComponent.vue";

    export default {
        name: "createDish",
        data(){
            return{
                checkedNames: [],
                precio:0,
                nombre:"",
                descripcion:""
            }
        },
        comments:{
            "page-tempalte":pageComponent,
        }
    }
</script>

<style scoped>

</style>