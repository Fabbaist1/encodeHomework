import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, ethers } from "ethers";
import * as tokenJson from "./assets/MyToken.json";
import * as ballotJson from "./assets/TokenizedBallot.json";

@Injectable()
export class AppService {
  provider: ethers.AbstractProvider;
  contract: Contract;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('INFURA_API_KEY');
    this.provider = ethers.getDefaultProvider('sepolia');
    this.contract = new ethers.Contract(
      this.configService.get<string>('TOKEN_ADDRESS'),
      tokenJson.abi,
      this.provider,
    )
  }

  getAddress(): any {
    const tokenAddress = this.configService.get<string>('TOKEN_ADDRESS');
    return { address:tokenAddress };
  }

  getBallot(){
    const ballotAdress = this.configService.get<string>('BALLOT_ADDRESS');
    return ballotAdress;
  }
  getTotalSupply() {
    const totalSupply = this.contract.totalSupply();
    return totalSupply;
  }
  getBalanceOf(address:string) {
    return this.contract.balanceOf(address);
  }
  async getTransactionReceipt(hash:string) {
    const receipt = await this.provider.getTransactionReceipt(hash);
    return receipt;
  }
  async mintTokens(address:string, signature:string){
    return address;
  }
  async getProposalsAndVotes() {
    const provider = await ethers.getDefaultProvider('sepolia');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    const ballotContract = new ethers.Contract(
      this.configService.get<string>('BALLOT_ADDRESS'),
      ballotJson.abi, 
      provider);
    for (let index = 0; index < 2; index++) {
      const proposal = await ballotContract.proposals(index);
      const propName = ethers.decodeBytes32String(proposal.name)
      const propVotes = await proposal.voteCount;
      return proposal;
    }
  }

  async requestTokens(address:string, signature:string) {
    const pKey = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(pKey);
    const signer = wallet.connect(this.provider);
    return signer;
    // return this.contract.connect(signer).mint(address, ethers.parseUnits("1"));
  }
}
