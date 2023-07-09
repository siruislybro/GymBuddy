import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Subheading, withTheme } from 'react-native-paper';
import { UserContext } from '../../../components/UserContext';

function SettingsScreen({ theme }) {
  const { colors } = theme;
  const [isDarkModeOn, setDarkModeOn] = useState(false);

  const handleThemeChange = () => {
    setDarkModeOn(!isDarkModeOn);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.row}>
        <Subheading style={[styles.heading, { color: colors.text }]}>Dark Mode</Subheading>
        <Switch value={isDarkModeOn} onValueChange={handleThemeChange} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default withTheme(SettingsScreen);
