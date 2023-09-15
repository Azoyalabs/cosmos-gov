import { GenesisState, GenesisStateSDKType } from "../../v1/shared_consumer";
import { ConsumerAdditionProposals, ConsumerAdditionProposalsSDKType, ConsumerRemovalProposals, ConsumerRemovalProposalsSDKType, GlobalSlashEntry, GlobalSlashEntrySDKType } from "./provider";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { SlashPacketData, SlashPacketDataSDKType, VSCMaturedPacketData, VSCMaturedPacketDataSDKType } from "../../v1/wire";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
export interface QueryConsumerGenesisRequest {
  chainId: string;
}
export interface QueryConsumerGenesisRequestSDKType {
  chain_id: string;
}
export interface QueryConsumerGenesisResponse {
  genesisState: GenesisState;
}
export interface QueryConsumerGenesisResponseSDKType {
  genesis_state: GenesisStateSDKType;
}
export interface QueryConsumerChainsRequest {}
export interface QueryConsumerChainsRequestSDKType {}
export interface QueryConsumerChainsResponse {
  chains: Chain[];
}
export interface QueryConsumerChainsResponseSDKType {
  chains: ChainSDKType[];
}
export interface QueryConsumerChainStartProposalsRequest {}
export interface QueryConsumerChainStartProposalsRequestSDKType {}
export interface QueryConsumerChainStartProposalsResponse {
  proposals: ConsumerAdditionProposals;
}
export interface QueryConsumerChainStartProposalsResponseSDKType {
  proposals: ConsumerAdditionProposalsSDKType;
}
export interface QueryConsumerChainStopProposalsRequest {}
export interface QueryConsumerChainStopProposalsRequestSDKType {}
export interface QueryConsumerChainStopProposalsResponse {
  proposals: ConsumerRemovalProposals;
}
export interface QueryConsumerChainStopProposalsResponseSDKType {
  proposals: ConsumerRemovalProposalsSDKType;
}
export interface Chain {
  chainId: string;
  clientId: string;
}
export interface ChainSDKType {
  chain_id: string;
  client_id: string;
}
export interface QueryValidatorConsumerAddrRequest {
  /** The id of the consumer chain */
  chainId: string;
  /** The consensus address of the validator on the provider chain */
  providerAddress: string;
}
export interface QueryValidatorConsumerAddrRequestSDKType {
  chain_id: string;
  provider_address: string;
}
export interface QueryValidatorConsumerAddrResponse {
  /** The address of the validator on the consumer chain */
  consumerAddress: string;
}
export interface QueryValidatorConsumerAddrResponseSDKType {
  consumer_address: string;
}
export interface QueryValidatorProviderAddrRequest {
  /** The id of the provider chain */
  chainId: string;
  /** The consensus address of the validator on the consumer chain */
  consumerAddress: string;
}
export interface QueryValidatorProviderAddrRequestSDKType {
  chain_id: string;
  consumer_address: string;
}
export interface QueryValidatorProviderAddrResponse {
  /** The address of the validator on the provider chain */
  providerAddress: string;
}
export interface QueryValidatorProviderAddrResponseSDKType {
  provider_address: string;
}
export interface QueryThrottleStateRequest {}
export interface QueryThrottleStateRequestSDKType {}
export interface QueryThrottleStateResponse {
  /** current slash_meter state */
  slashMeter: bigint;
  /**
   * allowance of voting power units (int) that the slash meter is given per
   * replenish period this also serves as the max value for the meter.
   */
  slashMeterAllowance: bigint;
  /**
   * next time the slash meter could potentially be replenished, iff it's not
   * full
   */
  nextReplenishCandidate: Date;
  /** data relevant to currently throttled slash packets */
  packets: ThrottledSlashPacket[];
}
export interface QueryThrottleStateResponseSDKType {
  slash_meter: bigint;
  slash_meter_allowance: bigint;
  next_replenish_candidate: Date;
  packets: ThrottledSlashPacketSDKType[];
}
export interface QueryThrottledConsumerPacketDataRequest {
  chainId: string;
}
export interface QueryThrottledConsumerPacketDataRequestSDKType {
  chain_id: string;
}
export interface QueryThrottledConsumerPacketDataResponse {
  chainId: string;
  size: bigint;
  packetDataInstances: ThrottledPacketDataWrapper[];
}
export interface QueryThrottledConsumerPacketDataResponseSDKType {
  chain_id: string;
  size: bigint;
  packetDataInstances: ThrottledPacketDataWrapperSDKType[];
}
/**
 * A query wrapper type for the global entry and data relevant to a throttled
 * slash packet.
 */
export interface ThrottledSlashPacket {
  globalEntry: GlobalSlashEntry;
  data: SlashPacketData;
}
/**
 * A query wrapper type for the global entry and data relevant to a throttled
 * slash packet.
 */
export interface ThrottledSlashPacketSDKType {
  global_entry: GlobalSlashEntrySDKType;
  data: SlashPacketDataSDKType;
}
/**
 * ThrottledPacketDataWrapper contains either SlashPacketData or
 * VSCMaturedPacketData
 */
export interface ThrottledPacketDataWrapper {
  slashPacket?: SlashPacketData;
  vscMaturedPacket?: VSCMaturedPacketData;
}
/**
 * ThrottledPacketDataWrapper contains either SlashPacketData or
 * VSCMaturedPacketData
 */
export interface ThrottledPacketDataWrapperSDKType {
  slash_packet?: SlashPacketDataSDKType;
  vsc_matured_packet?: VSCMaturedPacketDataSDKType;
}
export interface QueryRegisteredConsumerRewardDenomsRequest {}
export interface QueryRegisteredConsumerRewardDenomsRequestSDKType {}
export interface QueryRegisteredConsumerRewardDenomsResponse {
  denoms: string[];
}
export interface QueryRegisteredConsumerRewardDenomsResponseSDKType {
  denoms: string[];
}
function createBaseQueryConsumerGenesisRequest(): QueryConsumerGenesisRequest {
  return {
    chainId: ""
  };
}
export const QueryConsumerGenesisRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisRequest",
  encode(message: QueryConsumerGenesisRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsumerGenesisRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerGenesisRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerGenesisRequest>): QueryConsumerGenesisRequest {
    const message = createBaseQueryConsumerGenesisRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryConsumerGenesisRequestAmino): QueryConsumerGenesisRequest {
    return {
      chainId: object.chain_id
    };
  },
  toAmino(message: QueryConsumerGenesisRequest): QueryConsumerGenesisRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerGenesisRequestAminoMsg): QueryConsumerGenesisRequest {
    return QueryConsumerGenesisRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerGenesisRequestProtoMsg): QueryConsumerGenesisRequest {
    return QueryConsumerGenesisRequest.decode(message.value);
  },
  toProto(message: QueryConsumerGenesisRequest): Uint8Array {
    return QueryConsumerGenesisRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerGenesisRequest): QueryConsumerGenesisRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisRequest",
      value: QueryConsumerGenesisRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerGenesisResponse(): QueryConsumerGenesisResponse {
  return {
    genesisState: GenesisState.fromPartial({})
  };
}
export const QueryConsumerGenesisResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisResponse",
  encode(message: QueryConsumerGenesisResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.genesisState !== undefined) {
      GenesisState.encode(message.genesisState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsumerGenesisResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerGenesisResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.genesisState = GenesisState.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerGenesisResponse>): QueryConsumerGenesisResponse {
    const message = createBaseQueryConsumerGenesisResponse();
    message.genesisState = object.genesisState !== undefined && object.genesisState !== null ? GenesisState.fromPartial(object.genesisState) : undefined;
    return message;
  },
  fromAmino(object: QueryConsumerGenesisResponseAmino): QueryConsumerGenesisResponse {
    return {
      genesisState: object?.genesis_state ? GenesisState.fromAmino(object.genesis_state) : undefined
    };
  },
  toAmino(message: QueryConsumerGenesisResponse): QueryConsumerGenesisResponseAmino {
    const obj: any = {};
    obj.genesis_state = message.genesisState ? GenesisState.toAmino(message.genesisState) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerGenesisResponseAminoMsg): QueryConsumerGenesisResponse {
    return QueryConsumerGenesisResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerGenesisResponseProtoMsg): QueryConsumerGenesisResponse {
    return QueryConsumerGenesisResponse.decode(message.value);
  },
  toProto(message: QueryConsumerGenesisResponse): Uint8Array {
    return QueryConsumerGenesisResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerGenesisResponse): QueryConsumerGenesisResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisResponse",
      value: QueryConsumerGenesisResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainsRequest(): QueryConsumerChainsRequest {
  return {};
}
export const QueryConsumerChainsRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsRequest",
  encode(_: QueryConsumerChainsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsumerChainsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryConsumerChainsRequest>): QueryConsumerChainsRequest {
    const message = createBaseQueryConsumerChainsRequest();
    return message;
  },
  fromAmino(_: QueryConsumerChainsRequestAmino): QueryConsumerChainsRequest {
    return {};
  },
  toAmino(_: QueryConsumerChainsRequest): QueryConsumerChainsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainsRequestAminoMsg): QueryConsumerChainsRequest {
    return QueryConsumerChainsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainsRequestProtoMsg): QueryConsumerChainsRequest {
    return QueryConsumerChainsRequest.decode(message.value);
  },
  toProto(message: QueryConsumerChainsRequest): Uint8Array {
    return QueryConsumerChainsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainsRequest): QueryConsumerChainsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsRequest",
      value: QueryConsumerChainsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainsResponse(): QueryConsumerChainsResponse {
  return {
    chains: []
  };
}
export const QueryConsumerChainsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsResponse",
  encode(message: QueryConsumerChainsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.chains) {
      Chain.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsumerChainsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chains.push(Chain.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerChainsResponse>): QueryConsumerChainsResponse {
    const message = createBaseQueryConsumerChainsResponse();
    message.chains = object.chains?.map(e => Chain.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryConsumerChainsResponseAmino): QueryConsumerChainsResponse {
    return {
      chains: Array.isArray(object?.chains) ? object.chains.map((e: any) => Chain.fromAmino(e)) : []
    };
  },
  toAmino(message: QueryConsumerChainsResponse): QueryConsumerChainsResponseAmino {
    const obj: any = {};
    if (message.chains) {
      obj.chains = message.chains.map(e => e ? Chain.toAmino(e) : undefined);
    } else {
      obj.chains = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainsResponseAminoMsg): QueryConsumerChainsResponse {
    return QueryConsumerChainsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainsResponseProtoMsg): QueryConsumerChainsResponse {
    return QueryConsumerChainsResponse.decode(message.value);
  },
  toProto(message: QueryConsumerChainsResponse): Uint8Array {
    return QueryConsumerChainsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainsResponse): QueryConsumerChainsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsResponse",
      value: QueryConsumerChainsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainStartProposalsRequest(): QueryConsumerChainStartProposalsRequest {
  return {};
}
export const QueryConsumerChainStartProposalsRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainStartProposalsRequest",
  encode(_: QueryConsumerChainStartProposalsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsumerChainStartProposalsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainStartProposalsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryConsumerChainStartProposalsRequest>): QueryConsumerChainStartProposalsRequest {
    const message = createBaseQueryConsumerChainStartProposalsRequest();
    return message;
  },
  fromAmino(_: QueryConsumerChainStartProposalsRequestAmino): QueryConsumerChainStartProposalsRequest {
    return {};
  },
  toAmino(_: QueryConsumerChainStartProposalsRequest): QueryConsumerChainStartProposalsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainStartProposalsRequestAminoMsg): QueryConsumerChainStartProposalsRequest {
    return QueryConsumerChainStartProposalsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainStartProposalsRequestProtoMsg): QueryConsumerChainStartProposalsRequest {
    return QueryConsumerChainStartProposalsRequest.decode(message.value);
  },
  toProto(message: QueryConsumerChainStartProposalsRequest): Uint8Array {
    return QueryConsumerChainStartProposalsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainStartProposalsRequest): QueryConsumerChainStartProposalsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainStartProposalsRequest",
      value: QueryConsumerChainStartProposalsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainStartProposalsResponse(): QueryConsumerChainStartProposalsResponse {
  return {
    proposals: ConsumerAdditionProposals.fromPartial({})
  };
}
export const QueryConsumerChainStartProposalsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainStartProposalsResponse",
  encode(message: QueryConsumerChainStartProposalsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposals !== undefined) {
      ConsumerAdditionProposals.encode(message.proposals, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsumerChainStartProposalsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainStartProposalsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals = ConsumerAdditionProposals.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerChainStartProposalsResponse>): QueryConsumerChainStartProposalsResponse {
    const message = createBaseQueryConsumerChainStartProposalsResponse();
    message.proposals = object.proposals !== undefined && object.proposals !== null ? ConsumerAdditionProposals.fromPartial(object.proposals) : undefined;
    return message;
  },
  fromAmino(object: QueryConsumerChainStartProposalsResponseAmino): QueryConsumerChainStartProposalsResponse {
    return {
      proposals: object?.proposals ? ConsumerAdditionProposals.fromAmino(object.proposals) : undefined
    };
  },
  toAmino(message: QueryConsumerChainStartProposalsResponse): QueryConsumerChainStartProposalsResponseAmino {
    const obj: any = {};
    obj.proposals = message.proposals ? ConsumerAdditionProposals.toAmino(message.proposals) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainStartProposalsResponseAminoMsg): QueryConsumerChainStartProposalsResponse {
    return QueryConsumerChainStartProposalsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainStartProposalsResponseProtoMsg): QueryConsumerChainStartProposalsResponse {
    return QueryConsumerChainStartProposalsResponse.decode(message.value);
  },
  toProto(message: QueryConsumerChainStartProposalsResponse): Uint8Array {
    return QueryConsumerChainStartProposalsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainStartProposalsResponse): QueryConsumerChainStartProposalsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainStartProposalsResponse",
      value: QueryConsumerChainStartProposalsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainStopProposalsRequest(): QueryConsumerChainStopProposalsRequest {
  return {};
}
export const QueryConsumerChainStopProposalsRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainStopProposalsRequest",
  encode(_: QueryConsumerChainStopProposalsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsumerChainStopProposalsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainStopProposalsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryConsumerChainStopProposalsRequest>): QueryConsumerChainStopProposalsRequest {
    const message = createBaseQueryConsumerChainStopProposalsRequest();
    return message;
  },
  fromAmino(_: QueryConsumerChainStopProposalsRequestAmino): QueryConsumerChainStopProposalsRequest {
    return {};
  },
  toAmino(_: QueryConsumerChainStopProposalsRequest): QueryConsumerChainStopProposalsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainStopProposalsRequestAminoMsg): QueryConsumerChainStopProposalsRequest {
    return QueryConsumerChainStopProposalsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainStopProposalsRequestProtoMsg): QueryConsumerChainStopProposalsRequest {
    return QueryConsumerChainStopProposalsRequest.decode(message.value);
  },
  toProto(message: QueryConsumerChainStopProposalsRequest): Uint8Array {
    return QueryConsumerChainStopProposalsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainStopProposalsRequest): QueryConsumerChainStopProposalsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainStopProposalsRequest",
      value: QueryConsumerChainStopProposalsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainStopProposalsResponse(): QueryConsumerChainStopProposalsResponse {
  return {
    proposals: ConsumerRemovalProposals.fromPartial({})
  };
}
export const QueryConsumerChainStopProposalsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainStopProposalsResponse",
  encode(message: QueryConsumerChainStopProposalsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposals !== undefined) {
      ConsumerRemovalProposals.encode(message.proposals, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsumerChainStopProposalsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainStopProposalsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals = ConsumerRemovalProposals.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerChainStopProposalsResponse>): QueryConsumerChainStopProposalsResponse {
    const message = createBaseQueryConsumerChainStopProposalsResponse();
    message.proposals = object.proposals !== undefined && object.proposals !== null ? ConsumerRemovalProposals.fromPartial(object.proposals) : undefined;
    return message;
  },
  fromAmino(object: QueryConsumerChainStopProposalsResponseAmino): QueryConsumerChainStopProposalsResponse {
    return {
      proposals: object?.proposals ? ConsumerRemovalProposals.fromAmino(object.proposals) : undefined
    };
  },
  toAmino(message: QueryConsumerChainStopProposalsResponse): QueryConsumerChainStopProposalsResponseAmino {
    const obj: any = {};
    obj.proposals = message.proposals ? ConsumerRemovalProposals.toAmino(message.proposals) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainStopProposalsResponseAminoMsg): QueryConsumerChainStopProposalsResponse {
    return QueryConsumerChainStopProposalsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainStopProposalsResponseProtoMsg): QueryConsumerChainStopProposalsResponse {
    return QueryConsumerChainStopProposalsResponse.decode(message.value);
  },
  toProto(message: QueryConsumerChainStopProposalsResponse): Uint8Array {
    return QueryConsumerChainStopProposalsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainStopProposalsResponse): QueryConsumerChainStopProposalsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainStopProposalsResponse",
      value: QueryConsumerChainStopProposalsResponse.encode(message).finish()
    };
  }
};
function createBaseChain(): Chain {
  return {
    chainId: "",
    clientId: ""
  };
}
export const Chain = {
  typeUrl: "/interchain_security.ccv.provider.v1.Chain",
  encode(message: Chain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.clientId !== "") {
      writer.uint32(18).string(message.clientId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Chain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.clientId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Chain>): Chain {
    const message = createBaseChain();
    message.chainId = object.chainId ?? "";
    message.clientId = object.clientId ?? "";
    return message;
  },
  fromAmino(object: ChainAmino): Chain {
    return {
      chainId: object.chain_id,
      clientId: object.client_id
    };
  },
  toAmino(message: Chain): ChainAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.client_id = message.clientId;
    return obj;
  },
  fromAminoMsg(object: ChainAminoMsg): Chain {
    return Chain.fromAmino(object.value);
  },
  fromProtoMsg(message: ChainProtoMsg): Chain {
    return Chain.decode(message.value);
  },
  toProto(message: Chain): Uint8Array {
    return Chain.encode(message).finish();
  },
  toProtoMsg(message: Chain): ChainProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.Chain",
      value: Chain.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorConsumerAddrRequest(): QueryValidatorConsumerAddrRequest {
  return {
    chainId: "",
    providerAddress: ""
  };
}
export const QueryValidatorConsumerAddrRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrRequest",
  encode(message: QueryValidatorConsumerAddrRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddress !== "") {
      writer.uint32(18).string(message.providerAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValidatorConsumerAddrRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorConsumerAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorConsumerAddrRequest>): QueryValidatorConsumerAddrRequest {
    const message = createBaseQueryValidatorConsumerAddrRequest();
    message.chainId = object.chainId ?? "";
    message.providerAddress = object.providerAddress ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorConsumerAddrRequestAmino): QueryValidatorConsumerAddrRequest {
    return {
      chainId: object.chain_id,
      providerAddress: object.provider_address
    };
  },
  toAmino(message: QueryValidatorConsumerAddrRequest): QueryValidatorConsumerAddrRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.provider_address = message.providerAddress;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorConsumerAddrRequestAminoMsg): QueryValidatorConsumerAddrRequest {
    return QueryValidatorConsumerAddrRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorConsumerAddrRequestProtoMsg): QueryValidatorConsumerAddrRequest {
    return QueryValidatorConsumerAddrRequest.decode(message.value);
  },
  toProto(message: QueryValidatorConsumerAddrRequest): Uint8Array {
    return QueryValidatorConsumerAddrRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorConsumerAddrRequest): QueryValidatorConsumerAddrRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrRequest",
      value: QueryValidatorConsumerAddrRequest.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorConsumerAddrResponse(): QueryValidatorConsumerAddrResponse {
  return {
    consumerAddress: ""
  };
}
export const QueryValidatorConsumerAddrResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrResponse",
  encode(message: QueryValidatorConsumerAddrResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerAddress !== "") {
      writer.uint32(10).string(message.consumerAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValidatorConsumerAddrResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorConsumerAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorConsumerAddrResponse>): QueryValidatorConsumerAddrResponse {
    const message = createBaseQueryValidatorConsumerAddrResponse();
    message.consumerAddress = object.consumerAddress ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorConsumerAddrResponseAmino): QueryValidatorConsumerAddrResponse {
    return {
      consumerAddress: object.consumer_address
    };
  },
  toAmino(message: QueryValidatorConsumerAddrResponse): QueryValidatorConsumerAddrResponseAmino {
    const obj: any = {};
    obj.consumer_address = message.consumerAddress;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorConsumerAddrResponseAminoMsg): QueryValidatorConsumerAddrResponse {
    return QueryValidatorConsumerAddrResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorConsumerAddrResponseProtoMsg): QueryValidatorConsumerAddrResponse {
    return QueryValidatorConsumerAddrResponse.decode(message.value);
  },
  toProto(message: QueryValidatorConsumerAddrResponse): Uint8Array {
    return QueryValidatorConsumerAddrResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorConsumerAddrResponse): QueryValidatorConsumerAddrResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrResponse",
      value: QueryValidatorConsumerAddrResponse.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorProviderAddrRequest(): QueryValidatorProviderAddrRequest {
  return {
    chainId: "",
    consumerAddress: ""
  };
}
export const QueryValidatorProviderAddrRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrRequest",
  encode(message: QueryValidatorProviderAddrRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.consumerAddress !== "") {
      writer.uint32(18).string(message.consumerAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValidatorProviderAddrRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorProviderAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.consumerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorProviderAddrRequest>): QueryValidatorProviderAddrRequest {
    const message = createBaseQueryValidatorProviderAddrRequest();
    message.chainId = object.chainId ?? "";
    message.consumerAddress = object.consumerAddress ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorProviderAddrRequestAmino): QueryValidatorProviderAddrRequest {
    return {
      chainId: object.chain_id,
      consumerAddress: object.consumer_address
    };
  },
  toAmino(message: QueryValidatorProviderAddrRequest): QueryValidatorProviderAddrRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.consumer_address = message.consumerAddress;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorProviderAddrRequestAminoMsg): QueryValidatorProviderAddrRequest {
    return QueryValidatorProviderAddrRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorProviderAddrRequestProtoMsg): QueryValidatorProviderAddrRequest {
    return QueryValidatorProviderAddrRequest.decode(message.value);
  },
  toProto(message: QueryValidatorProviderAddrRequest): Uint8Array {
    return QueryValidatorProviderAddrRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorProviderAddrRequest): QueryValidatorProviderAddrRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrRequest",
      value: QueryValidatorProviderAddrRequest.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorProviderAddrResponse(): QueryValidatorProviderAddrResponse {
  return {
    providerAddress: ""
  };
}
export const QueryValidatorProviderAddrResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrResponse",
  encode(message: QueryValidatorProviderAddrResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerAddress !== "") {
      writer.uint32(10).string(message.providerAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryValidatorProviderAddrResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorProviderAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorProviderAddrResponse>): QueryValidatorProviderAddrResponse {
    const message = createBaseQueryValidatorProviderAddrResponse();
    message.providerAddress = object.providerAddress ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorProviderAddrResponseAmino): QueryValidatorProviderAddrResponse {
    return {
      providerAddress: object.provider_address
    };
  },
  toAmino(message: QueryValidatorProviderAddrResponse): QueryValidatorProviderAddrResponseAmino {
    const obj: any = {};
    obj.provider_address = message.providerAddress;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorProviderAddrResponseAminoMsg): QueryValidatorProviderAddrResponse {
    return QueryValidatorProviderAddrResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorProviderAddrResponseProtoMsg): QueryValidatorProviderAddrResponse {
    return QueryValidatorProviderAddrResponse.decode(message.value);
  },
  toProto(message: QueryValidatorProviderAddrResponse): Uint8Array {
    return QueryValidatorProviderAddrResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorProviderAddrResponse): QueryValidatorProviderAddrResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrResponse",
      value: QueryValidatorProviderAddrResponse.encode(message).finish()
    };
  }
};
function createBaseQueryThrottleStateRequest(): QueryThrottleStateRequest {
  return {};
}
export const QueryThrottleStateRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateRequest",
  encode(_: QueryThrottleStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryThrottleStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottleStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryThrottleStateRequest>): QueryThrottleStateRequest {
    const message = createBaseQueryThrottleStateRequest();
    return message;
  },
  fromAmino(_: QueryThrottleStateRequestAmino): QueryThrottleStateRequest {
    return {};
  },
  toAmino(_: QueryThrottleStateRequest): QueryThrottleStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryThrottleStateRequestAminoMsg): QueryThrottleStateRequest {
    return QueryThrottleStateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryThrottleStateRequestProtoMsg): QueryThrottleStateRequest {
    return QueryThrottleStateRequest.decode(message.value);
  },
  toProto(message: QueryThrottleStateRequest): Uint8Array {
    return QueryThrottleStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryThrottleStateRequest): QueryThrottleStateRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateRequest",
      value: QueryThrottleStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryThrottleStateResponse(): QueryThrottleStateResponse {
  return {
    slashMeter: BigInt(0),
    slashMeterAllowance: BigInt(0),
    nextReplenishCandidate: new Date(),
    packets: []
  };
}
export const QueryThrottleStateResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateResponse",
  encode(message: QueryThrottleStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.slashMeter !== BigInt(0)) {
      writer.uint32(8).int64(message.slashMeter);
    }
    if (message.slashMeterAllowance !== BigInt(0)) {
      writer.uint32(16).int64(message.slashMeterAllowance);
    }
    if (message.nextReplenishCandidate !== undefined) {
      Timestamp.encode(toTimestamp(message.nextReplenishCandidate), writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.packets) {
      ThrottledSlashPacket.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryThrottleStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottleStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.slashMeter = reader.int64();
          break;
        case 2:
          message.slashMeterAllowance = reader.int64();
          break;
        case 3:
          message.nextReplenishCandidate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.packets.push(ThrottledSlashPacket.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryThrottleStateResponse>): QueryThrottleStateResponse {
    const message = createBaseQueryThrottleStateResponse();
    message.slashMeter = object.slashMeter !== undefined && object.slashMeter !== null ? BigInt(object.slashMeter.toString()) : BigInt(0);
    message.slashMeterAllowance = object.slashMeterAllowance !== undefined && object.slashMeterAllowance !== null ? BigInt(object.slashMeterAllowance.toString()) : BigInt(0);
    message.nextReplenishCandidate = object.nextReplenishCandidate ?? undefined;
    message.packets = object.packets?.map(e => ThrottledSlashPacket.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryThrottleStateResponseAmino): QueryThrottleStateResponse {
    return {
      slashMeter: BigInt(object.slash_meter),
      slashMeterAllowance: BigInt(object.slash_meter_allowance),
      nextReplenishCandidate: object.next_replenish_candidate,
      packets: Array.isArray(object?.packets) ? object.packets.map((e: any) => ThrottledSlashPacket.fromAmino(e)) : []
    };
  },
  toAmino(message: QueryThrottleStateResponse): QueryThrottleStateResponseAmino {
    const obj: any = {};
    obj.slash_meter = message.slashMeter ? message.slashMeter.toString() : undefined;
    obj.slash_meter_allowance = message.slashMeterAllowance ? message.slashMeterAllowance.toString() : undefined;
    obj.next_replenish_candidate = message.nextReplenishCandidate;
    if (message.packets) {
      obj.packets = message.packets.map(e => e ? ThrottledSlashPacket.toAmino(e) : undefined);
    } else {
      obj.packets = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryThrottleStateResponseAminoMsg): QueryThrottleStateResponse {
    return QueryThrottleStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryThrottleStateResponseProtoMsg): QueryThrottleStateResponse {
    return QueryThrottleStateResponse.decode(message.value);
  },
  toProto(message: QueryThrottleStateResponse): Uint8Array {
    return QueryThrottleStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryThrottleStateResponse): QueryThrottleStateResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateResponse",
      value: QueryThrottleStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryThrottledConsumerPacketDataRequest(): QueryThrottledConsumerPacketDataRequest {
  return {
    chainId: ""
  };
}
export const QueryThrottledConsumerPacketDataRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottledConsumerPacketDataRequest",
  encode(message: QueryThrottledConsumerPacketDataRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryThrottledConsumerPacketDataRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottledConsumerPacketDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryThrottledConsumerPacketDataRequest>): QueryThrottledConsumerPacketDataRequest {
    const message = createBaseQueryThrottledConsumerPacketDataRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryThrottledConsumerPacketDataRequestAmino): QueryThrottledConsumerPacketDataRequest {
    return {
      chainId: object.chain_id
    };
  },
  toAmino(message: QueryThrottledConsumerPacketDataRequest): QueryThrottledConsumerPacketDataRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryThrottledConsumerPacketDataRequestAminoMsg): QueryThrottledConsumerPacketDataRequest {
    return QueryThrottledConsumerPacketDataRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryThrottledConsumerPacketDataRequestProtoMsg): QueryThrottledConsumerPacketDataRequest {
    return QueryThrottledConsumerPacketDataRequest.decode(message.value);
  },
  toProto(message: QueryThrottledConsumerPacketDataRequest): Uint8Array {
    return QueryThrottledConsumerPacketDataRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryThrottledConsumerPacketDataRequest): QueryThrottledConsumerPacketDataRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottledConsumerPacketDataRequest",
      value: QueryThrottledConsumerPacketDataRequest.encode(message).finish()
    };
  }
};
function createBaseQueryThrottledConsumerPacketDataResponse(): QueryThrottledConsumerPacketDataResponse {
  return {
    chainId: "",
    size: BigInt(0),
    packetDataInstances: []
  };
}
export const QueryThrottledConsumerPacketDataResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottledConsumerPacketDataResponse",
  encode(message: QueryThrottledConsumerPacketDataResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.size !== BigInt(0)) {
      writer.uint32(16).uint64(message.size);
    }
    for (const v of message.packetDataInstances) {
      ThrottledPacketDataWrapper.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryThrottledConsumerPacketDataResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottledConsumerPacketDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.size = reader.uint64();
          break;
        case 3:
          message.packetDataInstances.push(ThrottledPacketDataWrapper.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryThrottledConsumerPacketDataResponse>): QueryThrottledConsumerPacketDataResponse {
    const message = createBaseQueryThrottledConsumerPacketDataResponse();
    message.chainId = object.chainId ?? "";
    message.size = object.size !== undefined && object.size !== null ? BigInt(object.size.toString()) : BigInt(0);
    message.packetDataInstances = object.packetDataInstances?.map(e => ThrottledPacketDataWrapper.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryThrottledConsumerPacketDataResponseAmino): QueryThrottledConsumerPacketDataResponse {
    return {
      chainId: object.chain_id,
      size: BigInt(object.size),
      packetDataInstances: Array.isArray(object?.packetDataInstances) ? object.packetDataInstances.map((e: any) => ThrottledPacketDataWrapper.fromAmino(e)) : []
    };
  },
  toAmino(message: QueryThrottledConsumerPacketDataResponse): QueryThrottledConsumerPacketDataResponseAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.size = message.size ? message.size.toString() : undefined;
    if (message.packetDataInstances) {
      obj.packetDataInstances = message.packetDataInstances.map(e => e ? ThrottledPacketDataWrapper.toAmino(e) : undefined);
    } else {
      obj.packetDataInstances = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryThrottledConsumerPacketDataResponseAminoMsg): QueryThrottledConsumerPacketDataResponse {
    return QueryThrottledConsumerPacketDataResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryThrottledConsumerPacketDataResponseProtoMsg): QueryThrottledConsumerPacketDataResponse {
    return QueryThrottledConsumerPacketDataResponse.decode(message.value);
  },
  toProto(message: QueryThrottledConsumerPacketDataResponse): Uint8Array {
    return QueryThrottledConsumerPacketDataResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryThrottledConsumerPacketDataResponse): QueryThrottledConsumerPacketDataResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottledConsumerPacketDataResponse",
      value: QueryThrottledConsumerPacketDataResponse.encode(message).finish()
    };
  }
};
function createBaseThrottledSlashPacket(): ThrottledSlashPacket {
  return {
    globalEntry: GlobalSlashEntry.fromPartial({}),
    data: SlashPacketData.fromPartial({})
  };
}
export const ThrottledSlashPacket = {
  typeUrl: "/interchain_security.ccv.provider.v1.ThrottledSlashPacket",
  encode(message: ThrottledSlashPacket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.globalEntry !== undefined) {
      GlobalSlashEntry.encode(message.globalEntry, writer.uint32(10).fork()).ldelim();
    }
    if (message.data !== undefined) {
      SlashPacketData.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ThrottledSlashPacket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseThrottledSlashPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.globalEntry = GlobalSlashEntry.decode(reader, reader.uint32());
          break;
        case 2:
          message.data = SlashPacketData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ThrottledSlashPacket>): ThrottledSlashPacket {
    const message = createBaseThrottledSlashPacket();
    message.globalEntry = object.globalEntry !== undefined && object.globalEntry !== null ? GlobalSlashEntry.fromPartial(object.globalEntry) : undefined;
    message.data = object.data !== undefined && object.data !== null ? SlashPacketData.fromPartial(object.data) : undefined;
    return message;
  },
  fromAmino(object: ThrottledSlashPacketAmino): ThrottledSlashPacket {
    return {
      globalEntry: object?.global_entry ? GlobalSlashEntry.fromAmino(object.global_entry) : undefined,
      data: object?.data ? SlashPacketData.fromAmino(object.data) : undefined
    };
  },
  toAmino(message: ThrottledSlashPacket): ThrottledSlashPacketAmino {
    const obj: any = {};
    obj.global_entry = message.globalEntry ? GlobalSlashEntry.toAmino(message.globalEntry) : undefined;
    obj.data = message.data ? SlashPacketData.toAmino(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: ThrottledSlashPacketAminoMsg): ThrottledSlashPacket {
    return ThrottledSlashPacket.fromAmino(object.value);
  },
  fromProtoMsg(message: ThrottledSlashPacketProtoMsg): ThrottledSlashPacket {
    return ThrottledSlashPacket.decode(message.value);
  },
  toProto(message: ThrottledSlashPacket): Uint8Array {
    return ThrottledSlashPacket.encode(message).finish();
  },
  toProtoMsg(message: ThrottledSlashPacket): ThrottledSlashPacketProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ThrottledSlashPacket",
      value: ThrottledSlashPacket.encode(message).finish()
    };
  }
};
function createBaseThrottledPacketDataWrapper(): ThrottledPacketDataWrapper {
  return {
    slashPacket: undefined,
    vscMaturedPacket: undefined
  };
}
export const ThrottledPacketDataWrapper = {
  typeUrl: "/interchain_security.ccv.provider.v1.ThrottledPacketDataWrapper",
  encode(message: ThrottledPacketDataWrapper, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.slashPacket !== undefined) {
      SlashPacketData.encode(message.slashPacket, writer.uint32(10).fork()).ldelim();
    }
    if (message.vscMaturedPacket !== undefined) {
      VSCMaturedPacketData.encode(message.vscMaturedPacket, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ThrottledPacketDataWrapper {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseThrottledPacketDataWrapper();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.slashPacket = SlashPacketData.decode(reader, reader.uint32());
          break;
        case 2:
          message.vscMaturedPacket = VSCMaturedPacketData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ThrottledPacketDataWrapper>): ThrottledPacketDataWrapper {
    const message = createBaseThrottledPacketDataWrapper();
    message.slashPacket = object.slashPacket !== undefined && object.slashPacket !== null ? SlashPacketData.fromPartial(object.slashPacket) : undefined;
    message.vscMaturedPacket = object.vscMaturedPacket !== undefined && object.vscMaturedPacket !== null ? VSCMaturedPacketData.fromPartial(object.vscMaturedPacket) : undefined;
    return message;
  },
  fromAmino(object: ThrottledPacketDataWrapperAmino): ThrottledPacketDataWrapper {
    return {
      slashPacket: object?.slash_packet ? SlashPacketData.fromAmino(object.slash_packet) : undefined,
      vscMaturedPacket: object?.vsc_matured_packet ? VSCMaturedPacketData.fromAmino(object.vsc_matured_packet) : undefined
    };
  },
  toAmino(message: ThrottledPacketDataWrapper): ThrottledPacketDataWrapperAmino {
    const obj: any = {};
    obj.slash_packet = message.slashPacket ? SlashPacketData.toAmino(message.slashPacket) : undefined;
    obj.vsc_matured_packet = message.vscMaturedPacket ? VSCMaturedPacketData.toAmino(message.vscMaturedPacket) : undefined;
    return obj;
  },
  fromAminoMsg(object: ThrottledPacketDataWrapperAminoMsg): ThrottledPacketDataWrapper {
    return ThrottledPacketDataWrapper.fromAmino(object.value);
  },
  fromProtoMsg(message: ThrottledPacketDataWrapperProtoMsg): ThrottledPacketDataWrapper {
    return ThrottledPacketDataWrapper.decode(message.value);
  },
  toProto(message: ThrottledPacketDataWrapper): Uint8Array {
    return ThrottledPacketDataWrapper.encode(message).finish();
  },
  toProtoMsg(message: ThrottledPacketDataWrapper): ThrottledPacketDataWrapperProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ThrottledPacketDataWrapper",
      value: ThrottledPacketDataWrapper.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredConsumerRewardDenomsRequest(): QueryRegisteredConsumerRewardDenomsRequest {
  return {};
}
export const QueryRegisteredConsumerRewardDenomsRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsRequest",
  encode(_: QueryRegisteredConsumerRewardDenomsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRegisteredConsumerRewardDenomsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredConsumerRewardDenomsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryRegisteredConsumerRewardDenomsRequest>): QueryRegisteredConsumerRewardDenomsRequest {
    const message = createBaseQueryRegisteredConsumerRewardDenomsRequest();
    return message;
  },
  fromAmino(_: QueryRegisteredConsumerRewardDenomsRequestAmino): QueryRegisteredConsumerRewardDenomsRequest {
    return {};
  },
  toAmino(_: QueryRegisteredConsumerRewardDenomsRequest): QueryRegisteredConsumerRewardDenomsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredConsumerRewardDenomsRequestAminoMsg): QueryRegisteredConsumerRewardDenomsRequest {
    return QueryRegisteredConsumerRewardDenomsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredConsumerRewardDenomsRequestProtoMsg): QueryRegisteredConsumerRewardDenomsRequest {
    return QueryRegisteredConsumerRewardDenomsRequest.decode(message.value);
  },
  toProto(message: QueryRegisteredConsumerRewardDenomsRequest): Uint8Array {
    return QueryRegisteredConsumerRewardDenomsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredConsumerRewardDenomsRequest): QueryRegisteredConsumerRewardDenomsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsRequest",
      value: QueryRegisteredConsumerRewardDenomsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredConsumerRewardDenomsResponse(): QueryRegisteredConsumerRewardDenomsResponse {
  return {
    denoms: []
  };
}
export const QueryRegisteredConsumerRewardDenomsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsResponse",
  encode(message: QueryRegisteredConsumerRewardDenomsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.denoms) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRegisteredConsumerRewardDenomsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredConsumerRewardDenomsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denoms.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRegisteredConsumerRewardDenomsResponse>): QueryRegisteredConsumerRewardDenomsResponse {
    const message = createBaseQueryRegisteredConsumerRewardDenomsResponse();
    message.denoms = object.denoms?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryRegisteredConsumerRewardDenomsResponseAmino): QueryRegisteredConsumerRewardDenomsResponse {
    return {
      denoms: Array.isArray(object?.denoms) ? object.denoms.map((e: any) => e) : []
    };
  },
  toAmino(message: QueryRegisteredConsumerRewardDenomsResponse): QueryRegisteredConsumerRewardDenomsResponseAmino {
    const obj: any = {};
    if (message.denoms) {
      obj.denoms = message.denoms.map(e => e);
    } else {
      obj.denoms = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredConsumerRewardDenomsResponseAminoMsg): QueryRegisteredConsumerRewardDenomsResponse {
    return QueryRegisteredConsumerRewardDenomsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredConsumerRewardDenomsResponseProtoMsg): QueryRegisteredConsumerRewardDenomsResponse {
    return QueryRegisteredConsumerRewardDenomsResponse.decode(message.value);
  },
  toProto(message: QueryRegisteredConsumerRewardDenomsResponse): Uint8Array {
    return QueryRegisteredConsumerRewardDenomsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredConsumerRewardDenomsResponse): QueryRegisteredConsumerRewardDenomsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsResponse",
      value: QueryRegisteredConsumerRewardDenomsResponse.encode(message).finish()
    };
  }
};