import { TransactionReceipt, Wallet, encodeBytes32String, ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';

dotenv.config();

const ADDRESS_Ballot = "0x595b60F64d7327F12A05A602208462bF4fCE5673";
const ADDRESS_Token = "0x28Df0768dB160bA6f1fC341716489fd828645933";

function getProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL_SEPOLIA ?? "");
    return provider;
};

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", getProvider());

 
function getDeployedContract (wallet: Wallet) {
    const contract = new ethers.Contract(ADDRESS_Ballot, TokenizedBallot__factory.abi, wallet);
    return contract;

}

async function main() {
    // yarn run ts-node --files ./scripts/castVote.ts "arg(position of array you want to vote)"
    const ballotContract = getDeployedContract(wallet);
    const proposalId = parseInt(process.argv.slice(2)[0]);
    const amountMax = 2;
    await ballotContract.vote(proposalId);
    console.log(`New Vote cast for Proposal ${proposalId} with voting power of ${amountMax}`);
    
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });