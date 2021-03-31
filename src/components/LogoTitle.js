import React from 'react'
import { View, Text } from 'react-native'
// import DarkIcon from '../../assets/dark-icon.png'

const LOGO_SIZE = 25

export default function LogoTitle () {
  return (
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Image
                source={DarkIcon}
                style={{width: LOGO_SIZE, height: LOGO_SIZE, tintColor: 'rgb(30, 30, 32)'}}
            /> */}
            <Text style={{ fontSize: 21.5, margin: LOGO_SIZE / 3, fontWeight: 'normal' }}>myTag</Text>
        </View>
  )
}
