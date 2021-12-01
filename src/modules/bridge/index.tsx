import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BridgeWrapper from './components/BridgeWrapper';
import BridgeMain from './screens/BridgeMain';
import AssetSwapConfirmation from './screens/AssetSwapConfirmation';

export default function CollateralSwap() {
  return (
    <BridgeWrapper>
      <BridgeMain />
    </BridgeWrapper>
  );
}
