import React from 'react';
import { View, Text } from 'react-native';
import Styles from './Styles';

const AbilityCard = ({ ability }: { ability: string }) => {
    return (
        <View style={Styles.container}>
            <View style={Styles.circleIcon}>
                <View style={Styles.circleIconMiddle} />
            </View>

            <Text style={Styles.abilityName}>{ability}</Text>
        </View>
    )
}

export default AbilityCard;