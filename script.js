// DOM elements
const inputField = document.querySelector('#input')
const rhyme = document.querySelector('#rhyme')
const adjectives = document.querySelector('#adjectives')
const similar = document.querySelector('#similar')
const synonyms = document.querySelector('#synonyms')
const responseField = document.querySelector('#response-field')
const random = document.querySelector('#random')
const slike = document.querySelector('#slike')
const btnDisplay20 = document.querySelector('#q-20')
const btnDisplay50 = document.querySelector('#q-50')
const btnDisplayAll = document.querySelector('#all')
const btnArray = [btnDisplay20,btnDisplay50,btnDisplayAll]
// Number of words in custom dictionary/ list
const nrOfWordsInDict = 3782
// This variable is for max q of displayed words
let maxQuantity = 20;

// Dictionary data, returns a promise
const getDictionaryData = async () => await fetch('./dictionary.json').then(res => res.json())
.then(data => {
  return data
})

// Assigning the promise to a variable
const dictionaryData = getDictionaryData()

const randomWord = (event) => {
  // Prevens refreashing the page
  event.preventDefault()
  // Clears the response field
  responseField.innerHTML = ''
  // Random number
  let random = Math.floor(Math.random() * nrOfWordsInDict)

  dictionaryData.then(x => {
    inputField.value = x[random]
  })
}

// API 
const url = 'https://api.datamuse.com/words?'


const toggleParams = (event) => {
  // Clears response field instead of it being simply overritten later
  responseField.innerHTML = ''
  // Prevent default so the windows does not refreash
  event.preventDefault()
  // 
  let queryParams = ''

  if(event.target === rhyme) {
  	queryParams = 'rel_rhy='
  } else if (event.target === adjectives) {
  	queryParams = 'rel_jjb='
  } else if (event.target === similar) {
  	queryParams = 'ml='
  } else if (event.target === synonyms) {
  	queryParams = 'rel_syn='
  } else if (event.target === slike) {
  	queryParams = 'sl='
  } 

  fetchAPI(queryParams)

}

const fetchAPI = async (queryParams) => {
  let wordQuery = inputField.value

  // The complete API endpoint url
  const endpoint = `${url}${queryParams}${wordQuery}`
  
  await fetch(endpoint).then(res => res.json()).then(data => {
    //console.log(data)
    renderResponse(data)
  })
  
}

const renderResponse = (data) => {
  const rhymeArray = data.map(x => x['word'])
  console.log(rhymeArray)

  if(rhymeArray.length === 0) {
    responseField.innerHTML = "Try again.."
  } else {
    // Randomizes rhyms
    let shuffledArray = shuffle(rhymeArray)

    // Displays a certain amount of words
    let slicedArray = shuffledArray.slice(0, maxQuantity)

    responseField.innerHTML = slicedArray.map(word => {
      return " " + word
    })
  }
}

/** Shuffles array in place. */

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

function toggleDisplay(event) {
   
  if(event.target === btnDisplay20) {
    maxQuantity = 20
    toggleBtnClass(event)
  } else if (event.target === btnDisplay50) {
    maxQuantity = 50
    toggleBtnClass(event)
  } else if (event.target === btnDisplayAll) {
    maxQuantity = 10000
    toggleBtnClass(event)
  }
}

function toggleBtnClass(event) {
  // Clearing all the classes
  for(let i = 0; i < btnArray.length; i++) {
    btnArray[i].classList.remove("active");
  }
  // Adding class to an element passed throuh event
  event.target.classList.add("active");
}

adjectives.addEventListener('click', toggleParams)
rhyme.addEventListener('click', toggleParams)
similar.addEventListener('click', toggleParams)
synonyms.addEventListener('click', toggleParams)
slike.addEventListener('click', toggleParams)
random.addEventListener('click', randomWord)

// Buttons that control amount of words displayed
btnDisplay20.addEventListener('click', toggleDisplay)
btnDisplay50.addEventListener('click', toggleDisplay)
btnDisplayAll.addEventListener('click', toggleDisplay)