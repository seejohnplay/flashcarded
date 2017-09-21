import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'

export default function DeckCard ({ deck }) {
  return (

      <View>
        <Text style={{textAlign: 'center', fontSize: 30}}>
          {deck.title}
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20, color: gray}}>
          {deck.questions.length} cards
        </Text>
      </View>
  )
}

const styles = StyleSheet.create({

})
