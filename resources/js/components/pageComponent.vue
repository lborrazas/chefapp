<template>
    <div :id='page_identification' class="mui-page">
        <div class="mui-page-header navbar-heder" style="background-color: #0b2e13; color:lightgoldenrodyellow">
            <a class="mui-backarrow" href="#"></a>
            <div class='mui-page-title'><img src="/custom/images/logocat.png" class="logo-cat"><slot name="page-title"/></div>
            <a class="mui-headmenu" href="#"></a>
        </div>
        <div class="mui-page-body mui-scrollable" id="second-body">
                <slot name="page-body"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pageComponent.vue",
        data(){
            return{
                id: 'template-page'
            }
        },
        props:{
            page_identification:'',
        }
    }
</script>

<style scoped>

</style>