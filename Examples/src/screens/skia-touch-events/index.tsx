import {
  Canvas,
  Circle,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet} from 'react-native';

const SkiaTouchEvents: React.FC = () => {
  const cx = useValue(100);
  const cy = useValue(100);

  const touchHandler = useTouchHandler({
    onActive: ({x, y}) => {
      cx.current = x;
      cy.current = y;
    },
  });
  return (
    <>
      <Canvas style={styles.container} onTouch={touchHandler}>
        <Circle cx={cx} cy={cy} r={10} color="red" />
      </Canvas>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SkiaTouchEvents;
