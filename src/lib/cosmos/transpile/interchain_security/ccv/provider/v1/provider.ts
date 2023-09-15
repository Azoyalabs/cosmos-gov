import { Height, HeightSDKType } from "../../../../ibc/core/client/v1/client";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { Duration, DurationSDKType } from "../../../../google/protobuf/duration";
import { Equivocation, EquivocationSDKType } from "../../../../cosmos/evidence/v1beta1/evidence";
import { ClientState, ClientStateSDKType } from "../../../../ibc/lightclients/tendermint/v1/tendermint";
import { Coin, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { ValidatorSetChangePacketData, ValidatorSetChangePacketDataSDKType } from "../../v1/wire";
import { PublicKey, PublicKeySDKType } from "../../../../tendermint/crypto/keys";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/**
 * ConsumerAdditionProposal is a governance proposal on the provider chain to
 * spawn a new consumer chain. If it passes, then all validators on the provider
 * chain are expected to validate the consumer chain at spawn time or get
 * slashed. It is recommended that spawn time occurs after the proposal end
 * time.
 */
export interface ConsumerAdditionProposal {
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /**
   * the proposed chain-id of the new consumer chain, must be different from all
   * other consumer chain ids of the executing provider chain.
   */
  chainId: string;
  /**
   * the proposed initial height of new consumer chain.
   * For a completely new chain, this will be {0,1}. However, it may be
   * different if this is a chain that is converting to a consumer chain.
   */
  initialHeight: Height;
  /**
   * The hash of the consumer chain genesis state without the consumer CCV
   * module genesis params. It is used for off-chain confirmation of
   * genesis.json validity by validators and other parties.
   */
  genesisHash: Uint8Array;
  /**
   * The hash of the consumer chain binary that should be run by validators on
   * chain initialization. It is used for off-chain confirmation of binary
   * validity by validators and other parties.
   */
  binaryHash: Uint8Array;
  /**
   * spawn time is the time on the provider chain at which the consumer chain
   * genesis is finalized and all validators will be responsible for starting
   * their consumer chain validator node.
   */
  spawnTime: Date;
  /**
   * Unbonding period for the consumer,
   * which should be smaller than that of the provider in general.
   */
  unbondingPeriod: Duration;
  /** Sent CCV related IBC packets will timeout after this duration */
  ccvTimeoutPeriod: Duration;
  /** Sent transfer related IBC packets will timeout after this duration */
  transferTimeoutPeriod: Duration;
  /**
   * The fraction of tokens allocated to the consumer redistribution address
   * during distribution events. The fraction is a string representing a
   * decimal number. For example "0.75" would represent 75%.
   */
  consumerRedistributionFraction: string;
  /**
   * BlocksPerDistributionTransmission is the number of blocks between
   * ibc-token-transfers from the consumer chain to the provider chain. On
   * sending transmission event, `consumer_redistribution_fraction` of the
   * accumulated tokens are sent to the consumer redistribution address.
   */
  blocksPerDistributionTransmission: bigint;
  /**
   * The number of historical info entries to persist in store.
   * This param is a part of the cosmos sdk staking module. In the case of
   * a ccv enabled consumer chain, the ccv module acts as the staking module.
   */
  historicalEntries: bigint;
  /**
   * The ID of a token transfer channel used for the Reward Distribution
   * sub-protocol. If DistributionTransmissionChannel == "", a new transfer
   * channel is created on top of the same connection as the CCV channel.
   * Note that transfer_channel_id is the ID of the channel end on the consumer
   * chain. it is most relevant for chains performing a sovereign to consumer
   * changeover in order to maintan the existing ibc transfer channel
   */
  distributionTransmissionChannel: string;
}
/**
 * ConsumerAdditionProposal is a governance proposal on the provider chain to
 * spawn a new consumer chain. If it passes, then all validators on the provider
 * chain are expected to validate the consumer chain at spawn time or get
 * slashed. It is recommended that spawn time occurs after the proposal end
 * time.
 */
export interface ConsumerAdditionProposalSDKType {
  title: string;
  description: string;
  chain_id: string;
  initial_height: HeightSDKType;
  genesis_hash: Uint8Array;
  binary_hash: Uint8Array;
  spawn_time: Date;
  unbonding_period: DurationSDKType;
  ccv_timeout_period: DurationSDKType;
  transfer_timeout_period: DurationSDKType;
  consumer_redistribution_fraction: string;
  blocks_per_distribution_transmission: bigint;
  historical_entries: bigint;
  distribution_transmission_channel: string;
}
/**
 * ConsumerRemovalProposal is a governance proposal on the provider chain to
 * remove (and stop) a consumer chain. If it passes, all the consumer chain's
 * state is removed from the provider chain. The outstanding unbonding operation
 * funds are released.
 */
export interface ConsumerRemovalProposal {
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the chain-id of the consumer chain to be stopped */
  chainId: string;
  /**
   * the time on the provider chain at which all validators are responsible to
   * stop their consumer chain validator node
   */
  stopTime: Date;
}
/**
 * ConsumerRemovalProposal is a governance proposal on the provider chain to
 * remove (and stop) a consumer chain. If it passes, all the consumer chain's
 * state is removed from the provider chain. The outstanding unbonding operation
 * funds are released.
 */
export interface ConsumerRemovalProposalSDKType {
  title: string;
  description: string;
  chain_id: string;
  stop_time: Date;
}
/**
 * EquivocationProposal is a governance proposal on the provider chain to
 * punish a validator for equivocation on a consumer chain.
 * 
 * This type is only used internally to the consumer CCV module.
 */
export interface EquivocationProposal {
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the list of equivocations that will be processed */
  equivocations: Equivocation[];
}
/**
 * EquivocationProposal is a governance proposal on the provider chain to
 * punish a validator for equivocation on a consumer chain.
 * 
 * This type is only used internally to the consumer CCV module.
 */
export interface EquivocationProposalSDKType {
  title: string;
  description: string;
  equivocations: EquivocationSDKType[];
}
/**
 * A persisted queue entry indicating that a slash packet data instance needs to
 * be handled. This type belongs in the "global" queue, to coordinate slash
 * packet handling times between consumers.
 */
export interface GlobalSlashEntry {
  /**
   * Block time that slash packet was received by provider chain.
   * This field is used for store key iteration ordering.
   */
  recvTime: Date;
  /** The consumer that sent a slash packet. */
  consumerChainId: string;
  /**
   * The IBC sequence number of the recv packet.
   * This field is used in the store key to ensure uniqueness.
   */
  ibcSeqNum: bigint;
  /**
   * The provider's consensus address of the validator being slashed.
   * This field is used to obtain validator power in HandleThrottleQueues.
   * 
   * This field is not used in the store key, but is persisted in value bytes,
   * see QueueGlobalSlashEntry.
   */
  providerValConsAddr: Uint8Array;
}
/**
 * A persisted queue entry indicating that a slash packet data instance needs to
 * be handled. This type belongs in the "global" queue, to coordinate slash
 * packet handling times between consumers.
 */
export interface GlobalSlashEntrySDKType {
  recv_time: Date;
  consumer_chain_id: string;
  ibc_seq_num: bigint;
  provider_val_cons_addr: Uint8Array;
}
/** Params defines the parameters for CCV Provider module */
export interface Params {
  templateClient: ClientState;
  /**
   * TrustingPeriodFraction is used to compute the consumer and provider IBC
   * client's TrustingPeriod from the chain defined UnbondingPeriod
   */
  trustingPeriodFraction: string;
  /** Sent IBC packets will timeout after this duration */
  ccvTimeoutPeriod: Duration;
  /**
   * The channel initialization (IBC channel opening handshake) will timeout
   * after this duration
   */
  initTimeoutPeriod: Duration;
  /**
   * The VSC packets sent by the provider will timeout after this duration.
   * Note that unlike ccv_timeout_period which is an IBC param,
   * the vsc_timeout_period is a provider-side param that enables the provider
   * to timeout VSC packets even when a consumer chain is not live.
   */
  vscTimeoutPeriod: Duration;
  /** The period for which the slash meter is replenished */
  slashMeterReplenishPeriod: Duration;
  /**
   * The fraction of total voting power that is replenished to the slash meter
   * every replenish period. This param also serves as a maximum fraction of
   * total voting power that the slash meter can hold.
   */
  slashMeterReplenishFraction: string;
  /**
   * The maximum amount of throttled slash or vsc matured packets
   * that can be queued for a single consumer before the provider chain halts.
   */
  maxThrottledPackets: bigint;
  /** The fee required to be paid to add a reward denom */
  consumerRewardDenomRegistrationFee: Coin;
}
/** Params defines the parameters for CCV Provider module */
export interface ParamsSDKType {
  template_client: ClientStateSDKType;
  trusting_period_fraction: string;
  ccv_timeout_period: DurationSDKType;
  init_timeout_period: DurationSDKType;
  vsc_timeout_period: DurationSDKType;
  slash_meter_replenish_period: DurationSDKType;
  slash_meter_replenish_fraction: string;
  max_throttled_packets: bigint;
  consumer_reward_denom_registration_fee: CoinSDKType;
}
/**
 * SlashAcks contains cons addresses of consumer chain validators
 * successfully slashed on the provider chain.
 */
export interface SlashAcks {
  /**
   * SlashAcks contains cons addresses of consumer chain validators
   * successfully slashed on the provider chain.
   */
  addresses: string[];
}
/**
 * SlashAcks contains cons addresses of consumer chain validators
 * successfully slashed on the provider chain.
 */
export interface SlashAcksSDKType {
  addresses: string[];
}
/**
 * ConsumerAdditionProposals holds pending governance proposals on the provider
 * chain to spawn a new chain.
 */
export interface ConsumerAdditionProposals {
  /** proposals waiting for spawn_time to pass */
  pending: ConsumerAdditionProposal[];
}
/**
 * ConsumerAdditionProposals holds pending governance proposals on the provider
 * chain to spawn a new chain.
 */
export interface ConsumerAdditionProposalsSDKType {
  pending: ConsumerAdditionProposalSDKType[];
}
/**
 * ConsumerRemovalProposals holds pending governance proposals on the provider
 * chain to remove (and stop) a consumer chain.
 */
export interface ConsumerRemovalProposals {
  /** proposals waiting for stop_time to pass */
  pending: ConsumerRemovalProposal[];
}
/**
 * ConsumerRemovalProposals holds pending governance proposals on the provider
 * chain to remove (and stop) a consumer chain.
 */
export interface ConsumerRemovalProposalsSDKType {
  pending: ConsumerRemovalProposalSDKType[];
}
/** AddressList contains a list of consensus addresses */
export interface AddressList {
  /** AddressList contains a list of consensus addresses */
  addresses: Uint8Array[];
}
/** AddressList contains a list of consensus addresses */
export interface AddressListSDKType {
  addresses: Uint8Array[];
}
export interface ChannelToChain {
  channelId: string;
  chainId: string;
}
export interface ChannelToChainSDKType {
  channel_id: string;
  chain_id: string;
}
/**
 * VscUnbondingOps contains the IDs of unbonding operations that are waiting for
 * at least one VSCMaturedPacket with vscID from a consumer chain
 */
export interface VscUnbondingOps {
  vscId: bigint;
  unbondingOpIds: bigint[];
}
/**
 * VscUnbondingOps contains the IDs of unbonding operations that are waiting for
 * at least one VSCMaturedPacket with vscID from a consumer chain
 */
export interface VscUnbondingOpsSDKType {
  vsc_id: bigint;
  unbonding_op_ids: bigint[];
}
/**
 * UnbondingOp contains the ids of consumer chains that need to unbond before
 * the unbonding operation with the given ID can unbond
 */
export interface UnbondingOp {
  id: bigint;
  /** consumer chains that are still unbonding */
  unbondingConsumerChains: string[];
}
/**
 * UnbondingOp contains the ids of consumer chains that need to unbond before
 * the unbonding operation with the given ID can unbond
 */
export interface UnbondingOpSDKType {
  id: bigint;
  unbonding_consumer_chains: string[];
}
export interface InitTimeoutTimestamp {
  chainId: string;
  timestamp: bigint;
}
export interface InitTimeoutTimestampSDKType {
  chain_id: string;
  timestamp: bigint;
}
export interface VscSendTimestamp {
  vscId: bigint;
  timestamp: Date;
}
export interface VscSendTimestampSDKType {
  vsc_id: bigint;
  timestamp: Date;
}
/** ValidatorSetChangePackets is a pb list of ccv.ValidatorSetChangePacketData. */
export interface ValidatorSetChangePackets {
  list: ValidatorSetChangePacketData[];
}
/** ValidatorSetChangePackets is a pb list of ccv.ValidatorSetChangePacketData. */
export interface ValidatorSetChangePacketsSDKType {
  list: ValidatorSetChangePacketDataSDKType[];
}
/**
 * MaturedUnbondingOps defines a list of ids corresponding to ids of matured
 * unbonding operations.
 */
export interface MaturedUnbondingOps {
  /**
   * MaturedUnbondingOps defines a list of ids corresponding to ids of matured
   * unbonding operations.
   */
  ids: bigint[];
}
/**
 * MaturedUnbondingOps defines a list of ids corresponding to ids of matured
 * unbonding operations.
 */
export interface MaturedUnbondingOpsSDKType {
  ids: bigint[];
}
/** ExportedVscSendTimestamps is VscSendTimestamp with chainID info for exporting to genesis */
export interface ExportedVscSendTimestamp {
  chainId: string;
  vscSendTimestamps: VscSendTimestamp[];
}
/** ExportedVscSendTimestamps is VscSendTimestamp with chainID info for exporting to genesis */
export interface ExportedVscSendTimestampSDKType {
  chain_id: string;
  vsc_send_timestamps: VscSendTimestampSDKType[];
}
export interface KeyAssignmentReplacement {
  providerAddr: Uint8Array;
  prevCKey: PublicKey;
  power: bigint;
}
export interface KeyAssignmentReplacementSDKType {
  provider_addr: Uint8Array;
  prev_c_key: PublicKeySDKType;
  power: bigint;
}
/**
 * Used to serialize the ValidatorConsumerPubKey index from key assignment
 * ValidatorConsumerPubKey: (chainID, providerAddr consAddr) -> consumerKey
 * tmprotocrypto.PublicKey
 */
export interface ValidatorConsumerPubKey {
  chainId: string;
  providerAddr: Uint8Array;
  consumerKey: PublicKey;
}
/**
 * Used to serialize the ValidatorConsumerPubKey index from key assignment
 * ValidatorConsumerPubKey: (chainID, providerAddr consAddr) -> consumerKey
 * tmprotocrypto.PublicKey
 */
export interface ValidatorConsumerPubKeySDKType {
  chain_id: string;
  provider_addr: Uint8Array;
  consumer_key: PublicKeySDKType;
}
/**
 * Used to serialize the ValidatorConsumerAddr index from key assignment
 * ValidatorByConsumerAddr: (chainID, consumerAddr consAddr) -> providerAddr
 * consAddr
 */
export interface ValidatorByConsumerAddr {
  chainId: string;
  consumerAddr: Uint8Array;
  providerAddr: Uint8Array;
}
/**
 * Used to serialize the ValidatorConsumerAddr index from key assignment
 * ValidatorByConsumerAddr: (chainID, consumerAddr consAddr) -> providerAddr
 * consAddr
 */
export interface ValidatorByConsumerAddrSDKType {
  chain_id: string;
  consumer_addr: Uint8Array;
  provider_addr: Uint8Array;
}
/**
 * Used to serialize the ConsumerAddrsToPrune index from key assignment
 * ConsumerAddrsToPrune: (chainID, vscID uint64) -> consumerAddrs AddressList
 */
export interface ConsumerAddrsToPrune {
  chainId: string;
  vscId: bigint;
  consumerAddrs: AddressList;
}
/**
 * Used to serialize the ConsumerAddrsToPrune index from key assignment
 * ConsumerAddrsToPrune: (chainID, vscID uint64) -> consumerAddrs AddressList
 */
export interface ConsumerAddrsToPruneSDKType {
  chain_id: string;
  vsc_id: bigint;
  consumer_addrs: AddressListSDKType;
}
function createBaseConsumerAdditionProposal(): ConsumerAdditionProposal {
  return {
    title: "",
    description: "",
    chainId: "",
    initialHeight: Height.fromPartial({}),
    genesisHash: new Uint8Array(),
    binaryHash: new Uint8Array(),
    spawnTime: new Date(),
    unbondingPeriod: Duration.fromPartial({}),
    ccvTimeoutPeriod: Duration.fromPartial({}),
    transferTimeoutPeriod: Duration.fromPartial({}),
    consumerRedistributionFraction: "",
    blocksPerDistributionTransmission: BigInt(0),
    historicalEntries: BigInt(0),
    distributionTransmissionChannel: ""
  };
}
export const ConsumerAdditionProposal = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposal",
  encode(message: ConsumerAdditionProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.initialHeight !== undefined) {
      Height.encode(message.initialHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.genesisHash.length !== 0) {
      writer.uint32(42).bytes(message.genesisHash);
    }
    if (message.binaryHash.length !== 0) {
      writer.uint32(50).bytes(message.binaryHash);
    }
    if (message.spawnTime !== undefined) {
      Timestamp.encode(toTimestamp(message.spawnTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.unbondingPeriod !== undefined) {
      Duration.encode(message.unbondingPeriod, writer.uint32(66).fork()).ldelim();
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(74).fork()).ldelim();
    }
    if (message.transferTimeoutPeriod !== undefined) {
      Duration.encode(message.transferTimeoutPeriod, writer.uint32(82).fork()).ldelim();
    }
    if (message.consumerRedistributionFraction !== "") {
      writer.uint32(90).string(message.consumerRedistributionFraction);
    }
    if (message.blocksPerDistributionTransmission !== BigInt(0)) {
      writer.uint32(96).int64(message.blocksPerDistributionTransmission);
    }
    if (message.historicalEntries !== BigInt(0)) {
      writer.uint32(104).int64(message.historicalEntries);
    }
    if (message.distributionTransmissionChannel !== "") {
      writer.uint32(114).string(message.distributionTransmissionChannel);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConsumerAdditionProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAdditionProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.chainId = reader.string();
          break;
        case 4:
          message.initialHeight = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.genesisHash = reader.bytes();
          break;
        case 6:
          message.binaryHash = reader.bytes();
          break;
        case 7:
          message.spawnTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.unbondingPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 9:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 10:
          message.transferTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 11:
          message.consumerRedistributionFraction = reader.string();
          break;
        case 12:
          message.blocksPerDistributionTransmission = reader.int64();
          break;
        case 13:
          message.historicalEntries = reader.int64();
          break;
        case 14:
          message.distributionTransmissionChannel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerAdditionProposal>): ConsumerAdditionProposal {
    const message = createBaseConsumerAdditionProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.chainId = object.chainId ?? "";
    message.initialHeight = object.initialHeight !== undefined && object.initialHeight !== null ? Height.fromPartial(object.initialHeight) : undefined;
    message.genesisHash = object.genesisHash ?? new Uint8Array();
    message.binaryHash = object.binaryHash ?? new Uint8Array();
    message.spawnTime = object.spawnTime ?? undefined;
    message.unbondingPeriod = object.unbondingPeriod !== undefined && object.unbondingPeriod !== null ? Duration.fromPartial(object.unbondingPeriod) : undefined;
    message.ccvTimeoutPeriod = object.ccvTimeoutPeriod !== undefined && object.ccvTimeoutPeriod !== null ? Duration.fromPartial(object.ccvTimeoutPeriod) : undefined;
    message.transferTimeoutPeriod = object.transferTimeoutPeriod !== undefined && object.transferTimeoutPeriod !== null ? Duration.fromPartial(object.transferTimeoutPeriod) : undefined;
    message.consumerRedistributionFraction = object.consumerRedistributionFraction ?? "";
    message.blocksPerDistributionTransmission = object.blocksPerDistributionTransmission !== undefined && object.blocksPerDistributionTransmission !== null ? BigInt(object.blocksPerDistributionTransmission.toString()) : BigInt(0);
    message.historicalEntries = object.historicalEntries !== undefined && object.historicalEntries !== null ? BigInt(object.historicalEntries.toString()) : BigInt(0);
    message.distributionTransmissionChannel = object.distributionTransmissionChannel ?? "";
    return message;
  },
  fromAmino(object: ConsumerAdditionProposalAmino): ConsumerAdditionProposal {
    return {
      title: object.title,
      description: object.description,
      chainId: object.chain_id,
      initialHeight: object?.initial_height ? Height.fromAmino(object.initial_height) : undefined,
      genesisHash: object.genesis_hash,
      binaryHash: object.binary_hash,
      spawnTime: object.spawn_time,
      unbondingPeriod: object?.unbonding_period ? Duration.fromAmino(object.unbonding_period) : undefined,
      ccvTimeoutPeriod: object?.ccv_timeout_period ? Duration.fromAmino(object.ccv_timeout_period) : undefined,
      transferTimeoutPeriod: object?.transfer_timeout_period ? Duration.fromAmino(object.transfer_timeout_period) : undefined,
      consumerRedistributionFraction: object.consumer_redistribution_fraction,
      blocksPerDistributionTransmission: BigInt(object.blocks_per_distribution_transmission),
      historicalEntries: BigInt(object.historical_entries),
      distributionTransmissionChannel: object.distribution_transmission_channel
    };
  },
  toAmino(message: ConsumerAdditionProposal): ConsumerAdditionProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    obj.chain_id = message.chainId;
    obj.initial_height = message.initialHeight ? Height.toAmino(message.initialHeight) : {};
    obj.genesis_hash = message.genesisHash;
    obj.binary_hash = message.binaryHash;
    obj.spawn_time = message.spawnTime;
    obj.unbonding_period = message.unbondingPeriod ? Duration.toAmino(message.unbondingPeriod) : undefined;
    obj.ccv_timeout_period = message.ccvTimeoutPeriod ? Duration.toAmino(message.ccvTimeoutPeriod) : undefined;
    obj.transfer_timeout_period = message.transferTimeoutPeriod ? Duration.toAmino(message.transferTimeoutPeriod) : undefined;
    obj.consumer_redistribution_fraction = message.consumerRedistributionFraction;
    obj.blocks_per_distribution_transmission = message.blocksPerDistributionTransmission ? message.blocksPerDistributionTransmission.toString() : undefined;
    obj.historical_entries = message.historicalEntries ? message.historicalEntries.toString() : undefined;
    obj.distribution_transmission_channel = message.distributionTransmissionChannel;
    return obj;
  },
  fromAminoMsg(object: ConsumerAdditionProposalAminoMsg): ConsumerAdditionProposal {
    return ConsumerAdditionProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerAdditionProposalProtoMsg): ConsumerAdditionProposal {
    return ConsumerAdditionProposal.decode(message.value);
  },
  toProto(message: ConsumerAdditionProposal): Uint8Array {
    return ConsumerAdditionProposal.encode(message).finish();
  },
  toProtoMsg(message: ConsumerAdditionProposal): ConsumerAdditionProposalProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposal",
      value: ConsumerAdditionProposal.encode(message).finish()
    };
  }
};
function createBaseConsumerRemovalProposal(): ConsumerRemovalProposal {
  return {
    title: "",
    description: "",
    chainId: "",
    stopTime: new Date()
  };
}
export const ConsumerRemovalProposal = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposal",
  encode(message: ConsumerRemovalProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.stopTime !== undefined) {
      Timestamp.encode(toTimestamp(message.stopTime), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConsumerRemovalProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerRemovalProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.chainId = reader.string();
          break;
        case 4:
          message.stopTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerRemovalProposal>): ConsumerRemovalProposal {
    const message = createBaseConsumerRemovalProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.chainId = object.chainId ?? "";
    message.stopTime = object.stopTime ?? undefined;
    return message;
  },
  fromAmino(object: ConsumerRemovalProposalAmino): ConsumerRemovalProposal {
    return {
      title: object.title,
      description: object.description,
      chainId: object.chain_id,
      stopTime: object.stop_time
    };
  },
  toAmino(message: ConsumerRemovalProposal): ConsumerRemovalProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    obj.chain_id = message.chainId;
    obj.stop_time = message.stopTime;
    return obj;
  },
  fromAminoMsg(object: ConsumerRemovalProposalAminoMsg): ConsumerRemovalProposal {
    return ConsumerRemovalProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerRemovalProposalProtoMsg): ConsumerRemovalProposal {
    return ConsumerRemovalProposal.decode(message.value);
  },
  toProto(message: ConsumerRemovalProposal): Uint8Array {
    return ConsumerRemovalProposal.encode(message).finish();
  },
  toProtoMsg(message: ConsumerRemovalProposal): ConsumerRemovalProposalProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposal",
      value: ConsumerRemovalProposal.encode(message).finish()
    };
  }
};
function createBaseEquivocationProposal(): EquivocationProposal {
  return {
    title: "",
    description: "",
    equivocations: []
  };
}
export const EquivocationProposal = {
  typeUrl: "/interchain_security.ccv.provider.v1.EquivocationProposal",
  encode(message: EquivocationProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.equivocations) {
      Equivocation.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EquivocationProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEquivocationProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.equivocations.push(Equivocation.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EquivocationProposal>): EquivocationProposal {
    const message = createBaseEquivocationProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.equivocations = object.equivocations?.map(e => Equivocation.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: EquivocationProposalAmino): EquivocationProposal {
    return {
      title: object.title,
      description: object.description,
      equivocations: Array.isArray(object?.equivocations) ? object.equivocations.map((e: any) => Equivocation.fromAmino(e)) : []
    };
  },
  toAmino(message: EquivocationProposal): EquivocationProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    if (message.equivocations) {
      obj.equivocations = message.equivocations.map(e => e ? Equivocation.toAmino(e) : undefined);
    } else {
      obj.equivocations = [];
    }
    return obj;
  },
  fromAminoMsg(object: EquivocationProposalAminoMsg): EquivocationProposal {
    return EquivocationProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: EquivocationProposalProtoMsg): EquivocationProposal {
    return EquivocationProposal.decode(message.value);
  },
  toProto(message: EquivocationProposal): Uint8Array {
    return EquivocationProposal.encode(message).finish();
  },
  toProtoMsg(message: EquivocationProposal): EquivocationProposalProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.EquivocationProposal",
      value: EquivocationProposal.encode(message).finish()
    };
  }
};
function createBaseGlobalSlashEntry(): GlobalSlashEntry {
  return {
    recvTime: new Date(),
    consumerChainId: "",
    ibcSeqNum: BigInt(0),
    providerValConsAddr: new Uint8Array()
  };
}
export const GlobalSlashEntry = {
  typeUrl: "/interchain_security.ccv.provider.v1.GlobalSlashEntry",
  encode(message: GlobalSlashEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.recvTime !== undefined) {
      Timestamp.encode(toTimestamp(message.recvTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.consumerChainId !== "") {
      writer.uint32(18).string(message.consumerChainId);
    }
    if (message.ibcSeqNum !== BigInt(0)) {
      writer.uint32(24).uint64(message.ibcSeqNum);
    }
    if (message.providerValConsAddr.length !== 0) {
      writer.uint32(34).bytes(message.providerValConsAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GlobalSlashEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGlobalSlashEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recvTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.consumerChainId = reader.string();
          break;
        case 3:
          message.ibcSeqNum = reader.uint64();
          break;
        case 4:
          message.providerValConsAddr = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GlobalSlashEntry>): GlobalSlashEntry {
    const message = createBaseGlobalSlashEntry();
    message.recvTime = object.recvTime ?? undefined;
    message.consumerChainId = object.consumerChainId ?? "";
    message.ibcSeqNum = object.ibcSeqNum !== undefined && object.ibcSeqNum !== null ? BigInt(object.ibcSeqNum.toString()) : BigInt(0);
    message.providerValConsAddr = object.providerValConsAddr ?? new Uint8Array();
    return message;
  },
  fromAmino(object: GlobalSlashEntryAmino): GlobalSlashEntry {
    return {
      recvTime: object.recv_time,
      consumerChainId: object.consumer_chain_id,
      ibcSeqNum: BigInt(object.ibc_seq_num),
      providerValConsAddr: object.provider_val_cons_addr
    };
  },
  toAmino(message: GlobalSlashEntry): GlobalSlashEntryAmino {
    const obj: any = {};
    obj.recv_time = message.recvTime;
    obj.consumer_chain_id = message.consumerChainId;
    obj.ibc_seq_num = message.ibcSeqNum ? message.ibcSeqNum.toString() : undefined;
    obj.provider_val_cons_addr = message.providerValConsAddr;
    return obj;
  },
  fromAminoMsg(object: GlobalSlashEntryAminoMsg): GlobalSlashEntry {
    return GlobalSlashEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GlobalSlashEntryProtoMsg): GlobalSlashEntry {
    return GlobalSlashEntry.decode(message.value);
  },
  toProto(message: GlobalSlashEntry): Uint8Array {
    return GlobalSlashEntry.encode(message).finish();
  },
  toProtoMsg(message: GlobalSlashEntry): GlobalSlashEntryProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.GlobalSlashEntry",
      value: GlobalSlashEntry.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    templateClient: ClientState.fromPartial({}),
    trustingPeriodFraction: "",
    ccvTimeoutPeriod: Duration.fromPartial({}),
    initTimeoutPeriod: Duration.fromPartial({}),
    vscTimeoutPeriod: Duration.fromPartial({}),
    slashMeterReplenishPeriod: Duration.fromPartial({}),
    slashMeterReplenishFraction: "",
    maxThrottledPackets: BigInt(0),
    consumerRewardDenomRegistrationFee: Coin.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/interchain_security.ccv.provider.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.templateClient !== undefined) {
      ClientState.encode(message.templateClient, writer.uint32(10).fork()).ldelim();
    }
    if (message.trustingPeriodFraction !== "") {
      writer.uint32(18).string(message.trustingPeriodFraction);
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(26).fork()).ldelim();
    }
    if (message.initTimeoutPeriod !== undefined) {
      Duration.encode(message.initTimeoutPeriod, writer.uint32(34).fork()).ldelim();
    }
    if (message.vscTimeoutPeriod !== undefined) {
      Duration.encode(message.vscTimeoutPeriod, writer.uint32(42).fork()).ldelim();
    }
    if (message.slashMeterReplenishPeriod !== undefined) {
      Duration.encode(message.slashMeterReplenishPeriod, writer.uint32(50).fork()).ldelim();
    }
    if (message.slashMeterReplenishFraction !== "") {
      writer.uint32(58).string(message.slashMeterReplenishFraction);
    }
    if (message.maxThrottledPackets !== BigInt(0)) {
      writer.uint32(64).int64(message.maxThrottledPackets);
    }
    if (message.consumerRewardDenomRegistrationFee !== undefined) {
      Coin.encode(message.consumerRewardDenomRegistrationFee, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.templateClient = ClientState.decode(reader, reader.uint32());
          break;
        case 2:
          message.trustingPeriodFraction = reader.string();
          break;
        case 3:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.initTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.vscTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 6:
          message.slashMeterReplenishPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 7:
          message.slashMeterReplenishFraction = reader.string();
          break;
        case 8:
          message.maxThrottledPackets = reader.int64();
          break;
        case 9:
          message.consumerRewardDenomRegistrationFee = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.templateClient = object.templateClient !== undefined && object.templateClient !== null ? ClientState.fromPartial(object.templateClient) : undefined;
    message.trustingPeriodFraction = object.trustingPeriodFraction ?? "";
    message.ccvTimeoutPeriod = object.ccvTimeoutPeriod !== undefined && object.ccvTimeoutPeriod !== null ? Duration.fromPartial(object.ccvTimeoutPeriod) : undefined;
    message.initTimeoutPeriod = object.initTimeoutPeriod !== undefined && object.initTimeoutPeriod !== null ? Duration.fromPartial(object.initTimeoutPeriod) : undefined;
    message.vscTimeoutPeriod = object.vscTimeoutPeriod !== undefined && object.vscTimeoutPeriod !== null ? Duration.fromPartial(object.vscTimeoutPeriod) : undefined;
    message.slashMeterReplenishPeriod = object.slashMeterReplenishPeriod !== undefined && object.slashMeterReplenishPeriod !== null ? Duration.fromPartial(object.slashMeterReplenishPeriod) : undefined;
    message.slashMeterReplenishFraction = object.slashMeterReplenishFraction ?? "";
    message.maxThrottledPackets = object.maxThrottledPackets !== undefined && object.maxThrottledPackets !== null ? BigInt(object.maxThrottledPackets.toString()) : BigInt(0);
    message.consumerRewardDenomRegistrationFee = object.consumerRewardDenomRegistrationFee !== undefined && object.consumerRewardDenomRegistrationFee !== null ? Coin.fromPartial(object.consumerRewardDenomRegistrationFee) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    return {
      templateClient: object?.template_client ? ClientState.fromAmino(object.template_client) : undefined,
      trustingPeriodFraction: object.trusting_period_fraction,
      ccvTimeoutPeriod: object?.ccv_timeout_period ? Duration.fromAmino(object.ccv_timeout_period) : undefined,
      initTimeoutPeriod: object?.init_timeout_period ? Duration.fromAmino(object.init_timeout_period) : undefined,
      vscTimeoutPeriod: object?.vsc_timeout_period ? Duration.fromAmino(object.vsc_timeout_period) : undefined,
      slashMeterReplenishPeriod: object?.slash_meter_replenish_period ? Duration.fromAmino(object.slash_meter_replenish_period) : undefined,
      slashMeterReplenishFraction: object.slash_meter_replenish_fraction,
      maxThrottledPackets: BigInt(object.max_throttled_packets),
      consumerRewardDenomRegistrationFee: object?.consumer_reward_denom_registration_fee ? Coin.fromAmino(object.consumer_reward_denom_registration_fee) : undefined
    };
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.template_client = message.templateClient ? ClientState.toAmino(message.templateClient) : undefined;
    obj.trusting_period_fraction = message.trustingPeriodFraction;
    obj.ccv_timeout_period = message.ccvTimeoutPeriod ? Duration.toAmino(message.ccvTimeoutPeriod) : undefined;
    obj.init_timeout_period = message.initTimeoutPeriod ? Duration.toAmino(message.initTimeoutPeriod) : undefined;
    obj.vsc_timeout_period = message.vscTimeoutPeriod ? Duration.toAmino(message.vscTimeoutPeriod) : undefined;
    obj.slash_meter_replenish_period = message.slashMeterReplenishPeriod ? Duration.toAmino(message.slashMeterReplenishPeriod) : undefined;
    obj.slash_meter_replenish_fraction = message.slashMeterReplenishFraction;
    obj.max_throttled_packets = message.maxThrottledPackets ? message.maxThrottledPackets.toString() : undefined;
    obj.consumer_reward_denom_registration_fee = message.consumerRewardDenomRegistrationFee ? Coin.toAmino(message.consumerRewardDenomRegistrationFee) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseSlashAcks(): SlashAcks {
  return {
    addresses: []
  };
}
export const SlashAcks = {
  typeUrl: "/interchain_security.ccv.provider.v1.SlashAcks",
  encode(message: SlashAcks, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.addresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SlashAcks {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlashAcks();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SlashAcks>): SlashAcks {
    const message = createBaseSlashAcks();
    message.addresses = object.addresses?.map(e => e) || [];
    return message;
  },
  fromAmino(object: SlashAcksAmino): SlashAcks {
    return {
      addresses: Array.isArray(object?.addresses) ? object.addresses.map((e: any) => e) : []
    };
  },
  toAmino(message: SlashAcks): SlashAcksAmino {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map(e => e);
    } else {
      obj.addresses = [];
    }
    return obj;
  },
  fromAminoMsg(object: SlashAcksAminoMsg): SlashAcks {
    return SlashAcks.fromAmino(object.value);
  },
  fromProtoMsg(message: SlashAcksProtoMsg): SlashAcks {
    return SlashAcks.decode(message.value);
  },
  toProto(message: SlashAcks): Uint8Array {
    return SlashAcks.encode(message).finish();
  },
  toProtoMsg(message: SlashAcks): SlashAcksProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.SlashAcks",
      value: SlashAcks.encode(message).finish()
    };
  }
};
function createBaseConsumerAdditionProposals(): ConsumerAdditionProposals {
  return {
    pending: []
  };
}
export const ConsumerAdditionProposals = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposals",
  encode(message: ConsumerAdditionProposals, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pending) {
      ConsumerAdditionProposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConsumerAdditionProposals {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAdditionProposals();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pending.push(ConsumerAdditionProposal.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerAdditionProposals>): ConsumerAdditionProposals {
    const message = createBaseConsumerAdditionProposals();
    message.pending = object.pending?.map(e => ConsumerAdditionProposal.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ConsumerAdditionProposalsAmino): ConsumerAdditionProposals {
    return {
      pending: Array.isArray(object?.pending) ? object.pending.map((e: any) => ConsumerAdditionProposal.fromAmino(e)) : []
    };
  },
  toAmino(message: ConsumerAdditionProposals): ConsumerAdditionProposalsAmino {
    const obj: any = {};
    if (message.pending) {
      obj.pending = message.pending.map(e => e ? ConsumerAdditionProposal.toAmino(e) : undefined);
    } else {
      obj.pending = [];
    }
    return obj;
  },
  fromAminoMsg(object: ConsumerAdditionProposalsAminoMsg): ConsumerAdditionProposals {
    return ConsumerAdditionProposals.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerAdditionProposalsProtoMsg): ConsumerAdditionProposals {
    return ConsumerAdditionProposals.decode(message.value);
  },
  toProto(message: ConsumerAdditionProposals): Uint8Array {
    return ConsumerAdditionProposals.encode(message).finish();
  },
  toProtoMsg(message: ConsumerAdditionProposals): ConsumerAdditionProposalsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposals",
      value: ConsumerAdditionProposals.encode(message).finish()
    };
  }
};
function createBaseConsumerRemovalProposals(): ConsumerRemovalProposals {
  return {
    pending: []
  };
}
export const ConsumerRemovalProposals = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposals",
  encode(message: ConsumerRemovalProposals, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pending) {
      ConsumerRemovalProposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConsumerRemovalProposals {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerRemovalProposals();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pending.push(ConsumerRemovalProposal.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerRemovalProposals>): ConsumerRemovalProposals {
    const message = createBaseConsumerRemovalProposals();
    message.pending = object.pending?.map(e => ConsumerRemovalProposal.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ConsumerRemovalProposalsAmino): ConsumerRemovalProposals {
    return {
      pending: Array.isArray(object?.pending) ? object.pending.map((e: any) => ConsumerRemovalProposal.fromAmino(e)) : []
    };
  },
  toAmino(message: ConsumerRemovalProposals): ConsumerRemovalProposalsAmino {
    const obj: any = {};
    if (message.pending) {
      obj.pending = message.pending.map(e => e ? ConsumerRemovalProposal.toAmino(e) : undefined);
    } else {
      obj.pending = [];
    }
    return obj;
  },
  fromAminoMsg(object: ConsumerRemovalProposalsAminoMsg): ConsumerRemovalProposals {
    return ConsumerRemovalProposals.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerRemovalProposalsProtoMsg): ConsumerRemovalProposals {
    return ConsumerRemovalProposals.decode(message.value);
  },
  toProto(message: ConsumerRemovalProposals): Uint8Array {
    return ConsumerRemovalProposals.encode(message).finish();
  },
  toProtoMsg(message: ConsumerRemovalProposals): ConsumerRemovalProposalsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposals",
      value: ConsumerRemovalProposals.encode(message).finish()
    };
  }
};
function createBaseAddressList(): AddressList {
  return {
    addresses: []
  };
}
export const AddressList = {
  typeUrl: "/interchain_security.ccv.provider.v1.AddressList",
  encode(message: AddressList, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.addresses) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AddressList {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addresses.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AddressList>): AddressList {
    const message = createBaseAddressList();
    message.addresses = object.addresses?.map(e => e) || [];
    return message;
  },
  fromAmino(object: AddressListAmino): AddressList {
    return {
      addresses: Array.isArray(object?.addresses) ? object.addresses.map((e: any) => e) : []
    };
  },
  toAmino(message: AddressList): AddressListAmino {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map(e => e);
    } else {
      obj.addresses = [];
    }
    return obj;
  },
  fromAminoMsg(object: AddressListAminoMsg): AddressList {
    return AddressList.fromAmino(object.value);
  },
  fromProtoMsg(message: AddressListProtoMsg): AddressList {
    return AddressList.decode(message.value);
  },
  toProto(message: AddressList): Uint8Array {
    return AddressList.encode(message).finish();
  },
  toProtoMsg(message: AddressList): AddressListProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.AddressList",
      value: AddressList.encode(message).finish()
    };
  }
};
function createBaseChannelToChain(): ChannelToChain {
  return {
    channelId: "",
    chainId: ""
  };
}
export const ChannelToChain = {
  typeUrl: "/interchain_security.ccv.provider.v1.ChannelToChain",
  encode(message: ChannelToChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ChannelToChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelToChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ChannelToChain>): ChannelToChain {
    const message = createBaseChannelToChain();
    message.channelId = object.channelId ?? "";
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: ChannelToChainAmino): ChannelToChain {
    return {
      channelId: object.channel_id,
      chainId: object.chain_id
    };
  },
  toAmino(message: ChannelToChain): ChannelToChainAmino {
    const obj: any = {};
    obj.channel_id = message.channelId;
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: ChannelToChainAminoMsg): ChannelToChain {
    return ChannelToChain.fromAmino(object.value);
  },
  fromProtoMsg(message: ChannelToChainProtoMsg): ChannelToChain {
    return ChannelToChain.decode(message.value);
  },
  toProto(message: ChannelToChain): Uint8Array {
    return ChannelToChain.encode(message).finish();
  },
  toProtoMsg(message: ChannelToChain): ChannelToChainProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ChannelToChain",
      value: ChannelToChain.encode(message).finish()
    };
  }
};
function createBaseVscUnbondingOps(): VscUnbondingOps {
  return {
    vscId: BigInt(0),
    unbondingOpIds: []
  };
}
export const VscUnbondingOps = {
  typeUrl: "/interchain_security.ccv.provider.v1.VscUnbondingOps",
  encode(message: VscUnbondingOps, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.vscId !== BigInt(0)) {
      writer.uint32(8).uint64(message.vscId);
    }
    writer.uint32(18).fork();
    for (const v of message.unbondingOpIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): VscUnbondingOps {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVscUnbondingOps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vscId = reader.uint64();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.unbondingOpIds.push(reader.uint64());
            }
          } else {
            message.unbondingOpIds.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<VscUnbondingOps>): VscUnbondingOps {
    const message = createBaseVscUnbondingOps();
    message.vscId = object.vscId !== undefined && object.vscId !== null ? BigInt(object.vscId.toString()) : BigInt(0);
    message.unbondingOpIds = object.unbondingOpIds?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: VscUnbondingOpsAmino): VscUnbondingOps {
    return {
      vscId: BigInt(object.vsc_id),
      unbondingOpIds: Array.isArray(object?.unbonding_op_ids) ? object.unbonding_op_ids.map((e: any) => BigInt(e)) : []
    };
  },
  toAmino(message: VscUnbondingOps): VscUnbondingOpsAmino {
    const obj: any = {};
    obj.vsc_id = message.vscId ? message.vscId.toString() : undefined;
    if (message.unbondingOpIds) {
      obj.unbonding_op_ids = message.unbondingOpIds.map(e => e.toString());
    } else {
      obj.unbonding_op_ids = [];
    }
    return obj;
  },
  fromAminoMsg(object: VscUnbondingOpsAminoMsg): VscUnbondingOps {
    return VscUnbondingOps.fromAmino(object.value);
  },
  fromProtoMsg(message: VscUnbondingOpsProtoMsg): VscUnbondingOps {
    return VscUnbondingOps.decode(message.value);
  },
  toProto(message: VscUnbondingOps): Uint8Array {
    return VscUnbondingOps.encode(message).finish();
  },
  toProtoMsg(message: VscUnbondingOps): VscUnbondingOpsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.VscUnbondingOps",
      value: VscUnbondingOps.encode(message).finish()
    };
  }
};
function createBaseUnbondingOp(): UnbondingOp {
  return {
    id: BigInt(0),
    unbondingConsumerChains: []
  };
}
export const UnbondingOp = {
  typeUrl: "/interchain_security.ccv.provider.v1.UnbondingOp",
  encode(message: UnbondingOp, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    for (const v of message.unbondingConsumerChains) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UnbondingOp {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbondingOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.unbondingConsumerChains.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UnbondingOp>): UnbondingOp {
    const message = createBaseUnbondingOp();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.unbondingConsumerChains = object.unbondingConsumerChains?.map(e => e) || [];
    return message;
  },
  fromAmino(object: UnbondingOpAmino): UnbondingOp {
    return {
      id: BigInt(object.id),
      unbondingConsumerChains: Array.isArray(object?.unbonding_consumer_chains) ? object.unbonding_consumer_chains.map((e: any) => e) : []
    };
  },
  toAmino(message: UnbondingOp): UnbondingOpAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    if (message.unbondingConsumerChains) {
      obj.unbonding_consumer_chains = message.unbondingConsumerChains.map(e => e);
    } else {
      obj.unbonding_consumer_chains = [];
    }
    return obj;
  },
  fromAminoMsg(object: UnbondingOpAminoMsg): UnbondingOp {
    return UnbondingOp.fromAmino(object.value);
  },
  fromProtoMsg(message: UnbondingOpProtoMsg): UnbondingOp {
    return UnbondingOp.decode(message.value);
  },
  toProto(message: UnbondingOp): Uint8Array {
    return UnbondingOp.encode(message).finish();
  },
  toProtoMsg(message: UnbondingOp): UnbondingOpProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.UnbondingOp",
      value: UnbondingOp.encode(message).finish()
    };
  }
};
function createBaseInitTimeoutTimestamp(): InitTimeoutTimestamp {
  return {
    chainId: "",
    timestamp: BigInt(0)
  };
}
export const InitTimeoutTimestamp = {
  typeUrl: "/interchain_security.ccv.provider.v1.InitTimeoutTimestamp",
  encode(message: InitTimeoutTimestamp, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.timestamp !== BigInt(0)) {
      writer.uint32(16).uint64(message.timestamp);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): InitTimeoutTimestamp {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInitTimeoutTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.timestamp = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<InitTimeoutTimestamp>): InitTimeoutTimestamp {
    const message = createBaseInitTimeoutTimestamp();
    message.chainId = object.chainId ?? "";
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? BigInt(object.timestamp.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: InitTimeoutTimestampAmino): InitTimeoutTimestamp {
    return {
      chainId: object.chain_id,
      timestamp: BigInt(object.timestamp)
    };
  },
  toAmino(message: InitTimeoutTimestamp): InitTimeoutTimestampAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.timestamp = message.timestamp ? message.timestamp.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: InitTimeoutTimestampAminoMsg): InitTimeoutTimestamp {
    return InitTimeoutTimestamp.fromAmino(object.value);
  },
  fromProtoMsg(message: InitTimeoutTimestampProtoMsg): InitTimeoutTimestamp {
    return InitTimeoutTimestamp.decode(message.value);
  },
  toProto(message: InitTimeoutTimestamp): Uint8Array {
    return InitTimeoutTimestamp.encode(message).finish();
  },
  toProtoMsg(message: InitTimeoutTimestamp): InitTimeoutTimestampProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.InitTimeoutTimestamp",
      value: InitTimeoutTimestamp.encode(message).finish()
    };
  }
};
function createBaseVscSendTimestamp(): VscSendTimestamp {
  return {
    vscId: BigInt(0),
    timestamp: new Date()
  };
}
export const VscSendTimestamp = {
  typeUrl: "/interchain_security.ccv.provider.v1.VscSendTimestamp",
  encode(message: VscSendTimestamp, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.vscId !== BigInt(0)) {
      writer.uint32(8).uint64(message.vscId);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): VscSendTimestamp {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVscSendTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vscId = reader.uint64();
          break;
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<VscSendTimestamp>): VscSendTimestamp {
    const message = createBaseVscSendTimestamp();
    message.vscId = object.vscId !== undefined && object.vscId !== null ? BigInt(object.vscId.toString()) : BigInt(0);
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
  fromAmino(object: VscSendTimestampAmino): VscSendTimestamp {
    return {
      vscId: BigInt(object.vsc_id),
      timestamp: object.timestamp
    };
  },
  toAmino(message: VscSendTimestamp): VscSendTimestampAmino {
    const obj: any = {};
    obj.vsc_id = message.vscId ? message.vscId.toString() : undefined;
    obj.timestamp = message.timestamp;
    return obj;
  },
  fromAminoMsg(object: VscSendTimestampAminoMsg): VscSendTimestamp {
    return VscSendTimestamp.fromAmino(object.value);
  },
  fromProtoMsg(message: VscSendTimestampProtoMsg): VscSendTimestamp {
    return VscSendTimestamp.decode(message.value);
  },
  toProto(message: VscSendTimestamp): Uint8Array {
    return VscSendTimestamp.encode(message).finish();
  },
  toProtoMsg(message: VscSendTimestamp): VscSendTimestampProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.VscSendTimestamp",
      value: VscSendTimestamp.encode(message).finish()
    };
  }
};
function createBaseValidatorSetChangePackets(): ValidatorSetChangePackets {
  return {
    list: []
  };
}
export const ValidatorSetChangePackets = {
  typeUrl: "/interchain_security.ccv.provider.v1.ValidatorSetChangePackets",
  encode(message: ValidatorSetChangePackets, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.list) {
      ValidatorSetChangePacketData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ValidatorSetChangePackets {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSetChangePackets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.list.push(ValidatorSetChangePacketData.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorSetChangePackets>): ValidatorSetChangePackets {
    const message = createBaseValidatorSetChangePackets();
    message.list = object.list?.map(e => ValidatorSetChangePacketData.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ValidatorSetChangePacketsAmino): ValidatorSetChangePackets {
    return {
      list: Array.isArray(object?.list) ? object.list.map((e: any) => ValidatorSetChangePacketData.fromAmino(e)) : []
    };
  },
  toAmino(message: ValidatorSetChangePackets): ValidatorSetChangePacketsAmino {
    const obj: any = {};
    if (message.list) {
      obj.list = message.list.map(e => e ? ValidatorSetChangePacketData.toAmino(e) : undefined);
    } else {
      obj.list = [];
    }
    return obj;
  },
  fromAminoMsg(object: ValidatorSetChangePacketsAminoMsg): ValidatorSetChangePackets {
    return ValidatorSetChangePackets.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorSetChangePacketsProtoMsg): ValidatorSetChangePackets {
    return ValidatorSetChangePackets.decode(message.value);
  },
  toProto(message: ValidatorSetChangePackets): Uint8Array {
    return ValidatorSetChangePackets.encode(message).finish();
  },
  toProtoMsg(message: ValidatorSetChangePackets): ValidatorSetChangePacketsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ValidatorSetChangePackets",
      value: ValidatorSetChangePackets.encode(message).finish()
    };
  }
};
function createBaseMaturedUnbondingOps(): MaturedUnbondingOps {
  return {
    ids: []
  };
}
export const MaturedUnbondingOps = {
  typeUrl: "/interchain_security.ccv.provider.v1.MaturedUnbondingOps",
  encode(message: MaturedUnbondingOps, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.ids) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MaturedUnbondingOps {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaturedUnbondingOps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ids.push(reader.uint64());
            }
          } else {
            message.ids.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MaturedUnbondingOps>): MaturedUnbondingOps {
    const message = createBaseMaturedUnbondingOps();
    message.ids = object.ids?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: MaturedUnbondingOpsAmino): MaturedUnbondingOps {
    return {
      ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => BigInt(e)) : []
    };
  },
  toAmino(message: MaturedUnbondingOps): MaturedUnbondingOpsAmino {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map(e => e.toString());
    } else {
      obj.ids = [];
    }
    return obj;
  },
  fromAminoMsg(object: MaturedUnbondingOpsAminoMsg): MaturedUnbondingOps {
    return MaturedUnbondingOps.fromAmino(object.value);
  },
  fromProtoMsg(message: MaturedUnbondingOpsProtoMsg): MaturedUnbondingOps {
    return MaturedUnbondingOps.decode(message.value);
  },
  toProto(message: MaturedUnbondingOps): Uint8Array {
    return MaturedUnbondingOps.encode(message).finish();
  },
  toProtoMsg(message: MaturedUnbondingOps): MaturedUnbondingOpsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MaturedUnbondingOps",
      value: MaturedUnbondingOps.encode(message).finish()
    };
  }
};
function createBaseExportedVscSendTimestamp(): ExportedVscSendTimestamp {
  return {
    chainId: "",
    vscSendTimestamps: []
  };
}
export const ExportedVscSendTimestamp = {
  typeUrl: "/interchain_security.ccv.provider.v1.ExportedVscSendTimestamp",
  encode(message: ExportedVscSendTimestamp, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    for (const v of message.vscSendTimestamps) {
      VscSendTimestamp.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ExportedVscSendTimestamp {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportedVscSendTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.vscSendTimestamps.push(VscSendTimestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ExportedVscSendTimestamp>): ExportedVscSendTimestamp {
    const message = createBaseExportedVscSendTimestamp();
    message.chainId = object.chainId ?? "";
    message.vscSendTimestamps = object.vscSendTimestamps?.map(e => VscSendTimestamp.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ExportedVscSendTimestampAmino): ExportedVscSendTimestamp {
    return {
      chainId: object.chain_id,
      vscSendTimestamps: Array.isArray(object?.vsc_send_timestamps) ? object.vsc_send_timestamps.map((e: any) => VscSendTimestamp.fromAmino(e)) : []
    };
  },
  toAmino(message: ExportedVscSendTimestamp): ExportedVscSendTimestampAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    if (message.vscSendTimestamps) {
      obj.vsc_send_timestamps = message.vscSendTimestamps.map(e => e ? VscSendTimestamp.toAmino(e) : undefined);
    } else {
      obj.vsc_send_timestamps = [];
    }
    return obj;
  },
  fromAminoMsg(object: ExportedVscSendTimestampAminoMsg): ExportedVscSendTimestamp {
    return ExportedVscSendTimestamp.fromAmino(object.value);
  },
  fromProtoMsg(message: ExportedVscSendTimestampProtoMsg): ExportedVscSendTimestamp {
    return ExportedVscSendTimestamp.decode(message.value);
  },
  toProto(message: ExportedVscSendTimestamp): Uint8Array {
    return ExportedVscSendTimestamp.encode(message).finish();
  },
  toProtoMsg(message: ExportedVscSendTimestamp): ExportedVscSendTimestampProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ExportedVscSendTimestamp",
      value: ExportedVscSendTimestamp.encode(message).finish()
    };
  }
};
function createBaseKeyAssignmentReplacement(): KeyAssignmentReplacement {
  return {
    providerAddr: new Uint8Array(),
    prevCKey: PublicKey.fromPartial({}),
    power: BigInt(0)
  };
}
export const KeyAssignmentReplacement = {
  typeUrl: "/interchain_security.ccv.provider.v1.KeyAssignmentReplacement",
  encode(message: KeyAssignmentReplacement, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerAddr.length !== 0) {
      writer.uint32(10).bytes(message.providerAddr);
    }
    if (message.prevCKey !== undefined) {
      PublicKey.encode(message.prevCKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.power !== BigInt(0)) {
      writer.uint32(24).int64(message.power);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): KeyAssignmentReplacement {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyAssignmentReplacement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddr = reader.bytes();
          break;
        case 2:
          message.prevCKey = PublicKey.decode(reader, reader.uint32());
          break;
        case 3:
          message.power = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<KeyAssignmentReplacement>): KeyAssignmentReplacement {
    const message = createBaseKeyAssignmentReplacement();
    message.providerAddr = object.providerAddr ?? new Uint8Array();
    message.prevCKey = object.prevCKey !== undefined && object.prevCKey !== null ? PublicKey.fromPartial(object.prevCKey) : undefined;
    message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: KeyAssignmentReplacementAmino): KeyAssignmentReplacement {
    return {
      providerAddr: object.provider_addr,
      prevCKey: object?.prev_c_key ? PublicKey.fromAmino(object.prev_c_key) : undefined,
      power: BigInt(object.power)
    };
  },
  toAmino(message: KeyAssignmentReplacement): KeyAssignmentReplacementAmino {
    const obj: any = {};
    obj.provider_addr = message.providerAddr;
    obj.prev_c_key = message.prevCKey ? PublicKey.toAmino(message.prevCKey) : undefined;
    obj.power = message.power ? message.power.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: KeyAssignmentReplacementAminoMsg): KeyAssignmentReplacement {
    return KeyAssignmentReplacement.fromAmino(object.value);
  },
  fromProtoMsg(message: KeyAssignmentReplacementProtoMsg): KeyAssignmentReplacement {
    return KeyAssignmentReplacement.decode(message.value);
  },
  toProto(message: KeyAssignmentReplacement): Uint8Array {
    return KeyAssignmentReplacement.encode(message).finish();
  },
  toProtoMsg(message: KeyAssignmentReplacement): KeyAssignmentReplacementProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.KeyAssignmentReplacement",
      value: KeyAssignmentReplacement.encode(message).finish()
    };
  }
};
function createBaseValidatorConsumerPubKey(): ValidatorConsumerPubKey {
  return {
    chainId: "",
    providerAddr: new Uint8Array(),
    consumerKey: PublicKey.fromPartial({})
  };
}
export const ValidatorConsumerPubKey = {
  typeUrl: "/interchain_security.ccv.provider.v1.ValidatorConsumerPubKey",
  encode(message: ValidatorConsumerPubKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddr.length !== 0) {
      writer.uint32(18).bytes(message.providerAddr);
    }
    if (message.consumerKey !== undefined) {
      PublicKey.encode(message.consumerKey, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ValidatorConsumerPubKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorConsumerPubKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddr = reader.bytes();
          break;
        case 3:
          message.consumerKey = PublicKey.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorConsumerPubKey>): ValidatorConsumerPubKey {
    const message = createBaseValidatorConsumerPubKey();
    message.chainId = object.chainId ?? "";
    message.providerAddr = object.providerAddr ?? new Uint8Array();
    message.consumerKey = object.consumerKey !== undefined && object.consumerKey !== null ? PublicKey.fromPartial(object.consumerKey) : undefined;
    return message;
  },
  fromAmino(object: ValidatorConsumerPubKeyAmino): ValidatorConsumerPubKey {
    return {
      chainId: object.chain_id,
      providerAddr: object.provider_addr,
      consumerKey: object?.consumer_key ? PublicKey.fromAmino(object.consumer_key) : undefined
    };
  },
  toAmino(message: ValidatorConsumerPubKey): ValidatorConsumerPubKeyAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.provider_addr = message.providerAddr;
    obj.consumer_key = message.consumerKey ? PublicKey.toAmino(message.consumerKey) : undefined;
    return obj;
  },
  fromAminoMsg(object: ValidatorConsumerPubKeyAminoMsg): ValidatorConsumerPubKey {
    return ValidatorConsumerPubKey.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorConsumerPubKeyProtoMsg): ValidatorConsumerPubKey {
    return ValidatorConsumerPubKey.decode(message.value);
  },
  toProto(message: ValidatorConsumerPubKey): Uint8Array {
    return ValidatorConsumerPubKey.encode(message).finish();
  },
  toProtoMsg(message: ValidatorConsumerPubKey): ValidatorConsumerPubKeyProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ValidatorConsumerPubKey",
      value: ValidatorConsumerPubKey.encode(message).finish()
    };
  }
};
function createBaseValidatorByConsumerAddr(): ValidatorByConsumerAddr {
  return {
    chainId: "",
    consumerAddr: new Uint8Array(),
    providerAddr: new Uint8Array()
  };
}
export const ValidatorByConsumerAddr = {
  typeUrl: "/interchain_security.ccv.provider.v1.ValidatorByConsumerAddr",
  encode(message: ValidatorByConsumerAddr, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.consumerAddr.length !== 0) {
      writer.uint32(18).bytes(message.consumerAddr);
    }
    if (message.providerAddr.length !== 0) {
      writer.uint32(26).bytes(message.providerAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ValidatorByConsumerAddr {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorByConsumerAddr();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.consumerAddr = reader.bytes();
          break;
        case 3:
          message.providerAddr = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorByConsumerAddr>): ValidatorByConsumerAddr {
    const message = createBaseValidatorByConsumerAddr();
    message.chainId = object.chainId ?? "";
    message.consumerAddr = object.consumerAddr ?? new Uint8Array();
    message.providerAddr = object.providerAddr ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ValidatorByConsumerAddrAmino): ValidatorByConsumerAddr {
    return {
      chainId: object.chain_id,
      consumerAddr: object.consumer_addr,
      providerAddr: object.provider_addr
    };
  },
  toAmino(message: ValidatorByConsumerAddr): ValidatorByConsumerAddrAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.consumer_addr = message.consumerAddr;
    obj.provider_addr = message.providerAddr;
    return obj;
  },
  fromAminoMsg(object: ValidatorByConsumerAddrAminoMsg): ValidatorByConsumerAddr {
    return ValidatorByConsumerAddr.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorByConsumerAddrProtoMsg): ValidatorByConsumerAddr {
    return ValidatorByConsumerAddr.decode(message.value);
  },
  toProto(message: ValidatorByConsumerAddr): Uint8Array {
    return ValidatorByConsumerAddr.encode(message).finish();
  },
  toProtoMsg(message: ValidatorByConsumerAddr): ValidatorByConsumerAddrProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ValidatorByConsumerAddr",
      value: ValidatorByConsumerAddr.encode(message).finish()
    };
  }
};
function createBaseConsumerAddrsToPrune(): ConsumerAddrsToPrune {
  return {
    chainId: "",
    vscId: BigInt(0),
    consumerAddrs: AddressList.fromPartial({})
  };
}
export const ConsumerAddrsToPrune = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAddrsToPrune",
  encode(message: ConsumerAddrsToPrune, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.vscId !== BigInt(0)) {
      writer.uint32(16).uint64(message.vscId);
    }
    if (message.consumerAddrs !== undefined) {
      AddressList.encode(message.consumerAddrs, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConsumerAddrsToPrune {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAddrsToPrune();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.vscId = reader.uint64();
          break;
        case 3:
          message.consumerAddrs = AddressList.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerAddrsToPrune>): ConsumerAddrsToPrune {
    const message = createBaseConsumerAddrsToPrune();
    message.chainId = object.chainId ?? "";
    message.vscId = object.vscId !== undefined && object.vscId !== null ? BigInt(object.vscId.toString()) : BigInt(0);
    message.consumerAddrs = object.consumerAddrs !== undefined && object.consumerAddrs !== null ? AddressList.fromPartial(object.consumerAddrs) : undefined;
    return message;
  },
  fromAmino(object: ConsumerAddrsToPruneAmino): ConsumerAddrsToPrune {
    return {
      chainId: object.chain_id,
      vscId: BigInt(object.vsc_id),
      consumerAddrs: object?.consumer_addrs ? AddressList.fromAmino(object.consumer_addrs) : undefined
    };
  },
  toAmino(message: ConsumerAddrsToPrune): ConsumerAddrsToPruneAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.vsc_id = message.vscId ? message.vscId.toString() : undefined;
    obj.consumer_addrs = message.consumerAddrs ? AddressList.toAmino(message.consumerAddrs) : undefined;
    return obj;
  },
  fromAminoMsg(object: ConsumerAddrsToPruneAminoMsg): ConsumerAddrsToPrune {
    return ConsumerAddrsToPrune.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerAddrsToPruneProtoMsg): ConsumerAddrsToPrune {
    return ConsumerAddrsToPrune.decode(message.value);
  },
  toProto(message: ConsumerAddrsToPrune): Uint8Array {
    return ConsumerAddrsToPrune.encode(message).finish();
  },
  toProtoMsg(message: ConsumerAddrsToPrune): ConsumerAddrsToPruneProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAddrsToPrune",
      value: ConsumerAddrsToPrune.encode(message).finish()
    };
  }
};