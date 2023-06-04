import { View, Text, StyleSheet } from 'react-native';
import Colors from '../colours/colors';

function ExerciseDetails({instructions, difficulty, style, textStyle }) {
    return (
        <View style={[styles.details, style]}>
            <Text style={[styles.detailItem, textStyle]}>{difficulty} </Text>
            <Text style={[styles.detailItem, textStyle]}>{instructions} </Text>
        </View>
    )
}

export default ExerciseDetails;

const styles = StyleSheet.create({
    details: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        color: "black"
    },

});
