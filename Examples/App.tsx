import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import Examples from './src/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <Examples />
    </NavigationContainer>
  );
};

export default App;
