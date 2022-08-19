import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExamplesList from '../screens/examples-list';
import HelloRNSkiaScreen from '../screens/hello-react-native-skia';
import SkiaAnimationScreen from '../screens/skia-animation';
import SkiaTouchEventsScreen from '../screens/skia-touch-events';
import SkiaBlocksScreen from '../screens/skia-blocks';

export enum ExamplesStack {
  Root = '[Examples] Root',
  HelloRNSkia = '[Examples] HelloRN Skia',
  SkiaAnimation = '[Examples] Skia Animation',
  SkiaTouchEvents = '[Examples] Skia Touch Events',
  SkiaBlocks = '[Examples] Skia Blocks',
}

export type ExamplesStackParamList = {
  [ExamplesStack.Root]: undefined;
  [ExamplesStack.HelloRNSkia]: undefined;
  [ExamplesStack.SkiaAnimation]: undefined;
  [ExamplesStack.SkiaTouchEvents]: undefined;
  [ExamplesStack.SkiaBlocks]: undefined;
};

const {Navigator, Screen} =
  createNativeStackNavigator<ExamplesStackParamList>();

const Examples: React.FC = () => {
  return (
    <Navigator>
      <Screen name={ExamplesStack.Root} component={ExamplesList} />
      <Screen name={ExamplesStack.HelloRNSkia} component={HelloRNSkiaScreen} />
      <Screen
        name={ExamplesStack.SkiaAnimation}
        component={SkiaAnimationScreen}
      />
      <Screen
        name={ExamplesStack.SkiaTouchEvents}
        component={SkiaTouchEventsScreen}
      />
      <Screen name={ExamplesStack.SkiaBlocks} component={SkiaBlocksScreen} />
    </Navigator>
  );
};

export default Examples;
