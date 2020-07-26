<template>
    <page-template page_identification="chef-page">
        <template slot="page-title"> La Pag del Chef</template>
        <template slot="page-body">


        </template>
    </page-template>

</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import complejito from "./complejito.vue";
    import {UiModal, UiButton} from "keen-ui";
    import 'keen-ui/dist/keen-ui.css';
    import muiChangePageEvent from "../../../functions/muiChangePageEvent.js"

    export default {
        name: "chefPage",
        data() {
            return {

            }
        },
        components: {

        },
        methods: {

        },
    }
</script>

<style scoped>


</style>