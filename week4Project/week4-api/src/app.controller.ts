import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ethers } from "ethers";
import { RequestTokensDto } from './dtos/requestTokens.dtp';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get("contract-address") 
  getAddress(): any {
    return this.appService.getAddress();
  }
  @Get("ballot-address") 
  getBallot() {
    return this.appService.getBallot();
  }

  @Get("total-supply") 
  getTotalSupply() {
    return this.appService.getTotalSupply();
  }
  @Get("balance/:address") 
  getBalanceOf(@Param('address') address: string) {
    return this.appService.getBalanceOf(address);
  }
  @Get("transaction-receipt/") 
  async getTransactionReceipt(@Query('hash') hash: string) {
    return await this.appService.getTransactionReceipt(hash);
  }
  
  @Get("proposals-votes") 
  async getProposalsAndVotes() {
    return await this.appService.getProposalsAndVotes();
  }

  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokensDto) {
    return this.appService.requestTokens(body.address, body.signature);
  }
}
