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
            //startButton.hidden = true
            document.body.removeChild(startButton)

            let hint = document.createElement('h2')
                hint.id = 'hintForChoosingLanguage'
                hint.textContent = 'Выберите язык, с которого будете переводить'
                document.body.appendChild(hint)

            let engButton = document.createElement('button')
                engButton.className = 'languageButton'
                engButton.id = 'englishButton'
                engButton.textContent = 'Английский'
                engButton.addEventListener('click', () => startTesting('word_variants_en'))
                document.body.appendChild(engButton)

            let rusButton = document.createElement('button')
                rusButton.className = 'languageButton'
                rusButton.id = 'russianButton'
                rusButton.textContent = 'Русский'
                rusButton.addEventListener('click', () => startTesting('word_variants_ru'))
                document.body.appendChild(rusButton)
        }
    }
    

}

async function startTesting(wordsLng) {
    let hint = document.getElementById('hintForChoosingLanguage')
        document.body.removeChild(hint)

    let languageButton = document. getElementById('englishButton')
        document.body.removeChild(languageButton)
        languageButton = document. getElementById('russianButton')
        document.body.removeChild(languageButton)

    let data = await getWords()

    let randomWord = Math.floor(Math.random() * data[0][wordsLng].length)

    let word = document.createElement('p')
        word.id = 'word'
        word.textContent = data[0][wordsLng][randomWord]
        document.body.appendChild(word)

    let nextWordButton = document.createElement('button')
        nextWordButton.id = 'nextWord'
        nextWordButton.textContent = 'Следующее'
        nextWordButton.addEventListener('click', nextWord)
        document.body.appendChild(nextWordButton)
    
    data.splice(0, 1)

    function nextWord() {
        if (data.length == 0) {
            document.body.removeChild(word)
            document.body.removeChild(nextWordButton)
        } else {
            word.textContent = data[0][wordsLng][randomWord]
            data.splice(0, 1)
        }
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
     //let data = new FormData()
     //data.append('json', JSON.stringify(myData))


    fetch('http://localhost:3000/new-words', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}

function deleteWord(id) {

     //let data = new FormData()
     //data.append('json', JSON.stringify(myData))
    let url = `http://localhost:3000/delete-word?id=${id}`

    fetch(url, {
        method: 'DELETE'
    })
}

async function getWords() {
    const obj = await fetch('http://localhost:3000/word-list', {
        method: 'GET',
        //headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    const data = await obj.json()

    return data
        // .then(result => result.json())
        // .then(result => (getData(result)))

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



