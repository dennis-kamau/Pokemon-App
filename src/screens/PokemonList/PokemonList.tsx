import React from "react";
import { SafeAreaView, Text, View, StatusBar, ScrollView, FlatList } from "react-native";
import { Searchbar } from 'react-native-paper';
import Styles from "./Styles";
import THEME from "@Pokemon/theme";
import FetchPokemons from "@Pokemon/apis/FetchPokemons";
import PokemonCard from "@Pokemon/components/PokemonCard/PokemonCard";

const PokemonListScreen = () => {

    const [Pokemons, SetPokemons] = React.useState<any[]>([]);

    const [isLoading, setIsLoading] = React.useState(true);

    const FetchPokemonsList = React.useCallback(async () => {
        FetchPokemons({ limit: 20, offset: Pokemons.length })
            .then((data) => {
                SetPokemons((currentPokemons) => [...currentPokemons, ...data.results]);
            })
            .catch((err) => {
                console.log('An error occured!');
                console.log(err);
            });
    }, [Pokemons]);

    React.useEffect(() => {
        setIsLoading(true);

        FetchPokemonsList()
            .finally(() => {
                setIsLoading(false);
            });
    }, []);


    const SearchBar = React.useCallback(() => {
        return (
            <View style={Styles.searchContainer}>
                <Searchbar value="" placeholder="Search pokemon..." />
            </View>)
    }, []);

    return (
        <SafeAreaView style={Styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={THEME.Colors.background} />
            {/* <Text style={Styles.title}>What pokemon are you looking for?</Text> */}

            <FlatList
                data={Pokemons}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                keyExtractor={(item) => item.url}
                numColumns={2}
                stickyHeaderIndices={[0]}
                StickyHeaderComponent={SearchBar}
                stickyHeaderHiddenOnScroll
                key={'TTTT'}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <Text style={Styles.title}>What pokemon are you looking for?</Text>
                        <View style={Styles.searchContainer}>
                            <Searchbar value="" placeholder="Search pokemon..." />
                        </View>
                    </>
                }
            />
        </SafeAreaView>
    )
}

export default PokemonListScreen;