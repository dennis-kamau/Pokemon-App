import React from "react";
import { SafeAreaView, Text } from "react-native";

const PokemonListScreen = () => {
    return(
        <SafeAreaView>
            <Text style={{color: '#000', fontSize: 42, textAlign: 'center', marginTop: 20}}>Pokemon List</Text>
        </SafeAreaView>
    )
}

export default PokemonListScreen;