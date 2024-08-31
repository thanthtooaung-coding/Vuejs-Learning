<template>
<nav 
    :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg']"
>
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Vinn's Vue</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">            
            <navbar-link
                v-for="(page, index) in publishedPages" class="nav-item" :key="index"
                :page="page"
                :index="index"
            ></navbar-link>

            <li>
                <router-link
                    to="/pages"
                    class="nav-link"
                    active-class="active"
                    aria-current="page"
                > Pages </router-link>
            </li>
        </ul>            
    </div>
    <form action="" class="d-flex">
        <button 
            class="btn btn-primary"
            @click.prevent="changeTheme()"
        >Toggle</button>
    </form>
</nav>
</template>

<script>
import NavbarLink from './NavbarLink.vue';

export default {    
    components: {
        NavbarLink
    },
    inject: ['$pages', '$bus'],
    data() {
        return {
            theme: 'light',
            pages: []
        }                
    },
    created() {
        this.getThemeSetting();

        this.pages = this.$pages.getAllPages();

        this.$bus.$on('page-updated', () => {
            this.pages = [...this.$pages.getAllPages()];
        });

        this.$bus.$on('page-created', () => {
            this.pages = [...this.$pages.getAllPages()];
        });

        this.$bus.$on('page-deleted', () => {
            this.pages = [...this.$pages.getAllPages()];
        });
    },
    computed: {
        publishedPages() {
            return this.pages.filter(p => p.published);
        }
    },    
    methods: {
        changeTheme() {
            this.theme = this.theme == 'light' ? 'dark' : 'light';
            this.storeThemeSetting();
        },
        storeThemeSetting() {
            localStorage.setItem('theme', this.theme);
        },
        getThemeSetting() {
            let theme = localStorage.getItem('theme');

            if(theme) {
                this.theme = theme;
            }
        }
    },    
}
</script>