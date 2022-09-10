selectLanguage()


function selectLanguage() {
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
                engButton.addEventListener('click', () => startTesting('wordsEn'))
                document.body.appendChild(engButton)

            let rusButton = document.createElement('button')
                rusButton.className = 'languageButton'
                rusButton.id = 'russianButton'
                rusButton.textContent = 'Русский'
                rusButton.addEventListener('click', () => startTesting('wordsRu'))
                document.body.appendChild(rusButton)
        }
    }
    

}

function startTesting(wordsLng) {
    let hint = document.getElementById('hintForChoosingLanguage')
        document.body.removeChild(hint)

    let languageButton = document. getElementById('englishButton')
        document.body.removeChild(languageButton)
        languageButton = document. getElementById('russianButton')
        document.body.removeChild(languageButton)
}

function addWord() {
    let data = {
        words: [
            {
                 wordsEn: [
                     "test",
                     "test"
                 ],
                 wordsRu: [
                     "test",
                     "2222"
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

function getWords() {
    fetch('http://localhost:3000/word-list', {
        method: 'GET',
        //headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(result => result.json())
        .then(result => result)


    function createElement(data) {
        let pre = document.createElement('pre')

        pre.textContent = data
        document.body.appendChild(pre)
    }
}

function updateWord(id) {
    let url = `http://localhost:3000/update-word?id=${id}`
    let data = {
        "wordsEn": [
            "йцук",
            "фыва"
        ],
        "wordsRu": [
            "qwer",
            "asdf"
        ]
    }

    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}



