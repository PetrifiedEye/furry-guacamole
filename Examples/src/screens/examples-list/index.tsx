import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {ExamplesStack, ExamplesStackParamList} from '../../navigation';

const ExamplesList: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ExamplesStackParamList, ExamplesStack>
    >();

  const handlePress = (path: ExamplesStack) => () => {
    navigation.navigate(path);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        style={styles.card}
        onPress={handlePress(ExamplesStack.HelloRNSkia)}>
        <Text style={styles.text}>Hello react native skia!</Text>
      </Pressable>
      <Pressable
        style={styles.card}
        onPress={handlePress(ExamplesStack.SkiaAnimation)}>
        <Text style={styles.text}>Skia Animation</Text>
      </Pressable>
      <Pressable
        style={styles.card}
        onPress={handlePress(ExamplesStack.SkiaTouchEvents)}>
        <Text style={styles.text}>Skia Touch Events</Text>
      </Pressable>
      <Pressable
        style={styles.card}
        onPress={handlePress(ExamplesStack.SkiaBlocks)}>
        <Text style={styles.text}>Skia Blocks Animation</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 32,
  },
  text: {
    color: 'black',
  },
  card: {
    height: 50,
    width: '100%',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ExamplesList;
