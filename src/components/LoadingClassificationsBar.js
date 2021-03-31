import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as Progress from 'expo-progress'
import { useColorScheme } from 'react-native-appearance'
import { DarkTheme, LightTheme } from '../config/themes'

export default function LoadingClassificationsBar ({ completedPercentage }) {
  const colorScheme = useColorScheme()
  const [message, setMessage] = useState('Loading AI, please wait...')

  useEffect(() => {
    if (completedPercentage > 0 && completedPercentage < 1) {
      setMessage(
        `Already classified ${(completedPercentage * 100.0).toFixed(
          2
        )}% of images`
      )
    } else if (completedPercentage === 1) {
      setMessage('Done! :)')
    }
  }, [completedPercentage])

  return (
    <View>
      <Text style={getTextStyle(colorScheme)}>{message}</Text>
      {completedPercentage < 1
        ? (
        <Progress.Bar
          isIndeterminate={!completedPercentage}
          progress={completedPercentage || 0.5}
          color="#7fe7cc"
        />
          )
        : (
        <View />
          )}
    </View>
  )
}

// Get dynamic text styling , separated to avoid adding everything inline in future
const getTextStyle = (colorScheme) => {
  const { colors } = colorScheme === 'light' || colorScheme === 'no-preference' ? LightTheme : DarkTheme
  return [
    styles.text,
    {
      color: colors.text
    }
  ]
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontStyle: 'italic'
  }
})
