import React from 'react';
import FilterOrSortModal from '../../../../components/FilterOrSortModal/FilterOrSortModal';

export interface SortModalProps {
  onClose(): void;
  onReset(): void;
  onApply(): void;
  onChange(value: string): void;
  selectedValue?: string;
}

export enum SortOptions {
  SORT_BY_EMAIL_DOMAIN = 'sort by email domain name',
  SORT_BY_EMAIL_HOST = 'sort by emails host name',
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
      options={[
        SortOptions.SORT_BY_EMAIL_DOMAIN,
        SortOptions.SORT_BY_EMAIL_HOST,
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

export default SortModal;
