<template>
    <div v-if="page" id="content" class="container">
        <h1 class="emphasize"> {{ page.pageTitle }} </h1>
        <p> {{ page.content }} </p>
    </div>
</template>

<script>
export default {
    props: ['index'],
    inject: ['$pages'],
    beforeRouteEnter(to, from, next) {
        document.title = to.meta.title || "Default Title";
        next();
    },
    created() {
        this.page = this.$pages.getSinglePage(this.$route.params.index);

        // this.$watch(() => this.$route.params, (newParams, prevParams) => {
        //     this.page = this.$pages.getSinglePage(newParams.index);
        // })
    },
    data() {
        return {
            page: null
        }
    },
    watch: {
        index(newIndex, oldIndex) {
            this.page = this.$pages.getSinglePage(newIndex)
        }
    }
};
</script>

<style scoped>
.emphasize {
    color: blue;
}
</style>