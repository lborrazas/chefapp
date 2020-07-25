<template>
    <div id="menu-panel" class="mui-panel">
        <div class="mui-panel-header">
            <div class='mui-panel-title'>Menu</div>
        </div>
        <div class="mui-panel-body">

            <div class="panel-item">
                <i class="fa fa-home"></i> Home Page
            </div>
            <div class="panel-item" @click="cargarPerfil">
                <i class="fa fa-user"></i>  Mi Perfil
            </div>
            <div class="panel-item">
                <i class="fa fa-map-pin"></i> Mis Direcciones
            </div>
            <div class="panel-item">
                <i class="fa fa-heart"></i> Mis Favoritos
            </div>
            <div class="panel-item">
                <i class="fa fa-list"></i> Mis Pedidos
            </div>

            <div class="panel-item">
                <i class="fa fa-coffee"></i> Mi Actividad (Chef)
            </div>
            <div class="panel-item">
                <i class="fa fa-line-chart"></i> Metricas (Chef)
            </div>


            <div>
                <ul id='menuoptions' class='mui-list'>
                    <li class="centereli"><a class="centerA" id='option1' href="#">Go Home Page</a></li>
                    <li class="centereli"><a class="centerA" id='option4' href="#">Perfil</a></li>
                    <li class="centereli"><a class="centerA" id='option5' href="#">Plato</a></li>
                    <li class="centereli"><a class="centerA" id='option6' href="#">Crear Plato</a></li>
                    <li class="centereli"><a class="centerA" id='option13' href="#">Platos Semanales</a></li>
                    <li class="centereli"><a class="centerA" id='option100' href="#">Go Login</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "muiPanelComponent",
        methods:{
            cargarPerfil(){
                this.$emit("open-panel")
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