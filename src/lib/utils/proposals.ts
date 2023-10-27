import { PUBLIC_DENOM } from '$env/static/public';
import { BinaryWriter } from '$lib/cosmos/transpile';
import { CommunityPoolSpendProposal } from '$lib/cosmos/transpile/cosmos/distribution/v1beta1/distribution';
import { TextProposal } from '$lib/cosmos/transpile/cosmos/gov/v1beta1/gov';
import { ClientUpdateProposal } from '$lib/cosmos/transpile/ibc/core/client/v1/client';
import {
	ConsumerAdditionProposal,
	ConsumerRemovalProposal,
	EquivocationProposal
} from '$lib/cosmos/transpile/interchain_security/ccv/provider/v1/provider';

interface ProposalDescriptor<T> {
	label: string;
	description: string;
	value: T;
	url: string;
	partial: (input: T) => T;
	encoder: (message: T) => BinaryWriter;
	disabled?: boolean;
}

const textProposalDescriptor: ProposalDescriptor<TextProposal> = {
	value: {
		title: '',
		description: ''
	},
	url: '/cosmos.gov.v1beta1.TextProposal',
	label: 'Text Proposal',
	description: 'Signal support for a change',
	partial: TextProposal.fromPartial,
	encoder: TextProposal.encode
};

const consumerRemovalProposal: ProposalDescriptor<ConsumerRemovalProposal> = {
	value: {
		title: '',
		description: '',
		chainId: '',
		stopTime: new Date()
	},
	label: 'Consumer Removal Proposal',
	description: 'Remove an ICS consumer',
	url: '/interchain_security.ccv.provider.v1.ConsumerRemovalProposal',
	partial: ConsumerRemovalProposal.fromPartial,
	encoder: ConsumerRemovalProposal.encode
};

const equivocationProposalDescriptor: ProposalDescriptor<EquivocationProposal> = {
	value: {
		title: '',
		description: '',
		equivocations: [
			{
				consensusAddress: '',
				height: BigInt(0),
				power: BigInt(0),
				time: new Date()
			}
		]
	},
	label: 'Equivocation Proposal',
	description:
		'Ask for a penalty regarding validator malfeasance such as equivocation (double-voting), signing when unbonded or signing an incorrect state transition',
	url: '/interchain_security.ccv.provider.v1.EquivocationProposal',
	partial: EquivocationProposal.fromPartial,
	encoder: EquivocationProposal.encode
};

const communityPoolSpendProposalDescriptor: ProposalDescriptor<CommunityPoolSpendProposal> = {
	value: {
		title: '',
		description: '',
		amount: [{ amount: '0', denom: PUBLIC_DENOM }],
		recipient: ''
	},
	label: 'Community Pool Spend Proposal',
	description: 'Ask for funding from the community pool',
	url: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
	partial: CommunityPoolSpendProposal.fromPartial,
	encoder: CommunityPoolSpendProposal.encode
};

const clientUpdateProposalDescriptor: ProposalDescriptor<ClientUpdateProposal> = {
	value: {
		title: '',
		description: '',
		subjectClientId: '',
		substituteClientId: ''
	},
	label: 'Client Update Proposal',
	description: 'Update an IBC client',
	url: '/ibc.core.client.v1.ClientUpdateProposal',
	partial: ClientUpdateProposal.fromPartial,
	encoder: ClientUpdateProposal.encode
};

const consumerAdditionProposalDescriptor: ProposalDescriptor<ConsumerAdditionProposal> = {
	value: {
		title: '',
		description: '',
		binaryHash: new Uint8Array(),
		blocksPerDistributionTransmission: BigInt(0),
		ccvTimeoutPeriod: { nanos: 0, seconds: BigInt(0) },
		chainId: '',
		consumerRedistributionFraction: '',
		distributionTransmissionChannel: '',
		genesisHash: new Uint8Array(),
		historicalEntries: BigInt(0),
		initialHeight: {
			revisionHeight: BigInt(0),
			revisionNumber: BigInt(0)
		},
		spawnTime: new Date(),
		transferTimeoutPeriod: { nanos: 0, seconds: BigInt(0) },
		unbondingPeriod: { nanos: 0, seconds: BigInt(0) }
	},

	label: 'Consumer Addition Proposal',
	description: 'Add an ICS consumer',
	url: '/interchain_security.ccv.provider.v1.ConsumerAdditionProposal',
	partial: ConsumerAdditionProposal.fromPartial,
	encoder: ConsumerAdditionProposal.encode,
	disabled: true
};

export const AVAILABLE_PROPOSALS_DESCRIPTORS = [
	textProposalDescriptor,
	communityPoolSpendProposalDescriptor,
	consumerRemovalProposal,
	clientUpdateProposalDescriptor,
	equivocationProposalDescriptor,
	consumerAdditionProposalDescriptor
] as const;

export type AvailableProposals = (typeof AVAILABLE_PROPOSALS_DESCRIPTORS)[number]['value'];
