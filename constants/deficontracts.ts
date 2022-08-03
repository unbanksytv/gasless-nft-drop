import { Contract } from "src/helpers/contracts/Contract";
import {
  Zap__factory,
} from "src/typechain";
import { DevFaucet__factory } from "src/typechain/factories/DevFaucet__factory";

import {
  ZAP_ADDRESSES,
} from "./addresses";

export const ZAP_CONTRACT = new Contract({
  factory: Zap__factory,
  name: "Zap Contract",
  addresses: ZAP_ADDRESSES,
});

