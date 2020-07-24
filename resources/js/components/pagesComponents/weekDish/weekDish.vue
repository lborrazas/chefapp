<template>
    <page-templates page_identification="week-page">
        <template slot="page-title">Semanales
            <button v-if="auxiliarbool" id="subirsemanales" @click="$refs['modal2'].open()" >Ok
            </button>
            <button v-else></button>
        </template>
        <template slot="page-body">
            <div style="margin:10px" v-for="dishes in platoides">
                <div class="flex-container weekdish" style="height:5%; margin: 5px;"><span>{{dishes.name}}</span><div style=" margin-left: 75%;width:20px"><button :id="dishes._id" class ="dishCheck" @click="pinch(dishes._id);setnames();" >✓</button></div></div>
                <div class="disheselector img-container" :id="dishes[1]" :style="'background-image: url('+ dishes.photo+')'">
                </div>
            </div>

            <modal-two  ref="modal2" title="Platos Semanales">

                <div>

                    <div :key="componentKey" style="overflow: auto">
                        <div > {{names[0]}} <span>Cantidad:<input type="number" v-model="cant0"></span></div>
                        <div > {{names[1]}} <span>Cantidad:<input type="number" v-model="cant1"></span></div>
                        <div > {{names[2]}} <span>Cantidad:<input type="number" v-model="cant2"></span></div>
                    </div>


                    <div v-if="cant0<=30&&cant1<=30&&cant2<=30&&cant1*cant2*cant0>0"><button style="margin-left:65%" @click="mandar">Subir platos semanales</button>
                    </div>
                    <div v-else>Cantidades no admitidas</div>
                </div>
            <span id="datos" style="visibility: hidden;max-height: 0px;max-width: 0px"></span>


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
                results:["",],
                platos:[],
                names:["","",""],
                componentKey: 0,
            }
        },
        props:{
            idchef:'',
            platoides:{}
        },
        methods:{
            setnames(){
                this.names[0]=this.getname(this.main3[0])
                this.names[1]=this.getname(this.main3[1])
                this.names[2]=this.getname(this.main3[2])
                this.forceRerender()
            },
            mandar(){
                this.mandarOne(this.main3[0],this.cant0)
                this.mandarOne(this.main3[1],this.cant1)
                this.mandarOne(this.main3[2],this.cant2)
                muiChangePageEvent("home-page")
            },
            forceRerender() {
                this.componentKey += 1;
            },
            mandarOne(clave,cantidad){
                let data2send={
                    "id":clave,
                    "cantidad":cantidad,
                }

                axios.post("/api/semala"+this.idchef,data2send).then((result) => {
                    this.$emit("subio-semanales")
               });
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
            getname(clave){

                let valorretorno =""
                for (let i=0;i<this.platoides.length;i++){
                    if ((this.platoides[i]._id)==clave){

                        valorretorno=this.platoides[i].name
                    }
                }

                return valorretorno
            }
        },
        computed:{


        }
    }
</script>
