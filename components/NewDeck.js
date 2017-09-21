import React, { Component } from 'react'
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}
class NewDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  submit = () => {
    // validate title for uniqueness?

    // persist deck in data store

    this.setState({text: ''})
    Keyboard.dismiss()
    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
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
        <SubmitBtn onPress={this.submit} />
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
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
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