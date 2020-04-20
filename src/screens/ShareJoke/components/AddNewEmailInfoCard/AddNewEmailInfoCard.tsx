import React from 'react';
import {Layout, Card, Text} from '@ui-kitten/components';

export interface AddNewEmailInfoCardProps {
  searchedEmail: string;
}

const AddNewEmailInfoCard: React.FC<AddNewEmailInfoCardProps> = ({
  searchedEmail,
}) => {
  return (
    <Layout style={{flex: 1, alignSelf: 'stretch'}}>
      <Card status="info" style={{margin: 16}}>
        <Text category="p1">
          <Text category="label">{searchedEmail}</Text> is not in your friends
          list yet! {'\n'}
          you can add it by clicking on the add new friend button.
        </Text>
      </Card>
    </Layout>
  );
};

export default AddNewEmailInfoCard;
