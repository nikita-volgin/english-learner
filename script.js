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
                engButton.addEventListener('click', () => startTesting('word_variants_en', 'ru'))
                document.body.appendChild(engButton)

            let rusButton = document.createElement('button')
                rusButton.className = 'languageButton'
                rusButton.id = 'russianButton'
                rusButton.textContent = 'Русский'
                rusButton.addEventListener('click', () => startTesting('word_variants_ru', 'en'))
                document.body.appendChild(rusButton)
        }
    }
    

}

async function startTesting(wordsLng, targetLang) {
    let hint = document.getElementById('hintForChoosingLanguage')
        document.body.removeChild(hint)

    let languageButton = document. getElementById('englishButton')
        document.body.removeChild(languageButton)
        languageButton = document. getElementById('russianButton')
        document.body.removeChild(languageButton)

    let wordsAmount = prompt('Укажите желаемое количество слов для тестирования','2')

    let data = await getWordsForTesting(wordsAmount)

    let randomWord = Math.floor(Math.random() * data[0][wordsLng].length)

    let word = document.createElement('p')
        word.id = 'word'
        word.textContent = data[0][wordsLng][randomWord]
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

    class ObjectForAddTranslate {
        constructor(id, translation) {
            this.id = id
            this.translation = translation
            this.targetLang = targetLang
        }
    }

    let dataToCheck = {words: []}

    function nextWord() {
        dataToCheck.words.push(new ObjectForAddTranslate(data[0].id ,translateInput.value))
        data.splice(0, 1)

        if (data.length == 0) {
            document.body.removeChild(word)
            document.body.removeChild(translateInput)
            document.body.removeChild(nextWordButton)

            checkingData(dataToCheck)
        } else {
            word.textContent = data[0][wordsLng][randomWord]
            translateInput.value = ''
        }
    }

    async function checkingData(data) {
        console.log(data)

        const obj = await fetch('http://localhost:3000/upload-test', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        const returnData = await obj.json()
        console.log(returnData);
        return returnData

    }
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

async function getWordsForTesting(count) {

    let url = `http://localhost:3000/get-test?wordsAmount=${count}`
    const obj = await fetch(url, {
        method: 'GET',
        //headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    const data = await obj.json()

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



