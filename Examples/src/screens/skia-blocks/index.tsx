import {
  Canvas,
  Group,
  runTiming,
  SweepGradient,
  useTouchHandler,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import RoundedItem from '../../components/rounded-item/rounded-item';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  horizontalData,
  PADDING,
  SQUARE_CONTAINER_SIZE,
  SQUARE_SIZE,
  verticalData,
} from '../../contsants';
import {Vector} from '../../types';

const SkiaBlocks: React.FC = () => {
  const touchedPoint = useValue<Vector | null>(null);

  const progress = useValue(0);

  const touchHandler = useTouchHandler({
    onStart: event => {
      runTiming(progress, 1, {duration: 300});
      touchedPoint.current = {x: event.x, y: event.y};
    },
    onActive: event => {
      touchedPoint.current = {x: event.x, y: event.y};
    },

    onEnd: () => {
      runTiming(progress, 0, {duration: 300});
      touchedPoint.current = null;
    },
  });
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas} onTouch={touchHandler}>
        <Group>
          {horizontalData.map((_, i) => {
            return verticalData.map((__, j) => {
              return (
                <RoundedItem
                  touchedPoint={touchedPoint}
                  key={`i${i}j${j}`}
                  x={i * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  y={j * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  r={4}
                  progress={progress}
                />
              );
            });
          })}
          <SweepGradient
            c={vec(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)}
            colors={['cyan', 'magenta', 'yellow', 'cyan']}
          />
        </Group>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  canvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
});

export default SkiaBlocks;
