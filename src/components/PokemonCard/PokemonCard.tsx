import React from 'react';
import { Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import Styles from './Styles';
import THEME from '@Pokemon/theme';

const PokemonCard = ({ pokemon }: { pokemon: any }) => {
    const navigation = useNavigation();

    const pokemonIndex = String(pokemon?.url).split('/')[String(pokemon?.url).split('/').length - 2];

    return (
        <View style={Styles.container}>
            <Card elevation={1} onPress={() => navigation.navigate('PokemonDetails', { pokemonIndex, name: pokemon?.name })} style={{backgroundColor: THEME.Colors.background}}>
                <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png` }} style={Styles.pokemonImage} />
                <Text style={Styles.pokemanName}>{pokemon?.name}</Text>
            </Card>
        </View>
    );
}

export default PokemonCard;
