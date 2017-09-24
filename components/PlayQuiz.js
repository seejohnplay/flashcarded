import React, { Component } from 'react'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import DeckCard from './DeckCard'
import GenericButton from './GenericButton'

class PlayQuiz extends Component {
  static navigationOptions = { title: 'Quiz', header: null }

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
    const { deck, getDecks } = this.props.navigation.state.params

    if (this.state.currentQuestion) {
      return (
        <View style={styles.container}>
          <View style={styles.centeredContainer}>
            <Text style={{fontSize: 25}}>Question {this.currentQuestionNumber()} of {this.state.totalQuestions}</Text>
            <Text style={{fontSize: 40}}>{this.state.showAnswer
              ? this.state.currentQuestion.answer
              : this.state.currentQuestion.question}</Text>
            <TouchableOpacity onPress={this.onPress}>
            <Text style={{fontSize: 30, color: 'purple'}}>{this.state.showAnswer
              ? "Question"
              : "Answer"}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'space-around'}}>
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
        </View>
      )
    } else {
      clearLocalNotification()
        .then(setLocalNotification)

      return (
        <View style={styles.container}>
          <View style={styles.centeredContainer}>
            <Text style={{fontSize: 40}}>Total score:</Text>
            <Text style={{fontSize: 40}}>{this.state.totalCorrect} out of {this.state.totalQuestions}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'space-around'}}>
            <GenericButton
              label='Restart Quiz'
              onPress={() => this.props.navigation.navigate(
                'PlayQuiz',
                { deck }
              )}
            />
            <GenericButton
              label='Back to Deck'
              onPress={() => this.props.navigation.navigate(
                'DeckDetail',
                { deck, getDecks: getDecks }
              )}
            />
          </View>
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
    backgroundColor: white,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})

export default PlayQuiz