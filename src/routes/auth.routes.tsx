import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Confirmation } from '../screens/Confirmation';

const  { Navigator, Screen }  = createStackNavigator();

const Stack = createStackNavigator();

export function AuthRoutes(){
    return(

        <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                gestureEnable: true,
                ...TransitionPresets.ModalPresentationIOS
            })}
        >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUpFirstStep" component={SignUpFirstStep} />
            <Stack.Screen name="SignUpSecondStep" component={SignUpSecondStep} />
            <Stack.Screen name="Confirmation" component={Confirmation} />

        </Stack.Navigator>

        
    )
}