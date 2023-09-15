import { Duration, DurationSDKType } from "../../../google/protobuf/duration";
import { ClientState, ClientStateSDKType, ConsensusState, ConsensusStateSDKType } from "../../../ibc/lightclients/tendermint/v1/tendermint";
import { ValidatorUpdate, ValidatorUpdateSDKType } from "../../../tendermint/abci/types";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { ConsumerPacketData, ConsumerPacketDataSDKType } from "./wire";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
/**
 * Params defines the parameters for CCV consumer module.
 * 
 * Note this type is referenced in both the consumer and provider CCV modules,
 * and persisted on the provider, see MakeConsumerGenesis and SetConsumerGenesis.
 * 
 * TODO: Rename to ConsumerParams. See https://github.com/cosmos/interchain-security/issues/1206
 */
export interface Params {
  /**
   * TODO: Remove enabled flag and find a better way to setup integration tests
   * See: https://github.com/cosmos/interchain-security/issues/339
   */
  enabled: boolean;
  /**
   * Distribution Params
   * Number of blocks between ibc-token-transfers from the consumer chain to
   * the provider chain. Note that at this transmission event a fraction of
   * the accumulated tokens are divided and sent consumer redistribution
   * address.
   */
  blocksPerDistributionTransmission: bigint;
  /**
   * Channel, and provider-chain receiving address to send distribution token
   * transfers over. These parameters is auto-set during the consumer <->
   * provider handshake procedure.
   */
  distributionTransmissionChannel: string;
  providerFeePoolAddrStr: string;
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
   * The number of historical info entries to persist in store.
   * This param is a part of the cosmos sdk staking module. In the case of
   * a ccv enabled consumer chain, the ccv module acts as the staking module.
   */
  historicalEntries: bigint;
  /**
   * Unbonding period for the consumer,
   * which should be smaller than that of the provider in general.
   */
  unbondingPeriod: Duration;
  /**
   * The threshold for the percentage of validators at the bottom of the set who
   * can opt out of running the consumer chain without being punished. For
   * example, a value of 0.05 means that the validators in the bottom 5% of the
   * set can opt out
   */
  softOptOutThreshold: string;
  /**
   * Reward denoms. These are the denominations which are allowed to be sent to
   * the provider as rewards.
   */
  rewardDenoms: string[];
  /**
   * Provider-originated reward denoms. These are denoms coming from the
   * provider which are allowed to be used as rewards. e.g. "uatom"
   */
  providerRewardDenoms: string[];
}
/**
 * Params defines the parameters for CCV consumer module.
 * 
 * Note this type is referenced in both the consumer and provider CCV modules,
 * and persisted on the provider, see MakeConsumerGenesis and SetConsumerGenesis.
 * 
 * TODO: Rename to ConsumerParams. See https://github.com/cosmos/interchain-security/issues/1206
 */
export interface ParamsSDKType {
  enabled: boolean;
  blocks_per_distribution_transmission: bigint;
  distribution_transmission_channel: string;
  provider_fee_pool_addr_str: string;
  ccv_timeout_period: DurationSDKType;
  transfer_timeout_period: DurationSDKType;
  consumer_redistribution_fraction: string;
  historical_entries: bigint;
  unbonding_period: DurationSDKType;
  soft_opt_out_threshold: string;
  reward_denoms: string[];
  provider_reward_denoms: string[];
}
/**
 * GenesisState defines the CCV consumer chain genesis state.
 * 
 * Note this type is referenced in both the consumer and provider CCV modules,
 * and persisted on the provider, see MakeConsumerGenesis and SetConsumerGenesis.
 * 
 * TODO: Rename to ConsumerGenesisState. See https://github.com/cosmos/interchain-security/issues/1206
 */
export interface GenesisState {
  params: Params;
  /** empty for a new chain, filled in on restart. */
  providerClientId: string;
  /** empty for a new chain, filled in on restart. */
  providerChannelId: string;
  /**
   * true for new chain GenesisState, false for chain restart.
   * ProviderClientState filled in on new chain, nil on restart.
   */
  newChain: boolean;
  providerClientState: ClientState;
  /** ProviderConsensusState filled in on new chain, nil on restart. */
  providerConsensusState: ConsensusState;
  maturingPackets: MaturingVSCPacket[];
  /** InitialValset filled in on new chain and on restart. */
  initialValSet: ValidatorUpdate[];
  /** HeightToValsetUpdateId nil on new chain, filled in on restart. */
  heightToValsetUpdateId: HeightToValsetUpdateID[];
  /** OutstandingDowntimes nil on new chain, filled  in on restart. */
  outstandingDowntimeSlashing: OutstandingDowntime[];
  pendingConsumerPackets: ConsumerPacketDataList;
  lastTransmissionBlockHeight: LastTransmissionBlockHeight;
  /**
   * flag indicating whether the consumer CCV module starts in
   * pre-CCV state
   */
  preCCV: boolean;
}
/**
 * GenesisState defines the CCV consumer chain genesis state.
 * 
 * Note this type is referenced in both the consumer and provider CCV modules,
 * and persisted on the provider, see MakeConsumerGenesis and SetConsumerGenesis.
 * 
 * TODO: Rename to ConsumerGenesisState. See https://github.com/cosmos/interchain-security/issues/1206
 */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  provider_client_id: string;
  provider_channel_id: string;
  new_chain: boolean;
  provider_client_state: ClientStateSDKType;
  provider_consensus_state: ConsensusStateSDKType;
  maturing_packets: MaturingVSCPacketSDKType[];
  initial_val_set: ValidatorUpdateSDKType[];
  height_to_valset_update_id: HeightToValsetUpdateIDSDKType[];
  outstanding_downtime_slashing: OutstandingDowntimeSDKType[];
  pending_consumer_packets: ConsumerPacketDataListSDKType;
  last_transmission_block_height: LastTransmissionBlockHeightSDKType;
  preCCV: boolean;
}
/**
 * HeightValsetUpdateID represents a mapping internal to the consumer CCV module
 * AND used in shared consumer genesis state, which links a block height to each recv valset update id.
 */
export interface HeightToValsetUpdateID {
  height: bigint;
  valsetUpdateId: bigint;
}
/**
 * HeightValsetUpdateID represents a mapping internal to the consumer CCV module
 * AND used in shared consumer genesis state, which links a block height to each recv valset update id.
 */
export interface HeightToValsetUpdateIDSDKType {
  height: bigint;
  valset_update_id: bigint;
}
/**
 * OutstandingDowntime defines the type used internally to the consumer CCV module,
 * AND used in shared consumer genesis state, in order to not send multiple slashing
 * requests for the same downtime infraction.
 */
export interface OutstandingDowntime {
  /**
   * OutstandingDowntime defines the type used internally to the consumer CCV module,
   * AND used in shared consumer genesis state, in order to not send multiple slashing
   * requests for the same downtime infraction.
   */
  validatorConsensusAddress: string;
}
/**
 * OutstandingDowntime defines the type used internally to the consumer CCV module,
 * AND used in shared consumer genesis state, in order to not send multiple slashing
 * requests for the same downtime infraction.
 */
export interface OutstandingDowntimeSDKType {
  validator_consensus_address: string;
}
/**
 * LastTransmissionBlockHeight is the last time validator holding
 * pools were transmitted to the provider chain. This type is used internally
 * to the consumer CCV module AND used in shared consumer genesis state.
 */
export interface LastTransmissionBlockHeight {
  /**
   * LastTransmissionBlockHeight is the last time validator holding
   * pools were transmitted to the provider chain. This type is used internally
   * to the consumer CCV module AND used in shared consumer genesis state.
   */
  height: bigint;
}
/**
 * LastTransmissionBlockHeight is the last time validator holding
 * pools were transmitted to the provider chain. This type is used internally
 * to the consumer CCV module AND used in shared consumer genesis state.
 */
export interface LastTransmissionBlockHeightSDKType {
  height: bigint;
}
/**
 * MaturingVSCPacket represents a vsc packet that is maturing internal to the
 * consumer CCV module, where the consumer has not yet relayed a VSCMatured packet
 * back to the provider.  This type is used internally to the consumer CCV module
 * AND used in shared consumer genesis state.
 */
export interface MaturingVSCPacket {
  vscId: bigint;
  maturityTime: Date;
}
/**
 * MaturingVSCPacket represents a vsc packet that is maturing internal to the
 * consumer CCV module, where the consumer has not yet relayed a VSCMatured packet
 * back to the provider.  This type is used internally to the consumer CCV module
 * AND used in shared consumer genesis state.
 */
export interface MaturingVSCPacketSDKType {
  vscId: bigint;
  maturity_time: Date;
}
/**
 * ConsumerPacketDataList is a list of consumer packet data packets.
 * 
 * Note this type is is used internally to the consumer CCV module
 * for exporting / importing state in InitGenesis and ExportGenesis,
 * AND included in the consumer genesis type (reffed by provider and consumer modules),
 * hence this is a shared type.
 */
export interface ConsumerPacketDataList {
  list: ConsumerPacketData[];
}
/**
 * ConsumerPacketDataList is a list of consumer packet data packets.
 * 
 * Note this type is is used internally to the consumer CCV module
 * for exporting / importing state in InitGenesis and ExportGenesis,
 * AND included in the consumer genesis type (reffed by provider and consumer modules),
 * hence this is a shared type.
 */
export interface ConsumerPacketDataListSDKType {
  list: ConsumerPacketDataSDKType[];
}
function createBaseParams(): Params {
  return {
    enabled: false,
    blocksPerDistributionTransmission: BigInt(0),
    distributionTransmissionChannel: "",
    providerFeePoolAddrStr: "",
    ccvTimeoutPeriod: Duration.fromPartial({}),
    transferTimeoutPeriod: Duration.fromPartial({}),
    consumerRedistributionFraction: "",
    historicalEntries: BigInt(0),
    unbondingPeriod: Duration.fromPartial({}),
    softOptOutThreshold: "",
    rewardDenoms: [],
    providerRewardDenoms: []
  };
}
export const Params = {
  typeUrl: "/interchain_security.ccv.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    if (message.blocksPerDistributionTransmission !== BigInt(0)) {
      writer.uint32(16).int64(message.blocksPerDistributionTransmission);
    }
    if (message.distributionTransmissionChannel !== "") {
      writer.uint32(26).string(message.distributionTransmissionChannel);
    }
    if (message.providerFeePoolAddrStr !== "") {
      writer.uint32(34).string(message.providerFeePoolAddrStr);
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(42).fork()).ldelim();
    }
    if (message.transferTimeoutPeriod !== undefined) {
      Duration.encode(message.transferTimeoutPeriod, writer.uint32(50).fork()).ldelim();
    }
    if (message.consumerRedistributionFraction !== "") {
      writer.uint32(58).string(message.consumerRedistributionFraction);
    }
    if (message.historicalEntries !== BigInt(0)) {
      writer.uint32(64).int64(message.historicalEntries);
    }
    if (message.unbondingPeriod !== undefined) {
      Duration.encode(message.unbondingPeriod, writer.uint32(74).fork()).ldelim();
    }
    if (message.softOptOutThreshold !== "") {
      writer.uint32(82).string(message.softOptOutThreshold);
    }
    for (const v of message.rewardDenoms) {
      writer.uint32(90).string(v!);
    }
    for (const v of message.providerRewardDenoms) {
      writer.uint32(98).string(v!);
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
          message.enabled = reader.bool();
          break;
        case 2:
          message.blocksPerDistributionTransmission = reader.int64();
          break;
        case 3:
          message.distributionTransmissionChannel = reader.string();
          break;
        case 4:
          message.providerFeePoolAddrStr = reader.string();
          break;
        case 5:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 6:
          message.transferTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 7:
          message.consumerRedistributionFraction = reader.string();
          break;
        case 8:
          message.historicalEntries = reader.int64();
          break;
        case 9:
          message.unbondingPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 10:
          message.softOptOutThreshold = reader.string();
          break;
        case 11:
          message.rewardDenoms.push(reader.string());
          break;
        case 12:
          message.providerRewardDenoms.push(reader.string());
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
    message.enabled = object.enabled ?? false;
    message.blocksPerDistributionTransmission = object.blocksPerDistributionTransmission !== undefined && object.blocksPerDistributionTransmission !== null ? BigInt(object.blocksPerDistributionTransmission.toString()) : BigInt(0);
    message.distributionTransmissionChannel = object.distributionTransmissionChannel ?? "";
    message.providerFeePoolAddrStr = object.providerFeePoolAddrStr ?? "";
    message.ccvTimeoutPeriod = object.ccvTimeoutPeriod !== undefined && object.ccvTimeoutPeriod !== null ? Duration.fromPartial(object.ccvTimeoutPeriod) : undefined;
    message.transferTimeoutPeriod = object.transferTimeoutPeriod !== undefined && object.transferTimeoutPeriod !== null ? Duration.fromPartial(object.transferTimeoutPeriod) : undefined;
    message.consumerRedistributionFraction = object.consumerRedistributionFraction ?? "";
    message.historicalEntries = object.historicalEntries !== undefined && object.historicalEntries !== null ? BigInt(object.historicalEntries.toString()) : BigInt(0);
    message.unbondingPeriod = object.unbondingPeriod !== undefined && object.unbondingPeriod !== null ? Duration.fromPartial(object.unbondingPeriod) : undefined;
    message.softOptOutThreshold = object.softOptOutThreshold ?? "";
    message.rewardDenoms = object.rewardDenoms?.map(e => e) || [];
    message.providerRewardDenoms = object.providerRewardDenoms?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    return {
      enabled: object.enabled,
      blocksPerDistributionTransmission: BigInt(object.blocks_per_distribution_transmission),
      distributionTransmissionChannel: object.distribution_transmission_channel,
      providerFeePoolAddrStr: object.provider_fee_pool_addr_str,
      ccvTimeoutPeriod: object?.ccv_timeout_period ? Duration.fromAmino(object.ccv_timeout_period) : undefined,
      transferTimeoutPeriod: object?.transfer_timeout_period ? Duration.fromAmino(object.transfer_timeout_period) : undefined,
      consumerRedistributionFraction: object.consumer_redistribution_fraction,
      historicalEntries: BigInt(object.historical_entries),
      unbondingPeriod: object?.unbonding_period ? Duration.fromAmino(object.unbonding_period) : undefined,
      softOptOutThreshold: object.soft_opt_out_threshold,
      rewardDenoms: Array.isArray(object?.reward_denoms) ? object.reward_denoms.map((e: any) => e) : [],
      providerRewardDenoms: Array.isArray(object?.provider_reward_denoms) ? object.provider_reward_denoms.map((e: any) => e) : []
    };
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.enabled = message.enabled;
    obj.blocks_per_distribution_transmission = message.blocksPerDistributionTransmission ? message.blocksPerDistributionTransmission.toString() : undefined;
    obj.distribution_transmission_channel = message.distributionTransmissionChannel;
    obj.provider_fee_pool_addr_str = message.providerFeePoolAddrStr;
    obj.ccv_timeout_period = message.ccvTimeoutPeriod ? Duration.toAmino(message.ccvTimeoutPeriod) : undefined;
    obj.transfer_timeout_period = message.transferTimeoutPeriod ? Duration.toAmino(message.transferTimeoutPeriod) : undefined;
    obj.consumer_redistribution_fraction = message.consumerRedistributionFraction;
    obj.historical_entries = message.historicalEntries ? message.historicalEntries.toString() : undefined;
    obj.unbonding_period = message.unbondingPeriod ? Duration.toAmino(message.unbondingPeriod) : undefined;
    obj.soft_opt_out_threshold = message.softOptOutThreshold;
    if (message.rewardDenoms) {
      obj.reward_denoms = message.rewardDenoms.map(e => e);
    } else {
      obj.reward_denoms = [];
    }
    if (message.providerRewardDenoms) {
      obj.provider_reward_denoms = message.providerRewardDenoms.map(e => e);
    } else {
      obj.provider_reward_denoms = [];
    }
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
      typeUrl: "/interchain_security.ccv.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    providerClientId: "",
    providerChannelId: "",
    newChain: false,
    providerClientState: ClientState.fromPartial({}),
    providerConsensusState: ConsensusState.fromPartial({}),
    maturingPackets: [],
    initialValSet: [],
    heightToValsetUpdateId: [],
    outstandingDowntimeSlashing: [],
    pendingConsumerPackets: ConsumerPacketDataList.fromPartial({}),
    lastTransmissionBlockHeight: LastTransmissionBlockHeight.fromPartial({}),
    preCCV: false
  };
}
export const GenesisState = {
  typeUrl: "/interchain_security.ccv.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.providerClientId !== "") {
      writer.uint32(18).string(message.providerClientId);
    }
    if (message.providerChannelId !== "") {
      writer.uint32(26).string(message.providerChannelId);
    }
    if (message.newChain === true) {
      writer.uint32(32).bool(message.newChain);
    }
    if (message.providerClientState !== undefined) {
      ClientState.encode(message.providerClientState, writer.uint32(42).fork()).ldelim();
    }
    if (message.providerConsensusState !== undefined) {
      ConsensusState.encode(message.providerConsensusState, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.maturingPackets) {
      MaturingVSCPacket.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.initialValSet) {
      ValidatorUpdate.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.heightToValsetUpdateId) {
      HeightToValsetUpdateID.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.outstandingDowntimeSlashing) {
      OutstandingDowntime.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.pendingConsumerPackets !== undefined) {
      ConsumerPacketDataList.encode(message.pendingConsumerPackets, writer.uint32(90).fork()).ldelim();
    }
    if (message.lastTransmissionBlockHeight !== undefined) {
      LastTransmissionBlockHeight.encode(message.lastTransmissionBlockHeight, writer.uint32(98).fork()).ldelim();
    }
    if (message.preCCV === true) {
      writer.uint32(104).bool(message.preCCV);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.providerClientId = reader.string();
          break;
        case 3:
          message.providerChannelId = reader.string();
          break;
        case 4:
          message.newChain = reader.bool();
          break;
        case 5:
          message.providerClientState = ClientState.decode(reader, reader.uint32());
          break;
        case 6:
          message.providerConsensusState = ConsensusState.decode(reader, reader.uint32());
          break;
        case 7:
          message.maturingPackets.push(MaturingVSCPacket.decode(reader, reader.uint32()));
          break;
        case 8:
          message.initialValSet.push(ValidatorUpdate.decode(reader, reader.uint32()));
          break;
        case 9:
          message.heightToValsetUpdateId.push(HeightToValsetUpdateID.decode(reader, reader.uint32()));
          break;
        case 10:
          message.outstandingDowntimeSlashing.push(OutstandingDowntime.decode(reader, reader.uint32()));
          break;
        case 11:
          message.pendingConsumerPackets = ConsumerPacketDataList.decode(reader, reader.uint32());
          break;
        case 12:
          message.lastTransmissionBlockHeight = LastTransmissionBlockHeight.decode(reader, reader.uint32());
          break;
        case 13:
          message.preCCV = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.providerClientId = object.providerClientId ?? "";
    message.providerChannelId = object.providerChannelId ?? "";
    message.newChain = object.newChain ?? false;
    message.providerClientState = object.providerClientState !== undefined && object.providerClientState !== null ? ClientState.fromPartial(object.providerClientState) : undefined;
    message.providerConsensusState = object.providerConsensusState !== undefined && object.providerConsensusState !== null ? ConsensusState.fromPartial(object.providerConsensusState) : undefined;
    message.maturingPackets = object.maturingPackets?.map(e => MaturingVSCPacket.fromPartial(e)) || [];
    message.initialValSet = object.initialValSet?.map(e => ValidatorUpdate.fromPartial(e)) || [];
    message.heightToValsetUpdateId = object.heightToValsetUpdateId?.map(e => HeightToValsetUpdateID.fromPartial(e)) || [];
    message.outstandingDowntimeSlashing = object.outstandingDowntimeSlashing?.map(e => OutstandingDowntime.fromPartial(e)) || [];
    message.pendingConsumerPackets = object.pendingConsumerPackets !== undefined && object.pendingConsumerPackets !== null ? ConsumerPacketDataList.fromPartial(object.pendingConsumerPackets) : undefined;
    message.lastTransmissionBlockHeight = object.lastTransmissionBlockHeight !== undefined && object.lastTransmissionBlockHeight !== null ? LastTransmissionBlockHeight.fromPartial(object.lastTransmissionBlockHeight) : undefined;
    message.preCCV = object.preCCV ?? false;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    return {
      params: object?.params ? Params.fromAmino(object.params) : undefined,
      providerClientId: object.provider_client_id,
      providerChannelId: object.provider_channel_id,
      newChain: object.new_chain,
      providerClientState: object?.provider_client_state ? ClientState.fromAmino(object.provider_client_state) : undefined,
      providerConsensusState: object?.provider_consensus_state ? ConsensusState.fromAmino(object.provider_consensus_state) : undefined,
      maturingPackets: Array.isArray(object?.maturing_packets) ? object.maturing_packets.map((e: any) => MaturingVSCPacket.fromAmino(e)) : [],
      initialValSet: Array.isArray(object?.initial_val_set) ? object.initial_val_set.map((e: any) => ValidatorUpdate.fromAmino(e)) : [],
      heightToValsetUpdateId: Array.isArray(object?.height_to_valset_update_id) ? object.height_to_valset_update_id.map((e: any) => HeightToValsetUpdateID.fromAmino(e)) : [],
      outstandingDowntimeSlashing: Array.isArray(object?.outstanding_downtime_slashing) ? object.outstanding_downtime_slashing.map((e: any) => OutstandingDowntime.fromAmino(e)) : [],
      pendingConsumerPackets: object?.pending_consumer_packets ? ConsumerPacketDataList.fromAmino(object.pending_consumer_packets) : undefined,
      lastTransmissionBlockHeight: object?.last_transmission_block_height ? LastTransmissionBlockHeight.fromAmino(object.last_transmission_block_height) : undefined,
      preCCV: object.preCCV
    };
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    obj.provider_client_id = message.providerClientId;
    obj.provider_channel_id = message.providerChannelId;
    obj.new_chain = message.newChain;
    obj.provider_client_state = message.providerClientState ? ClientState.toAmino(message.providerClientState) : undefined;
    obj.provider_consensus_state = message.providerConsensusState ? ConsensusState.toAmino(message.providerConsensusState) : undefined;
    if (message.maturingPackets) {
      obj.maturing_packets = message.maturingPackets.map(e => e ? MaturingVSCPacket.toAmino(e) : undefined);
    } else {
      obj.maturing_packets = [];
    }
    if (message.initialValSet) {
      obj.initial_val_set = message.initialValSet.map(e => e ? ValidatorUpdate.toAmino(e) : undefined);
    } else {
      obj.initial_val_set = [];
    }
    if (message.heightToValsetUpdateId) {
      obj.height_to_valset_update_id = message.heightToValsetUpdateId.map(e => e ? HeightToValsetUpdateID.toAmino(e) : undefined);
    } else {
      obj.height_to_valset_update_id = [];
    }
    if (message.outstandingDowntimeSlashing) {
      obj.outstanding_downtime_slashing = message.outstandingDowntimeSlashing.map(e => e ? OutstandingDowntime.toAmino(e) : undefined);
    } else {
      obj.outstanding_downtime_slashing = [];
    }
    obj.pending_consumer_packets = message.pendingConsumerPackets ? ConsumerPacketDataList.toAmino(message.pendingConsumerPackets) : undefined;
    obj.last_transmission_block_height = message.lastTransmissionBlockHeight ? LastTransmissionBlockHeight.toAmino(message.lastTransmissionBlockHeight) : undefined;
    obj.preCCV = message.preCCV;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseHeightToValsetUpdateID(): HeightToValsetUpdateID {
  return {
    height: BigInt(0),
    valsetUpdateId: BigInt(0)
  };
}
export const HeightToValsetUpdateID = {
  typeUrl: "/interchain_security.ccv.v1.HeightToValsetUpdateID",
  encode(message: HeightToValsetUpdateID, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(16).uint64(message.valsetUpdateId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): HeightToValsetUpdateID {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeightToValsetUpdateID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.uint64();
          break;
        case 2:
          message.valsetUpdateId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HeightToValsetUpdateID>): HeightToValsetUpdateID {
    const message = createBaseHeightToValsetUpdateID();
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: HeightToValsetUpdateIDAmino): HeightToValsetUpdateID {
    return {
      height: BigInt(object.height),
      valsetUpdateId: BigInt(object.valset_update_id)
    };
  },
  toAmino(message: HeightToValsetUpdateID): HeightToValsetUpdateIDAmino {
    const obj: any = {};
    obj.height = message.height ? message.height.toString() : undefined;
    obj.valset_update_id = message.valsetUpdateId ? message.valsetUpdateId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: HeightToValsetUpdateIDAminoMsg): HeightToValsetUpdateID {
    return HeightToValsetUpdateID.fromAmino(object.value);
  },
  fromProtoMsg(message: HeightToValsetUpdateIDProtoMsg): HeightToValsetUpdateID {
    return HeightToValsetUpdateID.decode(message.value);
  },
  toProto(message: HeightToValsetUpdateID): Uint8Array {
    return HeightToValsetUpdateID.encode(message).finish();
  },
  toProtoMsg(message: HeightToValsetUpdateID): HeightToValsetUpdateIDProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.HeightToValsetUpdateID",
      value: HeightToValsetUpdateID.encode(message).finish()
    };
  }
};
function createBaseOutstandingDowntime(): OutstandingDowntime {
  return {
    validatorConsensusAddress: ""
  };
}
export const OutstandingDowntime = {
  typeUrl: "/interchain_security.ccv.v1.OutstandingDowntime",
  encode(message: OutstandingDowntime, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorConsensusAddress !== "") {
      writer.uint32(10).string(message.validatorConsensusAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): OutstandingDowntime {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOutstandingDowntime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorConsensusAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OutstandingDowntime>): OutstandingDowntime {
    const message = createBaseOutstandingDowntime();
    message.validatorConsensusAddress = object.validatorConsensusAddress ?? "";
    return message;
  },
  fromAmino(object: OutstandingDowntimeAmino): OutstandingDowntime {
    return {
      validatorConsensusAddress: object.validator_consensus_address
    };
  },
  toAmino(message: OutstandingDowntime): OutstandingDowntimeAmino {
    const obj: any = {};
    obj.validator_consensus_address = message.validatorConsensusAddress;
    return obj;
  },
  fromAminoMsg(object: OutstandingDowntimeAminoMsg): OutstandingDowntime {
    return OutstandingDowntime.fromAmino(object.value);
  },
  fromProtoMsg(message: OutstandingDowntimeProtoMsg): OutstandingDowntime {
    return OutstandingDowntime.decode(message.value);
  },
  toProto(message: OutstandingDowntime): Uint8Array {
    return OutstandingDowntime.encode(message).finish();
  },
  toProtoMsg(message: OutstandingDowntime): OutstandingDowntimeProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.OutstandingDowntime",
      value: OutstandingDowntime.encode(message).finish()
    };
  }
};
function createBaseLastTransmissionBlockHeight(): LastTransmissionBlockHeight {
  return {
    height: BigInt(0)
  };
}
export const LastTransmissionBlockHeight = {
  typeUrl: "/interchain_security.ccv.v1.LastTransmissionBlockHeight",
  encode(message: LastTransmissionBlockHeight, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LastTransmissionBlockHeight {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastTransmissionBlockHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LastTransmissionBlockHeight>): LastTransmissionBlockHeight {
    const message = createBaseLastTransmissionBlockHeight();
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: LastTransmissionBlockHeightAmino): LastTransmissionBlockHeight {
    return {
      height: BigInt(object.height)
    };
  },
  toAmino(message: LastTransmissionBlockHeight): LastTransmissionBlockHeightAmino {
    const obj: any = {};
    obj.height = message.height ? message.height.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: LastTransmissionBlockHeightAminoMsg): LastTransmissionBlockHeight {
    return LastTransmissionBlockHeight.fromAmino(object.value);
  },
  fromProtoMsg(message: LastTransmissionBlockHeightProtoMsg): LastTransmissionBlockHeight {
    return LastTransmissionBlockHeight.decode(message.value);
  },
  toProto(message: LastTransmissionBlockHeight): Uint8Array {
    return LastTransmissionBlockHeight.encode(message).finish();
  },
  toProtoMsg(message: LastTransmissionBlockHeight): LastTransmissionBlockHeightProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.LastTransmissionBlockHeight",
      value: LastTransmissionBlockHeight.encode(message).finish()
    };
  }
};
function createBaseMaturingVSCPacket(): MaturingVSCPacket {
  return {
    vscId: BigInt(0),
    maturityTime: new Date()
  };
}
export const MaturingVSCPacket = {
  typeUrl: "/interchain_security.ccv.v1.MaturingVSCPacket",
  encode(message: MaturingVSCPacket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.vscId !== BigInt(0)) {
      writer.uint32(8).uint64(message.vscId);
    }
    if (message.maturityTime !== undefined) {
      Timestamp.encode(toTimestamp(message.maturityTime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MaturingVSCPacket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaturingVSCPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vscId = reader.uint64();
          break;
        case 2:
          message.maturityTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MaturingVSCPacket>): MaturingVSCPacket {
    const message = createBaseMaturingVSCPacket();
    message.vscId = object.vscId !== undefined && object.vscId !== null ? BigInt(object.vscId.toString()) : BigInt(0);
    message.maturityTime = object.maturityTime ?? undefined;
    return message;
  },
  fromAmino(object: MaturingVSCPacketAmino): MaturingVSCPacket {
    return {
      vscId: BigInt(object.vscId),
      maturityTime: object.maturity_time
    };
  },
  toAmino(message: MaturingVSCPacket): MaturingVSCPacketAmino {
    const obj: any = {};
    obj.vscId = message.vscId ? message.vscId.toString() : undefined;
    obj.maturity_time = message.maturityTime;
    return obj;
  },
  fromAminoMsg(object: MaturingVSCPacketAminoMsg): MaturingVSCPacket {
    return MaturingVSCPacket.fromAmino(object.value);
  },
  fromProtoMsg(message: MaturingVSCPacketProtoMsg): MaturingVSCPacket {
    return MaturingVSCPacket.decode(message.value);
  },
  toProto(message: MaturingVSCPacket): Uint8Array {
    return MaturingVSCPacket.encode(message).finish();
  },
  toProtoMsg(message: MaturingVSCPacket): MaturingVSCPacketProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.MaturingVSCPacket",
      value: MaturingVSCPacket.encode(message).finish()
    };
  }
};
function createBaseConsumerPacketDataList(): ConsumerPacketDataList {
  return {
    list: []
  };
}
export const ConsumerPacketDataList = {
  typeUrl: "/interchain_security.ccv.v1.ConsumerPacketDataList",
  encode(message: ConsumerPacketDataList, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.list) {
      ConsumerPacketData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConsumerPacketDataList {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerPacketDataList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.list.push(ConsumerPacketData.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerPacketDataList>): ConsumerPacketDataList {
    const message = createBaseConsumerPacketDataList();
    message.list = object.list?.map(e => ConsumerPacketData.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ConsumerPacketDataListAmino): ConsumerPacketDataList {
    return {
      list: Array.isArray(object?.list) ? object.list.map((e: any) => ConsumerPacketData.fromAmino(e)) : []
    };
  },
  toAmino(message: ConsumerPacketDataList): ConsumerPacketDataListAmino {
    const obj: any = {};
    if (message.list) {
      obj.list = message.list.map(e => e ? ConsumerPacketData.toAmino(e) : undefined);
    } else {
      obj.list = [];
    }
    return obj;
  },
  fromAminoMsg(object: ConsumerPacketDataListAminoMsg): ConsumerPacketDataList {
    return ConsumerPacketDataList.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerPacketDataListProtoMsg): ConsumerPacketDataList {
    return ConsumerPacketDataList.decode(message.value);
  },
  toProto(message: ConsumerPacketDataList): Uint8Array {
    return ConsumerPacketDataList.encode(message).finish();
  },
  toProtoMsg(message: ConsumerPacketDataList): ConsumerPacketDataListProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.ConsumerPacketDataList",
      value: ConsumerPacketDataList.encode(message).finish()
    };
  }
};