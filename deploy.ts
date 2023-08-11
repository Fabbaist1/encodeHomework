import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();


const ADDRESS = "0x590A1ADd90cbC6a0B53346b2CF8a78ebdaC24f02";

function getProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL_SEPOLIA ?? "");
    return provider;
}
 async function main() {
    const proposals = process.argv.slice(2);
    console.log("Deploying Ballot contract");
    console.log("Proposals: ");
    proposals.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });

    const provider = getProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    
    const balance = await provider.getBalance(wallet.address);
    const balanceUser = Number(ethers.formatEther(balance));
    console.log(`Using wallet address ${wallet.address} with balanace ${balanceUser} to deploy Ballot Contract`);
    
    if (balanceUser < 0.01) {
        throw new Error("Not enough ether");
      }

    const ballotContractFactory = new Ballot__factory(wallet);
    const ballotContract = await ballotContractFactory.deploy(
        proposals.map(ethers.encodeBytes32String)
        );
    const deloyTx = await ballotContract.waitForDeployment();
    const addr = await ballotContract.getAddress();
    console.log(`The Ballot contract was deployed at ${addr}`);
    const chairperson = await ballotContract.chairperson();
    console.log (`The chairperson is ${chairperson}`);
    for (let index = 0; index < proposals.length; index++) {
        const proposal = await ballotContract.proposals(index);
        const name = ethers.decodeBytes32String(proposal.name);
        console.log({ index, name, proposal });
      }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});