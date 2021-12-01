import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { valueToBigNumber } from '@aave/protocol-js';
import queryString from 'query-string';

import { useThemeContext } from '@aave/aave-ui-kit';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import NoDataPanel from '../../../../components/NoDataPanel';
import MarketNotSupported from '../../../../components/MarketNotSupported';
import SwapForm, { DEFAULT_MAX_SLIPPAGE } from '../../../../components/forms/SwapForm';
import AmountFieldWithSelect from '../../../../components/fields/AmountFieldWithSelect';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import AmountField from '../../../../components/fields/AmountField';
import BridgeNoDeposits from '../../components/BridgeNoDeposits';
import AssetSelect from '../../../../components/fields/AmountFieldWithSelect/components/AssetSelect';
import { calculateHFAfterSwap } from '../../helpers';
import { useSwap } from '../../../../libs/use-asset-swap/useSwap';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import { isFeatureEnabled } from '../../../../helpers/markets/markets-data';
import TransferImage from '../../image/transfer.svg';
import staticStyles from './style';

const applySlippage = (amount: string, slippagePercent: number | string) => {
  return valueToBigNumber(amount || '0').multipliedBy(1 - +slippagePercent / 100);
};

export default function BridgeMain() {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const { currentTheme, md } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { currentMarketData, chainId } = useProtocolDataContext();
  const [fromAmount, setAmountFrom] = useState<string>('');
  const [fromAsset, setAssetFrom] = useState('');
  const fromAssetData = reserves.find(
    (res) => res.underlyingAsset.toLowerCase() === fromAsset.toLowerCase()
  );
  const [toAsset, setAssetTo] = useState('');
  const toAssetData = reserves.find(
    (res) => res.underlyingAsset.toLowerCase() === toAsset.toLowerCase()
  );
  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const {
    loading,
    error,
    outputAmount: toAmount,
    outputAmountUSD: toAmountInUSD,
    inputAmountUSD: fromAmountInUSD,
  } = useSwap({
    userId: user?.id,
    swapIn: {
      address: fromAsset,
      amount: fromAmount,
    },
    swapOut: {
      address: toAsset,
      amount: '0',
    },
    variant: 'exactIn',
    max: isMaxSelected,
    chainId,
  });

  const [maxSlippage, setMaxSlippage] = useState(DEFAULT_MAX_SLIPPAGE);

  if (!isFeatureEnabled.liquiditySwap(currentMarketData)) {
    return <MarketNotSupported />;
  }

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  const availableDeposits = user.reservesData.filter(
    (res) =>
      res.underlyingBalance !== '0' &&
      res.reserve.underlyingAsset.toLowerCase() !== toAsset.toLowerCase()
  );
  const availableDepositsSymbols = availableDeposits.map((res) => ({
    label: res.reserve.symbol,
    value: res.reserve.underlyingAsset,
    decimals: res.reserve.decimals,
    apy: res.reserve.liquidityRate,
  }));

  const availableDestinations = reserves.filter(
    (res) =>
      res.isActive && !res.isFrozen && res.underlyingAsset.toLowerCase() !== fromAsset.toLowerCase()
  );
  const availableDestinationsSymbols = availableDestinations.map((res) => ({
    label: res.symbol,
    value: res.underlyingAsset,
    decimals: res.decimals,
    apy: res.liquidityRate,
  }));

  const fromAPY = availableDeposits.find(
    (res) => res.reserve.underlyingAsset.toLowerCase() === fromAsset.toLowerCase()
  )?.reserve.liquidityRate;
  const toAPY = availableDestinations.find(
    (res) => res.underlyingAsset.toLowerCase() === toAsset.toLowerCase()
  )?.liquidityRate;

  const fromAssetUserData = user.reservesData.find(
    (res) => res.reserve.underlyingAsset === fromAsset
  );
  const toAssetUserData = user.reservesData.find((res) => res.reserve.underlyingAsset === toAsset);

  const maxAmountToSwap = fromAssetUserData?.underlyingBalance || '0';

  const usdValueSlippage = +fromAmountInUSD
    ? valueToBigNumber(fromAmountInUSD)
        .minus(toAmountInUSD)
        .div(fromAmountInUSD)
        .multipliedBy(-100)
        .toFixed(2)
    : '0';

  const toAmountWithSlippage = applySlippage(toAmount, maxSlippage);
  const toAmountInUSDWithSlippage = applySlippage(toAmountInUSD, maxSlippage);

  const { hfAfterSwap, hfEffectOfFromAmount } = calculateHFAfterSwap(
    fromAmount,
    fromAssetData,
    fromAssetUserData,
    toAmountWithSlippage.toString(10),
    toAssetData,
    toAssetUserData,
    user,
    maxSlippage
  );

  const fromAmountNotEnoughError = valueToBigNumber(fromAssetUserData?.underlyingBalance || 0).lt(
    fromAmount
  )
    ? intl.formatMessage(messages.notEnoughBalance)
    : undefined;

  const isSubmitButtonDisabled =
    (hfAfterSwap.lte(1) && user.totalBorrowsUSD !== '0') ||
    !+fromAmount ||
    !+toAmount ||
    !!error ||
    !!fromAmountNotEnoughError;

  const flashloanFees =
    user.healthFactor !== '-1' &&
    valueToBigNumber(user.healthFactor).minus(hfEffectOfFromAmount).lte(1.01)
      ? 0.0009
      : undefined;

  const totalFees = valueToBigNumber(flashloanFees || '0')
    .multipliedBy(100)
    .toString();

  const handleSubmit = () => {
    if (
      !valueToBigNumber(fromAmount).isNaN() &&
      fromAmount !== '0' &&
      !valueToBigNumber(toAmount).isNaN() &&
      toAmount !== '0'
    ) {
      const query = queryString.stringify({
        fromAsset,
        toAsset,
        fromAmount,
        toAmount: toAmountWithSlippage.toString(10),
        maxSlippage,
        fromAmountInUSD,
        toAmountInUSD: toAmountInUSDWithSlippage.toString(10),
        swapAll: isMaxSelected,
        totalFees,
      });

      history.push(`${history.location.pathname}/confirmation?${query}`);
    }
  };

  const queryFromAsset = queryString.parse(location.search).asset?.toString() || undefined;

  const handleMaxButtonClick = () => {
    if (!!maxAmountToSwap && !!setIsMaxSelected) {
      setAmountFrom(maxAmountToSwap);
      setIsMaxSelected(true);
    }
  };

  const getVisibleDecimals = (amount: string = '') => {
    if (amount.startsWith('0.0000')) return 6;
    if (amount.startsWith('0.00')) return 4;
    return 2;
  };

  return (
    <>
      {availableDeposits.length >= 1 ? (
        <div className="bridge-content">
          <div className="bridge-main">
            <div className="bridge-main-left content">
              <AssetSelect
                asset={fromAsset}
                setAsset={setAssetFrom}
                options={availableDepositsSymbols}
                title={"Ethereum Mainnet"}
                queryAsset={queryFromAsset}
              />
            </div>
            <div className="bridge-main-symbol">
              <img className="SwapForm__swap-icon" src={TransferImage} alt="" />
            </div>
            <div className="bridge-main-right content">
              <AssetSelect
                asset={toAsset}
                setAsset={setAssetTo}
                options={availableDestinationsSymbols}
                title={"Binance Smart Chain"}
                queryAsset={queryFromAsset}
              />
            </div>
          </div>
          <div className="bridge-amount">
            <AmountField
              className="AmountFieldWithSelect__field"
              title={intl.formatMessage(messages.available)}
              symbol=""
              value={fromAmount}
              onChange={setAmountFrom}
              onMaxButtonClick={!!setIsMaxSelected ? handleMaxButtonClick : undefined}
              maxAmount={maxAmountToSwap}
              topDecimals={getVisibleDecimals(maxAmountToSwap)}
              error={error}
              disabled={!fromAsset}
              maxDecimals={fromAssetData?.decimals}
              loading={loading}
            />
          </div>
          <div className="bridge-run">
            <DefaultButton
              title={"TRANSFER"}
              type="submit"
              disabled={isSubmitButtonDisabled}
              mobileBig={true}
            />
          </div>
          <style jsx={true} global={true}>
            {staticStyles}
          </style>
        </div>
      ) : (
        <BridgeNoDeposits numberOfDepositedAssets={availableDeposits.length} />
      )}
    </>
  );
}
