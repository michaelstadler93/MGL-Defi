import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { CompactNumber } from '../../../../components/basic/CompactNumber';
import { BigNumber } from '@ethersproject/bignumber';

interface NumberToUsdProps {
  number: string;
}

export default function NumberToUsd({number}: NumberToUsdProps) {
  const intl = useIntl();
  let amountInUsd = valueToBigNumber(number);

  return (
    <>
    ${' '}
    {amountInUsd.toNumber() < 100000000000 ? (
      intl.formatNumber(amountInUsd.toNumber(), {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })
    ) : (
      <CompactNumber value={amountInUsd.toNumber()} maximumFractionDigits={2} minimumFractionDigits={2} />
    )}
    </>
  )
}
