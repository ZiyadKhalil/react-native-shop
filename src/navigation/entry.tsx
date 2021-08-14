import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';

import * as screens from '@src/screens';
import {Header} from '@src/components/Header';
import {loadFonts} from '@src/fonts';

import {Tab} from './tabbar';

async function bootstrap() {
  await loadFonts();
}

export function Entry() {
  const [appInitialState, setAppInitialState] = useState<'loading' | 'ready'>('loading');

  useEffect(() => {
    const bootstrapPromise = bootstrap();
    bootstrapPromise.then(() => setAppInitialState('ready'));
  }, []);

  if (appInitialState === 'loading') return <AppLoading />;
  return (
    <Tab.Navigator initialRouteName="CatalogueStack">
      <Tab.Screen name="Home" component={screens.Fallback} />
      <Tab.Screen name="CatalogueStack" component={CategoryStack} />
      <Tab.Screen name="Favorite" component={screens.Fallback} />
      <Tab.Screen name="Profile" component={screens.Fallback} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator<CatalougeStackParamList>();
function CategoryStack() {
  return (
    <Stack.Navigator screenOptions={{header: Header}}>
      <Stack.Screen name="Catalogue" options={{title: 'Clothing'}} component={screens.Catalogue} />
      <Stack.Screen name="Product" component={screens.Product} />
    </Stack.Navigator>
  );
}