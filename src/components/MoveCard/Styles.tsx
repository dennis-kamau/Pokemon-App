import { StyleSheet } from "react-native";
import THEME from "@Pokemon/theme";

const Styles = StyleSheet.create({
    container: {
        width: 'auto',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7.5,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: THEME.Colors.background,
        borderWidth: 2,
        borderColor: THEME.Colors.text,
        flexDirection: 'row',
    },

    circleIcon: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        marginRight: 12,
        backgroundColor: THEME.Colors.text,
        alignItems: 'center',
        justifyContent: 'center'
    },

    circleIconMiddle: {
        height: 7,
        width: 7,
        borderRadius: 3.5,
        borderWidth: 1.5,
        borderColor: THEME.Colors.background
    },

    moveName: {
        color: THEME.Colors.text,
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: '700',
    },

});

export default Styles;