import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import {
  ComputedUserReserve,
  UserSummaryData,
  ReserveData,
  valueToBigNumber,
  BigNumber,
} from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';
import { toggleUseAsCollateral } from '../../../../helpers/toggle-use-as-collateral';
import Row from '../../../../components/basic/Row';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import Value from '../../../../components/basic/Value';
import ValuePercent from '../../../../components/basic/ValuePercent';
import CustomSwitch from '../../../../components/basic/CustomSwitch';
import GradientPlusButton from '../../../../components/basic/GradientPlusButton';
import HealthFactor from '../../../../components/HealthFactor';
import CollateralHelpModal from '../../../../components/HelpModal/CollateralHelpModal';
import BorrowTable from '../BorrowTable';
import BorrowTableItem from '../BorrowTable/BorrowTableItem';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';

interface UserInformationProps {
  user?: UserSummaryData;
  poolReserve: ReserveData;
  userReserve?: ComputedUserReserve;
  symbol: string;
  walletBalance: BigNumber;
}

export default function UserInformation({
  user,
  userReserve,
  poolReserve,
  symbol,
  walletBalance,
}: UserInformationProps) {
  const intl = useIntl();
  const { currentTheme, xl, sm } = useThemeContext();
  const history = useHistory();

  const [contentVisible, setContentVisibility] = useState(false);

  useEffect(() => {
    if (contentVisible && !sm) {
      setContentVisibility(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sm]);

  const totalBorrows = valueToBigNumber(userReserve?.totalBorrows || '0').toNumber();
  const underlyingBalance = valueToBigNumber(userReserve?.underlyingBalance || '0').toNumber();

  const availableBorrowsETH = valueToBigNumber(user?.availableBorrowsETH || 0);
  const availableBorrows = availableBorrowsETH.gt(0)
    ? BigNumber.min(
        availableBorrowsETH
          .div(poolReserve.price.priceInEth)
          .multipliedBy(user && user.totalBorrowsETH !== '0' ? '0.99' : '1'),
        poolReserve.availableLiquidity
      ).toNumber()
    : 0;

  const switcherHeight = xl && !sm ? 16 : sm ? 26 : 20;
  const switcherWidth = xl && !sm ? 30 : sm ? 50 : 40;
  const rowWeight = sm ? 'light' : 'normal';
  const elementsColor = sm ? 'white' : 'dark';

  return (
    <div className="UserInformation">
      <div
        className="UserInformation__mobile-caption"
        onClick={() => setContentVisibility(!contentVisible)}
      >
        <h2>{intl.formatMessage(messages.yourInformation)}</h2>
      </div>

      <div
        className={classNames('UserInformation__content-wrapper', {
          UserInformation__contentWrapperVisible: contentVisible,
        })}
      >
        <div className="UserInformation__content-inner">
          <div className="UserInformation__info-wrapper">
            <h3>
              <span>{intl.formatMessage(messages.deposits)}</span>{' '}
              <div className="UserInformation__caption-buttons">
                <Link
                  to={`/deposit/${poolReserve.underlyingAsset}-${poolReserve.id}`}
                  className="ButtonLink"
                  disabled={poolReserve.isFrozen}
                >
                  <DefaultButton
                    className="UserInformation__button"
                    title={intl.formatMessage(defaultMessages.deposit)}
                    color="yellow"
                    disabled={poolReserve.isFrozen}
                  />
                </Link>
                <Link
                  className={classNames({
                    UserInformation__buttonNoBorderDisabled: !underlyingBalance,
                  })}
                  to={`/withdraw/${poolReserve.underlyingAsset}-${poolReserve.id}`}
                  disabled={!underlyingBalance}
                >
                  <span className="UserInformation__button UserInformation__button-noBorder">
                    {intl.formatMessage(defaultMessages.withdraw)}
                  </span>
                </Link>
              </div>
            </h3>

            <div className="UserInformation__info-inner">
              <Row
                title={intl.formatMessage(messages.yourWalletBalance)}
                withMargin={true}
                weight={rowWeight}
                color={"dark"}
              >
                <Value
                  value={walletBalance.toString()}
                  symbol={symbol}
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                  color={"dark"}
                />
              </Row>
              <Row
                title={intl.formatMessage(messages.youAlreadyDeposited)}
                withMargin={!!underlyingBalance}
                weight={rowWeight}
                color={"dark"}
              >
                <Value
                  value={underlyingBalance}
                  symbol={symbol}
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                  color={"dark"}
                />
              </Row>
            </div>
          </div>

          {!sm && <div className="border"></div>}

          <div className="UserInformation__info-wrapper">
            <h3>
              <span>{intl.formatMessage(messages.borrows)}</span>{' '}
              {!totalBorrows && (
                <div className="UserInformation__caption-buttons">
                  <Link
                    to={`/borrow/${poolReserve.underlyingAsset}-${poolReserve.id}`}
                    className="ButtonLink"
                    disabled={
                      !availableBorrows || !poolReserve.borrowingEnabled || poolReserve.isFrozen
                    }
                  >
                    <DefaultButton
                      className="UserInformation__button"
                      title={intl.formatMessage(defaultMessages.borrow)}
                      color="yellow"
                      disabled={
                        !availableBorrows || !poolReserve.borrowingEnabled || poolReserve.isFrozen
                      }
                    />
                  </Link>
                </div>
              )}
            </h3>

            <div className="UserInformation__info-inner">
              <Row
                title={intl.formatMessage(messages.borrowed)}
                withMargin={true}
                weight={rowWeight}
                color={"dark"}
              >
                {poolReserve.borrowingEnabled ? (
                  <Value
                    value={totalBorrows || 0}
                    symbol={symbol}
                    minimumValueDecimals={2}
                    maximumValueDecimals={2}
                    color={"dark"}
                  />
                ) : (
                  <span className="UserInformation__noData">—</span>
                )}
              </Row>
              <HealthFactor
                value={user?.healthFactor || '-1'}
                titleColor={"dark"}
                titleLightWeight={sm}
              />
              <Row
                title={intl.formatMessage(messages.loanToValue)}
                withMargin={true}
                weight={rowWeight}
                color={"dark"}
              >
                <ValuePercent value={user?.currentLoanToValue || 0} color={"dark"} />
              </Row>
              <Row
                title={intl.formatMessage(messages.availableToYou)}
                weight={rowWeight}
                color={"dark"}
              >
                {poolReserve.borrowingEnabled ? (
                  <Value
                    value={availableBorrows}
                    symbol={symbol}
                    minimumValueDecimals={2}
                    maximumValueDecimals={2}
                    color={"dark"}
                  />
                ) : (
                  <span className="UserInformation__noData">—</span>
                )}
              </Row>
            </div>
          </div>

          {sm && (
            <GradientPlusButton
              active={!contentVisible}
              positionVertical="bottom"
              positionHorizontal="right"
              onClick={() => setContentVisibility(!contentVisible)}
              className="UserInformation__GradientPlusButton"
            />
          )}
        </div>

        {((!!userReserve?.stableBorrows && userReserve?.stableBorrows !== '0') ||
          (!!userReserve?.variableBorrows && userReserve?.variableBorrows !== '0')) && (
          <div className="UserInformation__borrow-table">
            <BorrowTable>
              <>
                {userReserve?.stableBorrows !== '0' && (
                  <BorrowTableItem
                    symbol={symbol}
                    poolReserve={poolReserve}
                    userReserve={userReserve}
                    type="stable"
                    availableBorrows={availableBorrows}
                  />
                )}
                {userReserve?.variableBorrows !== '0' && (
                  <BorrowTableItem
                    symbol={symbol}
                    poolReserve={poolReserve}
                    userReserve={userReserve}
                    type="variable"
                    availableBorrows={availableBorrows}
                  />
                )}
              </>
            </BorrowTable>
          </div>
        )}
      </div>

      {sm && !contentVisible && (
        <GradientPlusButton
          active={!contentVisible}
          positionVertical="bottom"
          positionHorizontal="right"
          onClick={() => setContentVisibility(!contentVisible)}
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .UserInformation {
          @import 'src/_mixins/screen-size';

          @include respond-to(sm) {
            background: #E0F2FF;
          }

          &__mobile-caption {
            h2 {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }

          &__info-wrapper {
            background: ${currentTheme.whiteElement.hex};
            &:after {
              background: ${currentTheme.textDarkBlue.hex};
            }

            h3 {
              color: ${currentTheme.textDarkBlue.hex};
              @include respond-to(sm) {
                color: ${currentTheme.textDarkBlue.hex};
              }
            }
          }

          .UserInformation__swiper {
            .CustomSwitch__label {
              @include respond-to(sm) {
                color: ${currentTheme.textDarkBlue.hex} !important;
              }
            }
          }

          &__button-noBorder {
            background: #005998;
            color: white;
            border-radius: 8px;
            font-weight: bold;
            @include respond-to(sm) {
              color: ${currentTheme.white.hex};
            }
          }

          &__noData {
            @include respond-to(sm) {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }

          &__borrow-table {
            @include respond-to(sm) {
              background: ${currentTheme.mainBg.hex};
            }
          }

          .border {
            height: 2px;
            width: 100%;
            background: #eee;
          }
        }
      `}</style>
    </div>
  );
}
