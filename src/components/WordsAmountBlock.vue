<template>
    <div>
        <p>Укажите желаемое количество слов</p>
        <input
            v-model="inputValue" 
            type="Text" 
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            @keyup.enter="checkInput()"
        >
        <button @click="checkInput()">Готово</button>

        <modal-window 
            v-if="modalVisible" 
            @close="modalVisible = false"
            :textOfError="error"
            :hintOfError="hint"
        />
    </div>
</template>

<script>
    import ModalWindow from "./ModalWindow.vue"

    export default {
        name: "WordsAmountBlock",
        components: {
            ModalWindow
        },
        data() {
            return {
                data: [],
                inputValue: '',
                modalVisible: false,
                error: '',
                hint: '',
            }
        },
        async mounted() {
            this.data = await this.getAllWords()
        },
        methods: {
            async getAllWords() {
                const obj = await fetch('http://localhost:3000/word-list', {
                    method: 'GET',
                })
                const data = await obj.json()
                
                return data
            },
            checkInput() {
                if (this.inputValue === '' || this.inputValue === '0') {
                    return this.showModal('Заданное значение не существует')
                }

                let words = 'слов'
                if (this.data.length === 1) {
                    words += 'о'
                }
                if ([2,3,4].includes(this.data.length)) {
                    words += 'а'
                }

                if (this.inputValue > this.data.length) {
                    return this.showModal('Заданное значение не существует', `Всего в базе ${this.data.length+ ' ' + words}`)
                }

                this.$emit('numberOf', this.inputValue)
            },  
            showModal(err = 'Неизвестная ошибка', hint) {
                this.modalVisible = true
                this.error = err
                this.hint = hint
            },      
        }
    }
</script>

<style>

</style>
