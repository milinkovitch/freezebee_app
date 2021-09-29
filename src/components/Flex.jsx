/* eslint-disable react/prop-types */
import React from 'react';

function Flex({ children, style, className, forwardedRef }) {
  return (
    <div
      ref={forwardedRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default Flex;
