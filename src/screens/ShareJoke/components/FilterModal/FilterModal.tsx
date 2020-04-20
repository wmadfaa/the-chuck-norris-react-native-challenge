import React from 'react';
import FilterOrSortModal from '../../../../components/FilterOrSortModal/FilterOrSortModal';

export interface SortModalProps {
  onClose(): void;
  onReset(): void;
  onApply(): void;
  onChange(value: string): void;
  selectedValue?: string;
}

const SortModal: React.FC<SortModalProps> = ({
  onClose,
  onReset,
  onApply,
  onChange,
  selectedValue,
}) => {
  return (
    <FilterOrSortModal
      onClose={onClose}
      title="Sort E-mails"
      options={['sort by email domain name', 'sort by emails host name']}
      secondaryActionButtonLabel="Reset"
      primaryActionButtonLabel="Apply"
      onSecondaryActionButtonPress={onReset}
      onPrimaryActionButtonPress={onApply}
      selectedValue={selectedValue}
      onSelectedValueChange={onChange}
    />
  );
};

export default SortModal;
