import { StyleSheet } from "react-native";
import THEME from "@Pokemon/theme";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },

    pokemonImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },

    pokemanName: {
        padding: 10,
        marginTop: 10,
        textAlign: 'center',
        color: THEME.Colors.heading,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 16
    }
});

export default Styles;