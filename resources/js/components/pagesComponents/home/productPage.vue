<template>
    <page-template page_identification="product-page">
        <template slot="page-title">Product page</template>
        <template slot="page-body">
            <div class="container flex-container">
                <header>
                    <h2>Resultado</h2>
                </header>
                <div class="row">
                    <div class="3u flex-content-25">
                        <section>
                            <a href="#" class="image full"><img src="/custom/view/images/home-bg.jpg" alt="" /></a>
                            <p>Quisque dictum. Pellentesque viverra  enim. Integer nisl risus, sagittis convallis, rutrum id, elementum.</p>
                            <a href="#" class="button btn-plus">Read More</a>
                        </section>
                    </div>
                    <div class="3u flex-content-25">
                        <section>
                            <a href="#" class="image full"><img src="/custom/view/images/home-bg.jpg" alt="" /></a>
                            <p>Pellentesque viverra  enim. Tristique ante ut risus. Quisque dictum. Integer sagittis convallis elementum.</p>
                            <a href="#" class="button btn-plus">Read More</a>
                        </section>
                    </div>
                    <div class="3u flex-content-25">
                        <section>
                            <a href="#" class="image full"><img src="/custom/view/images/home-bg.jpg" alt="" /></a>
                            <p>Pellentesque viverra  enim. Quisque dictum. Integer nisl risus, sagittis convallis, rutrum id, elementum.</p>
                            <a href="#" class="button btn-plus">Read More</a>
                        </section>
                    </div>
                    <div class="3u flex-content-25">
                        <section>
                            <a href="#" class="image full"><img src="/custom/view/images/home-bg.jpg" alt="" /></a>
                            <p>Tristique ante ut risus. Quisque dictum. Integer nisl risus, sagittis convallis elementum.</p>
                            <a href="#" class="button btn-plus">Read More</a>
                        </section>
                    </div>
                </div>
                <div class="divider">&nbsp;</div>
                <div class="row">
                </div>
            </div>
        </template>
    </page-template>
</template>

<script>
    import pageComponent from "../../pageComponent.vue";

    export default {
        name: "productPage.vue",
        data() {
            return {
                id: 'template-page',

            }
        },
        components: {
            'page-template': pageComponent,
        },
        props: {
            product_page: '',
        }
    }
</script>

<style scoped>

</style>