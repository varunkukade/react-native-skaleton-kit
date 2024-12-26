# React Native Skaleton Kit

A high-performance (60FPS) skeleton loading animation library for React Native, powered by Reanimated 3. Create beautiful shimmering and pulsing loading states with customizable animations.

![npm](https://img.shields.io/npm/v/react-native-skaleton-kit)
![license](https://img.shields.io/npm/l/react-native-skaleton-kit)
![platform](https://img.shields.io/badge/platform-ios%20%7C%20android-lightgrey)

## Features

- 🌊 Smooth shimmer and pulse animations
- ⚡️ Built with Reanimated 3 for optimal performance
- 🎨 Highly customizable animations and styling
- 📱 Support for React Native CLI projects

## Demo

https://github.com/user-attachments/assets/943132f3-dd3d-43ec-9fa5-94937ace14d1



> **Note**: Currently available for React Native CLI projects only.

## Installation

Install the package using your preferred package manager:

```bash
# Using yarn
yarn add react-native-skaleton-kit

# Using npm
npm install react-native-skaleton-kit

# For iOS, install pods
cd ios && pod install
```

### Peer Dependencies

You'll need to install and configure the following peer dependencies if you haven't already:

- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started#installation)
- [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient#readme)

Make sure to also follow their respective setup instructions.


### Compatibility

- Minimum React Native version supported: `0.63.0`
- React Native Linear Gradient: `>=2.6.0`
- React Native Reanimated: Version depends on your React Native version. Please refer to the [Reanimated compatibility table](https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility#currently-supported-react-native-versions-paper) to select the appropriate version.



## Usage

Import the necessary components and enums:

```typescript
import {
  SkaletonView,
  ANIMATION_TYPE,
  ANIMATION_DIRECTION,
} from 'react-native-skaleton-kit';
```

Basic usage:

```typescript
<SkaletonView
  viewHeight={100}
  animationType={ANIMATION_TYPE.shiver}
  direction={ANIMATION_DIRECTION.leftToRight}
  viewWidth={'100%'}
/>
```

For more examples, check out our [example app](https://github.com/varunkukade/react-native-skaleton-kit/blob/main/example/src/App.tsx).

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| viewHeight | `DimensionValue` | ✅ | - | Height of the skeleton view |
| viewWidth | `DimensionValue` | ✅ | - | Width of the skeleton view |
| style | `ViewStyle` | ❌ | `{}` | Additional styles for the container |
| backgroundColor | `string` | ❌ | `'#DDEAF5'` | Background color of the skeleton |
| direction | `ANIMATION_DIRECTION` | ❌ | `'leftToRight'` | Direction of the shimmer animation |
| animationType | `ANIMATION_TYPE` | ❌ | `'shiver'` | Type of animation (`'shiver'` or `'pulse'`) |
| pulseConfig | `PulseConfig` | ❌ | See below | Configuration for pulse animation |

### Animation Types
```typescript
enum ANIMATION_TYPE {
  shiver = 'shiver',
  pulse = 'pulse'
}
```

### Animation Directions
```typescript
enum ANIMATION_DIRECTION {
  leftToRight = 'leftToRight',
  rightToLeft = 'rightToLeft',
  topToBottom = 'topToBottom',
  bottomToTop = 'bottomToTop'
}
```

### Default Pulse Configuration
```typescript
const DEFAULT_PULSE_CONFIG = {
  animationDuration: 1000,
  easing: Easing.linear,
  minOpacity: 0.4
}
```

## License

MIT
