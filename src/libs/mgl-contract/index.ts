import { Contract, ethers } from 'ethers';
import { getProvider } from '../../helpers/markets/markets-data';
import { contractAddr, ABI} from '../../const/mglContract';
import { useProtocolDataContext } from '../protocol-data-provider';
import BigNumber from 'bignumber.js';

export const GetBalanceOfMGL = async (address: string) => {
  const { network: currentNetwork } = useProtocolDataContext();
  const provider = getProvider(currentNetwork);
  const mglContract = new Contract(contractAddr, ABI, provider);
  return await mglContract.balanceOf(address);
}

export const SendMGLTransaction = (recipient: string, amount: any) => {
  const iface = new ethers.utils.Interface(ABI);
  const data = iface.encodeFunctionData('transfer', [recipient, ethers.utils.hexlify(amount)]);
  return data;
}
