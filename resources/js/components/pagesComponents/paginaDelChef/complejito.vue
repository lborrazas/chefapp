<template>
    <button @click="llamar">boton de evento juanito</button>
</template>

<script>
    export default {
        name: "complejito",
        data(){
            return {
                nombrecito: 'matito'
            }
        },
        methods:{
            llamar : function(){
                this.$emit('juanito-evento', this.nombrecito)
            }
        }
    }
</script>

<style scoped>

</style>