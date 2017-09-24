import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import DeckCard from './DeckCard'
import DeckDetail from './DeckDetail'
import { fetchDecks } from '../utils/api'

class DeckList extends Component {
  state = {
    ready: false,
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
    .then(() => this.setState(() => ({ready: true})))
    .catch(error => console.log("Api error:" + error))
  }

  static navigationOptions = {
    title: 'Decks',
  }

  render() {
    const { decks } = this.state

    return (
      <ScrollView style={styles.container}>
        {decks && Object.keys(decks).map(deck => {
          return (
            <TouchableOpacity
              style={styles.deck} key={decks[deck].title}
              onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deck: decks[deck], getDecks: this.getDecks }
            )}>
              <DeckCard deck={decks[deck]} />
            </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
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
})

export default DeckList