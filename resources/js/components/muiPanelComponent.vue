<template>
    <div id="menu-panel" class="mui-panel">
        <div class="mui-panel-header">
            <div class='mui-panel-title'>Menu</div>
        </div>
        <div class="mui-panel-body">

            <div class="panel-item" @click="goHome">
                <i class="fa fa-home" ></i> Home Page
            </div>
            <div class="panel-item" @click="cargarPerfil">
                <i class="fa fa-user"></i>  Mi Perfil
            </div>
            <div class="panel-item">
                <i class="fa fa-map-pin" ></i> Mis Direcciones
            </div>
            <div class="panel-item">
                <i class="fa fa-heart"></i> Mis Favoritos
            </div>
            <div class="panel-item" @click="irpedidos">
                <i class="fa fa-list"></i> Mis Pedidos
            </div>

            <div class="panel-item" @click="activity">
                <i class="fa fa-coffee"></i> Mi Actividad (Chef)
            </div>
            <div class="panel-item">
                <i class="fa fa-line-chart"></i> Metricas (Chef)
            </div>
            <div v-if class="panel-item" @click="createDish">
                <i class="fa fa-line-chart" ></i> Crear Plato (Chef)
            </div>
            <div class="panel-item" @click="logOut">
                <i class="fa fa-line-chart" ></i> Log Out
            </div>


            <div>
                <ul id='menuoptions' class='mui-list'>
                    <li class="centereli"><a class="centerA" id='option5' href="#">Plato se tiene que ir</a></li>
                    <li class="centereli"><a class="centerA" id='option100' href="#">Go Login</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import muiChangePageEvent from "../functions/muiChangePageEvent";

    export default {
        name: "muiPanelComponent",
        methods:{
            cargarPerfil(){
                eventBus.$emit('open-profile-page-4-panel')
                mui.screen.closePanel()
            },

            irpedidos(){
                eventBus.$emit('cargar-pedidos')
                mui.screen.closePanel(function() {
                    mui.viewport.showPage("mis-pedidos-page", "DEF");
                })
            },
            createDish(){

                eventBus.$emit('load-categories')
                mui.screen.closePanel(function() {
                    mui.viewport.showPage("create-dish", "DEF");
                })
            },
            logOut(){
                axios.get('/logout').then(response =>{
                        mui.screen.closePanel(function() {
                            mui.viewport.showPage('login-page')
                        })
                })
            },
            goHome(){
                mui.screen.closePanel(function() {
                    mui.viewport.showPage("home-page", "DEF");
                })
            },
            activity(){
                eventBus.$emit('act')
                mui.screen.closePanel(function() {
                    mui.viewport.showPage("activity-page", "DEF");
                })
            }
        }
    }
</script>

<style scoped>
    /* Menu sample ------------------------------------------------------------------ */
    #menu-panel {
        top: 0px;
        left: 100%;
        width: 90%;
        max-width: 250px;
        height: 100%;
        background-color: black;
        color: #fff;
        box-shadow: 0px 0px 8px black;
    }

    .mui-panel-header {
        display: none;
    }

    .panel-item{
        text-align: left;
        padding-left: 20px;
        padding-top: 5px;
        height: 30px;
        width: 100%;
        color: #e5bf32;
        background-color: black;
        vertical-align: center;
    }

    .panel-item:hover{
        color: black;
        background-color: #e5bf32;
        box-shadow: 0px 0px 4px #e5bf32;
    }

    .panel-item > i{
        padding-right: 15px;
    }

</style>