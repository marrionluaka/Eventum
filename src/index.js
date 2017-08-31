import React from 'react';
import { 
  View, 
  Text,
  StatusBar
} from 'react-native';
import Categories from './components/Categories';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
      <Categories />
    </View>
  );
};

export default App;
