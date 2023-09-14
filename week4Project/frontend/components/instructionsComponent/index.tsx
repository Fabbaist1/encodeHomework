import { useEffect, useState } from "react";
import styles from "./instructionsComponent.module.css";
import { useContractRead, useAccount, useSignMessage, useNetwork, useBalance, UseContractReadConfig, useContractReads } from 'wagmi';
import * as tokenJson from "./assets/MyToken.json";
import * as ballotJson from "./assets/TokenizedBallot.json";
import { tokenizedAbi } from "./assets/TokenizedBallot.ts";
import { sepolia } from "wagmi/chains";
import { ethers } from "ethers";


export default function InstructionsComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>MyApp</h1>
        </div>
      </header>
      <p className={styles.get_started}>
        <PageBody></PageBody>
      </p>
    </div>
  );
}

function PageBody () {
  return (
    <div>
    <WalletInfo></WalletInfo>
    </div>
    
  );
}

function mint (){
  // useEffect to connect to the API 
  // https://react.dev/reference/react/useEffect#fetching-data-with-effects
  
}

function TokenAddressFromApi() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/contract-address')
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    })
  }, []);

  if (isLoading) return <p>Loading token address from API...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <p>Token address: {data.address}</p>
    </div>
  )
}



function ProposalsAndVotes(){

  const ballotContract = {
    address:'0x595b60F64d7327F12A05A602208462bF4fCE5673',
    abi: tokenizedAbi,
  };
    const { data, isError, isLoading } = useContractReads({
    contracts: [{
    functionName: 'proposals',
    args: [0],
  },
  {
    address: '0x595b60F64d7327F12A05A602208462bF4fCE5673',
    abi: ballotJson.abi,
    functionName: 'proposals',
    args: [1]
  },],})

  if (isLoading) {
    <p>Fetching blockchain data for you...</p>
  }
  if (isError) {
    <p>There are no proposals to be found</p>
  }
  return (// Load the Proposals and votes for the proposals into a table.
  
<p>The Proposal 1 is: {data?.name}</p>

  // <table>
  //   <tr>
  //     <th>Proposal 1</th>
  //     <th>Proposal 2</th>
  //   </tr>
  //   <tr>
  //     <th>{ data.name }</th>
  //     <th>Proposal 2</th>
  //   </tr>
  //   <tr>
  //     <th>Proposal 1</th>
  //     <th>Proposal 2</th>
  //   </tr>
  // </table>
  )
}

function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const {chain} = useNetwork();
  if (address) 
  return (
  <div>
    <p>Connected with: {address}</p>
    <p>Connected to network: {chain?.name}</p>
    <WalletBalance address={address}></WalletBalance>
    <WalletAction></WalletAction>
    <TokenAddressFromApi></TokenAddressFromApi>
    <ProposalsAndVotes></ProposalsAndVotes>
  </div>
  
  
  );
  if (isConnecting) return <div>Connecting...</div>
  if (isDisconnected) return <div>Connect wallet</div>
}

function WalletBalance (params: {address: any}) {
  const {data, isError, isLoading} = useBalance({address: params.address});
  if (isLoading) return <div>Fetching balance...</div>
  if (isError) return <div>Error fetching balance</div>
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>)
}

function WalletAction() {
  const [signatureMessage, setSignatureMessage] = useState("");

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
return (
  <div>
    <form>
      <label>
        <input
        type="text"
        value={signatureMessage}
        onChange= {(e) => setSignatureMessage(e.target.value)}
        />
      </label>
    </form>
    <button disabled={isLoading} 
    onClick={() => signMessage({message: signatureMessage})}>
      Sign message
    </button>
    {isSuccess && <div>Signature: {data}</div>}
    {isError && <div>Error signing message</div>}
  </div>
)
}