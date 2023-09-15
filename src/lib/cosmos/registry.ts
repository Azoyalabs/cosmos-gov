import { Registry } from '@cosmjs/proto-signing';
import { defaultRegistryTypes } from '@cosmjs/stargate';
import { CommunityPoolSpendProposal } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { ParameterChangeProposal } from 'cosmjs-types/cosmos/params/v1beta1/params';
import { SoftwareUpgradeProposal } from 'cosmjs-types/cosmos/upgrade/v1beta1/upgrade';
import {
	InstantiateContractProposal,
	UpdateInstantiateConfigProposal
} from 'cosmjs-types/cosmwasm/wasm/v1/proposal';
import { ClientUpdateProposal } from 'cosmjs-types/ibc/core/client/v1/client';
import { interchainSecurityProtoRegistry } from './transpile';
import {
	ConsumerAdditionProposal,
	ConsumerRemovalProposal,
	EquivocationProposal
} from './transpile/interchain_security/ccv/provider/v1/provider';

export const governanceTypes = [
	['/cosmos.distribution.v1beta1.CommunityPoolSpendProposal', CommunityPoolSpendProposal],
	['/cosmos.params.v1beta1.ParameterChangeProposal', ParameterChangeProposal],
	['/cosmwasm.wasm.v1.InstantiateContractProposal', InstantiateContractProposal],
	['/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal', UpdateInstantiateConfigProposal],
	['/cosmos.gov.v1beta1.TextProposal', TextProposal],
	['/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal', SoftwareUpgradeProposal],
	['/ibc.core.client.v1.ClientUpdateProposal', ClientUpdateProposal],
	['/interchain_security.ccv.provider.v1.ConsumerAdditionProposal', ConsumerAdditionProposal],
	['/interchain_security.ccv.provider.v1.EquivocationProposal', EquivocationProposal],
	['/interchain_security.ccv.provider.v1.ConsumerRemovalProposal', ConsumerRemovalProposal]
];

export const registry = new Registry([
	...defaultRegistryTypes,
	...governanceTypes,
	...interchainSecurityProtoRegistry,
]);
