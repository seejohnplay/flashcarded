import React, { Component } from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'
import DeckCard from './DeckCard'
import GenericButton from './GenericButton'

class PlayQuiz extends Component {
  static navigationOptions = {
    title: 'Play Quiz',
  }

  render() {
    const { deck } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text>Play Quiz</Text>
        <DeckCard deck={deck} />
        <GenericButton
          label='Add Card'
          onPress={() => this.props.navigation.navigate(
            'DeckDetail',
            { deck }
          )}
        />
        <GenericButton
          label='Start Quiz'
          onPress={() => this.props.navigation.navigate(
            'DeckDetail',
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
    backgroundColor: white,
    padding: 15,
  },
})

export default PlayQuiz