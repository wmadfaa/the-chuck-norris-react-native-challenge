import React from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {Layout, LayoutProps} from '@ui-kitten/components';

interface ScreenContainerProps extends LayoutProps {}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  ...props
}) => {
  const edgeInsets = useSafeArea();
  return (
    <Layout
      style={[
        {
          flex: 1,
          paddingTop: edgeInsets.top,
          paddingBottom: edgeInsets.bottom,
          paddingLeft: edgeInsets.left,
          paddingRight: edgeInsets.right,
        },
        style,
      ]}
      {...props}>
      {children}
    </Layout>
  );
};

export default ScreenContainer;
