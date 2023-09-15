import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { parseProposal } from '$lib/cosmos/proposals';
import { registry } from '$lib/cosmos/registry';

export const load = (async ({ parent, params }) => {
	try {
		const { queryClient } = await parent();

		const { proposal } = await queryClient.gov.proposal(params.id);
		const { tally } = await queryClient.gov.tally(params.id);

		if (proposal) {
			const parsedProposal = parseProposal(proposal, registry);
			return {
				proposal: parsedProposal,
				tally: tally ?? null
			};
		} else {
			throw error(404, `No proposal found for ID ${params.id}`);
		}
	} catch (e) {
		console.error(e);
		throw error(404, `No proposal found for ID ${params.id}`);
	}
}) satisfies PageLoad;
