import {
  RoundedRect,
  SkiaMutableValue,
  useComputedValue,
  useValue,
  interpolate,
  Group,
  Extrapolate,
} from '@shopify/react-native-skia';
import React from 'react';
import {CANVAS_HEIGHT, CANVAS_WIDTH, MAX_DISTANCE} from '../../contsants';
import {Vector} from '../../types';

interface RoundedItemProps {
  touchedPoint: SkiaMutableValue<Vector | null>;
  progress: SkiaMutableValue<number>;
  x: number;
  y: number;
  height: number;
  width: number;
  r: number;
}

const RoundedItem: React.FC<RoundedItemProps> = ({
  touchedPoint,
  progress,
  ...squareProps
}) => {
  const {x, y} = squareProps;
  const previousTouchedPoint = useValue<Vector>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
  });
  const previousDistance = useValue(0);

  const distance = useComputedValue(() => {
    if (touchedPoint.current === null) {
      return previousDistance.current;
    }

    previousDistance.current = Math.sqrt(
      (touchedPoint.current.x - x) ** 2 + (touchedPoint.current.y - y) ** 2,
    );
    return previousDistance.current;
  }, [touchedPoint]);

  const scale = useComputedValue(() => {
    return interpolate(
      distance.current * progress.current,
      [0, MAX_DISTANCE / 2],
      [1, 0],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
  }, [distance, progress]);

  const transform = useComputedValue(() => {
    return [{scale: scale.current}];
  }, [scale]);

  const origin = useComputedValue(() => {
    if (touchedPoint.current === null) {
      return previousTouchedPoint.current;
    }
    previousTouchedPoint.current = touchedPoint.current;
    return previousTouchedPoint.current;
  }, [touchedPoint]);

  return (
    <Group origin={origin} transform={transform}>
      <RoundedRect {...squareProps} r={4} />
    </Group>
  );
};

export default React.memo(RoundedItem);
