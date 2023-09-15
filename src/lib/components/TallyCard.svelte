<script lang="ts">
	import { PUBLIC_DISPLAY_DENOM } from '$env/static/public';

	export let value: number;
	export let vote: string;

	$: displayVote = (() => {
		return vote;
	})();

	const formatter = new Intl.NumberFormat('en-us', {});
</script>

<div class="px-4 py-2 border border-gray-300 rounded-md">
	<div class="font-semibold capitalize">
		{displayVote}
	</div>
	<div class="mt-2 text-right">
		<div class="text-sm font-medium text-gray-800">
			{formatter.format(value * Math.pow(10, -6))}
			<span class="uppercase">{PUBLIC_DISPLAY_DENOM}</span>
		</div>
	</div>
</div>
