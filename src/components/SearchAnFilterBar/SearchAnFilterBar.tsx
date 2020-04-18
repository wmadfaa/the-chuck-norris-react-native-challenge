import React from 'react';
import {
  Layout,
  Input,
  Icon,
  IconProps,
  InputProps,
  Button,
  Divider,
} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from 'react-native';

import styles from './SearchAnFilterBar.styles';

export interface SearchAnFilterBarProps
  extends Omit<InputProps, 'accessoryRight' | 'placeholder'> {
  handleClearSearchInput(): void;
  onAddBtnClick(): void;
}

const AddIcon = (props: IconProps) => (
  <Icon {...props} name="person-add-outline" />
);

const SearchAnFilterBar: React.FC<SearchAnFilterBarProps> = ({
  handleClearSearchInput,
  onAddBtnClick,
  style,
  ...props
}) => {
  const renderClearSearchInput = (props: IconProps) => (
    <TouchableWithoutFeedback onPress={handleClearSearchInput}>
      <Icon {...props} name="close-outline" />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout>
      <Layout style={styles.root}>
        <Input
          {...props}
          style={[style, styles.searchInput]}
          placeholder="search or add new e-mail"
          accessoryRight={props.value ? renderClearSearchInput : undefined}
        />
        <Button
          style={styles.btn}
          status="basic"
          size="small"
          accessoryLeft={AddIcon}
          onPress={onAddBtnClick}
        />
      </Layout>
      <Divider />
    </Layout>
  );
};

export default SearchAnFilterBar;
