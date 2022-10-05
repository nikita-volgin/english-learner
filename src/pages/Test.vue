<template>
    <div>
        <testing-block
            v-if="+$route.query.step === 1"
            :numberOf="numberOfWords"
            :language="selectedLanguage"
            @onGettingTranslationWords="(words) => this.translationWords = words"
            @endTesting="(array) => {
                this.dataWithUserTranslation = [...array[0].words]
                this.wordsToTranslate = array[1]
                this.verifiedData = array[2]
                this.$router.push({
                    path: '/test',
                    query: { step: 2 }
                }).catch(()=>{})
            }"
        />

        <show-result-block
            v-if="+$route.query.step === 2" 
            :dataWithUserTranslation="dataWithUserTranslation"
            :wordsToTranslate="wordsToTranslate"
            :verifiedData="verifiedData"
            :translationWords="translationWords"
        />
    </div>
</template>

<script>
    import TestingBlock from '../components/TestingBlock.vue'
    import ShowResultBlock from '../components/ShowResultBlock.vue'

    export default {
        data() {
            return {
                numberOfWords: this.$route.query.numberOfWords,
                selectedLanguage: this.$route.query.selectedLanguage,
                dataWithUserTranslation: [],
                wordsToTranslate: [],
                verifiedData: [],
            }
        },
        components: {
            TestingBlock,
            ShowResultBlock,
        }
    }
</script>

<style>

</style>