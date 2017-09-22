import React, { Component } from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'
import DeckCard from './DeckCard'
import GenericButton from './GenericButton'

class DeckDetail extends Component {
  static navigationOptions = {
    title: 'Deck',
  }

  reset = () => {
    const { goBack } = this.props.navigation
    goBack()
  }

  shouldComponentUpdate (nextProps) {
  }

  render() {
    const { deck } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <DeckCard deck={deck} />
        <GenericButton
          label='Add Card'
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            { deck }
          )}
        />
        <GenericButton
          label='Start Quiz'
          onPress={() => this.props.navigation.navigate(
            'PlayQuiz',
            { deck }
          )}
        />
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
})

export default DeckDetail