import React from "react";
import { SafeAreaView, Text, View, StatusBar, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { Searchbar } from 'react-native-paper';
import Styles from "./Styles";
import THEME from "@Pokemon/theme";
import FetchPokemons from "@Pokemon/apis/FetchPokemons";
import PokemonCard from "@Pokemon/components/PokemonCard/PokemonCard";
import ErrorState from "@Pokemon/components/ErrorState/ErrorState";
import ConvertToUniqueArray from "@Pokemon/utils/ConvertToUniqueArray";

const PokemonListScreen = () => {

    const [Pokemons, SetPokemons] = React.useState<any[]>([]);

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
                    SetPokemons((currentPokemons) => ConvertToUniqueArray([...currentPokemons, ...res.data.results], 'url'));

                    if (res.data.results.length && res.data.results.length < 20) {
                        setCanFetchMore(false);
                    }

                    return;
                }

                if (res.error) {
                    setError({ title: res.error.title, msg: res.error.message });
                }
            })
    }, []);

    React.useEffect(() => {
        setIsFetching(true);

        FetchPokemonsList({ limit: 20, offset: Pokemons.length })
            .then(() => {
                setIsFetching(false);
            });
    }, []);

    const onRefresh = React.useCallback(async () => {
        setIsRefreshing(true);

        FetchPokemonsList({ limit: Pokemons.length, offset: 0 })
            .then(() => {
                setIsRefreshing(false);
            })
    }, [Pokemons]);

    const onFetchMore = React.useCallback(async () => {
        setIsFetchingMore(true);

        FetchPokemonsList({ limit: 20, offset: Pokemons.length })
            .then(() => {
                setIsFetchingMore(false);
            })
    }, [Pokemons]);



    return (
        <SafeAreaView style={Styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={THEME.Colors.background} />
            {/* <Text style={Styles.title}>What pokemon are you looking for?</Text> */}

            <FlatList
                data={Pokemons}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                keyExtractor={(item) => item.url}
                numColumns={2}
                style={Styles.scrollContainer}
                // stickyHeaderIndices={[0]}
                // StickyHeaderComponent={SearchBar}
                // StickyHeaderComponent={}
                stickyHeaderHiddenOnScroll
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.01}
                onEndReached={canFetchMore ? onFetchMore : undefined}
                ListFooterComponent={
                    isFetchingMore && canFetchMore ? <ActivityIndicator color={THEME.Colors.primary} size="large" /> : undefined
                }
                refreshControl={<RefreshControl refreshing={isRefreshing} colors={[THEME.Colors.primary]} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    <>
                        {
                            !isFetching && error.title?.length ? (
                                <ErrorState msg={error.msg} title={error.title} image={require('@Pokemon/assets/pokeball.png')} />
                            ) :
                                (
                                    <View style={Styles.loadingContainer}>
                                        <ActivityIndicator color={THEME.Colors.primary} size="large" />
                                    </View>
                                )
                        }
                    </>
                }
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