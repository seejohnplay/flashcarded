import React, { Component } from 'react'
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import GenericButton from './GenericButton'

class AddCard extends Component {
  state = { question: '', answer: '' }

  submit = () => {
    // validate title for uniqueness?

    const { title, questions } = this.props.navigation.state.params.deck
    const newQuestion = { question: this.state.question, answer: this.state.answer }
    const key = title
    const entry = {title: title, questions: [...questions, newQuestion]}

    this.props.navigation.state.params.updateDeck (entry, key)

    this.setState({ question: '', answer: '' })
    Keyboard.dismiss()
    this.props.navigation.goBack(null)
  }

  render() {
    const { title, questions } = this.props.navigation.state.params.deck

    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Question'
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Answer'
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <GenericButton label='SUBMIT' onPress={this.submit} />
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
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 40,
    marginBottom: 40
  }
})

export default AddCard