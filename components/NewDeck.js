import React, { Component } from 'react'
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { purple, red, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import GenericButton from './GenericButton'
import { fetchDeck, submitDeck } from '../utils/api'

class NewDeck extends Component {
  state = {}

  submit = () => {
    if (this.state.text) {
      const key = this.state.text
      const entry = {title: this.state.text, questions: []}
      submitDeck ({ entry, key })

      this.setState({text: '', showValidationMessage: false})
      Keyboard.dismiss()
      this.props.navigation.navigate('DeckList', { ready: false })
    } else {
      this.setState({ showValidationMessage: true })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.showValidationMessage &&
          <Text style={{color: red, marginBottom: 10}} >Please enter a unique deck name!</Text> }

        <Text style={{textAlign: 'center', fontSize: 30}}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Title'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
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

export default NewDeck