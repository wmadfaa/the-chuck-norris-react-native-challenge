import React from 'react';
import {
  Layout,
  Input,
  Icon,
  IconProps,
  InputProps,
  Button,
  Divider,
  Text,
  TextProps,
} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from 'react-native';

import styles from './SearchAnFilterBar.styles';

export interface SearchAnFilterBarProps
  extends Omit<InputProps, 'accessoryRight' | 'placeholder'> {
  handleClearSearchInput(): void;
  onAddBtnClick(): void;
  onFilterBtnClick(): void;
  onSortBtnClick(): void;
  filterBtnLabel: string;
  sortByBtnLabel: string;
}

const AddIcon = (props: IconProps) => (
  <Icon {...props} name="person-add-outline" />
);

const FilterIcon = (props: IconProps) => (
  <Icon {...props} name="funnel-outline" />
);

const SortIcon = (props: IconProps) => (
  <Icon {...props} name="options-2-outline" />
);

const CustomBtn: React.FC<TextProps> = ({children, ...props}) => {
  return (
    <Text
      {...props}
      numberOfLines={1}
      ellipsizeMode="tail"
      style={[props.style, styles.customBtn]}>
      {children}
    </Text>
  );
};

const SearchAnFilterBar: React.FC<SearchAnFilterBarProps> = ({
  handleClearSearchInput,
  onAddBtnClick,
  onFilterBtnClick,
  onSortBtnClick,
  filterBtnLabel,
  sortByBtnLabel,
  style,
  ...props
}) => {
  const renderClearSearchInput = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={handleClearSearchInput}>
      <Icon {...props} name="close-outline" />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.root}>
      <Layout style={styles.searchContainer}>
        <Input
          {...props}
          style={[style, styles.searchInput]}
          placeholder="search or add new e-mail"
          accessoryRight={props.value ? renderClearSearchInput : undefined}
        />
        <Button
          style={styles.addBtn}
          status="basic"
          size="small"
          accessoryLeft={AddIcon}
          onPress={onAddBtnClick}
        />
      </Layout>
      <Layout style={styles.filterAndOrderContainer}>
        <Button
          style={[styles.btn, styles.filterBtn]}
          status="basic"
          size="small"
          accessoryLeft={FilterIcon}
          onPress={onFilterBtnClick}>
          {(props) => <CustomBtn {...props}>{filterBtnLabel}</CustomBtn>}
        </Button>
        <Button
          style={styles.btn}
          status="basic"
          size="small"
          accessoryLeft={SortIcon}
          onPress={onSortBtnClick}>
          {(props) => <CustomBtn {...props}>{sortByBtnLabel}</CustomBtn>}
        </Button>
      </Layout>
      <Divider />
    </Layout>
  );
};

export default SearchAnFilterBar;
