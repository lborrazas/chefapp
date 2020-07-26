<template>
    <page-template page_identification="chef-page">
        <template slot="page-title"> La Pag del Chef</template>
        <template slot="page-body">
            <complejito v-on:juanito-evento="llamarGrande"></complejito>


            <button-keen @click="$refs['modal'].open()">ABRIR</button-keen>
            <button @click="llamadaDeNacho"></button>

            <h1 v-show="isLoading">ESTOY CARGANDO LA CONCHA DE TU MADRE</h1>


            <modal-two ref="modal" title="Ui como estas">
                <h1>JUAN ES EL PROPIO</h1>
            </modal-two>
            <h1>HELO</h1>

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
                chef: {},
                isLoading: false,
            }
        },
        components: {
            'page-template': pageComponent,
            'complejito': complejito,
            'modal-two': UiModal,
            'button-keen': UiButton,
        },
        methods: {

        },
    }
</script>

<style scoped>


</style>