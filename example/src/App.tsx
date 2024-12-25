import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import {
  SkaletonView,
  ANIMATION_TYPE,
  ANIMATION_DIRECTION,
} from 'react-native-skaleton-kit';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SkaletonView
        viewHeight={100}
        animationType={ANIMATION_TYPE.shiver}
        direction={ANIMATION_DIRECTION.leftToRight}
        viewWidth={'100%'}
      />
      <SkaletonView
        viewHeight={40}
        style={{ alignSelf: 'center' }}
        animationType={ANIMATION_TYPE.shiver}
        direction={ANIMATION_DIRECTION.rightToLeft}
        viewWidth={'70%'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        <SkaletonView
          viewHeight={200}
          animationType={ANIMATION_TYPE.shiver}
          direction={ANIMATION_DIRECTION.topToBottom}
          viewWidth={'30%'}
        />
        <SkaletonView
          viewHeight={200}
          animationType={ANIMATION_TYPE.shiver}
          direction={ANIMATION_DIRECTION.bottomToTop}
          viewWidth={'30%'}
        />
      </View>
      <SkaletonView
        viewHeight={100}
        animationType={ANIMATION_TYPE.pulse}
        viewWidth={'80%'}
        style={{ alignSelf: 'center' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    gap: 20,
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
});
