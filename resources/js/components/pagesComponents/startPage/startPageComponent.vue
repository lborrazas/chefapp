<template>
    <page-template page_identification="start-page" :with_carrito="false">
        <template slot="page-title">Welcome</template>
        <template slot="page-body">
            <div style="width: 100%; height: 100%; background-color: darkred; display: flex; align-items: center; justify-content: center">
                    <div class="center-container" style="">
                            <animated-logo></animated-logo>
                    </div>
            </div>
        </template>
    </page-template>
</template>

<script>
    import pageComponent from "../../pageComponent.vue";
    import animatedCheffLogo from "../../resourcesComponents/animatedCheffLogo.vue";

    export default {
        name: "startPageComponent",
        components: {
            'page-template': pageComponent,
            'animated-logo': animatedCheffLogo
        },
        mounted() {
            delay(function () {
                axios.get('/checksession').then(response => {
                    if (response.data.bool == true) {
                        eventBus.$emit('call-home-page')
                       // mui.viewport.showPage('home-page')
                    } else {
                        mui.viewport.showPage('login-page')
                    }
                });
            }, 2000)
        }
    }

    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
</script>

<style scoped>

</style>