import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ExerciseDetails from './ExerciseDetails';
import Colors from '../colours/colors';

function ExerciseItem({ id, title, difficulty, description, instructions, imageUrl}) {
    const navigation = useNavigation();

    function selectExerciseItemHandler() {
        navigation.navigate('ExerciseDetails', {
            exerciseId: id
        });
    }

    return (
        <View style={styles.exerciseItem}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={selectExerciseItemHandler}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <ExerciseDetails
                        difficulty={difficulty}
                        description={description}
                        instructions={instructions}
                    />
                </View>
            </Pressable>
        </View >
    );
}

export default ExerciseItem;

const styles = StyleSheet.create({
    exerciseItem: {
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 16,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    }
});
