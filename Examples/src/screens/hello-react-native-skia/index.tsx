import {Canvas, Circle, Group} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

const HelloRNSkia: React.FC = () => {
  const {width} = useWindowDimensions();

  const r = width * 0.33;

  return (
    <Canvas style={styles.container}>
      <Group blendMode="multiply">
        <Circle cx={r} cy={r} r={r} color="cyan" />
        <Circle cx={width - r} cy={r} r={r} color="magenta" />
        <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
      </Group>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HelloRNSkia;
