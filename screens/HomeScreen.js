import { Text, View, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GYMAPP from '../images/GYMAPP.jpg'
import Colors from '../colours/colors';

function HomeScreen() {
    const navigation = useNavigation();

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const handleSignupPress = () => {
        navigation.navigate('Sign Up');
    };

    return (

        <View style={styles.container}>
            <Image source={GYMAPP} style={styles.image} />
            <Text style={styles.textSlogan}>TRANSFORMING FITNESS, ONE BUDDY AT A TIME</Text>
            <Pressable style={styles.button} onPress={handleLoginPress}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleSignupPress}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        marginVertical: 40,
        width: 200,
        height: 100,
    },
    textSlogan: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 4,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.bgColor,
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: Colors.buttonColor,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;