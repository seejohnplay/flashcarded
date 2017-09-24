import React, { Component } from 'react'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import DeckCard from './DeckCard'
import GenericButton from './GenericButton'

class PlayQuiz extends Component {
  static navigationOptions = {
    title: 'Play Quiz',
  }

  componentWillMount() {
    const { deck } = this.props.navigation.state.params
    this.state = {
      questions: Array.from(deck.questions),
      currentQuestion: null,
      totalQuestions: deck.questions.length,
      totalCorrect: 0,
      showAnswer: false
    }

    this.setState({ currentQuestion: this.state.questions.pop() })
  }

  onPress = () => this.setState({ showAnswer: !this.state.showAnswer })

  currentQuestionNumber = () => {
    return (this.state.totalQuestions - this.state.questions.length)
  }

  render() {
    if (this.state.currentQuestion) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 25}}>{this.currentQuestionNumber()}/{this.state.totalQuestions}</Text>
          <Text style={{fontSize: 40}}>{this.state.showAnswer
            ? this.state.currentQuestion.answer
            : this.state.currentQuestion.question}</Text>
          <TouchableOpacity onPress={this.onPress}>
          <Text style={{fontSize: 30, color: 'purple'}}>{this.state.showAnswer
            ? "Question"
            : "Answer"}</Text>
          </TouchableOpacity>
          <GenericButton
            label='Correct'
            onPress={() => {
              this.setState({
                totalCorrect: this.state.totalCorrect + 1,
                currentQuestion: this.state.questions.pop(),
                showAnswer: false
              })
            }}
          />
          <GenericButton
            label='Incorrect'
            onPress={() => {
              this.setState({
                currentQuestion: this.state.questions.pop(),
                showAnswer: false
              })
            }}
          />
        </View>
      )
    } else {
      clearLocalNotification()
        .then(setLocalNotification)

      return (
        <View style={styles.container}>
          <Text style={{fontSize: 40}}>Total score:</Text>
          <Text style={{fontSize: 40}}>{this.state.totalCorrect}/{this.state.totalQuestions}</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: white,
    padding: 15,
  },
})

export default PlayQuiz