import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import DeckCard from './DeckCard'
import DeckDetail from './DeckDetail'
import { fetchDecks } from '../utils/api'

class DeckList extends Component {
  static navigationOptions = {
    title: 'Decks',
  }

  state = {
    decks: []
  }

  componentWillReceiveProps(nextProps) {
    this.getDecks()
  }

  componentDidMount() {
    this.getDecks()
  }

  getDecks = () => {
    fetchDecks()
    .then(results => this.setState({ decks: results }))
  }

  handlePress = (deck) => {
    this.props.navigation.navigate(
      'DeckDetail',
      { deck: deck, getDecks: this.getDecks }
    )
  }

  render() {
    const { decks } = this.state

    return (
      <ScrollView style={styles.container}>
        {decks && Object.keys(decks).map((deck, index) => {
          return (
            <DeckCard
              clickable={true}
              deck={decks[deck]}
              handlePress={this.handlePress}
              key={index}
            />
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
})

export default DeckList
