import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Home from './src/Container/Home/Home';
import Login from './src/Container/Login/Login';
import MainStack from './src/Navigation/MainStack';
import NavigationList from './src/Navigation/NavigationList'


export default class App extends Component {
  render() {
    return (
      <MainStack />
    );
  }
}