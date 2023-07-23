import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import BackButton from '../../../components/BackButton';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../../firebase';
import { useNavigation } from '@react-navigation/native';

const RecommendedCaloriesScreen = () => {
    const [userDetails, setUserDetails] = useState({});
    const [calorieData, setCalorieData] = useState(null);
    const user = auth.currentUser;
    const navigation = useNavigation();

    const handleGoalSelect = async (calories) => {
        try {
          await setDoc(doc(db, 'users', user.uid, 'nutrition', 'calories'), {
            recommended: calories
          });
          alert(`Selected goal with ${calories} calories per day.`);
        } catch (error) {
          console.error("Error updating recommended calories:", error);
        }
      }

    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const docSnap = await getDoc(doc(db, 'users', user.uid, 'userDetails', 'details'));
            if (docSnap.exists()) {
              setUserDetails(docSnap.data());
            } else {
              navigation.navigate('EditProfileScreen');
              console.log('No such document!');
            
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        }
    
        fetchUserDetails();
      }, []);

      useEffect(() => {
    
        if(userDetails.age && userDetails.gender && userDetails.height && userDetails.weight && userDetails.activityLevel) {
          const fetchDailyCalorie = async () => {
            const options = {
              method: 'GET',
              url: 'https://fitness-calculator.p.rapidapi.com/dailycalorie',
              params: {
                age: userDetails.age,
                gender: userDetails.gender,
                height: userDetails.height,
                weight: userDetails.weight,
                activitylevel: userDetails.activityLevel,
              },
              headers: {
                'X-RapidAPI-Key': '27386d964cmsh603e87e29275735p10b04cjsn1c551fac82c9',
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
              }
            };
        
            try {
              const response = await axios.request(options);
              setCalorieData(response.data.data);
              console.log('Calorie Data:', response.data);
            } catch (error) {
              navigation.navigate('EditProfileScreen');
              Alert.alert("Please fill in your details again!");
              console.error(error);
            }
          };
          fetchDailyCalorie();
        }
      }, [userDetails]);

    return (
    <View style={styles.container}>
        <BackButton />
        {calorieData && (
          <ScrollView style={styles.content}>
          <Text style={styles.title}>BMR: {Math.floor(calorieData.BMR)} Calories</Text>
          <Text style={styles.subtitle}>This is the amount of energy your body needs to function while at rest.</Text>
          {Object.keys(calorieData.goals).map((goal, index) => {
              const goalData = calorieData.goals[goal];
              const calories = typeof goalData === 'object' ? goalData.calory : goalData;
              return (
              <TouchableOpacity key={index} style={styles.goalContainer} onPress={() => handleGoalSelect(Math.floor(calories))}>
                  <Text style={styles.goalTitle}>{goal}</Text>
                  <>
                      <Text style={styles.goalCalories}>Calories per day: {Math.floor(calories)}</Text>
                      {goalData['loss weight'] && <Text style={styles.goalExtra}>Weight Loss: {goalData['loss weight']}</Text>}
                      {goalData['gain weight'] && <Text style={styles.goalExtra}>Weight Gain: {goalData['gain weight']}</Text>}
                      {typeof goalData === 'object' && <Text style={styles.goalDesc}>{goalData.description}</Text>}
                  </>
              </TouchableOpacity>
              );
          })}
          </ScrollView>
        )}            
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
      },
      content: {
        margin: 10,
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
      },
      subtitle: {
        fontSize: 18,
        marginBottom: 16,
        color: '#555',
      },
      goalContainer: {
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 1,  // for android
        shadowColor: '#000',  // for ios
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      goalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
      },
      goalCalories: {
        fontSize: 18,
        marginTop: 8,
        color: '#666',
      },
      goalExtra: {
        fontSize: 16,
        marginTop: 8,
        color: '#666',
      },
      goalDesc: {
        fontSize: 16,
        marginTop: 8,
        color: '#777',
      },
});



export default RecommendedCaloriesScreen;