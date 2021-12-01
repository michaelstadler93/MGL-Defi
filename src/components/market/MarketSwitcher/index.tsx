import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { Network } from '@aave/protocol-js';
import { rgba, useThemeContext, DropdownWrapper } from '@aave/aave-ui-kit';

import { CustomMarket, marketsData } from '../../../ui-config';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import GradientText from '../../basic/GradientText';

import messages from './messages';
import staticStyles from './style';
import { availableMarkets } from '../../../config';

interface MarketSwitcherProps {
  toTop?: boolean;
  className?: string;
  textButton?: boolean;
}

const getTestnetMark = (network: Network) =>
  [Network.kovan, Network.mumbai, Network.fork, Network.fuji, Network.avalanche_fork].includes(
    network
  )
    ? network.charAt(0)
    : undefined;

export default function MarketSwitcher({ toTop, className, textButton }: MarketSwitcherProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { currentMarket, setCurrentMarket, currentMarketData } = useProtocolDataContext();

  const [visible, setVisible] = useState(false);
  const [isFirstMarketButtonClick, setFirstMarketClick] = useState(
    !localStorage.getItem('firstMarketButtonClick')
  );
  const firstMarketButtonClick = () => {
    setFirstMarketClick(false);
    localStorage.setItem('firstMarketButtonClick', 'false');
  };

  const toggleVisible = () => {
    if (isFirstMarketButtonClick) {
      firstMarketButtonClick();
    }
    setVisible(!visible);
  };

  const handleSetCurrentMarket = (market: CustomMarket) => {
    setCurrentMarket(market);
    setVisible(false);
  };

  const transparentDarkColor = rgba(`${currentTheme.darkBlue.rgb}, 0.05`);
  const selectedMarketTestnetMark = getTestnetMark(currentMarketData.network);

  return (
    <>
      <div className="MarketSwitcher__content">
        {availableMarkets.map((market) => {
          const marketData = marketsData[market];
          const testnetMark = getTestnetMark(marketData.network);
          return (
            <button
              onClick={() => handleSetCurrentMarket(market)}
              className={classNames('MarketSwitcher__market', {
                MarketSwitcher__marketActive: currentMarket === market,
              })}
              type="button"
              disabled={currentMarket === market}
              key={market}
            >
              <div className="MarketSwitcher__market-content">
                <div className="MarketSwitcher__market-inner">
                  <div className="MarketSwitcher__logo-inner">
                    <span>MGL</span>
                  </div>
                  <div className="MarketSwitcher__logo-inner">
                    <span>Market</span>
                  </div>
                </div>

                {!!marketData.subLogo && (
                  <img className="MarketSwitcher__subLogo" src={marketData.subLogo} alt="" />
                )}
              </div>

              {testnetMark && <span className="MarketSwitcher__kovan">{testnetMark}</span>}
            </button>
          );
        })}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MarketSwitcher {
          &__text-button {
            color: ${currentTheme.primary.hex};
          }

          &__button-content {
            color: ${currentTheme.white.hex};
            background: ${currentTheme.darkBlue.hex};
            &:hover {
              border-color: ${currentTheme.white.hex};
            }
          }
          &__buttonActive {
            .MarketSwitcher__button-content {
              border-color: ${currentTheme.white.hex};
            }
          }
          &__firstClickButton {
            &:before {
              background: linear-gradient(
                to right,
                ${currentTheme.secondary.hex},
                ${currentTheme.primary.hex},
                ${currentTheme.secondary.hex},
                ${currentTheme.primary.hex}
              );
            }
          }

          &__title {
            color: ${currentTheme.darkBlue.hex};
            border-bottom: 1px solid ${currentTheme.darkBlue.hex};
          }

          &__market {
            position: relative;
            border-bottom: 1px solid ${transparentDarkColor};
            &:hover {
              background: ${transparentDarkColor};
            }
          }
          &__marketActive {
            background: ${transparentDarkColor};
          }

          &__logo-inner {
            span {
              color: #ffffff;
            }
          }
        }
      `}</style>
    </>
  );
}
