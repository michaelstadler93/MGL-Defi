import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Footer from '../../Footer';
import Menu from '../../menu/Menu';
import { BottomDisclaimer, TopDisclaimer } from '../../../ui-config';

import messages from './messages';
import staticStyles from './style';

import background from '../../../images/background.svg';
import backgroundDark from '../../../images/backgroundDark.svg';
import { LOGO } from '../../../ui-config';

export interface ScreensWrapperProps {
  children: ReactNode;
}

export const TitleContext = createContext({
  title: '',
  setTitle: (title: string) => {},
});

export function useHeaderTitle() {
  const { title, setTitle } = useContext(TitleContext);
  return { title, setTitle };
}

export const TopPanelSmallContext = createContext({
  isTopPanelSmall: false,
  setTopPanelSmall: (isSmallTopLine: boolean) => {},
});

export function useWithDesktopTitle() {
  const { isTopPanelSmall, setTopPanelSmall } = useContext(TopPanelSmallContext);
  return { isTopPanelSmall, setTopPanelSmall };
}

export default function ScreensWrapper({ children }: ScreensWrapperProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const [title, setTitle] = useState(intl.formatMessage(messages.pageTitle));
  const [isTopPanelSmall, setTopPanelSmall] = useState(
    localStorage.getItem('isTopPanelSmall') === 'true' || false
  );

  return (
    <div
      className={classNames('ScreensWrapper', {
        ScreensWrapper__topPanelSmall: isTopPanelSmall,
      })}
    >
      <BottomDisclaimer />

      <TopDisclaimer />
      <Menu title={title} />

      <main className="ScreensWrapper__content" id="ScreensWrapper__content-wrapper">
        <div className="ScreensWrapper__top-contentWrapper" />

        <TitleContext.Provider value={{ title, setTitle }}>
          <TopPanelSmallContext.Provider value={{ isTopPanelSmall, setTopPanelSmall }}>
            {children}
          </TopPanelSmallContext.Provider>
        </TitleContext.Provider>
        <div className="ScreensWrapper__footer">
          <div><span>Copyright © 2021 All rights reserved.</span></div>
        </div>
        <Footer inside={true} />
      </main>


      {/* <img
        className="ScreensWrapper__background"
        src={isCurrentThemeDark ? backgroundDark : background}
        alt=""
      /> */}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .ScreensWrapper {
          background: #e5e5e5;
          background: linear-gradient(180deg,#E0F2FF 0%,rgba(224,242,255,0.1) 65.16%,rgba(224,242,255,0) 100%);

          &__content {
            align-items: center;
          }
          &__footer {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1270px;
            margin: 40px 0;

            img {
              width: 50px;
              border-radius: 50%;
              margin: 24px 0;
            }

            @include respond-to(lg) {
              margin: 40px 40px;
              width: -webkit-fill-available;
            }
            @include respond-to(md) {
              margin: 40px 20px;
              flex-direction: column;
              width: webkit-fill-available;
            }
            @include respond-to(sm) {
              margin: 40px 10px;
              flex-direction: column;
              width: webkit-fill-available;
            }
          }
        }
      `}</style>
    </div>
  );
}
