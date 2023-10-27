<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { MsgSubmitProposal } from '$lib/cosmos/transpile/cosmos/gov/v1beta1/tx';

	import { ATOM_BALANCE, SIGNING_CLIENT, USER_ADDRESS } from '$lib/state';
	import { type Writable, writable } from 'svelte/store';
	import { PUBLIC_DENOM, PUBLIC_DISPLAY_DENOM } from '$env/static/public';
	import { HACKATHON_MEMO } from '$lib/constants.js';
	import { SendIcon } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import ProposalForm from './ProposalForm.svelte';
	import { AVAILABLE_PROPOSALS_DESCRIPTORS, type AvailableProposals } from '$lib/utils/proposals';

	export let data;
	
	const allowedProposalTypes = AVAILABLE_PROPOSALS_DESCRIPTORS.map((p) => ({
		...p,
		disabled: p.disabled ?? false
	}));

	let selectedProposalType = writable(allowedProposalTypes[0]);

	let partial: Writable<AvailableProposals> = writable({ ...$selectedProposalType.value });

	selectedProposalType.subscribe((v) => {
		partial = writable({ ...v.value });
	});

	async function submitProposal() {
		// @ts-expect-error typescript can't know what we have here
		const partialProp = $selectedProposalType.partial($partial);

		const msgSubmitProposal = MsgSubmitProposal.fromPartial({
			proposer: $USER_ADDRESS!,
			content: {
				typeUrl: $selectedProposalType.url,
				// @ts-expect-error
				value: Uint8Array.from($selectedProposalType.encoder(partialProp).finish())
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
					target="_blank"
					class="px-0">markdown format</Button
				> when writing the description.
			</p>
		</div>

		<div class="mt-5">
			<ProposalForm bind:val={partial} />
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
