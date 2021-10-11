import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'


import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { SchedulingComplete } from '../screens/SchedulingComplete'
import { MyCars } from '../screens/MyCars'

const  { Navigator, Screen }  = createStackNavigator();

const Stack = createStackNavigator();

export function StackRoutes(){
    return(

        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                gestureEnable: true,
                ...TransitionPresets.ModalPresentationIOS
            })}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CarDetails" component={CarDetails} />
            <Stack.Screen name="Scheduling" component={Scheduling} />
            <Stack.Screen name="SchedulingDetails" component={SchedulingDetails} />
            <Stack.Screen name="SchedulingComplete" component={SchedulingComplete} />
            <Stack.Screen name="MyCars" component={MyCars} />

        </Stack.Navigator>

        
    )
}