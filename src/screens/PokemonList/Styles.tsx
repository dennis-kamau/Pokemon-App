import { StyleSheet } from "react-native";
import THEME from "@Pokemon/theme";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
});

export default Styles;