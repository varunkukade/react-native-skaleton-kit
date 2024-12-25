import { Easing } from 'react-native-reanimated';

export enum ANIMATION_DIRECTION {
  leftToRight = 'leftToRight',
  rightToLeft = 'rightToLeft',
  topToBottom = 'topToBottom',
  bottomToTop = 'bottomToTop',
}

export enum ANIMATION_TYPE {
  shiver = 'shiver',
  pulse = 'pulse',
}

export const DEFAULT_BG_COLOR = '#DDEAF5';
export const DEFAULT_GRADIENT = [
  'rgba(255,255,255,0)',
  'rgba(255,255,255,0.1)',
  'rgba(255,255,255,0.4)',
  'rgba(255,255,255,0.6)',
  'rgba(255,255,255,0.7)',
  'rgba(255,255,255,0.6)',
  'rgba(255,255,255,0.4)',
  'rgba(255,255,255,0.1)',
  'rgba(255,255,255,0)',
];

export const DEFAULT_PULSE_CONFIG = {
  animationDuration: 1000,
  easing: Easing.linear,
  minOpacity: 0.4,
};
