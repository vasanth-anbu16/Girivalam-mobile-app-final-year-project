import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import DeepamFestivalScreen from "../screens/DeepamFestivalScreen";
import FootPathScreen from "../screens/FootPathScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="DeepamFestivalScreen" component={DeepamFestivalScreen} />
            <Stack.Screen name="FootPathScreen" component={FootPathScreen} />
        </Stack.Navigator>
    );
}
