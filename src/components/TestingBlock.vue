<template>
    <div>
        <p>{{ word }}</p>
        <input 
            type="text" 
            @keyup.enter="nextWord"
            v-model="translate"
        >
        <button @click="nextWord">Следующее</button>
    </div>
</template>

<script>
    export default {
        name: 'TestingBlock',
        data() {
            return {
                data: [],
                word: '',
                translate: '',
                wordsToTranslate: [],
                buttonText: '',
                dataToCheck: {words: []},
            }
        },
        props: {
            numberOf: String,
            language: String,
        },
        async mounted() {
            this.data = await this.getWordsForTest(this.numberOf)

            this.getTranslatedWords([...this.data])

            this.word = this.randomWord(this.data[0][this.language])

        },
        methods: {
            async getWordsForTest(number) {

                let url = `http://localhost:3000/get-test?wordsAmount=${number}`
                const obj = await fetch(url, {
                    method: 'GET',
                })

                const data = await obj.json()

                return data
            },
            getTranslatedWords(data) {
                let translationWords = []
                let language = 'word_variants_' + ((this.language.slice(-2) === 'ru') ? 'en' : 'ru')

                for (let value of data){
                    translationWords.push(this.randomWord(value[language]))
                }
                
                this.$emit('onGettingTranslationWords', translationWords)
                
            },
            async checkingData(data) {

                const obj = await fetch('http://localhost:3000/upload-test', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })

                const verifiedData = await obj.json()

                this.$emit('endTesting', [this.dataToCheck, this.wordsToTranslate, verifiedData])
            },
            randomWord(words) {
                return words[Math.floor(Math.random() * words.length)]
            },
            nextWord() {
                this.wordsToTranslate.push(this.word)

                this.dataToCheck.words.push({
                    id: this.data[0].id, 
                    translation: this.translate,
                    targetLang: (this.language.slice(-2) === 'ru') ? 'en' : 'ru'
                    })

                this.data.shift()

                if (this.data.length === 0) {
                    this.checkingData(this.dataToCheck)
                } else {
                    this.word = this.randomWord(this.data[0][this.language])
                    this.translate = ''
                }
                
                
            }
        },
    }
</script>

<style>
 
</style>