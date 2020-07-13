<template>
    <page-templates page_identification="week-page">
        <template slot="page-title"> Definir Platos Semanales
            <button v-if="auxiliarbool" id="subirsemanales" @click="$refs['modal2'].open()" >Ok
            </button>
            <button v-else></button>
        </template>
        <template slot="page-body">
            <div style="margin:10px" v-for="dishes in platos">
               <div class="disheselector img-container" :id="dishes[1]" :style="'background-image: url('+ dishes[2]+ ')'">
                   <div class="flex-container" style="height:5%; margin: 5px;"><span>{{dishes[0]}}</span><div style=" margin-left: 75%;width:20px"><button :id="dishes[1]+'1'" class ="dishCheck" @click="pinch(dishes[1]+'1')" ></button></div></div>
                </div>
            </div>

            <modal-two  ref="modal2" title="Platos Semanales">

                <div>

                    <div style="overflow: auto">
                        <div  > {{getname(main3[0])}} <span>Cantidades:<input type="number" v-model="cant0"></span></div>
                        <div  > {{getname(main3[1])}} <span>Cantidades:<input type="number" v-model="cant1"></span></div>
                        <div  > {{getname(main3[2])}} <span>Cantidades:<input type="number" v-model="cant2"></span></div>
                    </div>


                    <div v-if="cant0<=30&&cant1<=30&&cant2<=30&&cant1*cant2*cant0>0"><button style="margin-left:65%" @click="mandar">Subir platos semanales</button>
                    </div>
                    <div v-else>Cantidades no admitidas</div>
                </div>


            </modal-two>
        </template>
    </page-templates>

</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import {UiModal, UiButton} from "keen-ui";
    import 'keen-ui/dist/keen-ui.css';
    import muiChangePageEvent from "../../../functions/muiChangePageEvent.js"
    export default {
        name: "weekDish",
        components:{
            'page-templates':pageComponent,
            'modal-two': UiModal,
            'button-keen':UiButton,

        },
        data(){
            return{
                auxiliarbool:false,
                cant0:0,
                cant1:0,
                cant2:0,
                main3:["empty","empty","empty"],
                platos:[
                    ["nombre","id3","https://img-global.cpcdn.com/recipes/fe5f1314c9c8da7e/400x400cq70/photo.jpg"],
                    ["nombre","id4","https://img-global.cpcdn.com/recipes/fe5f1314c9c8da7e/400x400cq70/photo.jpg"],
                    ["nombre","id1","https://img-global.cpcdn.com/recipes/fe5f1314c9c8da7e/400x400cq70/photo.jpg"],
                    ["nombre","id2","https://img-global.cpcdn.com/recipes/fe5f1314c9c8da7e/400x400cq70/photo.jpg"],

            ]
            }
        },
        methods:{
            getname(clave){
                let valorretorno =""
                for (let i=0;i<this.platos.length;i++){


                    if ((this.platos[i][1]+'1')==clave){

                        valorretorno=this.platos[i][0]
                    }
                }

                return valorretorno
            },
            mandar(){
                this.mandarOne(this.main3[0],this.cant0)
                this.mandarOne(this.main3[1],this.cant1)
                this.mandarOne(this.main3[2],this.cant2)
            },
            mandarOne(clave,cantidad){
                for (let i=0;i<this.platos.length;i++){
                    if ((this.platos[i][1]+'1')==clave){

                        let post = {
                            id:this.platos[i][1],
                            body:cantidad,
                            userid:0
                        };
                        axios.post("/semala", post).then((result) => {
                           muiChangePageEvent('home-page')
                        });
                    }
                }

            },
            pinch(clave){

                var booltemp=true

                for(let i=0;i<this.main3.length;i++){


                    if (clave==this.main3[i]){
                        this.unselected(clave)
                        this.main3[i]="empty"
                        booltemp=false
                        }
                    }
                if(booltemp){
                    for(let j=0;j<this.main3.length;j++){
                        if ("empty"==this.main3[j]&&booltemp){

                            this.main3[j]=clave

                            this.selected(clave)
                            booltemp=false
                        }
                    }
                     if (booltemp){
                         console.log("ndeh")
                         this.unselected(this.main3[0]+"")
                         this.selected(clave)
                         this.main3[0]=""+this.main3[1]
                         this.main3[1]=""+this.main3[2]
                         this.main3[2]=""+clave
                     }
                }
                this.auciliar()
            },
            selected(direc){
                document.getElementById(direc).classList.add("selec")
                document.getElementById(direc).classList.remove("unselec")
            },
            unselected(direc){

                document.getElementById(direc).classList.remove("selec")
                document.getElementById(direc).classList.add("unselec")
            },
            auciliar(){
                if (this.main3[0]==="empty"||this.main3[1]==="empty"||this.main3[2]==="empty"){
                    this.auxiliarbool=false
                }
                else {
                    this.auxiliarbool=true
                }
            },

            llamarGrande($nombre){

                axios.get('/hello/world');
            }
        },
        computed:{
            //["nombre","id3","https://img-global.cpcdn.com/recipes/fe5f1314c9c8da7e/400x400cq70/photo.jpg"]
            init(){
                console.log("entra")
                axios.get("/api/platos/"+this.id).then((result) => {
                    this.result = result.data;
                    console.log(result.data)
                })}
        }
    }
</script>
