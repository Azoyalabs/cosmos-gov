<script lang="ts">
	import { writable } from 'svelte/store';
	import SmartInput from './SmartInput.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	export let value: Record<string, unknown>;

	let input = writable(value);

	input.subscribe((i) => {
		value = i;
	});
</script>

{#each Object.entries($input) as [k, v]}
	<Label for={k} class="capitalize">{k}</Label>
	<SmartInput name={k} bind:value={$input[k]} />
{/each}
