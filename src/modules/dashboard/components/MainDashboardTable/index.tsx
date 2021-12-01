import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import BorrowDashboardTable from '../../../borrow/components/BorrowDashboardTable';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';
import DepositDashboardTable from '../../../deposit/components/DepositDashboardTable';
import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';

import messages from './messages';
import staticStyles from './style';

interface MainDashboardTableProps {
  depositedPositions: DepositTableItem[];
  borrowedPositions: BorrowTableItem[];
  isBorrow: boolean;
}

export default function MainDashboardTable({
  depositedPositions,
  borrowedPositions,
  isBorrow,
}: MainDashboardTableProps) {
  const intl = useIntl();

  return (
    <ContentWrapper withFullHeight={true} withBackButton={true}>
      <div
        className={classNames('MainDashboardTable', {
          MainDashboardTable__onlyOne: isBorrow,
          MainDashboardTable__noBorrows: !borrowedPositions.length,
        })}
      >
        <div className="MainDashboardTable__left-inner">
          {!!depositedPositions.length && <DepositDashboardTable listData={depositedPositions} />}
        </div>

        <style jsx={true} global={true}>
          {staticStyles}
        </style>
      </div>
    </ContentWrapper>
  );
}
