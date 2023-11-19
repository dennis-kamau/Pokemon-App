import { StyleProp, TextStyle } from 'react-native';

const COLORS = {
    primary: '#000',
    background: '#fff',
    surface: '#fff',
    heading: '#000',
    text: '#222'
};

const FONTS: { [Key: string]: StyleProp<TextStyle> } = {
    title: {
        fontWeight: '700',
        lineHeight: 24,
        fontSize: 20,
    },

    heading: {
        fontWeight: '700',
        lineHeight: 24,
        fontSize: 16,
    },

    subHeading: {
        fontWeight: '700',
        lineHeight: 20,
        fontSize: 14,
    },

    button: {
        fontWeight: '700',
        lineHeight: 18,
        fontSize: 14,
    },

    bodyLarge: {
        fontWeight: '400',
        lineHeight: 24,
        fontSize: 16,
    },

    body: {
        fontWeight: '400',
        lineHeight: 20,
        fontSize: 14,
    },

    bodySmall: {
        fontWeight: '400',
        lineHeight: 14,
        fontSize: 12,
    },

    caption: {
        fontWeight: '300',
        lineHeight: 14,
        fontSize: 12,
    },
};

const THEME = { Colors: COLORS, Fonts: FONTS };

export default THEME;