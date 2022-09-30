<template>
  <div id="wrapper">
    <button
      @click="step++"
      v-if="step === 1"
    >
      Начать
    </button>

    <choose-language
      @clickLng="lng => {
        selectedLanguage = lng
        step++
      }"
      v-if="step === 2"
    />

    <get-number-of-words
      v-if="step === 3"
      @numberOf="number => {
        numberOfWords = number
        step++
      }"
    />

    {{ numberOfWords }}
  </div>
</template>

<script>
  import ChooseLanguage from "./components/ChooseLanguage.vue"
  import GetNumberOfWords from "./components/GetNumberOfWords.vue"

  export default {
    name: 'App',
    data() {
      return {
        step: 1,
        selectedLanguage: '',
        numberOfWords: 0,
      }
    },
    components: {
      ChooseLanguage,
      GetNumberOfWords,
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
