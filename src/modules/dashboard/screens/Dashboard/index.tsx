import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { valueToBigNumber, InterestRate, Network } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';
import classNames from 'classnames';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import { loanActionLinkComposer } from '../../../../helpers/loan-action-link-composer';
import { toggleUseAsCollateral } from '../../../../helpers/toggle-use-as-collateral';
import { toggleBorrowRateMode } from '../../../../helpers/toggle-borrow-rate-mode';
import LabeledSwitcher from '../../../../components/basic/LabeledSwitcher';
import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import MaxLTVHelpModal from '../../../../components/HelpModal/MaxLTVHelpModal';
import ValuePercent from '../../../../components/basic/ValuePercent';
import HealthFactor from '../../../../components/HealthFactor';
import DefaultButton from '../../../../components/basic/DefaultButton';
import NoData from '../../../../components/basic/NoData';
import DepositCompositionBar from '../../../../components/compositionBars/DepositCompositionBar';
import CollateralCompositionBar from '../../../../components/compositionBars/CollateralCompositionBar';
import BorrowCompositionBar from '../../../../components/compositionBars/BorrowCompositionBar';
import LTVInfoModal from '../../../../components/LTVInfoModal';
import MainDashboardTable from '../../components/MainDashboardTable';
import MobileTopPanelWrapper from '../../components/MobileTopPanelWrapper';
import DepositBorrowTopPanel from '../../../../components/DepositBorrowTopPanel';
import ApproximateBalanceHelpModal from '../../../../components/HelpModal/ApproximateBalanceHelpModal';
import TopIncentiveBalance from '../../../../components/TopIncentiveBalance';
import DashboardNoData from '../../components/DashboardNoData';

import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';
import { DashboardLeftTopLine } from '../../../../ui-config';
import { getAssetColor } from '../../../../helpers/markets/assets';

import messages from './messages';
import staticStyles from './style';

export default function Dashboard() {
  const intl = useIntl();
  const history = useHistory();
  const { network } = useProtocolDataContext();
  const { user, reserves } = useDynamicPoolDataContext();
  const { currentTheme, sm } = useThemeContext();

  const [isLTVModalVisible, setLTVModalVisible] = useState(false);
  const [isBorrow, setIsBorrow] = useState(false);
  const [isDepositMobileInfoVisible, setDepositMobileInfoVisible] = useState(false);
  const [isBorrowMobileInfoVisible, setBorrowMobileInfoVisible] = useState(false);

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsETH || '0').plus(
    user?.availableBorrowsETH || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '1'
    : valueToBigNumber(user?.totalBorrowsETH || '0')
        .div(maxBorrowAmount)
        .toFixed();

  const loanToValue = valueToBigNumber(user?.totalBorrowsETH || '0')
    .dividedBy(user?.totalCollateralETH || '1')
    .toFixed();

  const depositedPositions: DepositTableItem[] = [];
  const borrowedPositions: BorrowTableItem[] = [];

  user?.reservesData.forEach((userReserve) => {
    const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);

    if (!poolReserve) {
      throw new Error('data is inconsistent pool reserve is not available');
    }
    if (userReserve.underlyingBalance !== '0' || userReserve.totalBorrows !== '0') {
      const baseListData = {
        uiColor: getAssetColor(userReserve.reserve.symbol),
        isActive: poolReserve.isActive,
        isFrozen: poolReserve.isFrozen,
        stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
        reserve: userReserve.reserve,
      };
      if (userReserve.underlyingBalance !== '0') {
        depositedPositions.push({
          ...baseListData,
          borrowingEnabled: poolReserve.borrowingEnabled,
          avg30DaysLiquidityRate: poolReserve.avg30DaysLiquidityRate,
          usageAsCollateralEnabledOnThePool: poolReserve.usageAsCollateralEnabled,
          usageAsCollateralEnabledOnUser: userReserve.usageAsCollateralEnabledOnUser,
          underlyingBalance: userReserve.underlyingBalance,
          underlyingBalanceUSD: userReserve.underlyingBalanceUSD,
          aIncentivesAPY: poolReserve.aIncentivesAPY,
          onToggleSwitch: () =>
            toggleUseAsCollateral(
              history,
              poolReserve.id,
              !userReserve.usageAsCollateralEnabledOnUser,
              poolReserve.underlyingAsset
            ),
        });
      }

      if (userReserve.variableBorrows !== '0') {
        borrowedPositions.push({
          ...baseListData,
          borrowingEnabled: poolReserve.borrowingEnabled,
          currentBorrows: userReserve.variableBorrows,
          currentBorrowsUSD: userReserve.variableBorrowsUSD,
          borrowRateMode: InterestRate.Variable,
          borrowRate: poolReserve.variableBorrowRate,
          vIncentivesAPY: poolReserve.vIncentivesAPY,
          sIncentivesAPY: poolReserve.sIncentivesAPY,
          avg30DaysVariableRate: poolReserve.avg30DaysVariableBorrowRate,
          repayLink: loanActionLinkComposer(
            'repay',
            poolReserve.id,
            InterestRate.Variable,
            poolReserve.underlyingAsset
          ),
          borrowLink: loanActionLinkComposer(
            'borrow',
            poolReserve.id,
            InterestRate.Variable,
            poolReserve.underlyingAsset
          ),
          onSwitchToggle: () =>
            toggleBorrowRateMode(
              history,
              poolReserve.id,
              InterestRate.Variable,
              poolReserve.underlyingAsset
            ),
        });
      }
      if (userReserve.stableBorrows !== '0') {
        borrowedPositions.push({
          ...baseListData,
          borrowingEnabled: poolReserve.borrowingEnabled && poolReserve.stableBorrowRateEnabled,
          currentBorrows: userReserve.stableBorrows,
          currentBorrowsUSD: userReserve.stableBorrowsUSD,
          borrowRateMode: InterestRate.Stable,
          borrowRate: userReserve.stableBorrowRate,
          vIncentivesAPY: poolReserve.vIncentivesAPY,
          sIncentivesAPY: poolReserve.sIncentivesAPY,
          repayLink: loanActionLinkComposer(
            'repay',
            poolReserve.id,
            InterestRate.Stable,
            poolReserve.underlyingAsset
          ),
          borrowLink: loanActionLinkComposer(
            'borrow',
            poolReserve.id,
            InterestRate.Stable,
            poolReserve.underlyingAsset
          ),
          onSwitchToggle: () =>
            toggleBorrowRateMode(
              history,
              poolReserve.id,
              InterestRate.Stable,
              poolReserve.underlyingAsset
            ),
        });
      }
    }
  });

  return (
    <div className="Dashboard">
      <div
        className={classNames('Dashboard__mobileMigrate--inner', {
          Dashboard__mobileMigrateWithoutContent:
            network !== Network.mainnet && !depositedPositions.length,
        })}
      >
        <DashboardLeftTopLine intl={intl} network={network} onMobile={true} />
      </div>

      <div className="Dashboard__top">
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

      <div className="Dashboard__top--line">
        <div className="ButtonLink">
          <DashboardLeftTopLine intl={intl} network={network} />
        </div>
        <TopIncentiveBalance />
      </div>

      {user && !!borrowedPositions.length && isBorrow && (
        <MobileTopPanelWrapper
          visible={isBorrowMobileInfoVisible}
          setVisible={setBorrowMobileInfoVisible}
          buttonComponent={
            <>
              <Row
                title={intl.formatMessage(messages.youBorrowed)}
                color="white"
                weight="light"
                withMargin={!isBorrowMobileInfoVisible}
              >
                {user && user.totalBorrowsUSD !== '0' ? (
                  <Value
                    value={user.totalBorrowsUSD}
                    symbol="USD"
                    tokenIcon={true}
                    minimumValueDecimals={2}
                    maximumValueDecimals={2}
                    subValue={user.totalBorrowsETH}
                    subSymbol="ETH"
                    color="white"
                  />
                ) : (
                  <NoData />
                )}
              </Row>
              {!isBorrowMobileInfoVisible && (
                <HealthFactor
                  value={user?.healthFactor || '-1'}
                  titleColor="white"
                  titleLightWeight={true}
                />
              )}
            </>
          }
        >
          <Row
            title={intl.formatMessage(messages.yourCollateral)}
            color="white"
            weight="light"
            withMargin={true}
          >
            {user && user.totalCollateralUSD !== '0' ? (
              <Value
                value={user.totalCollateralUSD}
                symbol="USD"
                tokenIcon={true}
                minimumValueDecimals={2}
                maximumValueDecimals={2}
                subValue={user.totalCollateralETH}
                subSymbol="ETH"
                color="white"
              />
            ) : (
              <NoData />
            )}
          </Row>

          <HealthFactor
            value={user?.healthFactor || '-1'}
            titleColor="white"
            titleLightWeight={true}
          />

          <Row
            title={
              <MaxLTVHelpModal
                text={intl.formatMessage(messages.currentLTV)}
                color="white"
                lightWeight={true}
              />
            }
            color="white"
            weight="light"
            withMargin={true}
            className="Dashboard__mobileRow-center"
          >
            {user && loanToValue !== '0' ? (
              <div className="Dashboard__mobileRow-content">
                <ValuePercent value={loanToValue} color="white" />
                <DefaultButton
                  title={intl.formatMessage(messages.details)}
                  color="white"
                  transparent={true}
                  className="Dashboard__mobileButton"
                  size="small"
                  onClick={() => setLTVModalVisible(true)}
                />
              </div>
            ) : (
              <NoData />
            )}
          </Row>

          <Row
            title={intl.formatMessage(messages.borrowingPowerUsed)}
            color="white"
            weight="light"
            withMargin={true}
          >
            {user && collateralUsagePercent !== '0' ? (
              <ValuePercent value={collateralUsagePercent} color="white" />
            ) : (
              <NoData />
            )}
          </Row>

          <BorrowCompositionBar />
          <CollateralCompositionBar />
        </MobileTopPanelWrapper>
      )}

      {sm && <TopIncentiveBalance />}

      {user ? (
        <>
          {!!depositedPositions.length ? (
            <MainDashboardTable
              borrowedPositions={borrowedPositions}
              depositedPositions={depositedPositions}
              isBorrow={isBorrow}
            />
          ) : (
            <DashboardNoData />
          )}
        </>
      ) : (
        <ContentWrapper withBackButton={true} withFullHeight={true}>
          <NoDataPanel
            title={intl.formatMessage(messages.connectWallet)}
            description={intl.formatMessage(messages.connectWalletDescription)}
            withConnectButton={true}
          />
        </ContentWrapper>
      )}

      {loanToValue !== '0' && (
        <LTVInfoModal visible={isLTVModalVisible} setVisible={setLTVModalVisible} />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Dashboard {
          &__mobileMigrate--inner {
            background: ${currentTheme.whiteElement.hex};
          }
          &__mobileMigrateWithoutContent {
            background: ${currentTheme.mainBg.hex};
          }

          &__changeMarket--button {
            color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </div>
  );
}
