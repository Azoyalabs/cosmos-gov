import { StargateClient } from '@cosmjs/stargate';
import type { LayoutLoad } from './$types';
import { Tendermint37Client } from '@cosmjs/tendermint-rpc';
import { QueryClient, setupGovExtension } from '@cosmjs/stargate';
import { ProposalStatus } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { parseProposal, type ParsedProposal } from '$lib/cosmos/proposals';
import { registry } from '$lib/cosmos/registry';
import { PUBLIC_CHAIN_RPC, PUBLIC_DENOM } from '$env/static/public';
import { fromUtf8, toUtf8 } from '@cosmjs/encoding';

export const load = (async () => {
	const stargateClient = await StargateClient.connect(PUBLIC_CHAIN_RPC);
	const tendermint = await Tendermint37Client.connect(PUBLIC_CHAIN_RPC);
	const queryClient = QueryClient.withExtensions(tendermint, setupGovExtension);

	const { depositParams } = await queryClient.gov.params('deposit');
	const { tallyParams } = await queryClient.gov.params('tallying');

	const { votingParams } = await queryClient.gov.params("voting");
	
	const proposalQuerier = queryClient.gov.proposals;
	const proposalQuery = proposalQuerier(
		ProposalStatus.PROPOSAL_STATUS_PASSED,
		'',
		'',
		new Uint8Array()
	);

	return {
		stargateClient,
		queryClient,
		minDeposit: depositParams!.minDeposit[0] ?? {amount: "0", denom: PUBLIC_DENOM},
		proposalQuerier,
		voting: {
			quorum: Number(fromUtf8(tallyParams!.quorum)) * Math.pow(10, -18),
			threshold: Number(fromUtf8(tallyParams!.threshold)) * Math.pow(10, -18)
		},
		streamed: {
			decoded: proposalQuery.then((v) =>
				v.proposals
					.map((p) => parseProposal(p, registry))
					.filter((v) => v)
					.sort((a, b) => b.proposalId - a.proposalId)
			)
		}
	};
}) satisfies LayoutLoad;
