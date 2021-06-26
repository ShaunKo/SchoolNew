import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import AdventurerStack from './AdventurerStack';
// import Cart from './Cart.js';
import Home from '../Container/Home/Home'

import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();
export default class NavigationList extends Component {
    render() {
        return (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                          let iconName;
              
                          if (route.name === '冒險者') {
                            iconName = focused
                              ? 'account-box'
                              : 'perm-identity';
                          } else if (route.name === '首頁') {
                            iconName = focused ? 'house' : 'roofing';
                          } else if (route.name === 'Cart') {
                            iconName = focused ? 'add-shopping-cart' : 'shopping-cart';
                          }
              
                          // You can return any component that you like here!
                          return <Icon name={iconName} size={size} color={color} />;
                        },
                      })}
                      tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'white',
                        style:{
                          backgroundColor: 'black',
                        }
                      }}>
                    <Tab.Screen name="首頁" component={HomeStack} />
                    <Tab.Screen name="冒險者" component={AdventurerStack} />
                    {/* <Tab.Screen name="Cart" component={Cart} /> */}
                </Tab.Navigator>
        );
    }
}