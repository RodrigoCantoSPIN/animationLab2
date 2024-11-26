/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SwipeCard from './components/SwipeCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useGetData from './api/getData';

export type characterProps = {
  index: number;
  character: {
    id: string;
    name: string;
    image: string;
  };
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const getData = useGetData();
  const [data, setData] = useState();
  const [currentCharacter, setCurrentCharacter] = useState<characterProps>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    getData((res: any, error: boolean) => {
      if (error) {
        console.log('Ocurrio un error al cargar los datos');
      }
      setData(res.results);
      setCurrentCharacter({index: 0, character: res.results[0]});
    });
  }, []);

  function swipeCharacter() {
    if (!data || !currentCharacter) {
      return;
    }
    const newIndex = currentCharacter.index + 1;
    const newChar = data[newIndex];

    setCurrentCharacter({index: newIndex, character: newChar});
  }
  const SwipableCard = useMemo(() => {
    return <SwipeCard current={currentCharacter} onSwipe={swipeCharacter} />;
  }, [currentCharacter]);
  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        {SwipableCard}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center'},
});

export default App;
