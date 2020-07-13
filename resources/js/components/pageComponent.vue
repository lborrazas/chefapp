<template>
    <div :id='page_identification' class="mui-page">
        <div class="mui-page-header">
            <a class="mui-backarrow" href="#"></a>
            <div class='mui-page-title'><slot name="page-title"/></div>
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