import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Container/Login/Login';
import ForgotPassword from '../Container/Login/ForgotPassword';
import Enroll from '../Container/Login/Enroll';
import NavigationList from './NavigationList';
import Privacy from '../Container/Login/Privacy';

const Stack = createStackNavigator();

export default class MainStack extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" options={{ headerShown: false}} component={Login} />
                    <Stack.Screen name="Enroll" options={{headerShown: false}} component={Enroll} />
                    <Stack.Screen name="ForgotPassword" options={{headerShown: false}} component={ForgotPassword} />
                    <Stack.Screen name="Privacy" options={{headerShown: false}} component={Privacy} />
                    <Stack.Screen name="NavigationList" options={{headerShown: false}} component={NavigationList} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}