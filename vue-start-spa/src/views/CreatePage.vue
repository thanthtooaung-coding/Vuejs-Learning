<template>
    <div class="container mb-3">
        <form action="">
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="" class="form-label">
                            Page Title
                        </label>
                        <input 
                            type="text"
                            class="form-control"
                            v-model="pageTitle"
                        >
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">
                            Content
                        </label>
                        <textarea
                            type="text"
                            class="form-control"
                            rows="5"
                            v-model="content"
                        ></textarea>
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                        <label for="" class="form-label">
                            Link Text
                        </label>
                        <input 
                            type="text"
                            class="form-control"
                            v-model="linkText"
                        >
                    </div>                    
                    <div class="row mb-3">
                        <div class="form-check">
                            <input 
                                type="checkbox" 
                                class="form-check-input"
                                v-model="published"
                            >
                            <label for="gridCheck1" class="form-check-label">
                                Published
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <button 
                    class="btn btn-primary"
                    :disabled="isFormValid"
                    @click.prevent="submitForm()"
                >Create Page</button>
            </div>                        
        </form>
    </div>
</template>
<script setup>
import { inject, ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const bus = inject('$bus');
const pages = inject('$pages');
const router = useRouter();
const route = useRoute();
let pageTitle = ref('');
let content = ref('');
let linkText = ref('');
let published = ref(true);

watch(route, (to) => {
    document.title = to.meta.title || 'Default Title';
}, { immediate: true });

function submitForm() {
    if(!pageTitle || !content || !linkText) {
        alert('Please fill the form')
        return;
    }

    let newPage = {
        pageTitle: pageTitle.value,
        content: content.value ,
        link: {
            text: linkText.value,
        },
        published: published.value
    };

    pages.addPage(newPage);

    bus.$emit('page-created', newPage);   

    router.push({path: '/pages'});
}

const isFormValid = computed(() => !pageTitle || !content || !linkText);

watch(pageTitle, (newTitle, oldTitle) => {
    if(linkText.value === oldTitle) {
        linkText.value = newTitle
    }
});
</script>