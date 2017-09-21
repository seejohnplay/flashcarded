import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import DeckCard from './DeckCard'
import DeckDetail from './DeckDetail'

deckList = [
  {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  {
    title: 'Random',
    questions: [
      {
        question: 'Which state only boarder one other state?',
        answer: 'Maine'
      }
    ]
  }
]

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class DeckList extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {deckList.map(deck => {
          return (
            <TouchableOpacity
              style={styles.deck} key={deck.title}
              onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deck }
            )}>
              <DeckCard deck={deck} />
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