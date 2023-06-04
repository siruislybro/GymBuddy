import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { EXERCISES, CATEGORIES } from '../data/tempData';
import ExerciseItem from '../components/ExerciseItem';
import { SearchBar } from 'react-native-elements';

function ExerciseOverviewScreen({ route, navigation }) {
    const catId = route.params.categoryId;

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState([]);

    const allExercises = EXERCISES.filter((exerciseItem) => {
        return exerciseItem.categoryIds.indexOf(catId) >= 0;
    });

    // Filter the exercises every time the search query changes
    useEffect(() => {
        setFilteredExercises(
            allExercises.filter(exercise =>
                exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery]);

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find(
            (category) => category.id === catId
        ).title;

        navigation.setOptions({
            title: categoryTitle,
        });
    }, [catId, navigation]);

    function renderExerciseItem(itemData) {
        const item = itemData.item;

        const exerciseItemProps = {
            id: item.id,
            title: item.title,
            description: item.description,
            difficulty: item.difficulty,
            instructions: item.instructions,
            imageUrl: item.imageUrl,
        }
        return (
            <ExerciseItem {...exerciseItemProps} />
        );
    }

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search exercises..."
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <FlatList
                data={filteredExercises}
                keyExtractor={(item) => item.id}
                renderItem={renderExerciseItem}
            />
        </View >
    );
}

export default ExerciseOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
