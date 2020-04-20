import React from 'react';
import {StyleSheet, Platform, View} from 'react-native';

import {
  BlurView,
  VibrancyView,
  VibrancyViewProperties,
  BlurViewProperties,
} from '@react-native-community/blur';

import styles from './BlurOverlay.styles';

const BlurOverlay: React.FC<VibrancyViewProperties | BlurViewProperties> = ({
  style,
  children,
  ...props
}) => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container, style]}>
      {Platform.OS === 'ios' ? (
        <VibrancyView
          {...props}
          style={[styles.container, styles.blurContainer]}>
          {children}
        </VibrancyView>
      ) : (
        <View style={styles.blurContainer}>
          <BlurView {...props} style={[StyleSheet.absoluteFill]}>
            {children}
          </BlurView>
        </View>
      )}
    </View>
  );
};

export default BlurOverlay;
