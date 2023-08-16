
import { Wallet, ethers } from "ethers";
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
    const ballotContract = getDeployedContract(wallet);
    let voters: string[] = [
        "0xB69D28887B17ce125B41a288727496EEBB6128E4",
        "0x590A1ADd90cbC6a0B53346b2CF8a78ebdaC24f02",
    ];
    for (let index = 0; index < 3; index++){
        const voter = voters[index];
        const votingPower = await ballotContract.votingPower(voter);
        console.log(`Voter ${voter} has ${votingPower} voting Power`)
    };

    for (let index = 0; index < 3; index++){
        const proposal = await ballotContract.proposals(index);
        const propName = await ethers.decodeBytes32String(proposal.name);
        const propVotes = await proposal.voteCount;
        console.log(`Proposal ${index} is ${propName} and has ${propVotes} Votes`);        
    };
    // You can not read the public variables like this:
    
    // const tokenAddress = await ballotContract.tokenContract; 
    // console.log(`TC Addi is ${tokenAddress}`);
};
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

