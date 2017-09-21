import React, { Component } from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'
import DeckCard from './DeckCard'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params
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

export default DeckDetail