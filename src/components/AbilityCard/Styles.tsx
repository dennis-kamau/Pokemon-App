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
        backgroundColor: THEME.Colors.primary,
        flexDirection: 'row',
    },

    circleIcon: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        marginRight: 15,
        backgroundColor: THEME.Colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },

    circleIconMiddle: {
        height: 7,
        width: 7,
        borderRadius: 3.5,
        borderWidth: 1.5,
        borderColor: THEME.Colors.primary
    },

    abilityName: {
        color: THEME.Colors.background,
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: '700',
    },

});

export default Styles;