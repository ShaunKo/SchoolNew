import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Adventurer from '../Container/Adventure/Adventurer';
import EditAdventurer from '../Container/Adventure/EditAdventurer';
import PlanDetails from '../Container/Adventure/PLanDetails';
// import PlanEdit from './PlanEdit';

const Stack = createStackNavigator();
export default class AdventurerStack extends Component {
    render() {
        return(
            <Stack.Navigator>
                <Stack.Screen name="Adventurer" options={{ headerShown: false}} component={Adventurer} />
                <Stack.Screen name="EditAdventurer" options={{ headerShown: false}} component={EditAdventurer} />
                <Stack.Screen name="PlanDetails" options={{headerShown: false}} component={PlanDetails} />
                {/* 
                <Stack.Screen name="PlanDetails" options={{headerShown: false}} component={PlanDetails} />
                <Stack.Screen name="PlanEdit" options={{headerShown: false}} component={PlanEdit} /> */}
            </Stack.Navigator>
        );
    }
} 