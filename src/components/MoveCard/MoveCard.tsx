import React from 'react';
import { View, Text } from 'react-native';
import Styles from './Styles';

const MoveCard = ({ move }: { move: string }) => {
    return (
        <View style={Styles.container}>
            <View style={Styles.circleIcon}>
                <View style={Styles.circleIconMiddle} />
            </View>

            <Text style={Styles.moveName}>{move}</Text>
        </View>
    )
}

export default MoveCard;