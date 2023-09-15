<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { MsgSubmitProposal } from '$lib/cosmos/transpile/cosmos/gov/v1beta1/tx';

	import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
	import {
		ConsumerAdditionProposal,
		ConsumerRemovalProposal,
		EquivocationProposal
	} from '$lib/cosmos/transpile/interchain_security/ccv/provider/v1/provider';
	import { ATOM_BALANCE, SIGNING_CLIENT, USER_ADDRESS } from '$lib/state';
	import { CommunityPoolSpendProposal } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
	import { ParameterChangeProposal } from 'cosmjs-types/cosmos/params/v1beta1/params';
	import { SoftwareUpgradeProposal } from 'cosmjs-types/cosmos/upgrade/v1beta1/upgrade';
	import { ClientUpdateProposal } from 'cosmjs-types/ibc/core/client/v1/client';
	import { writable } from 'svelte/store';
	import { PUBLIC_DENOM, PUBLIC_DISPLAY_DENOM } from '$env/static/public';
	import { HACKATHON_MEMO } from '$lib/constants.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { SendIcon } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	export let data;

	const allowedProposalTypes = [
		{
			label: 'Text Proposal',
			description: 'Ask stakers to signal support for a change',
			value: TextProposal,
			url: '/cosmos.gov.v1beta1.TextProposal'
		},
		{
			label: 'Community Pool Spend Proposal',
			description: 'Ask for funding from the community pool',
			value: CommunityPoolSpendProposal,
			url: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
			disabled: true
		},
		{
			label: 'Software Upgrade proposal',
			description: 'Upgrade the network to a new version',
			value: SoftwareUpgradeProposal,
			url: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
			disabled: true
		},
		{
			label: 'Consumer Addition Proposal',
			description: 'Add an ICS consumer',
			value: ConsumerAdditionProposal,
			url: '/interchain_security.ccv.provider.v1.ConsumerAdditionProposal',
			disabled: true
		},
		{
			label: 'Consumer Removal Proposal',
			description: 'Remove an ICS consumer',
			value: ConsumerRemovalProposal,
			url: '/interchain_security.ccv.provider.v1.ConsumerRemovalProposal',
			disabled: true
		},
		{
			label: 'Parameter Change Proposal',
			description: 'Change one or multiple parameters',
			value: ParameterChangeProposal,
			url: '/cosmos.params.v1beta1.ParameterChangeProposal',
			disabled: true
		},
		{
			label: 'Client Update Proposal',
			description: 'Update an IBC client',
			value: ClientUpdateProposal,
			url: '/ibc.core.client.v1.ClientUpdateProposal',
			disabled: true
		},
		{
			label: 'Equivocation Proposal',
			description: 'equivocation',
			value: EquivocationProposal,
			url: '/interchain_security.ccv.provider.v1.EquivocationProposal',
			disabled: true
		}
	];

	let selectedProposalType = writable(allowedProposalTypes[0]);

	let partial = $selectedProposalType.value?.fromPartial({}) ?? {};
	selectedProposalType.subscribe((v) => {
		partial = v.value.fromPartial({});
	});

	async function submitProposal() {
		const textprop = $selectedProposalType.value.fromPartial(partial);
		const msgSubmitProposal = MsgSubmitProposal.fromPartial({
			proposer: $USER_ADDRESS!,
			content: {
				typeUrl: $selectedProposalType.url,
				value: Uint8Array.from($selectedProposalType.value.encode(textprop).finish())
			},
			initialDeposit: [
				{ amount: ((deposit ?? 0) * Math.pow(10, 6)).toString(), denom: PUBLIC_DENOM }
			]
		});

		const transaction = $SIGNING_CLIENT!.signAndBroadcast(
			$USER_ADDRESS!,
			[
				{
					typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
					value: msgSubmitProposal
				}
			],
			'auto',
			HACKATHON_MEMO
		);

		toast.promise(transaction, {
			loading: 'Sending Transaction...',
			success: (val) => {
				return `Success!\n Hash: ${val.transactionHash}`;
			},
			error: (err) => {
				return `Something went wrong.\n ${(err as Error).message}`;
			}
		});

		transaction.then(async (tx) => {
			const t = await data.stargateClient.getTx(tx.transactionHash);
			const event = t?.events.find((v) => v.type === 'submit_proposal');

			if (event) {
				const attribute = event.attributes.find((a) => a.key === 'proposal_id');
				if (attribute) {
					const proposalID = attribute.value;
					await goto(`/${proposalID}`);
				}
			}
		});
	}
	let deposit: number | null = null;
</script>

<form class="divide-y divide-gray-300 [&>*]:p-4" on:submit|preventDefault={() => submitProposal()}>
	<section>
		<h1 class="text-4xl font-bold">Create new proposal</h1>
		<p class="mt-2 text-sm text-gray-800">Create a new proposal and put it to a vote.</p>
	</section>

	<section>
		<h2 class="text-2xl font-medium">Proposal Type</h2>
		<select bind:value={$selectedProposalType} class="px-2 py-1 mt-6 border rounded-md">
			{#each allowedProposalTypes as allowed (allowed)}
				<option value={allowed} disabled={allowed.disabled}>{allowed.label}</option>
			{/each}
		</select>
		<p class="mt-2 text-sm text-gray-800">
			{$selectedProposalType.description}
		</p>
	</section>

	<section>
		<div>
			<h2 class="text-2xl font-medium">Proposal Content</h2>
			<p class="mt-2 text-sm text-gray-800">
				What the proposal entails. We recommend using the <Button
					variant="link"
					href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
					rel="noref"
					class="px-0">markdown format</Button
				> when writing the description.
			</p>
		</div>

		<div class="mt-5 space-y-5">
			{#each Object.entries(partial) as kv (kv[0])}
				<div>
					<Label for="" class="capitalize">{kv[0]}</Label>
					{#if kv[0] === 'description'}
						<Textarea class="mt-1 min-h-[200px]" bind:value={partial[kv[0]]} required />
					{:else}
						<Input class="mt-1" bind:value={partial[kv[0]]} required />
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<section>
		<div>
			<h2 class="text-2xl font-medium">Deposit</h2>
			<p class="mt-1 text-sm text-gray-800">
				Proposals require a certain amount of tokens to be presented to a vote. You are not required
				to bring the full amount yourself.
			</p>
		</div>
		<div class="flex flex-col gap-1.5 mt-5">
			<Label
				>Deposit amount
				<span class="text-xs font-medium uppercase">
					({PUBLIC_DISPLAY_DENOM})
				</span>
			</Label>
			<Input
				type="number"
				bind:value={deposit}
				max={$ATOM_BALANCE?.amount}
				step="0.000001"
				placeholder="0.00"
				required
			/>

			<p class="text-sm text-muted-foreground">
				{Number(data.minDeposit.amount) * Math.pow(10, -6)}
				<span class="font-medium uppercase">{PUBLIC_DISPLAY_DENOM}</span> required to get to voting stage
			</p>
		</div>
	</section>

	<section class="flex items-center justify-end">
		<Button disabled={!$USER_ADDRESS}>
			<SendIcon size="14" class="mr-2" />
			Create Proposal
		</Button>
	</section>
</form>
