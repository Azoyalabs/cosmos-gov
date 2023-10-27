<script lang="ts">
	import TallyCard from '$lib/components/TallyCard.svelte';
	import * as Card from '$lib/components/ui/card';
	import SvelteMarkdown from 'svelte-markdown';
	import { toBase64 } from '@cosmjs/encoding';
	import type { Timestamp } from 'cosmjs-types/google/protobuf/timestamp';
	import { cleanProposalDescription, proposalStatusToText } from '$lib/cosmos/proposals';
	import { percentFormatter, splitUppercase, toValidTransitionTag } from '$lib/utils';
	import { SIGNING_CLIENT, USER_ADDRESS } from '$lib/state.js';
	import { MsgVoteWeighted } from 'cosmjs-types/cosmos/gov/v1beta1/tx.js';
	import {
		ProposalStatus,
		VoteOption,
		WeightedVoteOption
	} from 'cosmjs-types/cosmos/gov/v1beta1/gov';

	import { Slider } from '$lib/components/ui/slider';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { HACKATHON_MEMO } from '$lib/constants.js';

	export let data;
	$: ({ proposal, tally } = data);

	$: usedTally =
		proposal.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
			? tally
			: proposal.finalTallyResult!;

	$: fields = (() => {
		const keys = Object.keys(proposal.content);
		return keys.filter((k) => k !== 'title' && k !== 'description');
	})();

	const parseValue = (value: string | BigInt | Object | Timestamp | Record<string, unknown>) => {
		if (value === '') {
			return 'None';
		}
		if (typeof value === 'string' || typeof value === 'bigint') {
			return value;
		}

		if ((value as Uint8Array).byteLength) {
			return toBase64(value as Uint8Array);
		}

		if ((value as Timestamp).seconds) {
			return new Date(Number((value as Timestamp).seconds) * 1000);
		}
		/*
		if (value.revisionHeight) {
			return value.revisionHeight;
		}*/
		return value;
	};

	const userVotes: {
		[voteOption: number]: { label: string; option: VoteOption; value: number[] };
	} = {
		[VoteOption.VOTE_OPTION_YES]: {
			label: 'Yes',
			option: VoteOption.VOTE_OPTION_YES,
			value: [0]
		},
		[VoteOption.VOTE_OPTION_NO]: {
			label: 'No',

			option: VoteOption.VOTE_OPTION_NO,
			value: [0]
		},
		[VoteOption.VOTE_OPTION_NO_WITH_VETO]: {
			label: 'No with veto',

			option: VoteOption.VOTE_OPTION_NO_WITH_VETO,
			value: [0]
		},
		[VoteOption.VOTE_OPTION_ABSTAIN]: {
			label: 'Abstain',

			option: VoteOption.VOTE_OPTION_ABSTAIN,
			value: [0]
		}
	};
	$: totalWeights =
		Object.values(userVotes)
			.map((v) => v.value[0])
			.reduce((p, c) => p + c) || 101;

	$: isValidTotal = totalOptionsWeights === 1;

	$: votingOptions = (() => {
		// For a weighted vote to be valid, the options field must not contain duplicate vote options, and the sum of weights of all options must be equal to 1.

		const options = Object.values(userVotes)
			.filter((v) => v.value[0] !== 0)
			.map((vote) => {
				return {
					option: vote.option,
					weight: (Number(vote.value[0] / totalWeights) || 0).toFixed(2)
				};
			});

		return options;
	})();

	$: totalOptionsWeights = votingOptions.map((v) => Number(v.weight)).reduce((p, c) => p + c, 0);

	async function voteOnProposal() {
		const voteMessage = MsgVoteWeighted.fromPartial({
			proposalId: proposal.proposalId,
			voter: $USER_ADDRESS!,
			options: votingOptions.map((v) => ({
				...v,
				// NOTE: weight is not actually 1.00 but 1.00 * 10^18
				weight: (Number(v.weight) * Math.pow(10, 18)).toString()
			}))
		});

		const vote = $SIGNING_CLIENT!.signAndBroadcast(
			$USER_ADDRESS!,
			[{ typeUrl: '/cosmos.gov.v1beta1.MsgVoteWeighted', value: voteMessage }],
			'auto',
			HACKATHON_MEMO
		);
		

		toast.promise(vote, {
			loading: 'Sending Transaction...',
			success: (val) => {
				return `Success!\n Hash: ${val.transactionHash}`;
			},
			error: (err) => {
				return `Something went wrong.\n ${(err as Error).message}`;
			}
		});

		vote.then(getUserVote);
	}

	let userVote: WeightedVoteOption[] | null = null;

	async function getUserVote() {
		if ($USER_ADDRESS) {
			try {
				const { vote } = await data.queryClient.gov.vote(data.proposal.proposalId, $USER_ADDRESS);
				if (vote) {
					let userVoteOptions = vote?.options;
					// This is only set if there's only ONE option and has a weight of 1
					if (vote?.option !== VoteOption.VOTE_OPTION_UNSPECIFIED) {
						userVoteOptions = [{ option: vote?.option, weight: '1' }];
					}
					userVote = userVoteOptions;
				} else {
					userVote = null;
				}
			} catch (error) {
				userVote = null;
			}
		} else {
			userVote = null;
		}
	}
	onMount(() => {
		getUserVote();
	});

	USER_ADDRESS.subscribe((_) => {
		getUserVote();
	});
</script>

<section class="px-4 py-6 border-b">
	<Badge variant="secondary" class="tracking-wide">{proposal.type}</Badge>

	<h1
		class="mt-4 text-3xl font-bold"
		style:--tag={`${toValidTransitionTag(
			proposal.content.title
		)}-${proposal.proposalId.toString()}`}
	>
		{proposal.content.title}
	</h1>

	<p class="mt-1 text-xs">
		Proposal {proposal.proposalId.toString()} - {proposalStatusToText(proposal.status)}
	</p>
</section>

<section class="">
	<div class="p-4">
		<h2 class="text-lg font-medium">Tally</h2>
		<ul class="grid gap-4 mt-2 lg:grid-cols-4 sm:grid-cols-2">
			{#each Object.entries(usedTally) as entry, i}
				<li>
					<TallyCard value={entry[1]} vote={entry[0]} />
				</li>
			{/each}
		</ul>

		{#if $USER_ADDRESS}
			<div class="mt-6 text-sm text-right">
				<div>
					<div class="text-sm">Your Vote</div>

					<div class="mt-1">
						{#if userVote}
							{userVote
								.map((v) => {
									return `${userVotes[v.option].label} (${percentFormatter.format(
										Number(v.weight) * Math.pow(10, -18)
									)})`;
								})
								.join(' - ')}
						{:else}
							You have not voted on this proposal
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<Separator />

{#if proposal.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD && $USER_ADDRESS}
	<section class="p-4">
		<div class="p-4 border">
			<h2 class="text-lg font-medium">Vote on proposal</h2>

			<div class="grid grid-cols-4 gap-6 mt-4">
				{#each Object.keys(userVotes) as vote}
					<div>
						<Label class="flex items-center justify-between">
							{userVotes[vote].label}
							<span>
								{percentFormatter.format(userVotes[vote].value / totalWeights)}
							</span>
						</Label>
						<Slider bind:value={userVotes[vote].value} step={1} max={100} class="mt-3" />
					</div>
				{/each}
			</div>

			<div class="flex items-center justify-end mt-4">
				{#if !isValidTotal && totalOptionsWeights !== 0}
					<Badge class="mr-3" variant="destructive" title="Total of weights should be equal to 1">
						Sum of weights does not compute to 1
					</Badge>
				{/if}
				<Button disabled={!isValidTotal} on:click={voteOnProposal}>Vote</Button>
			</div>
		</div>
	</section>
{/if}

<div class="px-4 py-6 prose lg:prose-lg prose-cyan">
	<SvelteMarkdown source={cleanProposalDescription(proposal.content.description)} />
</div>

<Separator />

{#if fields.length > 0}
	<section class="p-4">
		<h2 class="text-2xl font-medium">Proposal Info</h2>
		<ul class="grid gap-3 mt-4 overflow-auto {fields.length > 6 ? 'lg:grid-cols-3' : ''}">
			{#each fields as field}
				{@const value = parseValue(proposal.content[field])}
				<li>
					<Card.Root class="h-full">
						<Card.Header>
							<Card.Title class="text-lg capitalize">
								{splitUppercase(field)}
							</Card.Title>
						</Card.Header>
						<Card.Content>
							{#if typeof value === 'object'}
								<code class="w-full whitespace-pre-wrap">
									{JSON.stringify(
										value,
										(key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
										2
									)}
								</code>
							{:else}
								<p class="break-all">
									{value}
								</p>
							{/if}
						</Card.Content>
					</Card.Root>
				</li>
			{/each}
		</ul>
	</section>
{/if}
