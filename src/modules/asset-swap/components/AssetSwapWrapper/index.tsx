import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Value from '../../../../components/basic/Value';
import NoData from '../../../../components/basic/NoData';

import defaultMessages from '../../../../defaultMessages';
import staticStyles from './style';

interface AssetSwapWrapperProps {
  children: ReactNode;
}

export default function AssetSwapWrapper({ children }: AssetSwapWrapperProps) {
  const intl = useIntl();
  const { user } = useDynamicPoolDataContext();

  return (
    <ScreenWrapper pageTitle={intl.formatMessage(defaultMessages.swap)} isTitleOnDesktop={false}>
      <div className="Swap__top">
        <div className="">Approximate balance</div>
        <strong>
          {user && user.totalLiquidityUSD !== '0' ? (
            <Value
              value={user.totalLiquidityUSD}
              symbol="USD"
              tokenIcon={true}
              withSmallDecimals={true}
              color="dark"
            />
          ) : (
            <NoData color="dark" />
          )}
        </strong>
      </div>
      <ContentWrapper
        className="AssetSwapWrapper__content"
        withFullHeight={true}
        withBackButton={true}
        pageTitle="Swap"
      >
        {children}
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </ScreenWrapper>
  );
}
