createButtons()

function createButtons() {
    createStartButton()

    function createStartButton() {
        let startButton = document.createElement('button')
            startButton.id = 'startButton'
            startButton.textContent = 'START'
            startButton.addEventListener('click', createLanguageSelectionButtons)
            document.body.appendChild(startButton)

        function createLanguageSelectionButtons() {
            document.body.removeChild(startButton)

            let hint = document.createElement('h2')
                hint.id = 'hintForChoosingLanguage'
                hint.textContent = 'Выберите язык, с которого будете переводить'
                document.body.appendChild(hint)

            let engButton = document.createElement('button')
                engButton.className = 'languageButton'
                engButton.id = 'englishButton'
                engButton.textContent = 'Английский'
                engButton.addEventListener('click', () => preparingForTest('word_variants_en', 'ru'))
                document.body.appendChild(engButton)

            let rusButton = document.createElement('button')
                rusButton.className = 'languageButton'
                rusButton.id = 'russianButton'
                rusButton.textContent = 'Русский'
                rusButton.addEventListener('click', () => preparingForTest('word_variants_ru', 'en'))
                document.body.appendChild(rusButton)
        }
    }
    

}

async function preparingForTest(wordsLng, targetLang) {
    deleteElementsForChoosingLanguage()
    await getNumberOfWords()
    
    function deleteElementsForChoosingLanguage() {
        let hint = document.getElementById('hintForChoosingLanguage')
        document.body.removeChild(hint)

        let languageButton = document. getElementById('englishButton')
            document.body.removeChild(languageButton)
            languageButton = document. getElementById('russianButton')
            document.body.removeChild(languageButton)
    }

    async function getNumberOfWords() {
        let data = await getAllWords()

        let hintForNumberOfWords = document.createElement('p')
            hintForNumberOfWords.className = 'ElementsForGettingNumberOfWords'
            hintForNumberOfWords.id = 'hintForGettingNumberOfWords'
            hintForNumberOfWords.textContent = 'Укажите желаемое количество слов'
            document.body.appendChild(hintForNumberOfWords)

        let inputForNumberOfWords = document.createElement('input')
            inputForNumberOfWords.className = 'ElementsForGettingNumberOfWords'
            inputForNumberOfWords.id = 'inputForGettingNumberOfWords'
            inputForNumberOfWords.type = 'number'
            inputForNumberOfWords.addEventListener('oninput', key => {
                key.value = key.value.replace(/\D/g, '')
            })
            inputForNumberOfWords.addEventListener( 'keyup', event => {
                if( event.code === 'Enter' ) {
                    if (inputForNumberOfWords.value == '' || inputForNumberOfWords.value == 0) {
                        inputForNumberOfWords.value = ''
                        return alert('Укажите корректное значение')
                    }
    
                    if (inputForNumberOfWords.value > data.length) {
                        inputForNumberOfWords.value = ''
                        return alert('В базе отсутсвует заданное количество слов')
                    }
    
                    startTest(inputForNumberOfWords.value, wordsLng, targetLang)
                }
            })
            document.body.appendChild(inputForNumberOfWords)

        let buttonForNumberOfWords = document.createElement('button')
            buttonForNumberOfWords.className = 'ElementsForGettingNumberOfWords'
            buttonForNumberOfWords.id = 'buttonForGettingNumberOfWords'
            buttonForNumberOfWords.textContent = 'Начать'
            buttonForNumberOfWords.addEventListener('click', event => {
                if (inputForNumberOfWords.value == '' || inputForNumberOfWords.value == 0) {
                    inputForNumberOfWords.value = ''
                    return alert('Укажите корректное значение')
                }

                if (inputForNumberOfWords.value > data.length) {
                    inputForNumberOfWords.value = ''
                    return alert('В базе отсутсвует заданное количество слов')
                }

                startTest(inputForNumberOfWords.value, wordsLng, targetLang)
            })
            document.body.appendChild(buttonForNumberOfWords)
    }
}

async function startTest(countOfWords, wordsLng, targetLang) {
    deleteElementsForGetNumberOfWords()
    
    let dataToShowWords = await getWordsForTest(countOfWords)
    let wordsToTranslate = []

    let randomWord = Math.floor(Math.random() * dataToShowWords[0][wordsLng].length)

    let word = document.createElement('p')
            word.id = 'word'
            word.textContent = dataToShowWords[0][wordsLng][randomWord]
            document.body.appendChild(word)
        
    let translateInput = document.createElement('input')
        translateInput.id = 'translateInput'
        translateInput.addEventListener( 'keyup', event => {
            if( event.code === 'Enter' ) nextWord()
        })
        document.body.appendChild(translateInput)

    let nextWordButton = document.createElement('button')
        nextWordButton.id = 'nextWord'
        nextWordButton.textContent = 'Следующее'
        nextWordButton.addEventListener('click', nextWord)
        document.body.appendChild(nextWordButton)

    let dataToCheck = {words: []}

    class ObjectForAddTranslate {
        constructor(id, translation) {
            this.id = id
            this.translation = translation
            this.targetLang = targetLang
        }
    }

    function deleteElementsForGetNumberOfWords() {
        let elements = document.body.querySelectorAll('.ElementsForGettingNumberOfWords')

        for (let i = 0; i < elements.length; i++) document.body.removeChild(elements[i])
    }

    function nextWord() {
        wordsToTranslate.push(word.textContent)
        dataToCheck.words.push(new ObjectForAddTranslate(dataToShowWords[0].id ,translateInput.value))
        dataToShowWords.splice(0, 1)

        if (dataToShowWords.length == 0) {
            document.body.removeChild(word)
            document.body.removeChild(translateInput)
            document.body.removeChild(nextWordButton)

            checkingData(dataToCheck)
        } else {
            word.textContent = dataToShowWords[0][wordsLng][randomWord]
            translateInput.value = ''
        }
    }

    async function checkingData(data) {

        const obj = await fetch('http://localhost:3000/upload-test', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        const resultData = await obj.json()
        
        showResult(wordsToTranslate, resultData, dataToCheck)
    }
}

function showResult(wordsToTranslate, dataWithResults, dataWithUserTranslation) {
    dataWithUserTranslation = [...dataWithUserTranslation.words]
    // console.log(wordsToTranslate)
    // console.log(dataWithResults)
    // console.log(dataWithUserTranslation)

    for (let i = 0; i < wordsToTranslate.length; i++) {
        let wordToTranslate = document.createElement('p')
            wordToTranslate.className = 'resultElements'
            wordToTranslate.textContent = wordsToTranslate[i]
            document.body.appendChild(wordToTranslate)

        let userAnswer = document.createElement('p')
            userAnswer.className = dataWithResults[i].passed ? 'resultElements correctTranslate' : 'resultElements incorrectTranslate'
            userAnswer.textContent = dataWithUserTranslation[i].translation
            document.body.appendChild(userAnswer)
            
    }

    let again = document.createElement('button')
        again.className = 'resultElements'
        again.textContent = 'Повторить'
        again.addEventListener('click', () => {
            let elements = document.body.querySelectorAll('.resultElements')
            for (let i = 0; i < elements.length; i++) document.body.removeChild(elements[i])

            createButtons()
        })
        document.body.appendChild(again)
}

function addWord() {
    let data = {
        words: [
            {
                 wordsEn: [
                    "Banana"
                 ],
                 wordsRu: [
                    "Банан"
                 ]
            }
        ]
     }

    fetch('http://localhost:3000/new-words', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}

function deleteWord(id) {
    let url = `http://localhost:3000/delete-word?id=${id}`

    fetch(url, {
        method: 'DELETE'
    })
}

async function getAllWords() {
    const obj = await fetch('http://localhost:3000/word-list', {
        method: 'GET',
    })
    const data = await obj.json()

    return data
}

async function getWordsForTest(count) {

    let url = `http://localhost:3000/get-test?wordsAmount=${count}`
    const obj = await fetch(url, {
        method: 'GET',
        //headers: {"Content-type": "application/json; charset=UTF-8"}
    })

    const data = await obj.json()
        .catch(err => {
            return 'Упс, что-то пошло не так'
        })

    return data
}

function updateWord(id) {
    let url = `http://localhost:3000/update-word?id=${id}`
    let data = {
        wordsEn: [
            "Hello"
        ],
        wordsRu: [
            "Привет",
            "Здравствуйте"
        ]
    }

    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}



