import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Container/Home/Home';
// import Need from './Need.js';
import Order from '../Container/Home/Order';

const Stack = createStackNavigator();
export default class HomeStack extends Component {
    render() {
        return(
            <Stack.Navigator>
                <Stack.Screen name="首頁" options={{ headerShown: false}} component={Home} />
                <Stack.Screen name="訂單" options={{headerShown: false}} component={Order} />
                {/* <Stack.Screen name="Need" options={{ headerShown: false}} component={Need} />
                <Stack.Screen name="訂單" options={{headerShown: false}} component={Order} /> */}
            </Stack.Navigator>
        );
    }
} 