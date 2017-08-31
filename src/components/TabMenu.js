import React from 'react';
import { TabNavigator } from 'react-navigation';

import Categories from './Categories';
import EventList from './EventList';
import Favorites from './Favorites';

export default TabNavigator({
  EventList: { screen: Categories },
  Favorites: { screen: Favorites },
});