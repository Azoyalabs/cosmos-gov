<script lang="ts">
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import SmartInput from './SmartInput.svelte';
	import type { AvailableProposals } from '$lib/utils/proposals';
	import ObjectInput from './ObjectInput.svelte';
	import ArrayInput from './ArrayInput.svelte';
	import { type Writable, writable } from 'svelte/store';

	export let val: Writable<AvailableProposals>;
</script>

<div class="space-y-5">
	{#each Object.keys($val) as k (k)}
		<div>
			<Label for={k} class="capitalize">{k}</Label>
			{#if Array.isArray($val[k])}
				<div class="ml-2">
					<ArrayInput bind:value={$val[k]} />
				</div>
			{:else if typeof $val[k] === 'object' && typeof $val[k].getMonth !== 'function'}
				<div class="ml-2">
					<ObjectInput bind:value={$val[k]} />
				</div>
			{:else if k === 'description'}
				<Textarea class="mt-1 min-h-[200px]" bind:value={$val[k]} required />
			{:else}
				<SmartInput bind:value={$val[k]} />
			{/if}
		</div>
	{/each}
</div>

<div class="mt-6">
	<h3 class="text-xl font-medium">Generated Message</h3>
	<div class="p-4 mt-1 overflow-x-auto border rounded-md shadow-inner">
		<!-- 

			<pre class="whitespace-pre">
				{JSON.stringify($val, undefined, 4)}
			</pre>
		-->
		<code class="w-full whitespace-pre-wrap">
			{JSON.stringify(
				$val,
				(key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
				2
			)}
		</code>
	</div>
</div>
