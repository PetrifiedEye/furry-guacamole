import {Canvas, Rect, useValue, runSpring} from '@shopify/react-native-skia';
import React, {useCallback} from 'react';
import {Button, StyleSheet, useWindowDimensions, View} from 'react-native';

const SkiaAnimation: React.FC = () => {
  const position = useValue(0);
  const {width} = useWindowDimensions();

  const updateValue = useCallback(() => {
    runSpring(position, position.current + 100);
  }, [position]);

  const handleReset = () => {
    runSpring(position, 0);
  };

  return (
    <>
      <Canvas style={styles.container}>
        <Rect x={0} y={position} width={width} height={50} color={'red'} />
      </Canvas>
      <View style={styles.buttonsContainer}>
        <Button title="Move it" onPress={updateValue} />
        <Button title="Reset" onPress={handleReset} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default SkiaAnimation;
