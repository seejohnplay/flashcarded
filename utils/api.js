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
  return fetchDecks().then(results => results ? results[title] : null)
}

export function submitDeck ({ entry, key }) {
  return AsyncStorage.mergeItem(FLASHCARDED_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
  .catch(function(error) {
    console.log('There has been a problem with your submit operation: ' + error.message)
    throw error
  })
}
