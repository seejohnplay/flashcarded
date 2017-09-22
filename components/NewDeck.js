import React, { Component } from 'react'
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import GenericButton from './GenericButton'
import { submitDeck } from '../utils/api'

class NewDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  submit = () => {
    // validate title for uniqueness?

    const key = this.state.text
    const entry = {title: this.state.text, questions: []}
    submitDeck ({ entry, key })

    this.setState({text: ''})
    Keyboard.dismiss()
    this.props.navigation.navigate('DeckList', {ready: false})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 30}}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Title'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
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

export default NewDeck