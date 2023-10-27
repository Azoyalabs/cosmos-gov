<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let data;

	import {
		cleanProposalDescription,
		parseProposal,
		proposalStatusToText
	} from '$lib/cosmos/proposals';
	import { ProposalStatus } from 'cosmjs-types/cosmos/gov/v1beta1/gov.js';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Link } from 'lucide-svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { percentFormatter, toValidTransitionTag } from '$lib/utils';
	import Spinner from '$lib/components/ui/spinner/Spinner.svelte';
	import { registry } from '$lib/cosmos/registry.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	let showSpam = false;

	const isSpam = (title: string, description: string) =>
		!title.toLowerCase().includes('airdrop') && !description.toLowerCase().includes('airdrop');

	const proposalStatuses = [
		{ value: ProposalStatus.PROPOSAL_STATUS_PASSED, label: 'Passed' },
		{ value: ProposalStatus.PROPOSAL_STATUS_REJECTED, label: 'Rejected' },
		{ value: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD, label: 'Voting Period' },
		{ value: ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD, label: 'Deposit Period' }
	];

	let selected = proposalStatuses[0].label;
</script>

<section>
	<div class="px-4 py-8">
		<h1 class="text-4xl font-bold">Cosmos Governance & Proposals</h1>
		<p class="max-w-xl mt-2 text-sm">
			All governance proposals available on the chain are expected to reach a quorum of {percentFormatter.format(
				data.voting.quorum
			)} and a participation threshold of {percentFormatter.format(data.voting.threshold)} to be accepted.
		</p>
	</div>
</section>

<div class="flex items-center justify-between px-4 py-3 border-y">
	<div class="flex items-baseline space-x-2">
		<div>Proposal Status</div>
		<Select.Root
			onSelectedChange={async (e) => {
				selected = e.label;
				data.streamed.decoded = data.proposalQuerier(e.value, '', '').then((v) => {
					return v.proposals
						.map((p) => parseProposal(p, registry))
						.sort((a, b) => b.proposalId - a.proposalId);
				});
			}}
		>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder={proposalStatuses[0].label} />
			</Select.Trigger>
			<Select.Content>
				{#each proposalStatuses as propStatus}
					<Select.Item value={propStatus.value}>{propStatus.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="flex items-center space-x-2">
		<Checkbox id="spam" bind:checked={showSpam} aria-labelledby="show-spam" />
		<Label
			id="show-spam"
			for="show-spam"
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			Show Spam proposals
		</Label>
	</div>
</div>

<div class="px-4 py-8">
	{#await data.streamed.decoded}
		<div class="w-full">
			<Spinner />
		</div>
	{:then decoded}
		{@const filtered = showSpam
			? decoded
			: decoded?.filter((d) => isSpam(d.content.title, d.content.description)) ?? []}
		{#if filtered.length > 0}
			<p class="text-lg">
				{decoded.length}
				{selected} proposals found
			</p>
			<ul class="grid gap-3 mt-4 lg:grid-cols-2">
				{#each filtered as prop (prop.proposalId)}
					{@const description = cleanProposalDescription(prop.content.description)}
					<li class="relative flex flex-col w-full h-full">
						<Card.Root class="flex flex-col h-full">
							<Card.Header
								style="--tag: {toValidTransitionTag(
									prop.content.title
								)}-{prop.proposalId.toString()};"
							>
								<Card.Title>
									<Badge variant="secondary" class="tracking-wide">{prop.type}</Badge>
									<div class="mt-3 leading-snug">
										{prop.content.title}
									</div>
								</Card.Title>
								<Card.Description
									>#{prop.proposalId} - {proposalStatusToText(prop.status)}
								</Card.Description>
							</Card.Header>
							<Card.Content class="flex-grow max-h-[400px] overflow-y-auto">
								<div class="prose prose-cyan">
									<SvelteMarkdown source={description} />
								</div>
							</Card.Content>
							<Card.Footer>
								<Button variant="outline" class="w-full" href="/{prop.proposalId}">
									See more
									<Link class="inline-block w-4 h-4 ml-2" />
								</Button>
							</Card.Footer>
						</Card.Root>
						<!-- 
			<div class="px-4 py-2 border-b border-gray-300">
				<div class="flex items-center justify-between text-sm">
					<div>
						{prop.proposalId}
					</div>
					<div>
						{proposalStatusToText(prop.status)}
					</div>
				</div>
				<h2 class="mt-2 text-xl font-semibold">{prop.content.title}</h2>
			</div>
			<div class="flex-grow w-full max-w-full overflow-hidden">
				<div class="prose max-h-[400px] overflow-auto prose-cyan">
					<div class="px-4 pb-10">
						<SvelteMarkdown source={prop.content.description} />
					</div>
				</div>
			</div>
			<a
				class="absolute bottom-0 w-full px-4 py-2 duration-200 bg-white border-t border-gray-300 text-end hover:text-cyan-500"
				href="/{prop.proposalId}"
			>
				see more (link to prop)
			</a>
			 -->
					</li>
				{/each}
			</ul>
		{:else}
			<div>No proposal found</div>
		{/if}
	{/await}
</div>
