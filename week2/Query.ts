import { Wallet, ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';

dotenv.config();

function getProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL_SEPOLIA ?? "");
    return provider;
};

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", getProvider());

function getDeployedContract (wallet: Wallet) {
    const ADDRESS = "0xB3561E2c30BBd1c82EB3561aDF185a186E916d26"
    const contract = new ethers.Contract(ADDRESS, Ballot__factory.abi, wallet);
    return contract;

}

async function main() {
    const ballotContract = getDeployedContract(wallet);
    for (let index = 0; index < 3; index++){
        const proposal = await ballotContract.proposals(index);
        const propName = await ethers.decodeBytes32String(proposal.name);
        const propVotes = await proposal.voteCount;
        console.log(`Proposal ${index} is ${propName} and has ${propVotes} Votes`);

    }
};
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
