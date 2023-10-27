<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { PlusCircle } from 'lucide-svelte';
	import '../app.postcss';
	import Keplr from '$lib/components/icons/Keplr.svelte';
	import { ATOM_BALANCE, USER_ADDRESS, connectKeplr } from '$lib/state';
	import { onNavigate } from '$app/navigation';
	import { numberFormatter } from '$lib/utils';
	import { Toaster } from 'svelte-french-toast';
	import { PUBLIC_DENOM, PUBLIC_DISPLAY_DENOM } from '$env/static/public';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	BigInt.prototype.toJSON = function () {
  return this.toString();
};

</script>

<Toaster />


<header class="px-4 bg-white border-b ">
	<div
		class="flex flex-col items-center max-w-screen-xl gap-4 py-2 mx-auto space-x-3 md:flex lg:justify-end md:flex-row"
	>
		<Button href="/" variant="link">Home</Button>
		<Button href="/new" variant="link">
			<PlusCircle class="w-4 h-4 mr-2" />
			Create Proposal</Button
		>

		{#if $USER_ADDRESS && $ATOM_BALANCE}
			{@const displayedAddress = `${$USER_ADDRESS.slice(0, 6)}...${$USER_ADDRESS.slice(
				$USER_ADDRESS.length - 6
			)}`}
			<div class="flex items-center px-2 py-1 space-x-3 border rounded-md">
				<div class="w-9 h-9">
					<Keplr />
				</div>
				<div class="text-sm text-right">
					<div class="text-sm font-semibold tracking-wide">
						{displayedAddress}
					</div>
					<div class="text-xs mt-0.5">
						{numberFormatter.format(parseInt($ATOM_BALANCE.amount) * Math.pow(10, -6))}
						<span class="tracking-wide uppercase">{PUBLIC_DISPLAY_DENOM}</span>
					</div>
				</div>
			</div>
		{:else}
			<Button on:click={() => connectKeplr(window.keplr)}>
				<div class="w-6 h-6 mr-2">
					<Keplr />
				</div>
				Connect to keplr</Button
			>
		{/if}
	</div>
</header>

<main class="flex-grow w-full mx-auto bg-white shadow-md lg:max-w-screen-xl">
	<!-- 
	{#if $navigating}
		<div>
			<Spinner />
		</div>
	{:else}
		<slot />
	{/if}
	 -->
	<slot />
</main>
