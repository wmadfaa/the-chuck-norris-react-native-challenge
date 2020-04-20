import React from 'react';
import FilterOrSortModal from '../../../../components/FilterOrSortModal/FilterOrSortModal';

export interface FilterModalProps {
  onClose(): void;
  onReset(): void;
  onApply(): void;
  onChange(value: string): void;
  selectedValue?: string;
}

export enum FilterOptions {
  FILTER_UNSELECTED_EMAILS = 'filter unselected emails',
  FILTER_SELECTED_EMAILS = 'filter selected emails',
}

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  onReset,
  onApply,
  onChange,
  selectedValue,
}) => {
  return (
    <FilterOrSortModal
      onClose={onClose}
      title="Filter E-mails"
      options={[
        FilterOptions.FILTER_UNSELECTED_EMAILS,
        FilterOptions.FILTER_SELECTED_EMAILS,
      ]}
      secondaryActionButtonLabel="Reset"
      primaryActionButtonLabel="Apply"
      onSecondaryActionButtonPress={onReset}
      onPrimaryActionButtonPress={onApply}
      selectedValue={selectedValue}
      onSelectedValueChange={onChange}
    />
  );
};

export default FilterModal;
