import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { useDynamicPoolDataContext } from '../../libs/pool-data-provider';
import { useStaticPoolDataContext } from '../../libs/pool-data-provider';
import { useProtocolDataContext } from '../../libs/protocol-data-provider';
import ScreenWrapper from '../../components/wrappers/ScreenWrapper';
import TotalMarketsSize from '../markets/components/TotalMarketsSize';
import TopPanelWrapper from '../../components/wrappers/TopPanelWrapper';
import SelectMarketPanel from '../markets/components/SelectMarketPanel';
import MarketTable from './components/MarketTable';
import MarketTableItem from './components/MarketTableItem';
import { CompactNumber } from '../../components/basic/CompactNumber';
import MarketMobileCard from '../markets/components/MarketMobileCard';
import BorrowRatesHelpModal from '../../components/HelpModal/BorrowRatesHelpModal';
import { filterTokenArr } from '../../const/filterToken';
import messages from '../markets/screens/Markets/messages';
import staticStyles from './style';
import leftMountain from './image/left-mountain.svg';
import rightMountain from './image/right-mountain.svg';
import leftCelebrate from './image/left-celebrate.svg';
import rightCelebrate from './image/right-celebrate.svg';
import rightLeftGold from './image/right-left-gold.svg';
import rightRightGold from './image/right-right-gold.svg';
import leftRightGold from './image/left-right-gold.svg';
import leftLeftGold from './image/left-left-gold.svg';
import leftTopGold from './image/left-top-gold.png';
import pc from './image/pc.svg';

export default function Home() {
  const intl = useIntl();
  const { reserves } = useDynamicPoolDataContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { currentMarketData } = useProtocolDataContext();
  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);
  const [isPriceInUSD, setIsPriceInUSD] = useState(
    localStorage.getItem('marketsIsPriceInUSD') === 'true'
  );

  let totalLockedInUsd = valueToBigNumber('0');

  let sortedData = reserves
    .filter((res) => res.isActive)
    .map((reserve) => {
      totalLockedInUsd = totalLockedInUsd.plus(
        valueToBigNumber(reserve.totalLiquidity)
          .multipliedBy(reserve.price.priceInEth)
          .dividedBy(marketRefPriceInUsd)
      );

      const totalLiquidity = Number(reserve.totalLiquidity);
      const totalLiquidityInUSD = valueToBigNumber(reserve.totalLiquidity)
        .multipliedBy(reserve.price.priceInEth)
        .dividedBy(marketRefPriceInUsd)
        .toNumber();

      const totalBorrows = Number(reserve.totalDebt);
      const totalBorrowsInUSD = valueToBigNumber(reserve.totalDebt)
        .multipliedBy(reserve.price.priceInEth)
        .dividedBy(marketRefPriceInUsd)
        .toNumber();

      return {
        totalLiquidity,
        totalLiquidityInUSD,
        totalBorrows: reserve.borrowingEnabled ? totalBorrows : -1,
        totalBorrowsInUSD: reserve.borrowingEnabled ? totalBorrowsInUSD : -1,
        id: reserve.id,
        underlyingAsset: reserve.underlyingAsset,
        currencySymbol: reserve.symbol,
        depositAPY: reserve.borrowingEnabled ? Number(reserve.liquidityRate) : -1,
        avg30DaysLiquidityRate: Number(reserve.avg30DaysLiquidityRate),
        stableBorrowRate:
          reserve.stableBorrowRateEnabled && reserve.borrowingEnabled
            ? Number(reserve.stableBorrowRate)
            : -1,
        variableBorrowRate: reserve.borrowingEnabled ? Number(reserve.variableBorrowRate) : -1,
        avg30DaysVariableRate: Number(reserve.avg30DaysVariableBorrowRate),
        borrowingEnabled: reserve.borrowingEnabled,
        stableBorrowRateEnabled: reserve.stableBorrowRateEnabled,
        isFreezed: reserve.isFrozen,
        aIncentivesAPY: reserve.aIncentivesAPY,
        vIncentivesAPY: reserve.vIncentivesAPY,
        sIncentivesAPY: reserve.sIncentivesAPY,
      };
    }).filter((item) => filterTokenArr.indexOf(item.currencySymbol) > -1);

  return (
    <ScreenWrapper>
      <div className="home-total_liquidity">
        <div className="main-content">
          <div className="home-title">MGL DEFI Finance</div>
          <div className="total-amount">
          ${' '}
            {totalLockedInUsd.toNumber() < 100000000000 ? (
              intl.formatNumber(totalLockedInUsd.toNumber(), {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            ) : (
              <CompactNumber value={totalLockedInUsd.toNumber()} maximumFractionDigits={2} minimumFractionDigits={2} />
            )}
          </div>
          <div className="home-explain">Current Market</div>
        </div>
        <img src={leftMountain} className="left-mountain" />
        <img src={rightMountain} className="right-mountain" />
        <img src={leftCelebrate} className="left-celebrate image" />
        <img src={rightCelebrate} className="right-celebrate image" />
        <img src={rightLeftGold} className="right-left-gold image" />
        <img src={leftRightGold} className="left-right-gold image" />
        <img src={leftTopGold} className="left-top-gold image" />
        <img src={leftLeftGold} className="left-left-gold image" />
        <img src={rightRightGold} className="right-right-gold image" />
        <img src={pc} className="pc image" />
      </div>

      <MarketTable
        sortName={sortName}
        setSortName={setSortName}
        sortDesc={sortDesc}
        setSortDesc={setSortDesc}
      >
        {sortedData.map((item, index) => (
          <MarketTableItem {...item} isPriceInUSD={isPriceInUSD} key={index} />
        ))}
      </MarketTable>

      <div className="Markets__mobile--cards">
        {currentMarketData.enabledFeatures?.incentives && (
          <div className="Markets__help--modalInner">
            <BorrowRatesHelpModal
              className="Markets__help--modal"
              text={intl.formatMessage(messages.rewardsInformation)}
              iconSize={14}
            />
          </div>
        )}

        {sortedData.map((item, index) => (
          <MarketMobileCard {...item} key={index} />
        ))}
      </div>

      <div className="home-protocol_news">
        <div className="protocol_news-title">FOLLOW LATEST MGL DEFI FINANCE NEWS!</div>
        <div className="protocol_news-explain">Check out a weekly recap of what is happening in the MGL ecosystem</div>
        <button className="protocol_news-button">EXPLORE NEWS</button>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .home-total_liquidity {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          .left-mountain {
            position: absolute;
            bottom: 50%;
            left: 0;
          }

          .right-mountain {
            position: absolute;
            bottom: 50%;
            right: 0;
          }

          .left-celebrate {
            position: absolute;
            top: 50%;
            left: 0;
          }

          .left-top-gold {
            position: absolute;
            width: 8%;
            bottom: 40%;
            left: 1%;
            z-index: 1;
          }

          .left-left-gold {
            position: absolute;
            bottom: 12%;
            left: 0;
          }

          .left-right-gold {
            position: absolute;
            bottom: 16%;
            left: 10%;
          }

          .right-celebrate {
            position: absolute;
            top: 50%;
            right: 0;
          }

          .right-left-gold {
            position: absolute;
            right: 10%;
            bottom: 17%;
          }

          .right-right-gold {
            position: absolute;
            bottom: 12%;
            right: 0;
          }

          .pc {
            position: absolute;
            top: 42%;
            right: 0.2%;
          }
        }

        .home-protocol_news {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin: 24px 0;

          .protocol_news-title {
            font-size: 31px;
            font-weight: bold;
          }
          .protocol_news-button {
            padding: 12px 24px;
            margin-top: 32px;
            background-color: #eae987;
            color: black;
            &:hover {
              background-color: white !important;
              border: 1px solid black !important;
            }
          }
        }
      `}</style>
    </ScreenWrapper>
  )
}
