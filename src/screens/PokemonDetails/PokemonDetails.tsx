import React from "react";
import { SafeAreaView, View, Text, Image, ScrollView, ActivityIndicator, RefreshControl, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IconButton, Button } from 'react-native-paper';
import Styles from "./Styles";
import THEME from "@Pokemon/theme";
import FetchPokemonById from "@Pokemon/apis/FetchPokemonById";
import ErrorState from "@Pokemon/components/ErrorState/ErrorState";
import { BarChart } from "react-native-chart-kit";
import AbilityCard from "@Pokemon/components/AbilityCard/AbilityCard";
import MoveCard from "@Pokemon/components/MoveCard/MoveCard";

const screenWidth = Dimensions.get("window").width;

const PokemonDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();

    const pokemonName = route.params?.name || undefined;
    const pokemonIndex = route.params?.pokemonIndex || undefined;

    const [Pokemon, setPokemon] = React.useState<any>({});
    const [isFetching, setIsFetching] = React.useState(true);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [error, setError] = React.useState({ title: '', msg: '' });

    const [activeTab, setActiveTab] = React.useState('Info');

    const menu = ['Info', 'Abilities', 'Stats', 'Moves'];

    const FetchPokemonByPokemonIndex = React.useCallback(async () => {
        setError({ title: '', msg: '' });

        return FetchPokemonById(pokemonIndex)
            .then((res) => {

                if (res.status) {
                    setPokemon(res.data);
                    return;
                }

                if (res.error) {
                    setError({ title: res.error.title, msg: res.error.message });
                }
            })
    }, [pokemonIndex])

    React.useEffect(() => {
        setIsFetching(true);
        setPokemon({});
        setActiveTab('Info');

        FetchPokemonByPokemonIndex()
            .then(() => {
                setIsFetching(false);
            })
    }, [pokemonIndex])

    const onRefresh = React.useCallback(async () => {
        setIsRefreshing(true);

        FetchPokemonByPokemonIndex()
            .then(() => {
                setIsRefreshing(false);
            })
    }, [pokemonIndex])

    if (isFetching) return (
        <ScrollView style={Styles.container}>

            <View style={Styles.topbar}>
                <IconButton iconColor={THEME.Colors.primary} icon="keyboard-backspace" size={27} onPress={() => navigation.goBack()} />
                <Text style={Styles.title}>{pokemonName || 'Pokemon Details'}</Text>
            </View>

            <View style={Styles.loadingContainer}>
                <ActivityIndicator color={THEME.Colors.primary} size="large" />
            </View>

        </ScrollView>
    )


    if (Pokemon?.id === undefined || Pokemon?.name === undefined) return (
        <ScrollView
            style={Styles.container}
            refreshControl={<RefreshControl refreshing={isRefreshing} colors={[THEME.Colors.primary]} onRefresh={onRefresh} />}
        >

            <View style={Styles.topbar}>
                <IconButton iconColor={THEME.Colors.primary} icon="keyboard-backspace" size={27} onPress={() => navigation.goBack()} />
                <Text style={Styles.title}>{pokemonName || 'Pokemon Details'}</Text>
            </View>

            <ErrorState image={require('@Pokemon/assets/pokeball.png')} title={error.title || 'Pokemon Not Found'} msg={error.msg || 'The pokemon you are looking for is either missing or temporary unavailable!'} />

        </ScrollView>
    )

    const chartConfig = {
        backgroundColor: THEME.Colors.background,
        backgroundGradientFrom: THEME.Colors.background,
        backgroundGradientTo: THEME.Colors.background,
        color: (opacity = 1) => THEME.Colors.primary,
        strokeWidth: 3,
        barPercentage: 0.75,
        useShadowColorFromDataset: false
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={Styles.topbar}>
                <IconButton iconColor={THEME.Colors.primary} icon="keyboard-backspace" size={27} onPress={() => navigation.goBack()} />
                <Text style={Styles.title}>{pokemonName || 'Pokemon Details'}</Text>
            </View>

            <ScrollView
                style={Styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefreshing} colors={[THEME.Colors.primary]} onRefresh={onRefresh} />}
            >

                <View style={Styles.pokemonImageContainer}>
                    <Image defaultSource={require('@Pokemon/assets/pokeball.png')} source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png` }} style={Styles.pokemonImage} />
                </View>

                <View style={Styles.menuBar}>
                    {menu.map((menuItem, index) => <Button key={menuItem + index} textColor={menuItem === activeTab ? THEME.Colors.primary : '#aaa'} style={{ borderRadius: 5, flex: 1 }} contentStyle={menuItem === activeTab ? { borderBottomWidth: 1.5, borderBottomColor: THEME.Colors.heading } : undefined} onPress={() => setActiveTab(menuItem)}>{menuItem}</Button>)}
                </View>

                {
                    activeTab === 'Info' && (
                        <View style={Styles.contentContainer}>
                            <View style={Styles.infoItem}>
                                <Text style={Styles.infoItemLabel}>Base Experience</Text>
                                <Text style={Styles.infoItemValue}>{Pokemon?.base_experience}</Text>
                            </View>
                            <View style={Styles.infoItem}>
                                <Text style={Styles.infoItemLabel}>Height</Text>
                                <Text style={Styles.infoItemValue}>{Pokemon?.height}</Text>
                            </View>
                            <View style={Styles.infoItem}>
                                <Text style={Styles.infoItemLabel}>Weight</Text>
                                <Text style={Styles.infoItemValue}>{Pokemon?.weight}</Text>
                            </View>
                            <View style={Styles.infoItem}>
                                <Text style={Styles.infoItemLabel}>Species</Text>
                                <Text style={Styles.infoItemValue}>{Pokemon?.species?.name}</Text>
                            </View>
                            <View style={Styles.infoItem}>
                                <Text style={Styles.infoItemLabel}>Types</Text>
                                <Text style={Styles.infoItemValue}>{Pokemon?.types.map((type: any) => type?.type?.name).join(', ')}</Text>
                            </View>
                            <View style={Styles.infoItem}>
                                <Text style={Styles.infoItemLabel}>Forms</Text>
                                <Text style={Styles.infoItemValue}>{Pokemon?.forms.map((form: any) => form?.name).join(', ')}</Text>
                            </View>
                            <View style={Styles.infoItem}>
                                <Text style={Styles.infoItemLabel}>Url</Text>
                                <Text style={[Styles.infoItemValue, { textDecorationLine: 'underline' }]}>{`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`}</Text>
                            </View>
                        </View>
                    )
                }

                {
                    activeTab === 'Stats' && (
                        <View style={Styles.contentContainer}>

                            <BarChart
                                width={Dimensions.get("window").width}
                                height={400}
                                data={Pokemon?.stats.reduce((chartData: any, stat: any) => {
                                    chartData.labels = [...chartData.labels, stat.stat.name];
                                    chartData.datasets[0].data = [...chartData.datasets[0].data, stat.base_stat];
                                    return chartData;
                                }, { labels: [], datasets: [{ data: [] }] })}
                                yAxisLabel=""
                                yAxisSuffix=""
                                fromZero
                                withInnerLines={false}
                                withVerticalLabels={true}
                                withHorizontalLabels={false}
                                showValuesOnTopOfBars
                                chartConfig={chartConfig}
                                verticalLabelRotation={45}
                                style={{
                                    marginLeft: -45,
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </View>
                    )
                }

                {
                    activeTab === 'Abilities' && (
                        <View style={Styles.contentContainer}>
                            <View style={Styles.listContainer}>
                                {Pokemon?.abilities.map((ability: any) => <AbilityCard key={ability?.ability?.name} ability={ability?.ability?.name} />)}
                            </View>
                        </View>
                    )
                }

                {
                    activeTab === 'Moves' && (
                        <View style={Styles.contentContainer}>
                            <View style={Styles.listContainer}>
                                {Pokemon?.moves.map((move: any) => <MoveCard key={move?.move?.name} move={move?.move?.name} />)}
                            </View>
                        </View>
                    )
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default PokemonDetailsScreen;