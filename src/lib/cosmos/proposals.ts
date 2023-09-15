import type { Coin, Registry } from '@cosmjs/proto-signing';
import type {
	CommunityPoolSpendProposal,
	CommunityPoolSpendProposalWithDeposit
} from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
import {
	ProposalStatus,
	type Proposal,
	TallyResult,
	TextProposal
} from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import type { ParameterChangeProposal } from 'cosmjs-types/cosmos/params/v1beta1/params';
import type {
	CancelSoftwareUpgradeProposal,
	SoftwareUpgradeProposal
} from 'cosmjs-types/cosmos/upgrade/v1beta1/upgrade';
import type { Timestamp } from 'cosmjs-types/google/protobuf/timestamp';

export const proposalStatusToText = (status: ProposalStatus) => {
	switch (status) {
		case ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED:
			return 'Unspecified';
		case ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD:
			return 'Deposit Period';
		case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD:
			return 'Voting Period';
		case ProposalStatus.PROPOSAL_STATUS_PASSED:
			return 'Passed';
		case ProposalStatus.PROPOSAL_STATUS_REJECTED:
			return 'Rejected';
		case ProposalStatus.PROPOSAL_STATUS_FAILED:
			return 'Failed';
		case ProposalStatus.UNRECOGNIZED:
			return 'Unrecognized';
	}
};

export interface ParsedProposal {
	proposalId: number;
	status: ProposalStatus;
	finalTallyResult: TallyResult | null;
	submit: Date | null;
	depositEnd: Date | null;
	votingStart: Date | null;
	votingEnd: Date | null;
	totalDeposit: Coin[];
	content:
		| CommunityPoolSpendProposalWithDeposit
		| TextProposal
		| SoftwareUpgradeProposal
		| ParameterChangeProposal
		| CancelSoftwareUpgradeProposal;
	type: string | null;
}

function timestampToDate(timestamp: Timestamp) {
	return new Date(timestamp.seconds.toString());
}

export function parseProposal(proposal: Proposal, registry: Registry): ParsedProposal {
	let content = null;
	let type = null;
	if (proposal.content) {
		try {
			content = registry.decode(proposal.content);
			type = proposal.content.typeUrl.split('.').at(-1) ?? proposal.content.typeUrl;
		} catch (error) {
			console.error(`proposal ${proposal.proposalId.toNumber()} - ${(error as Error).message}`);

			content = { title: 'Unknown', description: 'Unknown' };
			type = proposal.content.typeUrl.split('.').at(-1) ?? proposal.content.typeUrl;
		}
	}

	return {
		proposalId: proposal.proposalId.toNumber(),
		content,
		submit: proposal.submitTime ? timestampToDate(proposal.submitTime) : null,
		depositEnd: proposal.depositEndTime ? timestampToDate(proposal.depositEndTime) : null,
		votingStart: proposal.votingStartTime ? timestampToDate(proposal.votingStartTime) : null,
		votingEnd: proposal.votingEndTime ? timestampToDate(proposal.votingEndTime) : null,
		finalTallyResult: proposal.finalTallyResult ?? null,
		status: proposal.status,
		totalDeposit: proposal.totalDeposit,
		type
	};
}

export function cleanProposalDescription(description: string) {
	return description
		.replaceAll('\\n', '<br /> ')
		.replaceAll('\\r', '<br /> ')
		.replaceAll('\\', '<br /> ');
}
