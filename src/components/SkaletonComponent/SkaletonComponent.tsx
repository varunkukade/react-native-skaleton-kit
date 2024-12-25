import { LinearGradient } from 'react-native-linear-gradient';
import { memo, useEffect, useMemo, useState } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  ANIMATION_DIRECTION,
  ANIMATION_TYPE,
  DEFAULT_GRADIENT,
  DEFAULT_PULSE_CONFIG,
} from '../../constants';
import type { TSkaletonComponent } from '../../types';
import { styles } from './SkaletonComponent.styles';
import type { LayoutChangeEvent } from 'react-native';

const SkaletonComponent = ({
  viewHeight,
  viewWidth,
  style,
  backgroundColor,
  direction,
  animationType,
  pulseConfig,
}: Required<TSkaletonComponent>) => {
  //to move the gradient view across x direction
  const translatex = useSharedValue(0);
  //to move the gradient view across y direction
  const translatey = useSharedValue(0);
  //to create pulse animation by increasing and decreasing opacity of parent
  const opacity = useSharedValue(1);

  //track dimensions of child (gradient view) for deciding movable boundaries
  const [gradientDimensions, setGradientDimensions] = useState({
    height: -1,
    width: -1,
  });
  //track dimensions of parent view (parent of gradient view) for deciding movable boundaries
  const [parentDimensions, setParentDimensions] = useState({
    height: -1,
    width: -1,
  });

  const isXDirectionAnimation = useMemo(() => {
    return (
      direction === ANIMATION_DIRECTION.leftToRight ||
      direction === ANIMATION_DIRECTION.rightToLeft
    );
  }, [direction]);

  const isYDirectionAnimation = useMemo(() => {
    return (
      direction === ANIMATION_DIRECTION.topToBottom ||
      direction === ANIMATION_DIRECTION.bottomToTop
    );
  }, [direction]);

  const coordinates = useMemo(() => {
    //toggle between different direction of movement
    if (direction === ANIMATION_DIRECTION.leftToRight) {
      return {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
    } else if (direction === ANIMATION_DIRECTION.rightToLeft) {
      return {
        start: { x: 1, y: 0 },
        end: { x: 0, y: 0 },
      };
    } else if (direction === ANIMATION_DIRECTION.topToBottom) {
      return {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
      };
    } else if (direction === ANIMATION_DIRECTION.bottomToTop) {
      return {
        start: { x: 0, y: 1 },
        end: { x: 0, y: 0 },
      };
    } else {
      return {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
    }
  }, [direction]);

  const animatedStyleX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translatex.value,
        },
      ],
    };
  });

  const animatedStyleY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translatey.value,
        },
      ],
    };
  });

  const animatedStyleParent = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const animateAcrossXDirection = () => {
    /*
    We need overflowOffset because we start moving animation little bit before actual start
    Also we end moving animation little bit after actual end.
    We hide those overflowed views using overflow: "hidden" on parent view
    */
    const overflowOffset = parentDimensions.width * 0.75;

    /*
    In case of leftToRight direction, we start animation from leftMostEnd
    In case of rightToLeft direction, we stop animation at leftMostEnd
    */
    const leftMostEnd = -overflowOffset;

    /*
    In case of leftToRight direction, we stop animation at rightMostEnd
    In case of rightToLeft direction, we start animation at rightMostEnd
    We subtract gradientDimensions.width because animation should end (in case of leftToRight)/start(in case of rightToLeft) 
     when leftmost end of gradient view touches the right most end of parent view
    */
    const rightMostEnd =
      parentDimensions.width - gradientDimensions.width + overflowOffset;
    translatex.value =
      direction === ANIMATION_DIRECTION.leftToRight
        ? leftMostEnd
        : rightMostEnd;
    translatex.value = withRepeat(
      withDelay(
        800, //Delay before the next iteration of animation starts
        withTiming(
          direction === ANIMATION_DIRECTION.leftToRight
            ? rightMostEnd
            : leftMostEnd,
          {
            duration: 500,
            easing: Easing.linear,
          }
        )
      ),
      -1
    );
  };

  const animateAcrossYDirection = () => {
    /*
    We need overflowOffset because we start moving animation little bit before actual start
    Also we end moving animation little bit after actual end.
    We hide those overflowed views using overflow: "hidden" style on parent view
    */
    const overflowOffset = parentDimensions.height * 0.75;

    /*
    In case of topToBottom direction, we start animation from topMostEnd
    In case of bottomToTop direction, we stop animation at topMostEnd
    */
    const topMostEnd = -overflowOffset;

    /*
    In case of topToBottom direction, we stop animation at bottomMostEnd
    In case of bottomToTop direction, we start animation at bottomMostEnd
    We subtract gradientDimensions.height because animation should end (in case of topToBottom)/start(in case of bottomToTop) 
     when topmost end of gradient view touches the bottom most end of parent view
    */
    const bottomMostEnd =
      parentDimensions.height - gradientDimensions.height + overflowOffset;
    translatey.value =
      direction === ANIMATION_DIRECTION.topToBottom
        ? topMostEnd
        : bottomMostEnd;
    translatey.value = withRepeat(
      withDelay(
        800, //Delay before the next iteration of animation starts
        withTiming(
          direction === ANIMATION_DIRECTION.topToBottom
            ? bottomMostEnd
            : topMostEnd,
          {
            duration: 500,
            easing: Easing.linear,
          }
        )
      ),
      -1
    );
  };

  const onParentViewLayout = (event: LayoutChangeEvent) => {
    if (parentDimensions.height === -1 && parentDimensions.width === -1) {
      //find out the width and height of parent view.
      setParentDimensions({
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      });
    }
  };

  const onGradientViewLayout = (event: LayoutChangeEvent) => {
    if (gradientDimensions.width === -1 && gradientDimensions.height === -1) {
      setGradientDimensions({
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      });
    }
  };

  useEffect(() => {
    if (
      parentDimensions.height !== -1 &&
      parentDimensions.width !== -1 &&
      gradientDimensions.height !== -1 &&
      gradientDimensions.width !== -1 &&
      direction
    ) {
      if (isXDirectionAnimation) {
        animateAcrossXDirection();
      } else {
        animateAcrossYDirection();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentDimensions, gradientDimensions, direction, isXDirectionAnimation]);

  useEffect(() => {
    (() => {
      'worklet';
      if (animationType !== ANIMATION_TYPE.pulse) {
        return;
      }
      //create pulse effect by repeating opacity animation
      opacity.value = withRepeat(
        withTiming(pulseConfig.minOpacity || DEFAULT_PULSE_CONFIG.minOpacity, {
          duration:
            pulseConfig.animationDuration ||
            DEFAULT_PULSE_CONFIG.animationDuration,
          easing: pulseConfig.easing || DEFAULT_PULSE_CONFIG.easing,
        }),
        -1,
        true
      );
    })();
    return () => {
      //cancel running animations after component unmounts
      cancelAnimation(translatex);
      cancelAnimation(translatey);
      cancelAnimation(opacity);
    };
  }, [
    animationType,
    opacity,
    pulseConfig.animationDuration,
    pulseConfig.easing,
    pulseConfig.minOpacity,
    translatex,
    translatey,
  ]);

  return (
    <Animated.View
      onLayout={onParentViewLayout}
      style={[
        styles.itemParent,
        { height: viewHeight, width: viewWidth, backgroundColor },
        style && style,
        animatedStyleParent,
      ]}
    >
      {animationType === ANIMATION_TYPE.shiver ? (
        <Animated.View
          onLayout={onGradientViewLayout}
          style={[
            isXDirectionAnimation && animatedStyleX,
            isXDirectionAnimation && styles.h100 && styles.w80,
            isYDirectionAnimation && animatedStyleY,
            isYDirectionAnimation && styles.h100 && styles.w100,
          ]}
        >
          <LinearGradient
            colors={DEFAULT_GRADIENT}
            style={styles.background}
            start={coordinates.start}
            end={coordinates.end}
          />
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};

export const MemoizedSkaletonComponent = memo(
  SkaletonComponent,
  //rerender component only if one of following is false
  (prevProps, nextProps) =>
    prevProps.animationType === nextProps.animationType &&
    prevProps.backgroundColor === nextProps.backgroundColor &&
    prevProps.direction === nextProps.direction &&
    prevProps.viewHeight === nextProps.viewHeight &&
    JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style) &&
    prevProps.viewWidth === nextProps.viewWidth
);
