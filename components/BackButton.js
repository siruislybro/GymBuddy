import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function BackButton() {
  const navigation = useNavigation();

  const backButtonHandler = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity 
      style={styles.backButton} 
      onPress={backButtonHandler}>
      <Icon name='arrow-back' color='white' />
    </TouchableOpacity>      
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 10,
    opacity: 1,
    TouchableOpacity: 0.75,
  },
});

export default BackButton;
