import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import metAbi from "./abis/MyErcToken.json";

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  MET : metAbi.abi
};

export default abis;
