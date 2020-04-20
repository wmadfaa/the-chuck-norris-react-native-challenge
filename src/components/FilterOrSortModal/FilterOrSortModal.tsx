import React from 'react';
import {Text, Button, Layout, RadioGroup, Radio} from '@ui-kitten/components';
import BlurOverlay from '../BlurOverlay/BlurOverlay';
import {View, TouchableWithoutFeedback} from 'react-native';

import styles from './FilterOrSortModal.styles';

export interface FilterOrSortModalProps {
  title: string;
  options: string[];
  secondaryActionButtonLabel: string;
  primaryActionButtonLabel: string;
  selectedValue?: string;
  onSelectedValueChange(value: string): void;
  onSecondaryActionButtonPress(): void;
  onPrimaryActionButtonPress(): void;
  onClose(): void;
}

const FilterOrSortModal: React.FC<FilterOrSortModalProps> = ({
  onClose,
  title,
  options,
  secondaryActionButtonLabel,
  primaryActionButtonLabel,
  onSecondaryActionButtonPress,
  onPrimaryActionButtonPress,
  selectedValue,
  onSelectedValueChange,
}) => {
  return (
    <BlurOverlay>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.root}>
          <Layout style={styles.card}>
            <Text category="s1">{title}</Text>
            <RadioGroup
              style={styles.radioGroup}
              selectedIndex={
                selectedValue ? options.indexOf(selectedValue) : undefined
              }
              onChange={(index) => onSelectedValueChange(options[index])}>
              {options.map((option, index) => (
                <Radio key={index}>{option}</Radio>
              ))}
            </RadioGroup>

            <Button
              onPress={onSecondaryActionButtonPress}
              style={styles.btn}
              size="small"
              status="danger">
              {secondaryActionButtonLabel}
            </Button>
            <Button
              onPress={onPrimaryActionButtonPress}
              style={styles.btn}
              size="small"
              status="primary">
              {primaryActionButtonLabel}
            </Button>
          </Layout>
        </View>
      </TouchableWithoutFeedback>
    </BlurOverlay>
  );
};

export default FilterOrSortModal;
