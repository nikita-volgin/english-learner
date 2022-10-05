<template>
  <div id="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
  import LanguageSelectionBlock from "./components/LanguageSelectionBlock.vue"
  import WordsAmountBlock from "./components/WordsAmountBlock.vue"
  import TestingBlock from "./components/TestingBlock.vue"
  import ShowResultBlock from "./components/ShowResultBlock.vue"

  export default {
    name: 'App',
    data() {
      return {
        step: 1,
        selectedLanguage: '',
        numberOfWords: 0,
        dataWithUserTranslation: [],
        wordsToTranslate: [],
        verifiedData: [],
        translationWords: [],
      }
    },
    components: {
      LanguageSelectionBlock,
      WordsAmountBlock,
      TestingBlock,
      ShowResultBlock,
    },
    methods: {

    },
    mounted() {
      this.$router.push({
            path: '/start',
            query: { step: 1 }
        }).catch(()=>{})
    }
  }
</script>

<style>
  #wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    background: white;
    margin: 4px;
  }
</style>
