# Cosmos Gov
Cosmos Gov is a web interface built for Cosmos governance and is a submission to the [AEZ Boost Hackathon](https://dorahacks.io/hackathon/aez-boost/detail).
Special care has been given to support displaying proposal content fields as well as weighted and legacy votes.


This web interface:
- Allows connection using Keplr wallet
- Lists and parses all Governance proposals
- Allows Weighted voting on proposals
- Shows off an individual user's vote (with support for weigthed votes)
- Allows the creation of a TextProposal with customizable deposit with autonavigation to the broadcasted proposal
- Makes use of the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) just because

Known issues:
- Markdown rendering can be wonky at times syntax
- SDK v0.47 protos are included but not used as Cosmos Hub has not yet upgraded at this time
- For lack of time, only TextProposal creation is supported at this time
- We're using a pretty naive implementation of a Spam proposal filter 
- Unknown proposals types will not cause the app to fail but show its content off as unknown 

## Getting Started
We expect a .env file in the env folder, you'll find a .env.example file outlining the required info

```bash
pnpm install

pnpm dev
```

Navigate to localhost:5173 

## Demo transactions
- Text Proposal creation on Cosmos Hub testnet [explorer link](https://testnet.mintscan.io/cosmoshub-testnet/txs/A630067D2A005A3C82997D2CC0C34DC3CA31A6DE8117EFA5997D46F3A5FFD641) (hash (A630067D2A005A3C82997D2CC0C34DC3CA31A6DE8117EFA5997D46F3A5FFD641)


- Weighted vote on Osmosis [explorer link](https://www.mintscan.io/osmosis/transactions/886CD10973DE83F0BA2131F9070A2E7BB30F586320417C61265CA2B1871712B1) (hash (886CD10973DE83F0BA2131F9070A2E7BB30F586320417C61265CA2B1871712B1)
