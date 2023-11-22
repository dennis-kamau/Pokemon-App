import { StyleSheet } from "react-native";
import THEME from "@Pokemon/theme";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        backgroundColor: THEME.Colors.background
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        color: THEME.Colors.heading,
        lineHeight: 42,
        letterSpacing: 0.5,
        marginTop: 20,
    },

    searchContainer: {
        width: '100%',
        height: 70,
        marginVertical: 20,
        flexDirection: 'row',
    },

    scrollContainer: {
        flex: 1,
        minHeight: '100%',
    },

    loadingContainer: {
        flex: 1,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Styles;