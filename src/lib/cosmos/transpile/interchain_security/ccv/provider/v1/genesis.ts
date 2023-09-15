import { UnbondingOp, UnbondingOpSDKType, MaturedUnbondingOps, MaturedUnbondingOpsSDKType, ConsumerAdditionProposal, ConsumerAdditionProposalSDKType, ConsumerRemovalProposal, ConsumerRemovalProposalSDKType, ValidatorConsumerPubKey, ValidatorConsumerPubKeySDKType, ValidatorByConsumerAddr, ValidatorByConsumerAddrSDKType, ConsumerAddrsToPrune, ConsumerAddrsToPruneSDKType, InitTimeoutTimestamp, InitTimeoutTimestampSDKType, ExportedVscSendTimestamp, ExportedVscSendTimestampSDKType, VscUnbondingOps, VscUnbondingOpsSDKType } from "./provider";
import { Params, ParamsSDKType } from "../../v1/shared_consumer";
import { GenesisState as GenesisState1 } from "../../v1/shared_consumer";
import { GenesisStateSDKType as GenesisState1SDKType } from "../../v1/shared_consumer";
import { ValidatorSetChangePacketData, ValidatorSetChangePacketDataSDKType } from "../../v1/wire";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** GenesisState defines the CCV provider chain genesis state */
export interface GenesisState {
  /** strictly positive and set to 1 (DefaultValsetUpdateID) for a new chain */
  valsetUpdateId: bigint;
  /** empty for a new chain */
  consumerStates: ConsumerState[];
  /** empty for a new chain */
  unbondingOps: UnbondingOp[];
  /** empty for a new chain */
  matureUnbondingOps: MaturedUnbondingOps;
  /** empty for a new chain */
  valsetUpdateIdToHeight: ValsetUpdateIdToHeight[];
  /** empty for a new chain */
  consumerAdditionProposals: ConsumerAdditionProposal[];
  /** empty for a new chain */
  consumerRemovalProposals: ConsumerRemovalProposal[];
  params: Params;
  /** empty for a new chain */
  validatorConsumerPubkeys: ValidatorConsumerPubKey[];
  /** empty for a new chain */
  validatorsByConsumerAddr: ValidatorByConsumerAddr[];
  /** empty for a new chain */
  consumerAddrsToPrune: ConsumerAddrsToPrune[];
  initTimeoutTimestamps: InitTimeoutTimestamp[];
  exportedVscSendTimestamps: ExportedVscSendTimestamp[];
}
/** GenesisState defines the CCV provider chain genesis state */
export interface GenesisStateSDKType {
  valset_update_id: bigint;
  consumer_states: ConsumerStateSDKType[];
  unbonding_ops: UnbondingOpSDKType[];
  mature_unbonding_ops: MaturedUnbondingOpsSDKType;
  valset_update_id_to_height: ValsetUpdateIdToHeightSDKType[];
  consumer_addition_proposals: ConsumerAdditionProposalSDKType[];
  consumer_removal_proposals: ConsumerRemovalProposalSDKType[];
  params: ParamsSDKType;
  validator_consumer_pubkeys: ValidatorConsumerPubKeySDKType[];
  validators_by_consumer_addr: ValidatorByConsumerAddrSDKType[];
  consumer_addrs_to_prune: ConsumerAddrsToPruneSDKType[];
  init_timeout_timestamps: InitTimeoutTimestampSDKType[];
  exported_vsc_send_timestamps: ExportedVscSendTimestampSDKType[];
}
/**
 * The provider CCV module's knowledge of consumer state.
 * 
 * Note this type is only used internally to the provider CCV module.
 */
export interface ConsumerState {
  /** ChainID defines the chain ID for the consumer chain */
  chainId: string;
  /** ChannelID defines the IBC channel ID for the consumer chain */
  channelId: string;
  /** ClientID defines the IBC client ID for the consumer chain */
  clientId: string;
  /** InitalHeight defines the initial block height for the consumer chain */
  initialHeight: bigint;
  /** ConsumerGenesis defines the initial consumer chain genesis states */
  consumerGenesis: GenesisState1;
  pendingValsetChanges: ValidatorSetChangePacketData[];
  slashDowntimeAck: string[];
  unbondingOpsIndex: VscUnbondingOps[];
}
/**
 * The provider CCV module's knowledge of consumer state.
 * 
 * Note this type is only used internally to the provider CCV module.
 */
export interface ConsumerStateSDKType {
  chain_id: string;
  channel_id: string;
  client_id: string;
  initial_height: bigint;
  consumer_genesis: GenesisState1SDKType;
  pending_valset_changes: ValidatorSetChangePacketDataSDKType[];
  slash_downtime_ack: string[];
  unbonding_ops_index: VscUnbondingOpsSDKType[];
}
/**
 * ValsetUpdateIdToHeight defines the genesis information for the mapping
 * of each valset udpate id to a block height
 */
export interface ValsetUpdateIdToHeight {
  valsetUpdateId: bigint;
  height: bigint;
}
/**
 * ValsetUpdateIdToHeight defines the genesis information for the mapping
 * of each valset udpate id to a block height
 */
export interface ValsetUpdateIdToHeightSDKType {
  valset_update_id: bigint;
  height: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    valsetUpdateId: BigInt(0),
    consumerStates: [],
    unbondingOps: [],
    matureUnbondingOps: MaturedUnbondingOps.fromPartial({}),
    valsetUpdateIdToHeight: [],
    consumerAdditionProposals: [],
    consumerRemovalProposals: [],
    params: Params.fromPartial({}),
    validatorConsumerPubkeys: [],
    validatorsByConsumerAddr: [],
    consumerAddrsToPrune: [],
    initTimeoutTimestamps: [],
    exportedVscSendTimestamps: []
  };
}
export const GenesisState = {
  typeUrl: "/interchain_security.ccv.provider.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(8).uint64(message.valsetUpdateId);
    }
    for (const v of message.consumerStates) {
      ConsumerState.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.unbondingOps) {
      UnbondingOp.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.matureUnbondingOps !== undefined) {
      MaturedUnbondingOps.encode(message.matureUnbondingOps, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.valsetUpdateIdToHeight) {
      ValsetUpdateIdToHeight.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.consumerAdditionProposals) {
      ConsumerAdditionProposal.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.consumerRemovalProposals) {
      ConsumerRemovalProposal.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.validatorConsumerPubkeys) {
      ValidatorConsumerPubKey.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.validatorsByConsumerAddr) {
      ValidatorByConsumerAddr.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.consumerAddrsToPrune) {
      ConsumerAddrsToPrune.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.initTimeoutTimestamps) {
      InitTimeoutTimestamp.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.exportedVscSendTimestamps) {
      ExportedVscSendTimestamp.encode(v!, writer.uint32(106).fork()).ldelim();
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
          message.valsetUpdateId = reader.uint64();
          break;
        case 2:
          message.consumerStates.push(ConsumerState.decode(reader, reader.uint32()));
          break;
        case 3:
          message.unbondingOps.push(UnbondingOp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.matureUnbondingOps = MaturedUnbondingOps.decode(reader, reader.uint32());
          break;
        case 5:
          message.valsetUpdateIdToHeight.push(ValsetUpdateIdToHeight.decode(reader, reader.uint32()));
          break;
        case 6:
          message.consumerAdditionProposals.push(ConsumerAdditionProposal.decode(reader, reader.uint32()));
          break;
        case 7:
          message.consumerRemovalProposals.push(ConsumerRemovalProposal.decode(reader, reader.uint32()));
          break;
        case 8:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 9:
          message.validatorConsumerPubkeys.push(ValidatorConsumerPubKey.decode(reader, reader.uint32()));
          break;
        case 10:
          message.validatorsByConsumerAddr.push(ValidatorByConsumerAddr.decode(reader, reader.uint32()));
          break;
        case 11:
          message.consumerAddrsToPrune.push(ConsumerAddrsToPrune.decode(reader, reader.uint32()));
          break;
        case 12:
          message.initTimeoutTimestamps.push(InitTimeoutTimestamp.decode(reader, reader.uint32()));
          break;
        case 13:
          message.exportedVscSendTimestamps.push(ExportedVscSendTimestamp.decode(reader, reader.uint32()));
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
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    message.consumerStates = object.consumerStates?.map(e => ConsumerState.fromPartial(e)) || [];
    message.unbondingOps = object.unbondingOps?.map(e => UnbondingOp.fromPartial(e)) || [];
    message.matureUnbondingOps = object.matureUnbondingOps !== undefined && object.matureUnbondingOps !== null ? MaturedUnbondingOps.fromPartial(object.matureUnbondingOps) : undefined;
    message.valsetUpdateIdToHeight = object.valsetUpdateIdToHeight?.map(e => ValsetUpdateIdToHeight.fromPartial(e)) || [];
    message.consumerAdditionProposals = object.consumerAdditionProposals?.map(e => ConsumerAdditionProposal.fromPartial(e)) || [];
    message.consumerRemovalProposals = object.consumerRemovalProposals?.map(e => ConsumerRemovalProposal.fromPartial(e)) || [];
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.validatorConsumerPubkeys = object.validatorConsumerPubkeys?.map(e => ValidatorConsumerPubKey.fromPartial(e)) || [];
    message.validatorsByConsumerAddr = object.validatorsByConsumerAddr?.map(e => ValidatorByConsumerAddr.fromPartial(e)) || [];
    message.consumerAddrsToPrune = object.consumerAddrsToPrune?.map(e => ConsumerAddrsToPrune.fromPartial(e)) || [];
    message.initTimeoutTimestamps = object.initTimeoutTimestamps?.map(e => InitTimeoutTimestamp.fromPartial(e)) || [];
    message.exportedVscSendTimestamps = object.exportedVscSendTimestamps?.map(e => ExportedVscSendTimestamp.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    return {
      valsetUpdateId: BigInt(object.valset_update_id),
      consumerStates: Array.isArray(object?.consumer_states) ? object.consumer_states.map((e: any) => ConsumerState.fromAmino(e)) : [],
      unbondingOps: Array.isArray(object?.unbonding_ops) ? object.unbonding_ops.map((e: any) => UnbondingOp.fromAmino(e)) : [],
      matureUnbondingOps: object?.mature_unbonding_ops ? MaturedUnbondingOps.fromAmino(object.mature_unbonding_ops) : undefined,
      valsetUpdateIdToHeight: Array.isArray(object?.valset_update_id_to_height) ? object.valset_update_id_to_height.map((e: any) => ValsetUpdateIdToHeight.fromAmino(e)) : [],
      consumerAdditionProposals: Array.isArray(object?.consumer_addition_proposals) ? object.consumer_addition_proposals.map((e: any) => ConsumerAdditionProposal.fromAmino(e)) : [],
      consumerRemovalProposals: Array.isArray(object?.consumer_removal_proposals) ? object.consumer_removal_proposals.map((e: any) => ConsumerRemovalProposal.fromAmino(e)) : [],
      params: object?.params ? Params.fromAmino(object.params) : undefined,
      validatorConsumerPubkeys: Array.isArray(object?.validator_consumer_pubkeys) ? object.validator_consumer_pubkeys.map((e: any) => ValidatorConsumerPubKey.fromAmino(e)) : [],
      validatorsByConsumerAddr: Array.isArray(object?.validators_by_consumer_addr) ? object.validators_by_consumer_addr.map((e: any) => ValidatorByConsumerAddr.fromAmino(e)) : [],
      consumerAddrsToPrune: Array.isArray(object?.consumer_addrs_to_prune) ? object.consumer_addrs_to_prune.map((e: any) => ConsumerAddrsToPrune.fromAmino(e)) : [],
      initTimeoutTimestamps: Array.isArray(object?.init_timeout_timestamps) ? object.init_timeout_timestamps.map((e: any) => InitTimeoutTimestamp.fromAmino(e)) : [],
      exportedVscSendTimestamps: Array.isArray(object?.exported_vsc_send_timestamps) ? object.exported_vsc_send_timestamps.map((e: any) => ExportedVscSendTimestamp.fromAmino(e)) : []
    };
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.valset_update_id = message.valsetUpdateId ? message.valsetUpdateId.toString() : undefined;
    if (message.consumerStates) {
      obj.consumer_states = message.consumerStates.map(e => e ? ConsumerState.toAmino(e) : undefined);
    } else {
      obj.consumer_states = [];
    }
    if (message.unbondingOps) {
      obj.unbonding_ops = message.unbondingOps.map(e => e ? UnbondingOp.toAmino(e) : undefined);
    } else {
      obj.unbonding_ops = [];
    }
    obj.mature_unbonding_ops = message.matureUnbondingOps ? MaturedUnbondingOps.toAmino(message.matureUnbondingOps) : undefined;
    if (message.valsetUpdateIdToHeight) {
      obj.valset_update_id_to_height = message.valsetUpdateIdToHeight.map(e => e ? ValsetUpdateIdToHeight.toAmino(e) : undefined);
    } else {
      obj.valset_update_id_to_height = [];
    }
    if (message.consumerAdditionProposals) {
      obj.consumer_addition_proposals = message.consumerAdditionProposals.map(e => e ? ConsumerAdditionProposal.toAmino(e) : undefined);
    } else {
      obj.consumer_addition_proposals = [];
    }
    if (message.consumerRemovalProposals) {
      obj.consumer_removal_proposals = message.consumerRemovalProposals.map(e => e ? ConsumerRemovalProposal.toAmino(e) : undefined);
    } else {
      obj.consumer_removal_proposals = [];
    }
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.validatorConsumerPubkeys) {
      obj.validator_consumer_pubkeys = message.validatorConsumerPubkeys.map(e => e ? ValidatorConsumerPubKey.toAmino(e) : undefined);
    } else {
      obj.validator_consumer_pubkeys = [];
    }
    if (message.validatorsByConsumerAddr) {
      obj.validators_by_consumer_addr = message.validatorsByConsumerAddr.map(e => e ? ValidatorByConsumerAddr.toAmino(e) : undefined);
    } else {
      obj.validators_by_consumer_addr = [];
    }
    if (message.consumerAddrsToPrune) {
      obj.consumer_addrs_to_prune = message.consumerAddrsToPrune.map(e => e ? ConsumerAddrsToPrune.toAmino(e) : undefined);
    } else {
      obj.consumer_addrs_to_prune = [];
    }
    if (message.initTimeoutTimestamps) {
      obj.init_timeout_timestamps = message.initTimeoutTimestamps.map(e => e ? InitTimeoutTimestamp.toAmino(e) : undefined);
    } else {
      obj.init_timeout_timestamps = [];
    }
    if (message.exportedVscSendTimestamps) {
      obj.exported_vsc_send_timestamps = message.exportedVscSendTimestamps.map(e => e ? ExportedVscSendTimestamp.toAmino(e) : undefined);
    } else {
      obj.exported_vsc_send_timestamps = [];
    }
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
      typeUrl: "/interchain_security.ccv.provider.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseConsumerState(): ConsumerState {
  return {
    chainId: "",
    channelId: "",
    clientId: "",
    initialHeight: BigInt(0),
    consumerGenesis: GenesisState1.fromPartial({}),
    pendingValsetChanges: [],
    slashDowntimeAck: [],
    unbondingOpsIndex: []
  };
}
export const ConsumerState = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerState",
  encode(message: ConsumerState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.clientId !== "") {
      writer.uint32(26).string(message.clientId);
    }
    if (message.initialHeight !== BigInt(0)) {
      writer.uint32(32).uint64(message.initialHeight);
    }
    if (message.consumerGenesis !== undefined) {
      GenesisState1.encode(message.consumerGenesis, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.pendingValsetChanges) {
      ValidatorSetChangePacketData.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.slashDowntimeAck) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.unbondingOpsIndex) {
      VscUnbondingOps.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConsumerState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.clientId = reader.string();
          break;
        case 4:
          message.initialHeight = reader.uint64();
          break;
        case 5:
          message.consumerGenesis = GenesisState1.decode(reader, reader.uint32());
          break;
        case 6:
          message.pendingValsetChanges.push(ValidatorSetChangePacketData.decode(reader, reader.uint32()));
          break;
        case 7:
          message.slashDowntimeAck.push(reader.string());
          break;
        case 8:
          message.unbondingOpsIndex.push(VscUnbondingOps.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerState>): ConsumerState {
    const message = createBaseConsumerState();
    message.chainId = object.chainId ?? "";
    message.channelId = object.channelId ?? "";
    message.clientId = object.clientId ?? "";
    message.initialHeight = object.initialHeight !== undefined && object.initialHeight !== null ? BigInt(object.initialHeight.toString()) : BigInt(0);
    message.consumerGenesis = object.consumerGenesis !== undefined && object.consumerGenesis !== null ? GenesisState1.fromPartial(object.consumerGenesis) : undefined;
    message.pendingValsetChanges = object.pendingValsetChanges?.map(e => ValidatorSetChangePacketData.fromPartial(e)) || [];
    message.slashDowntimeAck = object.slashDowntimeAck?.map(e => e) || [];
    message.unbondingOpsIndex = object.unbondingOpsIndex?.map(e => VscUnbondingOps.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ConsumerStateAmino): ConsumerState {
    return {
      chainId: object.chain_id,
      channelId: object.channel_id,
      clientId: object.client_id,
      initialHeight: BigInt(object.initial_height),
      consumerGenesis: object?.consumer_genesis ? GenesisState1.fromAmino(object.consumer_genesis) : undefined,
      pendingValsetChanges: Array.isArray(object?.pending_valset_changes) ? object.pending_valset_changes.map((e: any) => ValidatorSetChangePacketData.fromAmino(e)) : [],
      slashDowntimeAck: Array.isArray(object?.slash_downtime_ack) ? object.slash_downtime_ack.map((e: any) => e) : [],
      unbondingOpsIndex: Array.isArray(object?.unbonding_ops_index) ? object.unbonding_ops_index.map((e: any) => VscUnbondingOps.fromAmino(e)) : []
    };
  },
  toAmino(message: ConsumerState): ConsumerStateAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.channel_id = message.channelId;
    obj.client_id = message.clientId;
    obj.initial_height = message.initialHeight ? message.initialHeight.toString() : undefined;
    obj.consumer_genesis = message.consumerGenesis ? GenesisState1.toAmino(message.consumerGenesis) : undefined;
    if (message.pendingValsetChanges) {
      obj.pending_valset_changes = message.pendingValsetChanges.map(e => e ? ValidatorSetChangePacketData.toAmino(e) : undefined);
    } else {
      obj.pending_valset_changes = [];
    }
    if (message.slashDowntimeAck) {
      obj.slash_downtime_ack = message.slashDowntimeAck.map(e => e);
    } else {
      obj.slash_downtime_ack = [];
    }
    if (message.unbondingOpsIndex) {
      obj.unbonding_ops_index = message.unbondingOpsIndex.map(e => e ? VscUnbondingOps.toAmino(e) : undefined);
    } else {
      obj.unbonding_ops_index = [];
    }
    return obj;
  },
  fromAminoMsg(object: ConsumerStateAminoMsg): ConsumerState {
    return ConsumerState.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerStateProtoMsg): ConsumerState {
    return ConsumerState.decode(message.value);
  },
  toProto(message: ConsumerState): Uint8Array {
    return ConsumerState.encode(message).finish();
  },
  toProtoMsg(message: ConsumerState): ConsumerStateProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerState",
      value: ConsumerState.encode(message).finish()
    };
  }
};
function createBaseValsetUpdateIdToHeight(): ValsetUpdateIdToHeight {
  return {
    valsetUpdateId: BigInt(0),
    height: BigInt(0)
  };
}
export const ValsetUpdateIdToHeight = {
  typeUrl: "/interchain_security.ccv.provider.v1.ValsetUpdateIdToHeight",
  encode(message: ValsetUpdateIdToHeight, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(8).uint64(message.valsetUpdateId);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(16).uint64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ValsetUpdateIdToHeight {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValsetUpdateIdToHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valsetUpdateId = reader.uint64();
          break;
        case 2:
          message.height = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValsetUpdateIdToHeight>): ValsetUpdateIdToHeight {
    const message = createBaseValsetUpdateIdToHeight();
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ValsetUpdateIdToHeightAmino): ValsetUpdateIdToHeight {
    return {
      valsetUpdateId: BigInt(object.valset_update_id),
      height: BigInt(object.height)
    };
  },
  toAmino(message: ValsetUpdateIdToHeight): ValsetUpdateIdToHeightAmino {
    const obj: any = {};
    obj.valset_update_id = message.valsetUpdateId ? message.valsetUpdateId.toString() : undefined;
    obj.height = message.height ? message.height.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ValsetUpdateIdToHeightAminoMsg): ValsetUpdateIdToHeight {
    return ValsetUpdateIdToHeight.fromAmino(object.value);
  },
  fromProtoMsg(message: ValsetUpdateIdToHeightProtoMsg): ValsetUpdateIdToHeight {
    return ValsetUpdateIdToHeight.decode(message.value);
  },
  toProto(message: ValsetUpdateIdToHeight): Uint8Array {
    return ValsetUpdateIdToHeight.encode(message).finish();
  },
  toProtoMsg(message: ValsetUpdateIdToHeight): ValsetUpdateIdToHeightProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ValsetUpdateIdToHeight",
      value: ValsetUpdateIdToHeight.encode(message).finish()
    };
  }
};