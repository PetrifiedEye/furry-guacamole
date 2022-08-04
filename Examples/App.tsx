import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Examples from './src/navigation';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <NavigationContainer>
          <Examples />
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
