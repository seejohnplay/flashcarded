import React, { Component } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'

class DeckCard extends Component {
  state = {
    bounceValue: new Animated.Value(1),
  }

  handlePress = (deck) => {
    const { clickable, handlePress } = this.props
    const { bounceValue } = this.state

    if(clickable) {
      Animated.sequence([
        Animated.timing(bounceValue, { duration: 100, toValue: .5 }),
        Animated.spring(bounceValue, { toValue: 1, friction: 4 })
      ]).start(() => handlePress(deck))
    }
  }

  render() {
    const { clickable, deck } = this.props
    const { bounceValue } = this.state

    return (
      <TouchableOpacity
        disabled={!clickable}
        style={styles.deck}
        onPress={() => this.handlePress(deck)}
      >
        <Animated.View style={{transform: [{scale: bounceValue}]}}>
          <Text style={styles.deckTitle}>
            {deck.title}
          </Text>
          <Text style={styles.deckCards}>
            {deck.questions.length} cards
          </Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    paddingTop: 80,
    paddingBottom: 80,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitle: {
    textAlign: 'center',
    fontSize: 30
  },
  deckCards: {
    textAlign: 'center',
    fontSize: 20,
    color: gray
  }
})

export default DeckCard
