import React from 'react';

export const MockupRoot = React.memo((_props: any) => {
  console.warn(
    '[react-mockups] MockupRoot has moved. Please import MockupRoot from /native or /web.'
  );
  return null;
});
