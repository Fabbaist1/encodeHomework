import { ethers } from "ethers";
import { MyERC20Votes__factory, TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
import { token } from "../typechain-types/@openzeppelin/contracts";

dotenv.config();

function getProvider() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL_SEPOLIA ?? "");
    return provider;
}
async function main() {
    
    //Setup RPC_Endpoint and wallet
    const provider = getProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    
    const balance = await provider.getBalance(wallet.address);
    const balanceUser = Number(ethers.formatEther(balance));
    if (balanceUser < 0.01) {
        throw new Error("Not enough ether");
    }

    //Deploy token contract first, retrieve contract address
    const tokenContractFactory = new MyERC20Votes__factory(wallet);
    const tokenContract = await tokenContractFactory.deploy();
    await tokenContract.waitForDeployment();
    const tokenAddress = tokenContract.getAddress(); 
    console.log(`Deployed Token Contract at ${tokenAddress}`);


    //Pass three Proposal Attributes with the argv function -- Strawbeery Chocolate Vanilla
    const proposals = process.argv.slice(2);
    
    //Deploy Ballot passing the TokenAddress, Proposals and TargetBlock Number in the contructor to link the two. 
    const ballotContractFactory = new TokenizedBallot__factory(wallet);
    const blockNumber = await provider.getBlockNumber();
    const deploymentBlock = blockNumber + 20;
    const ballotContract = await ballotContractFactory.deploy(
        proposals.map(ethers.encodeBytes32String), 
        tokenAddress, 
        deploymentBlock
        );
    await ballotContract.waitForDeployment();
    const ballotAddress = await ballotContract.getAddress();
    console.log(`The Ballot contract was deployed at ${ballotAddress}`);
    
    console.log("With Proposals: ");
    for (let index = 0; index < proposals.length; index++) {
        const proposal = await ballotContract.proposals(index);
    
        const name = ethers.decodeBytes32String(proposal.name);
        console.log({ index, name, proposal });
    }
    proposals.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});