import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {characterProps} from '../App';

interface swipeCardProps {
  current?: characterProps;
  onSwipe: () => void;
}

export default function SwipeCard({current, onSwipe}: swipeCardProps) {
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);
  const character = current?.character;

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      offset.value = withSpring(0);
      pressed.value = false;
      runOnJS(onSwipe)();
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offset.value},
      {scale: withTiming(pressed.value ? 1.2 : 1)},
    ],
    backgroundColor: pressed.value ? '#FFE04B' : '#b58df1',
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.card, animatedStyles]}>
          <View>
            <Image style={styles.image} src={character?.image} />
            <View>
              <Text style={styles.name}>{character?.name}</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  card: {
    width: 200,
    height: 300,
    backgroundColor: 'coral',
    borderRadius: 8,
  },
  image: {alignSelf: 'center', width: 200, height: 280},
  name: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
