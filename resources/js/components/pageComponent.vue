<template>
    <div :id='page_identification' class="mui-page">
        <mui-page-header-component
                :with_carrito="with_carrito"
                v-on:open-carrito-modal="$refs['carrito_component'].$refs['modal'].open()">
                <template slot="page-title"> <slot name="page-title"/> </template>
        </mui-page-header-component>
        <div class="mui-page-body mui-scrollable" id="second-body">
                <slot name="page-body"/>
        </div>

        <carrito-component  v-if="with_carrito" ref="carrito_component" ></carrito-component>

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
            with_carrito: { type: Boolean, default: true}
        },
        components: {
            'mui-page-header-component' : muiPageHeaderComponent
        }
    }
</script>

<style scoped>

</style>