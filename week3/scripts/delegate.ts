import { Wallet, ethers } from "ethers";
import { MyERC20Votes__factory } from "../typechain-types";
import * as dotenv from 'dotenv';

dotenv.config();

const ADDRESS_Ballot = "0x595b60F64d7327F12A05A602208462bF4fCE5673";
const ADDRESS_Token = "0x28Df0768dB160bA6f1fC341716489fd828645933";

function getProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL_SEPOLIA ?? "");
    return provider;
};

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_TWO ?? "", getProvider());

function getDeployedContract (wallet: Wallet) {
    const contract = new ethers.Contract(ADDRESS_Token, MyERC20Votes__factory.abi, wallet);
    return contract;
};

async function main() {
    //yarn run ts-node --files ./scripts/delegate.ts "address you want to delegate to" "0x590A1ADd90cbC6a0B53346b2CF8a78ebdaC24f02"
    const tokenContract = getDeployedContract(wallet);
    const address = "0x590A1ADd90cbC6a0B53346b2CF8a78ebdaC24f02";
    const delegateTx = await tokenContract.delegate(address);
    await delegateTx.wait();
    //TODO
};
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});