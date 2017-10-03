import React, { Component } from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'
import DeckCard from './DeckCard'
import GenericButton from './GenericButton'
import { NavigationActions } from 'react-navigation'
import { fetchDeck, submitDeck } from '../utils/api'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Deck',
      headerLeft: <Button
        title='Decks'
        color='#ffffff'
        onPress={ () => { navigation.navigate('Home', {}) }}
      />
    }
  }

  componentWillMount() {
    this.setState({ deck: this.props.navigation.state.params.deck })
  }

  updateDeck = (entry, key) => {
    submitDeck ({ entry, key })

    this.props.navigation.state.params.getDecks()

    fetchDeck(key)
    .then(deck => this.setState({ deck: deck }))
  }

  render() {
    const { deck } = this.state
    const { navigate, state } = this.props.navigation

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <DeckCard deck={deck} />
        </View>
        <View style={styles.buttonContainer}>
          <GenericButton
            label='Add Card'
            onPress={() => navigate('AddCard',
              { deck, updateDeck: this.updateDeck }
            )}
          />
          <GenericButton
            label='Start Quiz'
            onPress={() => navigate('PlayQuiz',
              { deck, getDecks: state.params.getDecks }
            )}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: white,
    padding: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around'
  }
})

export default DeckDetail
