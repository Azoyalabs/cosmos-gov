<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { writable } from 'svelte/store';
	type $$Props = HTMLInputAttributes;

    
	export let value: string | number | bigint | Date;

	let actualInput = writable(value);
	actualInput.subscribe((v) => {
		if (typeof value === 'bigint') {
			value = BigInt(v as number);
			return;
		}
		if (value instanceof Date) {
			value = new Date(v as string);
			return;
		}

		value = v;
	});

	// TODO: we need something to transform back to and from bigint
	function getInputType(input: string | BigInt | Date): HTMLInputTypeAttribute {
		if (input instanceof Date) {
			return 'datetime-local';
		}

		return 'text';
	}
</script>

<Input {...$$restProps} type={getInputType(value)} bind:value={$actualInput} />
