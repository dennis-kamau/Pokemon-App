import { StyleSheet } from "react-native";
import THEME from "@Pokemon/theme";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 30,
    },

    errorImageContainer: {
        width: '100%',
        alignItems: 'center'
    },

    errorImage: {
        height: 350,
        width: 500,
        resizeMode: 'cover',
    },

    title: {
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        textTransform: 'capitalize',
        color: THEME.Colors.heading,
    },

    errorMsg: {
        fontSize: 16,
        lineHeight: 2,
        textAlign: 'center',
        color: THEME.Colors.text,
        marginTop: 15
    },

});

export default Styles;