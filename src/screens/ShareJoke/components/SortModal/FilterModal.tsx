import React from 'react';
import FilterOrSortModal from '../../../../components/FilterOrSortModal/FilterOrSortModal';

export interface FilterModalProps {
  onClose(): void;
  onReset(): void;
  onApply(): void;
  onChange(value: string): void;
  selectedValue?: string;
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
      options={['filter unselected emails', 'filter selected emails']}
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
