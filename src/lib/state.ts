import { writable } from 'svelte/store';
import type { Keplr } from '@keplr-wallet/types';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { GasPrice, SigningStargateClient } from '@cosmjs/stargate';
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import { PUBLIC_CHAIN_ID, PUBLIC_CHAIN_RPC, PUBLIC_DENOM } from '$env/static/public';

export const KEPLR_STORE = writable<Keplr | null>(null);

const OFFLINE_SIGNER = writable<OfflineSigner | null>(null);
export const SIGNING_CLIENT = writable<SigningStargateClient | null>(null);
export const USER_ADDRESS = writable<string | null>(null);
export const ATOM_BALANCE = writable<Coin | null>(null);

export async function connectKeplr(keplr: Keplr) {
	await keplr.enable(PUBLIC_CHAIN_ID);
	OFFLINE_SIGNER.set(keplr.getOfflineSigner(PUBLIC_CHAIN_ID));
}

OFFLINE_SIGNER.subscribe(async (signer) => {
	if (signer) {
		const accounts = await signer.getAccounts();
		const { address } = accounts[0];
		USER_ADDRESS.set(address);

		const client = await SigningStargateClient.connectWithSigner(PUBLIC_CHAIN_RPC, signer, {
			gasPrice: GasPrice.fromString(`0.01${PUBLIC_DENOM}`)
		});
		SIGNING_CLIENT.set(client);

		ATOM_BALANCE.set(await client.getBalance(address, PUBLIC_DENOM));
	} else {
		SIGNING_CLIENT.set(null);
		USER_ADDRESS.set(null);
		ATOM_BALANCE.set(null);
	}
});
