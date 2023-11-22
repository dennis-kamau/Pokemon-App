import { StyleSheet } from "react-native";
import THEME from "@Pokemon/theme";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
        paddingHorizontal: 15,
        backgroundColor: THEME.Colors.background,
    },

    topbar: {
        paddingVertical: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.Colors.background,
    },

    title: {
        flex: 1,
        color: THEME.Colors.heading,
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        textTransform: 'capitalize',
        marginLeft: -30,
    },

    loadingContainer: {
        flex: 1,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
    },

    pokemonImageContainer: {
        width: '100%',
        marginVertical: 20,
        alignItems: 'center'
    },

    pokemonImage: {
        height: 300,
        width: '85%',
        resizeMode: 'contain',
    },

    menuBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    contentContainer: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 5,
        paddingBottom: 75,
    },

    infoItem: {
        flexDirection: 'row',
        marginVertical: 10,
        flexWrap: 'wrap'
    },

    infoItemLabel: {
        fontSize: 14,
        color: THEME.Colors.lighterText,
        width: 100,
    },

    infoItemValue: {
        fontSize: 14,
        color: THEME.Colors.heading,
        flex: 1,
    },

    listContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        flexWrap: 'wrap'
    }

});

export default Styles;