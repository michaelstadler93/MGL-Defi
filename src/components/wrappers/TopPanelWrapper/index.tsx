import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';

interface TopPanelWrapperProps {
  isCollapse: boolean;
  setIsCollapse?: (value: boolean) => void;
  children: ReactNode;
  className?: string;
  withoutCollapseButton?: boolean;
}

export default function TopPanelWrapper({
  isCollapse,
  setIsCollapse,
  children,
  className,
  withoutCollapseButton,
}: TopPanelWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('TopPanelWrapper', className)}>
      {!withoutCollapseButton && (
        <button
          className={classNames('TopPanelWrapper__button', {
            TopPanelWrapper__buttonCollapse: isCollapse,
          })}
          type="button"
          onClick={() => setIsCollapse && setIsCollapse(!isCollapse)}
        >
          <span />
          {intl.formatMessage(isCollapse ? messages.expand : messages.minimize)}
        </button>
      )}

      <div className="TopPanelWrapper__content">{children}</div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .TopPanelWrapper {
          background: #ffffff;
          border: 1px solid #d7d7d7;
          box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.07);
          border-radius: 7px;

          &__button {
            color: ${currentTheme.white.hex};
            &:hover {
              color: ${currentTheme.secondary.hex};
              span {
                &:before,
                &:after {
                  background: ${currentTheme.secondary.hex};
                }
              }
            }
            span {
              &:before,
              &:after {
                background: ${currentTheme.white.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
