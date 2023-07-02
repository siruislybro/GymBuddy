import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function ExerciseItem({ title, muscle, addExercise}) {
    const navigation = useNavigation();

    function selectExerciseItemHandler() {
        navigation.navigate('ExerciseDetails', {
            exerciseTitle: title,
            addExercise: addExercise,
        });
    }

    return (
        <TouchableOpacity style={styles.exerciseItem} onPress={selectExerciseItemHandler}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.detailItem}>{muscle}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ExerciseItem;

const styles = StyleSheet.create({
    exerciseItem: {
        margin: 16,
        padding: 16,
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 16,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 8,
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    }
});
