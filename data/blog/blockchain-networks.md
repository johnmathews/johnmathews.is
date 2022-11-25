---
title: >
  Blockchains from the ground up: Part 2
slug: blockchain-networks
date: "2017-7-8 13:52"
category: Technical>Cryptocurrencies
tags:
  [
    "blockchains",
    "digital currencies",
    "distributed ledger technology",
    "distributed consensus",
    "sybil,",
  ]
tweet: #Blockchains from the group up: Part 2
summary: An overview of the essential features of a blockchain, using proof-of-work for consensus
status: Published
---

## Maintain an accurate list of transactions across a large group of users, without a central authority

This is part 2 of an introduction to the key features of a generalised blockchain. [Part 1](blockchain-introduction) introduced key features of immutable record creation between 2 parties using public key cryptography. Part 2 explores how a network of users can maintain the same (true) list of transactions and protect each other against fraud.

## Broadcasting transactions to the network

In [Part 1](blockchain-introduction) we saw Lizzie, John and Chris exchanging coins. Lizzie also paid John with coins that were owed to her by Chris. These transactions were authenticated using PKI which:

- Ensured transaction integrity

- Prevented participants claiming that they didn't make a past transaction
- Prevents anyone creating a transaction on someone else's behalf without their consent.

As the number of people in the network grows, the transfer of coins from one user to another becomes harder to track. If every users ledger is not identical then the opportunity arises to use coins that have already been spent to pay someone who doesn't know they've already been used.

This is double spending, and is possible because the ledger that is shared amongst all members of the group only has _weak consistency_ - it is not necessarily correct all the time in all locations.

### Weak Consistency

Weak consistency could be solved by requiring that everyone votes to accept a transaction before it is accepted into the ledger (Unanimous consensus), or to save time we could reduce the requirements so that only 50% of all users validate a transaction before it is accepted into the ledger (Quorum consensus). Either of these solutions is possible for a small local group with a list of all users.

However Unanimous or Quorum Consensus doesn't solve the weak consistency problem if:

1. The group is large
2. The group is small but spread across different locations or timezones
3. It is not possible to know how many members there are and therefore what proportion of users are participating.
4. The _real_ identity of a user is unknown

In these cases a peer-to-peer network is required where transactions between users require approval by other users before being confirmed. This has not been trivial to solve, as some users would be incentivised to be dishonest, and some may make mistakes. This is the distributed consensus problem, which on [wikipedia](<https://en.wikipedia.org/wiki/Consensus_(computer_science)>) is defined as:

> The consensus problem requires agreement among a number of agents for a single data value. Some of the processes (agents) may fail or be unreliable in other ways, so consensus protocols must be fault tolerant or resilient. The processes must somehow put forth their candidate values, communicate with one another, and agree on a single consensus value.

## Distributed Consensus

When the number and identity of participants is known, distributed consensus is possible. Two types of protocol which allows all users in a distributed system to agree on a transaction are the [Paxos](<https://en.wikipedia.org/wiki/Paxos_(computer_science)>) family of protocols and the [Two-phase commit](http://courses.cs.vt.edu/~cs5204/fall00/distributedDBMS/duckett/tpcp.html) protocol. Both of these would require that at least 50% of all users reach agreement in order to add a new transaction.

However in a public peer-to-peer network the total number of active users is not known - its fast and cheap to create new user profiles, and existing user profiles may become dormant. This makes it impossible to know how many users 50% would be. Additionally, because its possible to cheaply create new user profiles (just generate a new public-private key pair), a single actor could generate and control many user accounts in order to have many votes and force incorrect transactions onto the ledger. An attack where one user subverts a network by creating many profiles is known as a [Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack).

### Proof of Work

The solution to the Sybil attack is to increase the cost of verifying a transaction such that the cost exceeds the reward. This is achieved through proof-of-work (PoW) algorithms, which are computationally expensive for a sender claiming to have verified a transaction, and computationally simple for the receiver to verify that the sender has validated the transaction.

One possible Proof of Work approach is to require that the hash of a verification message begins with a certain set of characters. The chosen set of characters is called a _nonce_ and the only way to create a verification message with an acceptable hash is to try many slightly different messages. For example, a nonce may be 3 zeros. It's arbitrary, but the longer the nonce is the more difficult it becomes to find a hash that fits the requirements.

This is because a hash is a random list of characters, and altering even a single part of the data being hashed will result in a completely different hash value. Therefore there is no way to predict a hash value. The only way to generate a hash with the required none is to repeatedly alter the data being hashed (even by just one character) until a hash with the required features is randomly achieved. This is computationally expensive to achieve, but computationally simple to verify.

Using the method, a user who seeks to verify a transaction and broadcast the result must (once they've verified the transactions) repeatedly try different messages until they randomly find a message that meets the nonce requirements. It is simple for a user to check if a transaction verification message meets the nonce requirements, because it is simple to inspect a hash and compare it to the nonce.

The effect of this requirement is a process that makes it expensive to claim that a transaction has been verified and cheap to check that verification claim. This removes the threat of a Sybil attack, but does not remove the distributed consensus problems created by not knowing:

1. The true identity of users in the network
2. How many users exist

This problem cannot be completely solved, and the practical solution is to relax the requirements such that the probability of accepting a fraudulent transaction is lower than some user defined threshold. This is acceptable because a user would require a higher degree of confirmation for a high-value transaction than they would for a low-value transaction, and would therefore be willing to incur more time and cost to verify a high value transaction and reduce the probability of accepting an incorrect transaction below a threshold.

If a user wishes to make fast or low-value transactions, or trusts the party they're transacting with, then they may accept a transaction without any other users on the network verifying that the sender has the required funds available.

However when the senders trustworthiness is not assured, verification is required. The more risky or valuable the transaction, the more users the receiver of the funds will ask to verify that the sender has access to the required funds. The higher the number of users, the higher the probability that a dishonest transaction will be identified before being accepted.

An appropriate level of verification will depend on the amount being transferred and how well the receiver of the funds knows the sender.

## Transaction fees

Asking peers on the network to verify transactions introduces a new problem. Verifying a transaction requires time and effort, and incurs a cost. This cost requires that network participants be rewarded for correctly verifying transactions between other participants.

An attacker would only attack if the cost is less than the reward. Therefore the number and cost of verifications required should be just enough to make the cost of an attack more than the value of the transaction.

This introduces the problem that it costs more to verify a transaction than the value of the transaction itself. It is also create the recursive problem where the users who verified the first transaction would need to verify that the payment they received was then also valid. Furthermore, a high proportion of the original transaction value is spent as a transaction fee (for verification) which is not efficient.

These problems are avoided by combining multiple transactions and verifying them at the same time, broadcasting the successful verification of multiple transactions simultaneously by grouping the transactions together into a block of transactions.

By confirming multiple transactions at once (and proving it using proof-of-work), transaction fees can be aggregated (allowing each individual fee to be much lower). Each block includes a list of verified transactions, a reference to the previous block, and a block ID.

## Incentivised social responsibility

The transaction verification process outlined above is remarkable because it creates a demand for new participants to the network by creating a financial incentive to verify transactions. This makes the network more secure as increasing the number of participants makes a sybil attack more difficult.

## Summary

1. Users generate new transactions and broadcast them on a peer-to-peer network for verification

2. An idle user listens for new transactions and collects them until the sum of all transactions' verification fees is greater than the cost the user will incur to verify them and meet the proof-of-work requirements

3. The idle user adds an extra transaction to their list of transactions that transfers the sum of the transaction fees to their own address.

4. The idle user generates the block of newly verified transactions, referencing the previously verified block so that transactions can be chronologically ordered and completing the proof-of-work challenge. This new block is then broadcast to the network.

5. Other users are listening for new block announcements. These users verify that the block is valid according to the proof-of-work requirements and the order of the blocks.

6. Users with unverified transactions look inside the verified block to see if their pending transactions have been accepted.

## Competing to validate blocks of transactions

Each user can choose which transactions they verify, and how many to verify before beginning the proof-of-work requirement and hopefully collecting the transaction fees. This lack of order around transaction verification is fine because the only way to increase the probability of being the first to claim the transaction fees associated with a collection of transactions (a block) is to spend more CPU power searching for the required partial hash collision.

If two users complete a block at approximately the same time then the blockchain will look different in different parts of the network, as each completed block begins to propagate and other users accept the new block and add it to their ledger. This is ok if a rule is enforced that requires a user to always accept the longest chain of blocks.

This works because if multiple blocks are created at the same time, the time it takes to create subsequent blocks will vary due to the random behaviour of the proof-of-work algorithm. Therefore chains of different length will always exist and one version of the block chain will be longer than the others, providing a clear candidate for which branch of the blockchain to use. If there are transactions in the discarded branch which are not present in the new (longest) blockchain then they are added back into the pool of transactions awaiting verification.

## A block of transactions in never absolutely immutable

The above procedure for verifying transactions and adding new blocks onto the chain means that even if a user inspects a new block and sees that their transaction has been verified, its possible that in the future a longer chain will be discovered (which must be accepted) which doesn't include their transaction.

Therefore any block could potentially be removed, which means a transaction is never completely verified. However the probability of a block being removed decreases as the number of blocks after it increases. This means verification can be thought of in terms of the number of blocks that have been added to the chain _after_ the block containing the transaction.

If you are willing to accept a high level of risk, or you trust the party you are transacting with you could opt for a small number of blocks to be added after the block containing your transaction. This has the benefit of increasing the speed of the transaction verification. If the transaction is risky or high-value, you might require a larger number of blocks to be added to the chain before accepting the transaction. This will increase the time required to verify the transaction, but reduce the probability that a longer chain will undo the block containing the transaction in question.
