<template>
    <page-template page_identification="create-dish">
        <template slot="page-title">Crear Plato</template>
        <template slot="page-body">
            <div id="creationHolder">

            <div class="creational">Nombre:<input v-model="nombre" @change="check" /></div>
            <div class="creational">Precio:<input type="number" v-model="price" @change="check" /></div>
            <div class="creational">Descripcion<input v-model="descripcion" @change="check"/></div>
                <div>
                    Categorias Principales
            <input type="checkbox" id="Celiaco" value="Celiaco" v-model="checkedNames" @click="one">
            <label>Celiaco</label>
            <input type="checkbox" id="Vegano" value="Vegano" v-model="checkedNames" @click="two">
            <label>Vegano</label>
            <input type="checkbox" id="Vegetariano" value="Vegetariano" v-model="checkedNames" @click="three">
            <label>Vegetariano</label>
                </div>
            <div class="creational"><span>Selecionadas:<span v-for="names in checkedNames">{{names}} </span></span></div>
            <div>Categorais secundarias
                <div v-for="categoria in categories">
                <input type="checkbox" :id="categoria._id" :value="categoria.name" v-model="categories_selected" @click="addcat(categoria.name)">
                <label>{{categoria.name}}</label>
            </div>
            </div>


                 <div class="creational"><span>Selecionadas:<span v-for="names in categories_selected">{{names}} </span></span></div>
            <div></div>
                <div class="d-flex justify-content-center">
                    <div class="btn btn-mdb-color btn-rounded float-left">
                        <span>Eliga una foto</span>
                        <br>
                        <input   style=" margin-top: 20px" type="file" @change="savefile" accept="image/*" capture>
                    </div>
                </div>
             <button v-if="readyToUpload" @click="upload">Guardar Plato</button>




            </div>

        </template>
    </page-template>

</template>
<script>
    import pageComponent from "../../pageComponent.vue";
    import muiChangePageEvent from "../../../functions/muiChangePageEvent";

    export default {
        name:"createDish",
        components:{
            "page-template":pageComponent,
        },
        data(){
            return{
                readyToUpload:false,
                selectedfile:null,
                types:[false,false,false],
                checkedNames:[],
                categories_selected:[],
                price:0,
                nombre:null,
                descripcion:null,
                categories:[],
                addcatarray:[]
            }
        },
        props:{

        },
        methods:{
            addcat(name){
                this.addcatarray.push(name)
            },
            upload(){

                var reader = new FileReader()
                reader.nombre=this.nombre
                reader.price=this.price
                reader.types=this.types
                reader.descripcion=this.descripcion
                reader.addcatarray=this.addcatarray
                this.readyToUpload=false
                this.types=[false,false,false]
                this.checkedNames=[]
                this.price=0
                this.nombre=null
                this.descripcion=null
                reader.readAsDataURL(this.selectedfile)
                reader.onloadend = function(){
                    console.log(reader.result)
                    axios.post('/api/platos', {
                        "name":this.nombre,
                        "price":this.price,
                        "esDeSemana":false,
                        "paraCeliacos":this.types[0],
                        "paraVeganos":this.types[1],
                        "paraVegetarianos":this.types[2],
                        "descripcion":this.descripcion,
                        "cantidad":0,
                        "categorias":this.addcatarray,
                        "reservados":0,
                        "photo":reader.result,

                    }).then(res => {
                        muiChangePageEvent("home-page")
                    } )
                }
            },
            check(){
                this.readyToUpload= this.selectedfile && this.price && this.nombre && this.descripcion && (this.price !== "0");

            },
            savefile(event){
                    this.selectedfile=event.target.files[0]
                    this.check()

            },

            one(){
                this.types[0]=!(this.types[0])
            },
            two(){
                this.types[1]=(!this.types[1])
            },
            three(){
                this.types[2]=(!this.types[2])
            }

        },
        created() {
            eventBus.$on('load-categories',function () {
                axios.get('/api/categoria').then(response =>{
                    console.log(response)
                    this.categories = response.data.data
                    console.log("hola")
                })
            }.bind(this))
        }
    };


</script>

<style scoped>

</style>