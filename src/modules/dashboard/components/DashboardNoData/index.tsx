import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { marketsData } from '../../../../ui-config';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Caption from '../../../../components/basic/Caption';
import MarketSelectButton from '../../../../components/market/MarketSelectButton';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';

import messages from './messages';
import staticStyles from './style';
import { availableMarkets } from '../../../../config';

export default function DashboardNoData() {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, sm } = useThemeContext();
  const { currentMarket, setCurrentMarket } = useProtocolDataContext();

  return (
    <ContentWrapper className="DashboardNoData" withFullHeight={true} withBackButton={true}>
      <Caption
        title={intl.formatMessage(messages.title)}
        description={intl.formatMessage(messages.description)}
        color={'dark'}
      />

      <div className="DashboardNoData__bottom--inner">
        <p className="DashboardNoData__bottom--text">{intl.formatMessage(messages.orDepositNow)}</p>
        <Link to="/deposit" className="ButtonLink">
          <DefaultButton title={intl.formatMessage(messages.depositNow)} mobileBig={true} color="blue" fontColor="white" />
        </Link>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DashboardNoData {
          &__markets {
            &:after {
              background: ${currentTheme.mainBg.hex};
            }
          }
          &__bottom--text {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </ContentWrapper>
  );
}
