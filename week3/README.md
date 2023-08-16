# Deploy.ts works

contract ADDRESS_Ballot = "0x595b60F64d7327F12A05A602208462bF4fCE5673";<br>
contract ADDRESS_Token = "0x28Df0768dB160bA6f1fC341716489fd828645933";<br>
Proposals: Strawbeery Chocolate Vanilla 
(edit: yes, strawberry has a typo but it's on the blockchain now...) 

# Mint.ts works fine
Mint to self:<br>
https://sepolia.etherscan.io/tx/0xee3f37e126df848af22ca50a1f72826c2dfd47b453e5364bba4fb3f57d8882bc <br>
Mint to 2nd Dev wallet<br>
https://sepolia.etherscan.io/tx/0xd50edc0eadef66a99450aa3dfea42afb87e0e35d35c4f258130e967308989f93 <br>

# Delegate.ts works fine <br>
https://sepolia.etherscan.io/tx/0x8bcd93554d49dc6a8edb014ea69ad01f32d7add000d588cdb53b57d8ead086f2

# castVotes.ts
not working as intended, searching for the issue.

Notes: Adjust the Factory and the Address to the correct account (deployed address). 
