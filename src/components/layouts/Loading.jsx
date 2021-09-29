import { Spin } from 'antd';
import React from 'react';
import Flex from '../Flex';

function Loading() {
  return (
    <Flex style={{ minHeight: '100vh' }}>
      <Spin size="large" />
    </Flex>
  );
}

export default Loading;
