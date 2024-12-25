import { MemoizedSkaletonComponent } from './components/SkaletonComponent/SkaletonComponent';
import {
  ANIMATION_DIRECTION,
  ANIMATION_TYPE,
  DEFAULT_BG_COLOR,
  DEFAULT_PULSE_CONFIG,
} from './constants';
import type { TSkaletonComponent } from './types';

/**
 * SkeletonView component for loading animations
 * @param height - Height of skeleton
 * @param width - Width of skeleton
 * @param style - Additional styles for container
 * @param backgroundColor - Background color of skeleton
 * @param direction - Direction of animation (leftToRight, rightToLeft, etc)
 * @param animationType - Type of animation (shiver/pulse)
 */

export const SkaletonView = ({
  viewHeight,
  viewWidth,
  style = {},
  backgroundColor = DEFAULT_BG_COLOR,
  direction = ANIMATION_DIRECTION.leftToRight,
  animationType = ANIMATION_TYPE.shiver,
  pulseConfig = {
    animationDuration: DEFAULT_PULSE_CONFIG.animationDuration,
    easing: DEFAULT_PULSE_CONFIG.easing,
    minOpacity: DEFAULT_PULSE_CONFIG.minOpacity,
  },
}: TSkaletonComponent) => {
  return (
    <MemoizedSkaletonComponent
      viewHeight={viewHeight}
      viewWidth={viewWidth}
      style={style}
      backgroundColor={backgroundColor}
      direction={direction}
      animationType={animationType}
      pulseConfig={pulseConfig}
    />
  );
};

export { ANIMATION_DIRECTION, ANIMATION_TYPE };
