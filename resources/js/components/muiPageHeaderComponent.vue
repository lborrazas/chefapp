<template>
    <div class="mui-nav-bar-header">
       <!-- <span @click="back" > <i class="fa fa-arrow-left"></i></span>-->
        <a class="mui-backarrow" href="#"></a>
        <div class='mui-page-title'><slot name="page-title"/></div>
        <a class="mui-cart"  v-if="with_carrito"  @click="$emit('open-carrito-modal')" >
        </a>
        <a class="mui-headmenu" href="#"></a>
    </div>

</template>

<script>
    export default {
        name: "muiPageHeaderComponent",
        methods: {
            back(){
                    mui.history.back();
            }
        },
        props: {
            with_carrito: { type: Boolean, default: true}
        }
    }
</script>

<style scoped>
    .mui-nav-bar-header{
        top: 0px;
        left: 0px;
        width: 100%;
        height: 55px;
        position: absolute;
        background-color: black;
        color: #e5bf32;
        border-bottom: #e5bf32 5px solid;
    }



    /*#mui-viewport > .mui-page > .mui-page-header {}*/
</style>