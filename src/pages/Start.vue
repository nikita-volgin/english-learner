<template>
    <div>
        <language-selection-block
            v-if="+$route.query.step === 1"
            @clickLng="lng => { 
                selectedLanguage = lng
                this.$router.push({
                    path: '/start',
                    query: { step: 2 }
                }).catch(()=>{})
            }"
        />
        {{ selectedLanguage }}

        <words-amount-block
            v-if="+$route.query.step === 2"
            @numberOf="number => openNextPage(number)"
        />
    </div>
    
</template>

<script>
    import LanguageSelectionBlock from '../components/LanguageSelectionBlock.vue'
    import WordsAmountBlock from '../components/WordsAmountBlock.vue'

    export default {
        data() {
            return {
                selectedLanguage: '',
                numberOfWords: '',
            }
        },
        components: {
            LanguageSelectionBlock,
            WordsAmountBlock,
        },
        mounted() {

        },
        methods: {
            openNextPage(number) {
                this.numberOfWords = number
                this.$router.push({
                        path: '/test',
                        query: { 
                            step: 1,
                            selectedLanguage: this.selectedLanguage,
                            numberOfWords: this.numberOfWords,
                        }
                    }).catch(()=>{})
            }
        }
    }
</script>

<style>

</style>