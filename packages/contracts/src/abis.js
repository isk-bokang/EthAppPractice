import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import metAbi from "./abis/MyErcToken.json";
import metNftAbi from "./abis/MyErcNFT_Enumerable.json"

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  MET : metAbi.abi,
  METNFTE : metNftAbi.abi,
};

export default abis;
