<template>
    <page-template page_identification="create-dish">
        <template slot="page-title">Crear Plato</template>
        <template slot="page-body">
            <div id="creationHolder">
            <div>Nombre:<input v-model="nombre"/></div>
            <div>Precio:<input type="number" v-model="precio"/></div>
            <div>Descripcion<input v-model="descripcion"/></div>
            <input type="checkbox" id="Celiaco" value="Celiaco" v-model="checkedNames" @click="one">
            <label>Celiaco</label>
            <input type="checkbox" id="Vegano" value="Vegano" v-model="checkedNames" @click="two">
            <label>Vegano</label>
            <input type="checkbox" id="Vegetariano" value="Vegetariano" v-model="checkedNames" @click="three">
            <label>Vegetariano</label>
            <br>
            <div><span>Categorias:<span v-for="names in checkedNames">{{names}} </span></span></div>
            <div></div>

            </div>

        </template>
    </page-template>

</template>
<script>
    import pageComponent from "../../pageComponent.vue";

    export default {
        name:"createDish",
        components:{
            "page-template":pageComponent,
        },
        data(){
            return{
                types:[false,false,false],
                checkedNames: [],
                precio:0,
                nombre:"",
                descripcion:""
            }
        },
        methods:{
            one(){
                this.types[0]=!this.types[0]
            },
            two(){
                this.types[1]=!this.types[1]
            },
            three(){
                this.types[2]=!this.types[2]
            }

        }
    }
</script>

<style scoped>

</style>