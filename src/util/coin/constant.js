import { Interface } from 'ethers';
import factoryJson from './factory.json';
import tokenJson from './token.json';
import bondJson from './bond.json';

export const FACTORY_ADDRESS = '0x28a7743bD45cF21347836b91F9Fdc27Bfc3c8181';

export const FACTORY_ABI = new Interface(factoryJson).format(true);

export const TOKEN_ABI = new Interface(tokenJson).format(true);

export const BOND_ABI = new Interface(bondJson).format(true);
