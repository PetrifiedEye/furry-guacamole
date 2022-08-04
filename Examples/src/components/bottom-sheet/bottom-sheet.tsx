import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {BottomSheetProps, BottomSheetRef} from './types';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({height: bottomSheetHeight}, ref) => {
    const translateY = useSharedValue(0);

    const context = useSharedValue({y: 0});
    const active = useSharedValue(false);

    const isActive = useCallback(() => active.value, [active]);

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        if (destination === 0) {
          active.value = false;
        } else {
          active.value = true;
        }
        translateY.value = withSpring(destination, {damping: 20});
      },
      [active, translateY],
    );

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
        translateY.value = Math.min(translateY.value, -bottomSheetHeight);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 2) {
          scrollTo(-bottomSheetHeight);
        } else if (translateY.value < -SCREEN_HEIGHT / 2) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const bottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );
      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          scrollTo(-bottomSheetHeight);
        },
        close: () => {
          scrollTo(0);
        },
        isActive,
      }),
      [scrollTo, bottomSheetHeight, isActive],
    );

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[style.container, bottomSheetStyle]}>
          <View style={style.line} />
        </Animated.View>
      </GestureDetector>
    );
  },
);

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: SCREEN_HEIGHT,
    top: SCREEN_HEIGHT,
    backgroundColor: 'tomato',

    borderRadius: 25,
  },
  text: {
    color: 'black',
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 15,
  },
});

export default React.memo(BottomSheet);
