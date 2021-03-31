import React from 'react'
import { LogBox } from 'react-native' // Ignore log notification by message

import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import LogoTitle from './src/components/LogoTitle'
import HomeScreen from './src/screens/HomeScreen'
import ImageScreen from './src/screens/ImageScreen'
import BrowseImagesScreen from './src/screens/BrowseImagesScreen'
import { TagsContextProvider } from './src/utils/TagsContext'

import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { LightTheme, DarkTheme } from './src/config/themes'

LogBox.ignoreLogs(['tf.nonMaxSuppression'])

const Stack = createStackNavigator()

export default function App () {
  const colorScheme = useColorScheme()

  const MyTheme = colorScheme === 'light' || colorScheme === 'no-preference' ? LightTheme : DarkTheme

  return (
    <AppearanceProvider>
      <TagsContextProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'myTag', headerTitle: (props) => <LogoTitle {...props} /> }} // eslint-disable-line
          />
          <Stack.Screen
            name="Image"
            component={ImageScreen}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forRevealFromBottomAndroid
            }}
          />
          <Stack.Screen
            name="BrowseImages"
            component={BrowseImagesScreen}
            // options={{
            //   cardStyleInterpolator:
            //     CardStyleInterpolators.forHorizontalIOS
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TagsContextProvider>
    </AppearanceProvider>
  )
}
