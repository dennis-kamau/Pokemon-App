import React from "react";
import { SafeAreaView, Text, View, StatusBar, ActivityIndicator, FlatList, RefreshControl, ScrollView } from "react-native";
import { IconButton, Searchbar } from 'react-native-paper';
import Styles from "./Styles";
import THEME from "@Pokemon/theme";
import FetchPokemons from "@Pokemon/apis/FetchPokemons";
import PokemonCard from "@Pokemon/components/PokemonCard/PokemonCard";
import ErrorState from "@Pokemon/components/ErrorState/ErrorState";
import ConvertToUniqueArray from "@Pokemon/utils/ConvertToUniqueArray";

const PokemonListScreen = () => {

    const [PokemonsList, SetPokemonsList] = React.useState<any[]>([]); // All fetched Pokemons
    const [Pokemons, SetPokemons] = React.useState<any[]>([]); // Displayed Pokemons

    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchInput, setSearchInput] = React.useState('');
    const [showFixedSearchBar, setShowFixedSearchBar] = React.useState(false);

    const [isFetching, setIsFetching] = React.useState(true);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [canFetchMore, setCanFetchMore] = React.useState(true);
    const [isFetchingMore, setIsFetchingMore] = React.useState(false);
    const [error, setError] = React.useState({ title: '', msg: '' });

    const FetchPokemonsList = React.useCallback(async ({ limit, offset }: { limit: number, offset: number }) => {
        setCanFetchMore(true);
        setError({ title: '', msg: '' });

        return FetchPokemons({ limit, offset })
            .then((res) => {
                if (res.status) {
                    let mergedPokemonList: any[] = [];

                    SetPokemonsList((currentPokemons) => { mergedPokemonList = ConvertToUniqueArray([...currentPokemons, ...res.data.results], 'url'); return mergedPokemonList });
                    filterPokemons(mergedPokemonList, searchTerm);

                    if (res.data.results.length && res.data.results.length < 20) {
                        setCanFetchMore(false);
                    }

                    return;
                }

                if (res.error) {
                    setError({ title: res.error.title, msg: res.error.message });
                }
            })
    }, [searchTerm]);

    React.useEffect(() => {
        setIsFetching(true);
        let limit = 20;

        if (searchTerm.length) limit = 500;

        FetchPokemonsList({ limit: 20, offset: Pokemons.length })
            .then(() => {
                setIsFetching(false);
            });
    }, [searchTerm]);

    const filterPokemons = React.useCallback((pokemonData: Array<any>, searchStr: string) => {
        SetPokemons(searchStr.length < 1 ? pokemonData : pokemonData.filter((pokemon) => String(pokemon.name).indexOf(searchStr) !== -1))
    }, []);

    const onRefresh = React.useCallback(async () => {
        setIsRefreshing(true);

        FetchPokemonsList({ limit: PokemonsList.length, offset: 0 })
            .then(() => {
                setIsRefreshing(false);
            })
    }, [PokemonsList]);

    const onSearch = React.useCallback(() => {
        setSearchTerm(searchInput);
        // filterPokemons(PokemonsList, searchInput);
    }, [searchInput, PokemonsList]);

    const onFetchMore = React.useCallback(async () => {
        setIsFetchingMore(true);
        let limit = 20;

        if (searchTerm.length) limit = 500;

        FetchPokemonsList({ limit: 20, offset: PokemonsList.length })
            .then(() => {
                setIsFetchingMore(false);
            })
    }, [PokemonsList, searchTerm]);

    return (
        <SafeAreaView style={Styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={THEME.Colors.background} />

            <FlatList nestedScrollEnabled
                data={Pokemons}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                keyExtractor={(item) => item.url}
                numColumns={2}
                style={Styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.01}
                onEndReached={canFetchMore && !isFetching ? onFetchMore : undefined}
                decelerationRate={0.9}
                ListFooterComponent={
                    !isFetching && isFetchingMore && canFetchMore ? <ActivityIndicator color={THEME.Colors.primary} size="large" /> : undefined
                }
                refreshControl={<RefreshControl refreshing={isRefreshing} colors={[THEME.Colors.primary]} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    <>
                        {
                            !isFetching && error.title?.length ? (
                                <ErrorState msg={error.msg} title={error.title} image={require('@Pokemon/assets/pokeball.png')} />
                            ) :
                                (
                                    isFetching ? (
                                        <View style={Styles.loadingContainer}>
                                            <ActivityIndicator color={THEME.Colors.primary} size="large" />
                                        </View>
                                    ) : (
                                        <ErrorState msg={'Try adjusting your search or filters to find what you are looking for.'} title={'No Pokemons Found!'} image={require('@Pokemon/assets/pokeball.png')} />
                                    )
                                )


                        }
                    </>
                }
                ListHeaderComponent={
                    <>
                        <Text style={Styles.title}>What pokemon are you looking for?</Text>
                        <View style={Styles.searchContainer}>
                            <Searchbar onClearIconPress={onSearch} onSubmitEditing={onSearch} value={searchInput} onChangeText={setSearchInput} placeholder="Search pokemon..." style={{ borderRadius: 7.5, height: 55, flex: 1 }} inputStyle={{ height: 50 }} />
                            {/* <IconButton icon="filter-variant" size={28} containerColor={THEME.Colors.text} iconColor={THEME.Colors.onPrimary} onPress={() => { }} mode="contained-tonal" style={{ borderRadius: 7.5, height: 55, width: 55, marginTop: -1 }} /> */}
                        </View>
                    </>
                }
            />
        </SafeAreaView>
    )
}

export default PokemonListScreen;