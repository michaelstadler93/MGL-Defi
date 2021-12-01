import React from 'react';
import { useIntl } from 'react-intl';
import { Network } from '@aave/protocol-js';

import {
  AvailableWeb3Connectors,
  ConnectWalletModalProps,
  getWeb3ProviderFromBrowser,
} from '../../libs/web3-data-provider';

import WarningArea from '../WarningArea';
import Link from '../basic/Link';
import UnlockWalletWrapper from './components/ConnectWalletWrapper';
import WalletCard from './components/WalletCard';
import LedgerChecklist from './components/LedgerChecklist';
import SelectPreferredNetwork from './components/SelectPreferredNetwork';
import { AUTHEREUM_API_KEY, getFortmaticKeyByNetwork, PORTIS_DAPP_ID } from '../../config';
import { UnlockWalletExtraText } from '../../ui-config';

import messages from './messages';
import staticStyles from './style';

import * as icons from './images';

export interface Wallet {
  title: string;
  description?: string;
  providerName: AvailableWeb3Connectors;
  icon: string;
  disabled?: boolean;
  notSupported?: boolean;
  errorMessage?: string;
}

export default function ConnectWalletModal({
  preferredNetwork,
  onSelectPreferredNetwork,
  supportedNetworks,
  onUnlockExternalWallet,
  connectorConfig,
  error,
  showLedgerBanner,
  isVisible,
  onBackdropPress,
}: ConnectWalletModalProps) {
  const intl = useIntl();
  const browserWalletProvider = getWeb3ProviderFromBrowser();

  const handleUnlockExternalWallet = (providerName: AvailableWeb3Connectors) =>
    onUnlockExternalWallet(
      providerName,
      preferredNetwork,
      supportedNetworks,
      connectorConfig,
      false
    );

  // @ts-ignore
  const isImToken = !!window.imToken;

  const wallets: Wallet[] = [
    {
      title: intl.formatMessage(messages.titleBrowserWallet, {
        walletName: isImToken ? 'imToken' : 'Browser',
      }),
      description: '(MetaMask, Trustwallet, Enjin)',
      providerName: 'browser',
      icon: isImToken ? icons.imToken : icons.browserWallets,
      disabled: !browserWalletProvider,
      errorMessage: intl.formatMessage(messages.noBrowserBrowserWallet),
    },
    {
      title: 'Ledger',
      providerName: 'ledger',
      icon: icons.ledgerIcon,
      notSupported: preferredNetwork === Network.polygon || preferredNetwork === Network.avalanche,
    },
    {
      title: 'Wallet Connect',
      providerName: 'wallet-connect',
      icon: icons.walletConnectIcon,
    },
  ];

  return (
    <UnlockWalletWrapper
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      className="ConnectWalletModal"
    >
      <SelectPreferredNetwork
        preferredNetwork={preferredNetwork}
        onSelectPreferredNetwork={onSelectPreferredNetwork}
        supportedNetworks={supportedNetworks}
      />

      {error && (
        <WarningArea
          className="ConnectWalletModal__warningArea ConnectWalletModal__warningArea-mobile"
          title={intl.formatMessage(messages.errorCaption)}
        >
          <p>{error}</p>
        </WarningArea>
      )}

      {(error?.includes('Ledger') || showLedgerBanner) && (
        <LedgerChecklist className="ConnectWalletModal__LedgerChecklist-mobile" />
      )}

      <div className="ConnectWalletModal__content">
        {wallets
          .filter((wallet) => !wallet.notSupported)
          .map((wallet, index) => (
            <WalletCard
              title={wallet.title}
              description={wallet.description}
              errorMessage={
                wallet.providerName === 'browser' && !browserWalletProvider
                  ? wallet.errorMessage
                  : ''
              }
              providerName={wallet.providerName}
              icon={wallet.icon}
              disabled={wallet.disabled}
              handleUnlockExternalWallet={handleUnlockExternalWallet}
              key={index}
            />
          ))}
      </div>

      {error && (
        <WarningArea
          className="ConnectWalletModal__warningArea"
          title={intl.formatMessage(messages.errorCaption)}
        >
          <p>{error}</p>
        </WarningArea>
      )}

      {(error?.includes('Ledger') || showLedgerBanner) && (
        <LedgerChecklist className="ConnectWalletModal__warningArea" />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </UnlockWalletWrapper>
  );
}
