import { AsyncStorage } from 'react-native'

const FLASHCARDED_STORAGE_KEY = 'Flashcarded::Decks'

export function fetchDecks () {
  // AsyncStorage.clear()
  return AsyncStorage.getItem(FLASHCARDED_STORAGE_KEY)
    .then((results) => JSON.parse(results))
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message)
      throw error
    })
}

export function fetchDeck(title) {
  return fetchDecks().then(results => results[title])
}

export function submitDeck ({ entry, key }) {
  return AsyncStorage.mergeItem(FLASHCARDED_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(FLASHCARDED_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDED_STORAGE_KEY, JSON.stringify(data))
    })
}