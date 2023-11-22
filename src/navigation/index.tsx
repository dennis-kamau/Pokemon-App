import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

import PokemonListScreen from "@Pokemon/screens/PokemonList/PokemonList";
import PokemonDetailsScreen from "@Pokemon/screens/PokemonDetails/PokemonDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={PokemonListScreen} />
            <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
        </Stack.Navigator>
    )
}

export default Navigation;