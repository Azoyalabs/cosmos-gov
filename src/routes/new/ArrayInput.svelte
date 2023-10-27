<script lang="ts">
	import { writable } from 'svelte/store';
	import SmartInput from './SmartInput.svelte';
	import ObjectInput from './ObjectInput.svelte';

	export let value: unknown[];

	let input = writable(value);

	input.subscribe((i) => {
		value = i;
	});
</script>

{#each $input as value, i}
	{#if typeof value === 'object' && typeof value.getMonth !== 'function'}
		<div class="ml-2">
			<ObjectInput bind:value={$input[i]} />
		</div>
	{:else}
		<SmartInput bind:value />
	{/if}
{/each}
