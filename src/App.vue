<template>
  <div id="wrapper">
    <button
      @click="step++"
      v-if="step === 1"
    >
      Начать
    </button>

    <language-selection-block
      @clickLng="lng => {
        step++
        selectedLanguage = lng
      }"
      v-if="step === 2"
    />

    <words-amount-block
      v-if="step === 3"
      @numberOf="number => {
        step++
        numberOfWords = number
      }"
    />

    <testing-block
      v-if="step === 4"
      :numberOf="numberOfWords"
      :language="selectedLanguage"
      @endTesting="(array) => {
        step++
        
        this.dataWithUserTranslation = [...array[0].words]
        this.wordsToTranslate = array[1]
        this.verifiedData = array[2]
      }"
    />
    {{ dataWithUserTranslation }}
    {{ wordsToTranslate }}
    {{ verifiedData }}
  </div>
</template>

<script>
  import LanguageSelectionBlock from "./components/LanguageSelectionBlock.vue"
  import WordsAmountBlock from "./components/WordsAmountBlock.vue"
  import TestingBlock from "./components/TestingBlock.vue";

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
      }
    },
    components: {
      LanguageSelectionBlock,
      WordsAmountBlock,
      TestingBlock,
    },
    methods: {

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
