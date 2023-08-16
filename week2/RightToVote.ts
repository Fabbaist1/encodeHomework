import { Wallet, ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';

dotenv.config();

function getProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL_SEPOLIA ?? "");
    return provider;
};

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", getProvider());

const getDeployedContract = (wallet: Wallet) => {
    const ADDRESS = "0xB3561E2c30BBd1c82EB3561aDF185a186E916d26"
    const contract = new ethers.Contract(ADDRESS, Ballot__factory.abi, wallet);
    return contract;
}

async function main() {
    let newVoters: string[] = ["0xD0107E57074536596C6c25485253f8aD9DE3AFA8",
    "0x0bad698A19420eb7D69F8FCc15A7eb7daB2c1c69",
    "0x1771038cfaad8e10171b9906a7b9eb606e6263ee"];
    const ballotContract = getDeployedContract(wallet);
    for (let index = 0; index < 3; index++) {
        const voter = newVoters[index];
        const giveRightToVote = await ballotContract.giveRightToVote(voter);
        console.log(`New voter ${voter} detected at ${giveRightToVote}`);
    }

};
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
