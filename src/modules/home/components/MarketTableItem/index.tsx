import React from 'react';
import { useHistory } from 'react-router-dom';

import TableItemWrapper from '../../../../components/BasicTable/TableItemWrapper';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import FreezedWarning from '../../../../components/FreezedWarning';
import NoData from '../../../../components/basic/NoData';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import { getAssetInfo, TokenIcon } from '../../../../helpers/markets/assets';

import staticStyles from './style';

export interface MarketTableItemProps {
  id: string;
  underlyingAsset: string;
  currencySymbol: string;
  totalLiquidity: number;
  totalLiquidityInUSD: number;
  totalBorrows: number;
  totalBorrowsInUSD: number;
  depositAPY: number;
  aIncentivesAPY?: string;
  vIncentivesAPY?: string;
  sIncentivesAPY?: string;
  avg30DaysLiquidityRate: number;
  stableBorrowRate: number;
  variableBorrowRate: number;
  avg30DaysVariableRate: number;
  borrowingEnabled?: boolean;
  stableBorrowRateEnabled?: boolean;
  isFreezed?: boolean;
  isPriceInUSD?: boolean;
}

export default function MarketTableItem({
  id,
  underlyingAsset,
  currencySymbol,
  totalLiquidity,
  totalLiquidityInUSD,
  totalBorrows,
  totalBorrowsInUSD,
  depositAPY,
  aIncentivesAPY,
  vIncentivesAPY,
  sIncentivesAPY,
  avg30DaysLiquidityRate,
  stableBorrowRate,
  variableBorrowRate,
  avg30DaysVariableRate,
  borrowingEnabled,
  stableBorrowRateEnabled,
  isFreezed,
  isPriceInUSD,
}: MarketTableItemProps) {
  const history = useHistory();

  const asset = getAssetInfo(currencySymbol);

  const handleClick = () => {
    history.push(`/reserve-overview/${underlyingAsset}-${id}`);
  };

  return (
    <TableItemWrapper onClick={handleClick} className="MarketTableItem" withGoToTop={true}>
      <TableColumn className="MarketTableItem__column">
        <TokenIcon
          tokenSymbol={currencySymbol}
          height={35}
          width={35}
          tokenFullName={asset.name}
          className="MarketTableItem__token"
        />
      </TableColumn>
      <TableColumn className="MarketTableItem__column">
        <Value
          value={isPriceInUSD ? totalLiquidityInUSD : totalLiquidity}
          compact={true}
          maximumValueDecimals={2}
          withoutSymbol={true}
          tooltipId={`market-size-${asset.symbol}`}
          symbol={isPriceInUSD ? 'USD' : ''}
          tokenIcon={isPriceInUSD}
          className="MarketTableItem__value"
        />
      </TableColumn>
      <TableColumn className="MarketTableItem__column">
        {borrowingEnabled ? (
          <Value
            value={isPriceInUSD ? totalBorrowsInUSD : totalBorrows}
            compact={true}
            maximumValueDecimals={2}
            className="MarketTableItem__value"
            withoutSymbol={true}
            symbol={isPriceInUSD ? 'USD' : ''}
            tokenIcon={isPriceInUSD}
            tooltipId={`borrows-size-${asset.symbol}`}
          />
        ) : (
          <NoData color="dark" />
        )}
      </TableColumn>

      {!isFreezed && (
        <>
          <TableColumn className="MarketTableItem__column">
            <LiquidityMiningCard
              value={depositAPY}
              thirtyDaysValue={avg30DaysLiquidityRate}
              liquidityMiningValue={aIncentivesAPY}
              symbol={currencySymbol}
              type="deposit"
            />
          </TableColumn>

          <TableColumn className="MarketTableItem__column">
            {borrowingEnabled && +variableBorrowRate >= 0 ? (
              <LiquidityMiningCard
                value={variableBorrowRate}
                thirtyDaysValue={avg30DaysVariableRate}
                liquidityMiningValue={vIncentivesAPY}
                symbol={currencySymbol}
                type="borrow-variable"
              />
            ) : (
              <NoData color="dark" />
            )}
          </TableColumn>

          <TableColumn className="MarketTableItem__column">
            {stableBorrowRateEnabled && borrowingEnabled && stableBorrowRate >= 0 ? (
              <LiquidityMiningCard
                value={stableBorrowRate}
                liquidityMiningValue={sIncentivesAPY}
                symbol={currencySymbol}
                type="borrow-stable"
              />
            ) : (
              <NoData color="dark" />
            )}
          </TableColumn>
        </>
      )}

      {isFreezed && (
        <>
          <div />
          <div className="MarketTableItem__isFreezed-inner">
            <FreezedWarning symbol={currencySymbol} />
          </div>
        </>
      )}

      <TableColumn className="button-group-column">
        <div className="button-group">
          <button className="deposit-btn button">Deposit</button>
          <button className="borrow-btn button">Borrow</button>
        </div>
      </TableColumn>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .button-group {
          display: flex;

          button {
            padding: 8px 16px;
            margin: 4px;
            font-weight: bold;
            border-radius: 8px;
            border: none;
            &::after {
              content: none;
            }
          }

          .deposit-btn {
            background-color: #005998;
            color: white;
            &:hover {
              background-color: white !important;
              color: #005998 !important;
              border: 1px solid black !important;
            }
          }

          .borrow-btn {
            background-color: #eae987;
            color: black;
            &:hover {
              background-color: white !important;
              border: 1px solid black !important;
            }
          }
        }
      `}</style>
    </TableItemWrapper>
  );
}
