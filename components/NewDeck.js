import React, { Component } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import { red, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import GenericButton from './GenericButton'
import { fetchDeck, fetchDecks, submitDeck } from '../utils/api'

class NewDeck extends Component {
  state = {
    title: ''
  }

  getDecks = () => {
    fetchDecks()
    .then(results => this.setState({ decks: results }))
  }

  submit = () => {
    const key = this.state.title.trim()

    if (key) {
      const entry = {title: key, questions: []}

      fetchDeck(key)
      .then(existingDeckName => {
        if(existingDeckName) {
          this.setState({ showValidationMessage: true })
        } else {
          submitDeck ({ entry, key })

          fetchDeck(key)
          .then(newDeck => {
            this.setState({text: '', showValidationMessage: false})
            Keyboard.dismiss()
            this.props.navigation.navigate('DeckDetail', { deck: newDeck, getDecks: this.getDecks })
          })
          .catch(error => console.log('Api error: ' + error))
        }
      })
    } else {
      this.setState({ showValidationMessage: true })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.showValidationMessage &&
          <Text style={styles.validationMessage} >Please enter a unique deck name!</Text> }

        <Text style={styles.centered}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Title'
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <GenericButton label='Create Deck' onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  centered: {
    textAlign: 'center',
    fontSize: 30
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 40,
    marginBottom: 40
  },
  validationMessage: {
    color: red,
    marginBottom: 10
  }
})

export default NewDeck
