import { ValidatorUpdate, ValidatorUpdateSDKType, Validator, ValidatorSDKType } from "../../../tendermint/abci/types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet } from "../../../helpers";
/** ConsumerPacketType indicates interchain security specific packet types. */
export enum ConsumerPacketDataType {
  /** CONSUMER_PACKET_TYPE_UNSPECIFIED - UNSPECIFIED packet type */
  CONSUMER_PACKET_TYPE_UNSPECIFIED = 0,
  /** CONSUMER_PACKET_TYPE_SLASH - Slash packet */
  CONSUMER_PACKET_TYPE_SLASH = 1,
  /** CONSUMER_PACKET_TYPE_VSCM - VSCMatured packet */
  CONSUMER_PACKET_TYPE_VSCM = 2,
  UNRECOGNIZED = -1,
}
export const ConsumerPacketDataTypeSDKType = ConsumerPacketDataType;
export function consumerPacketDataTypeFromJSON(object: any): ConsumerPacketDataType {
  switch (object) {
    case 0:
    case "CONSUMER_PACKET_TYPE_UNSPECIFIED":
      return ConsumerPacketDataType.CONSUMER_PACKET_TYPE_UNSPECIFIED;
    case 1:
    case "CONSUMER_PACKET_TYPE_SLASH":
      return ConsumerPacketDataType.CONSUMER_PACKET_TYPE_SLASH;
    case 2:
    case "CONSUMER_PACKET_TYPE_VSCM":
      return ConsumerPacketDataType.CONSUMER_PACKET_TYPE_VSCM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConsumerPacketDataType.UNRECOGNIZED;
  }
}
export function consumerPacketDataTypeToJSON(object: ConsumerPacketDataType): string {
  switch (object) {
    case ConsumerPacketDataType.CONSUMER_PACKET_TYPE_UNSPECIFIED:
      return "CONSUMER_PACKET_TYPE_UNSPECIFIED";
    case ConsumerPacketDataType.CONSUMER_PACKET_TYPE_SLASH:
      return "CONSUMER_PACKET_TYPE_SLASH";
    case ConsumerPacketDataType.CONSUMER_PACKET_TYPE_VSCM:
      return "CONSUMER_PACKET_TYPE_VSCM";
    case ConsumerPacketDataType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * InfractionType indicates the infraction type a validator commited.
 * Note ccv.InfractionType to maintain compatibility between ICS versions
 * using different versions of the cosmos-sdk and ibc-go modules.
 */
export enum InfractionType {
  /** INFRACTION_TYPE_UNSPECIFIED - UNSPECIFIED defines an empty infraction type. */
  INFRACTION_TYPE_UNSPECIFIED = 0,
  /** INFRACTION_TYPE_DOUBLE_SIGN - DOUBLE_SIGN defines a validator that double-signs a block. */
  INFRACTION_TYPE_DOUBLE_SIGN = 1,
  /** INFRACTION_TYPE_DOWNTIME - DOWNTIME defines a validator that missed signing too many blocks. */
  INFRACTION_TYPE_DOWNTIME = 2,
  UNRECOGNIZED = -1,
}
export const InfractionTypeSDKType = InfractionType;
export function infractionTypeFromJSON(object: any): InfractionType {
  switch (object) {
    case 0:
    case "INFRACTION_TYPE_UNSPECIFIED":
      return InfractionType.INFRACTION_TYPE_UNSPECIFIED;
    case 1:
    case "INFRACTION_TYPE_DOUBLE_SIGN":
      return InfractionType.INFRACTION_TYPE_DOUBLE_SIGN;
    case 2:
    case "INFRACTION_TYPE_DOWNTIME":
      return InfractionType.INFRACTION_TYPE_DOWNTIME;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InfractionType.UNRECOGNIZED;
  }
}
export function infractionTypeToJSON(object: InfractionType): string {
  switch (object) {
    case InfractionType.INFRACTION_TYPE_UNSPECIFIED:
      return "INFRACTION_TYPE_UNSPECIFIED";
    case InfractionType.INFRACTION_TYPE_DOUBLE_SIGN:
      return "INFRACTION_TYPE_DOUBLE_SIGN";
    case InfractionType.INFRACTION_TYPE_DOWNTIME:
      return "INFRACTION_TYPE_DOWNTIME";
    case InfractionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * This packet is sent from provider chain to consumer chain if the validator
 * set for consumer chain changes (due to new bonding/unbonding messages or
 * slashing events) A VSCMatured packet from consumer chain will be sent
 * asynchronously once unbonding period is over, and this will function as
 * `UnbondingOver` message for this packet.
 */
export interface ValidatorSetChangePacketData {
  validatorUpdates: ValidatorUpdate[];
  valsetUpdateId: bigint;
  /**
   * consensus address of consumer chain validators
   * successfully slashed on the provider chain
   */
  slashAcks: string[];
}
/**
 * This packet is sent from provider chain to consumer chain if the validator
 * set for consumer chain changes (due to new bonding/unbonding messages or
 * slashing events) A VSCMatured packet from consumer chain will be sent
 * asynchronously once unbonding period is over, and this will function as
 * `UnbondingOver` message for this packet.
 */
export interface ValidatorSetChangePacketDataSDKType {
  validator_updates: ValidatorUpdateSDKType[];
  valset_update_id: bigint;
  slash_acks: string[];
}
/**
 * This packet is sent from the consumer chain to the provider chain
 * to notify that a VSC packet reached maturity on the consumer chain.
 */
export interface VSCMaturedPacketData {
  /** the id of the VSC packet that reached maturity */
  valsetUpdateId: bigint;
}
/**
 * This packet is sent from the consumer chain to the provider chain
 * to notify that a VSC packet reached maturity on the consumer chain.
 */
export interface VSCMaturedPacketDataSDKType {
  valset_update_id: bigint;
}
/**
 * This packet is sent from the consumer chain to the provider chain
 * to request the slashing of a validator as a result of an infraction
 * committed on the consumer chain.
 */
export interface SlashPacketData {
  validator: Validator;
  /** map to the infraction block height on the provider */
  valsetUpdateId: bigint;
}
/**
 * This packet is sent from the consumer chain to the provider chain
 * to request the slashing of a validator as a result of an infraction
 * committed on the consumer chain.
 */
export interface SlashPacketDataSDKType {
  validator: ValidatorSDKType;
  valset_update_id: bigint;
}
/** ConsumerPacketData contains a consumer packet data and a type tag */
export interface ConsumerPacketData {
  type: ConsumerPacketDataType;
  slashPacketData?: SlashPacketData;
  vscMaturedPacketData?: VSCMaturedPacketData;
}
/** ConsumerPacketData contains a consumer packet data and a type tag */
export interface ConsumerPacketDataSDKType {
  type: ConsumerPacketDataType;
  slashPacketData?: SlashPacketDataSDKType;
  vscMaturedPacketData?: VSCMaturedPacketDataSDKType;
}
/** Note this type is used during IBC handshake methods for both the consumer and provider */
export interface HandshakeMetadata {
  providerFeePoolAddr: string;
  version: string;
}
/** Note this type is used during IBC handshake methods for both the consumer and provider */
export interface HandshakeMetadataSDKType {
  provider_fee_pool_addr: string;
  version: string;
}
/**
 * ConsumerPacketData contains a consumer packet data and a type tag
 * that is compatible with ICS v1 and v2 over the wire. It is not used for internal storage.
 */
export interface ConsumerPacketDataV1 {
  type: ConsumerPacketDataType;
  slashPacketData?: SlashPacketDataV1;
  vscMaturedPacketData?: VSCMaturedPacketData;
}
/**
 * ConsumerPacketData contains a consumer packet data and a type tag
 * that is compatible with ICS v1 and v2 over the wire. It is not used for internal storage.
 */
export interface ConsumerPacketDataV1SDKType {
  type: ConsumerPacketDataType;
  slashPacketData?: SlashPacketDataV1SDKType;
  vscMaturedPacketData?: VSCMaturedPacketDataSDKType;
}
/**
 * This packet is sent from the consumer chain to the provider chain
 * It is backward compatible with the ICS v1 and v2 version of the packet.
 */
export interface SlashPacketDataV1 {
  validator: Validator;
  /** map to the infraction block height on the provider */
  valsetUpdateId: bigint;
  /** tell if the slashing is for a downtime or a double-signing infraction */
  infraction: InfractionType;
}
/**
 * This packet is sent from the consumer chain to the provider chain
 * It is backward compatible with the ICS v1 and v2 version of the packet.
 */
export interface SlashPacketDataV1SDKType {
  validator: ValidatorSDKType;
  valset_update_id: bigint;
  infraction: InfractionType;
}
function createBaseValidatorSetChangePacketData(): ValidatorSetChangePacketData {
  return {
    validatorUpdates: [],
    valsetUpdateId: BigInt(0),
    slashAcks: []
  };
}
export const ValidatorSetChangePacketData = {
  typeUrl: "/interchain_security.ccv.v1.ValidatorSetChangePacketData",
  encode(message: ValidatorSetChangePacketData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.validatorUpdates) {
      ValidatorUpdate.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(16).uint64(message.valsetUpdateId);
    }
    for (const v of message.slashAcks) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ValidatorSetChangePacketData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSetChangePacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorUpdates.push(ValidatorUpdate.decode(reader, reader.uint32()));
          break;
        case 2:
          message.valsetUpdateId = reader.uint64();
          break;
        case 3:
          message.slashAcks.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorSetChangePacketData>): ValidatorSetChangePacketData {
    const message = createBaseValidatorSetChangePacketData();
    message.validatorUpdates = object.validatorUpdates?.map(e => ValidatorUpdate.fromPartial(e)) || [];
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    message.slashAcks = object.slashAcks?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ValidatorSetChangePacketDataAmino): ValidatorSetChangePacketData {
    return {
      validatorUpdates: Array.isArray(object?.validator_updates) ? object.validator_updates.map((e: any) => ValidatorUpdate.fromAmino(e)) : [],
      valsetUpdateId: BigInt(object.valset_update_id),
      slashAcks: Array.isArray(object?.slash_acks) ? object.slash_acks.map((e: any) => e) : []
    };
  },
  toAmino(message: ValidatorSetChangePacketData): ValidatorSetChangePacketDataAmino {
    const obj: any = {};
    if (message.validatorUpdates) {
      obj.validator_updates = message.validatorUpdates.map(e => e ? ValidatorUpdate.toAmino(e) : undefined);
    } else {
      obj.validator_updates = [];
    }
    obj.valset_update_id = message.valsetUpdateId ? message.valsetUpdateId.toString() : undefined;
    if (message.slashAcks) {
      obj.slash_acks = message.slashAcks.map(e => e);
    } else {
      obj.slash_acks = [];
    }
    return obj;
  },
  fromAminoMsg(object: ValidatorSetChangePacketDataAminoMsg): ValidatorSetChangePacketData {
    return ValidatorSetChangePacketData.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorSetChangePacketDataProtoMsg): ValidatorSetChangePacketData {
    return ValidatorSetChangePacketData.decode(message.value);
  },
  toProto(message: ValidatorSetChangePacketData): Uint8Array {
    return ValidatorSetChangePacketData.encode(message).finish();
  },
  toProtoMsg(message: ValidatorSetChangePacketData): ValidatorSetChangePacketDataProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.ValidatorSetChangePacketData",
      value: ValidatorSetChangePacketData.encode(message).finish()
    };
  }
};
function createBaseVSCMaturedPacketData(): VSCMaturedPacketData {
  return {
    valsetUpdateId: BigInt(0)
  };
}
export const VSCMaturedPacketData = {
  typeUrl: "/interchain_security.ccv.v1.VSCMaturedPacketData",
  encode(message: VSCMaturedPacketData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(8).uint64(message.valsetUpdateId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): VSCMaturedPacketData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVSCMaturedPacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valsetUpdateId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<VSCMaturedPacketData>): VSCMaturedPacketData {
    const message = createBaseVSCMaturedPacketData();
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: VSCMaturedPacketDataAmino): VSCMaturedPacketData {
    return {
      valsetUpdateId: BigInt(object.valset_update_id)
    };
  },
  toAmino(message: VSCMaturedPacketData): VSCMaturedPacketDataAmino {
    const obj: any = {};
    obj.valset_update_id = message.valsetUpdateId ? message.valsetUpdateId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: VSCMaturedPacketDataAminoMsg): VSCMaturedPacketData {
    return VSCMaturedPacketData.fromAmino(object.value);
  },
  fromProtoMsg(message: VSCMaturedPacketDataProtoMsg): VSCMaturedPacketData {
    return VSCMaturedPacketData.decode(message.value);
  },
  toProto(message: VSCMaturedPacketData): Uint8Array {
    return VSCMaturedPacketData.encode(message).finish();
  },
  toProtoMsg(message: VSCMaturedPacketData): VSCMaturedPacketDataProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.VSCMaturedPacketData",
      value: VSCMaturedPacketData.encode(message).finish()
    };
  }
};
function createBaseSlashPacketData(): SlashPacketData {
  return {
    validator: Validator.fromPartial({}),
    valsetUpdateId: BigInt(0)
  };
}
export const SlashPacketData = {
  typeUrl: "/interchain_security.ccv.v1.SlashPacketData",
  encode(message: SlashPacketData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(16).uint64(message.valsetUpdateId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SlashPacketData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlashPacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = Validator.decode(reader, reader.uint32());
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
  fromPartial(object: Partial<SlashPacketData>): SlashPacketData {
    const message = createBaseSlashPacketData();
    message.validator = object.validator !== undefined && object.validator !== null ? Validator.fromPartial(object.validator) : undefined;
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SlashPacketDataAmino): SlashPacketData {
    return {
      validator: object?.validator ? Validator.fromAmino(object.validator) : undefined,
      valsetUpdateId: BigInt(object.valset_update_id)
    };
  },
  toAmino(message: SlashPacketData): SlashPacketDataAmino {
    const obj: any = {};
    obj.validator = message.validator ? Validator.toAmino(message.validator) : undefined;
    obj.valset_update_id = message.valsetUpdateId ? message.valsetUpdateId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SlashPacketDataAminoMsg): SlashPacketData {
    return SlashPacketData.fromAmino(object.value);
  },
  fromProtoMsg(message: SlashPacketDataProtoMsg): SlashPacketData {
    return SlashPacketData.decode(message.value);
  },
  toProto(message: SlashPacketData): Uint8Array {
    return SlashPacketData.encode(message).finish();
  },
  toProtoMsg(message: SlashPacketData): SlashPacketDataProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.SlashPacketData",
      value: SlashPacketData.encode(message).finish()
    };
  }
};
function createBaseConsumerPacketData(): ConsumerPacketData {
  return {
    type: 0,
    slashPacketData: undefined,
    vscMaturedPacketData: undefined
  };
}
export const ConsumerPacketData = {
  typeUrl: "/interchain_security.ccv.v1.ConsumerPacketData",
  encode(message: ConsumerPacketData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.slashPacketData !== undefined) {
      SlashPacketData.encode(message.slashPacketData, writer.uint32(18).fork()).ldelim();
    }
    if (message.vscMaturedPacketData !== undefined) {
      VSCMaturedPacketData.encode(message.vscMaturedPacketData, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConsumerPacketData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerPacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = (reader.int32() as any);
          break;
        case 2:
          message.slashPacketData = SlashPacketData.decode(reader, reader.uint32());
          break;
        case 3:
          message.vscMaturedPacketData = VSCMaturedPacketData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerPacketData>): ConsumerPacketData {
    const message = createBaseConsumerPacketData();
    message.type = object.type ?? 0;
    message.slashPacketData = object.slashPacketData !== undefined && object.slashPacketData !== null ? SlashPacketData.fromPartial(object.slashPacketData) : undefined;
    message.vscMaturedPacketData = object.vscMaturedPacketData !== undefined && object.vscMaturedPacketData !== null ? VSCMaturedPacketData.fromPartial(object.vscMaturedPacketData) : undefined;
    return message;
  },
  fromAmino(object: ConsumerPacketDataAmino): ConsumerPacketData {
    return {
      type: isSet(object.type) ? consumerPacketDataTypeFromJSON(object.type) : -1,
      slashPacketData: object?.slashPacketData ? SlashPacketData.fromAmino(object.slashPacketData) : undefined,
      vscMaturedPacketData: object?.vscMaturedPacketData ? VSCMaturedPacketData.fromAmino(object.vscMaturedPacketData) : undefined
    };
  },
  toAmino(message: ConsumerPacketData): ConsumerPacketDataAmino {
    const obj: any = {};
    obj.type = message.type;
    obj.slashPacketData = message.slashPacketData ? SlashPacketData.toAmino(message.slashPacketData) : undefined;
    obj.vscMaturedPacketData = message.vscMaturedPacketData ? VSCMaturedPacketData.toAmino(message.vscMaturedPacketData) : undefined;
    return obj;
  },
  fromAminoMsg(object: ConsumerPacketDataAminoMsg): ConsumerPacketData {
    return ConsumerPacketData.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerPacketDataProtoMsg): ConsumerPacketData {
    return ConsumerPacketData.decode(message.value);
  },
  toProto(message: ConsumerPacketData): Uint8Array {
    return ConsumerPacketData.encode(message).finish();
  },
  toProtoMsg(message: ConsumerPacketData): ConsumerPacketDataProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.ConsumerPacketData",
      value: ConsumerPacketData.encode(message).finish()
    };
  }
};
function createBaseHandshakeMetadata(): HandshakeMetadata {
  return {
    providerFeePoolAddr: "",
    version: ""
  };
}
export const HandshakeMetadata = {
  typeUrl: "/interchain_security.ccv.v1.HandshakeMetadata",
  encode(message: HandshakeMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerFeePoolAddr !== "") {
      writer.uint32(10).string(message.providerFeePoolAddr);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): HandshakeMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHandshakeMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerFeePoolAddr = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HandshakeMetadata>): HandshakeMetadata {
    const message = createBaseHandshakeMetadata();
    message.providerFeePoolAddr = object.providerFeePoolAddr ?? "";
    message.version = object.version ?? "";
    return message;
  },
  fromAmino(object: HandshakeMetadataAmino): HandshakeMetadata {
    return {
      providerFeePoolAddr: object.provider_fee_pool_addr,
      version: object.version
    };
  },
  toAmino(message: HandshakeMetadata): HandshakeMetadataAmino {
    const obj: any = {};
    obj.provider_fee_pool_addr = message.providerFeePoolAddr;
    obj.version = message.version;
    return obj;
  },
  fromAminoMsg(object: HandshakeMetadataAminoMsg): HandshakeMetadata {
    return HandshakeMetadata.fromAmino(object.value);
  },
  fromProtoMsg(message: HandshakeMetadataProtoMsg): HandshakeMetadata {
    return HandshakeMetadata.decode(message.value);
  },
  toProto(message: HandshakeMetadata): Uint8Array {
    return HandshakeMetadata.encode(message).finish();
  },
  toProtoMsg(message: HandshakeMetadata): HandshakeMetadataProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.HandshakeMetadata",
      value: HandshakeMetadata.encode(message).finish()
    };
  }
};
function createBaseConsumerPacketDataV1(): ConsumerPacketDataV1 {
  return {
    type: 0,
    slashPacketData: undefined,
    vscMaturedPacketData: undefined
  };
}
export const ConsumerPacketDataV1 = {
  typeUrl: "/interchain_security.ccv.v1.ConsumerPacketDataV1",
  encode(message: ConsumerPacketDataV1, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.slashPacketData !== undefined) {
      SlashPacketDataV1.encode(message.slashPacketData, writer.uint32(18).fork()).ldelim();
    }
    if (message.vscMaturedPacketData !== undefined) {
      VSCMaturedPacketData.encode(message.vscMaturedPacketData, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ConsumerPacketDataV1 {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerPacketDataV1();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = (reader.int32() as any);
          break;
        case 2:
          message.slashPacketData = SlashPacketDataV1.decode(reader, reader.uint32());
          break;
        case 3:
          message.vscMaturedPacketData = VSCMaturedPacketData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerPacketDataV1>): ConsumerPacketDataV1 {
    const message = createBaseConsumerPacketDataV1();
    message.type = object.type ?? 0;
    message.slashPacketData = object.slashPacketData !== undefined && object.slashPacketData !== null ? SlashPacketDataV1.fromPartial(object.slashPacketData) : undefined;
    message.vscMaturedPacketData = object.vscMaturedPacketData !== undefined && object.vscMaturedPacketData !== null ? VSCMaturedPacketData.fromPartial(object.vscMaturedPacketData) : undefined;
    return message;
  },
  fromAmino(object: ConsumerPacketDataV1Amino): ConsumerPacketDataV1 {
    return {
      type: isSet(object.type) ? consumerPacketDataTypeFromJSON(object.type) : -1,
      slashPacketData: object?.slashPacketData ? SlashPacketDataV1.fromAmino(object.slashPacketData) : undefined,
      vscMaturedPacketData: object?.vscMaturedPacketData ? VSCMaturedPacketData.fromAmino(object.vscMaturedPacketData) : undefined
    };
  },
  toAmino(message: ConsumerPacketDataV1): ConsumerPacketDataV1Amino {
    const obj: any = {};
    obj.type = message.type;
    obj.slashPacketData = message.slashPacketData ? SlashPacketDataV1.toAmino(message.slashPacketData) : undefined;
    obj.vscMaturedPacketData = message.vscMaturedPacketData ? VSCMaturedPacketData.toAmino(message.vscMaturedPacketData) : undefined;
    return obj;
  },
  fromAminoMsg(object: ConsumerPacketDataV1AminoMsg): ConsumerPacketDataV1 {
    return ConsumerPacketDataV1.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerPacketDataV1ProtoMsg): ConsumerPacketDataV1 {
    return ConsumerPacketDataV1.decode(message.value);
  },
  toProto(message: ConsumerPacketDataV1): Uint8Array {
    return ConsumerPacketDataV1.encode(message).finish();
  },
  toProtoMsg(message: ConsumerPacketDataV1): ConsumerPacketDataV1ProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.ConsumerPacketDataV1",
      value: ConsumerPacketDataV1.encode(message).finish()
    };
  }
};
function createBaseSlashPacketDataV1(): SlashPacketDataV1 {
  return {
    validator: Validator.fromPartial({}),
    valsetUpdateId: BigInt(0),
    infraction: 0
  };
}
export const SlashPacketDataV1 = {
  typeUrl: "/interchain_security.ccv.v1.SlashPacketDataV1",
  encode(message: SlashPacketDataV1, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(16).uint64(message.valsetUpdateId);
    }
    if (message.infraction !== 0) {
      writer.uint32(24).int32(message.infraction);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SlashPacketDataV1 {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlashPacketDataV1();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        case 2:
          message.valsetUpdateId = reader.uint64();
          break;
        case 3:
          message.infraction = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SlashPacketDataV1>): SlashPacketDataV1 {
    const message = createBaseSlashPacketDataV1();
    message.validator = object.validator !== undefined && object.validator !== null ? Validator.fromPartial(object.validator) : undefined;
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    message.infraction = object.infraction ?? 0;
    return message;
  },
  fromAmino(object: SlashPacketDataV1Amino): SlashPacketDataV1 {
    return {
      validator: object?.validator ? Validator.fromAmino(object.validator) : undefined,
      valsetUpdateId: BigInt(object.valset_update_id),
      infraction: isSet(object.infraction) ? infractionTypeFromJSON(object.infraction) : -1
    };
  },
  toAmino(message: SlashPacketDataV1): SlashPacketDataV1Amino {
    const obj: any = {};
    obj.validator = message.validator ? Validator.toAmino(message.validator) : undefined;
    obj.valset_update_id = message.valsetUpdateId ? message.valsetUpdateId.toString() : undefined;
    obj.infraction = message.infraction;
    return obj;
  },
  fromAminoMsg(object: SlashPacketDataV1AminoMsg): SlashPacketDataV1 {
    return SlashPacketDataV1.fromAmino(object.value);
  },
  fromProtoMsg(message: SlashPacketDataV1ProtoMsg): SlashPacketDataV1 {
    return SlashPacketDataV1.decode(message.value);
  },
  toProto(message: SlashPacketDataV1): Uint8Array {
    return SlashPacketDataV1.encode(message).finish();
  },
  toProtoMsg(message: SlashPacketDataV1): SlashPacketDataV1ProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.SlashPacketDataV1",
      value: SlashPacketDataV1.encode(message).finish()
    };
  }
};