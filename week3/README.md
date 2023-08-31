# Deploy.ts works

contract ADDRESS_Ballot = "0x595b60F64d7327F12A05A602208462bF4fCE5673";<br>
https://sepolia.etherscan.io/tx/0x9c6d9b930eacb43d86fa3b206ab8be7b773892eb129d23bafd900850521e987e <br>
contract ADDRESS_Token = "0x28Df0768dB160bA6f1fC341716489fd828645933";<br>
https://sepolia.etherscan.io/tx/0xfd332494c1bc6487984b8ff40fc15fbef880f27813dc54f3955c8dd842349ae9 <br>
Proposals: Strawbeery Chocolate Vanilla 
(edit: yes, strawberry has a typo but it's on the blockchain now...) 

Immense issues with making things work, the previous ballot had been deployed in the wrong order so after minting, delegating again redeploying the Ballot the new version works. 
New ADDRESS_Ballot = "0x2FC16063737d84Da281C3Ad6e8821AfA2fB834E4";<br>
https://sepolia.etherscan.io/address/0x28df0768db160ba6f1fc341716489fd828645933 <br>

# Mint.ts works fine
Mint to self:<br>
https://sepolia.etherscan.io/tx/0xee3f37e126df848af22ca50a1f72826c2dfd47b453e5364bba4fb3f57d8882bc <br>
Mint to 2nd Dev wallet<br>
https://sepolia.etherscan.io/tx/0xd50edc0eadef66a99450aa3dfea42afb87e0e35d35c4f258130e967308989f93 <br>

Previous mints were only 1 decimal, so this mint tx for 1000 TOKENS (1000*10**18) <br>
https://sepolia.etherscan.io/tx/0x1cb12ec9c0c0ff0aedc0f368e25779cba79e22e6eeb493096694cc8173c9a930 <br>

# Delegate.ts works fine <br>
https://sepolia.etherscan.io/tx/0x8bcd93554d49dc6a8edb014ea69ad01f32d7add000d588cdb53b57d8ead086f2

Redelegate after new mint
https://sepolia.etherscan.io/tx/0x01b4615597130056f3220c1b2f83268067f339cc429e6ab848d812cf0e728809

# castVotes.ts
not working as intended, searching for the issue.<br>
Resultion described above.<br>

castVotes tx for 20 votes.<br> 
https://sepolia.etherscan.io/tx/0xc122532e68bcde64f290c9bdf7bdf534d8bee3d039bdcee5937daff322353bf4 <br>

Notes: Adjust the Factory and the Address to the correct account (deployed address). 
CAREFUL, the ballot timestamp needs to be after token mint and delegation
