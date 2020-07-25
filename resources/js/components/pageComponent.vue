<template>
    <div :id='page_identification' class="mui-page">
        <mui-page-header-component v-on:$listeners>
                <template slot="page-title"> <slot name="page-title"/> </template>
        </mui-page-header-component>
        <div class="mui-page-body mui-scrollable" id="second-body">
                <slot name="page-body"/>
        </div>
    </div>
</template>

<script>
    import muiPageHeaderComponent from "./muiPageHeaderComponent.vue";
    export default {
        name: "pageComponent.vue",
        data(){
            return{
                id: 'template-page'
            }
        },
        props:{
            page_identification:'',
        },
        components: {
            'mui-page-header-component' : muiPageHeaderComponent
        }
    }
</script>

<style scoped>

</style>