import React from 'react';
import {View, Image, ImageURISource, Text} from 'react-native';
import Styles from './Styles';

const ErrorState = ({ title, msg, image } : { title: string, msg: string, image: ImageURISource }) => {
    return (
        <View style={Styles.container}>
            <View style={Styles.errorImageContainer}>
                <Image source={image} style={Styles.errorImage} />
            </View>

            <View>
                <Text style={Styles.title}>{title}</Text>
                <Text style={Styles.errorMsg}>{msg}</Text>
            </View>
        </View>
    )
}

export default ErrorState;