import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const RecipeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          'https://api.api-ninjas.com/v1/nutrition',
          {
            params: { query: '1lb brisket and fries' },
            headers: {
              'X-Api-Key': 'DIPsRHPESoUC2bCJ8qjDvw==0CkuC18ovLG4RD1a',
            },
          }
        );
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Recipes</Text>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              <Text>Calories: {item.calories}</Text>
              {/* Add more recipe details as desired */}
            </View>
          )}
        />
      ) : (
        <Text>No recipes found.</Text>
      )}
    </View>
  );
};

export default RecipeScreen;
