import { Params, ParamsSDKType } from "../../v1/shared_consumer";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** NextFeeDistributionEstimate holds information about next fee distribution */
export interface NextFeeDistributionEstimate {
  /** current block height at the time of querying */
  currentHeight: bigint;
  /** block height at which last distribution took place */
  lastHeight: bigint;
  /** block height at which next distribution will take place */
  nextHeight: bigint;
  /** ratio between consumer and provider fee distribution */
  distributionFraction: string;
  /** total accruead fees at the time of querying */
  total: string;
  /** amount distibuted to provider chain */
  toProvider: string;
  /** amount distributed (kept) by consumer chain */
  toConsumer: string;
}
/** NextFeeDistributionEstimate holds information about next fee distribution */
export interface NextFeeDistributionEstimateSDKType {
  currentHeight: bigint;
  lastHeight: bigint;
  nextHeight: bigint;
  distribution_fraction: string;
  total: string;
  toProvider: string;
  toConsumer: string;
}
export interface QueryNextFeeDistributionEstimateRequest {}
export interface QueryNextFeeDistributionEstimateRequestSDKType {}
export interface QueryNextFeeDistributionEstimateResponse {
  data: NextFeeDistributionEstimate;
}
export interface QueryNextFeeDistributionEstimateResponseSDKType {
  data: NextFeeDistributionEstimateSDKType;
}
export interface QueryParamsRequest {}
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
export interface QueryProviderInfoRequest {}
export interface QueryProviderInfoRequestSDKType {}
export interface QueryProviderInfoResponse {
  consumer: ChainInfo;
  provider: ChainInfo;
}
export interface QueryProviderInfoResponseSDKType {
  consumer: ChainInfoSDKType;
  provider: ChainInfoSDKType;
}
export interface ChainInfo {
  chainID: string;
  clientID: string;
  connectionID: string;
  channelID: string;
}
export interface ChainInfoSDKType {
  chainID: string;
  clientID: string;
  connectionID: string;
  channelID: string;
}
function createBaseNextFeeDistributionEstimate(): NextFeeDistributionEstimate {
  return {
    currentHeight: BigInt(0),
    lastHeight: BigInt(0),
    nextHeight: BigInt(0),
    distributionFraction: "",
    total: "",
    toProvider: "",
    toConsumer: ""
  };
}
export const NextFeeDistributionEstimate = {
  typeUrl: "/interchain_security.ccv.consumer.v1.NextFeeDistributionEstimate",
  encode(message: NextFeeDistributionEstimate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currentHeight !== BigInt(0)) {
      writer.uint32(8).int64(message.currentHeight);
    }
    if (message.lastHeight !== BigInt(0)) {
      writer.uint32(16).int64(message.lastHeight);
    }
    if (message.nextHeight !== BigInt(0)) {
      writer.uint32(24).int64(message.nextHeight);
    }
    if (message.distributionFraction !== "") {
      writer.uint32(34).string(message.distributionFraction);
    }
    if (message.total !== "") {
      writer.uint32(42).string(message.total);
    }
    if (message.toProvider !== "") {
      writer.uint32(50).string(message.toProvider);
    }
    if (message.toConsumer !== "") {
      writer.uint32(58).string(message.toConsumer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): NextFeeDistributionEstimate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNextFeeDistributionEstimate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentHeight = reader.int64();
          break;
        case 2:
          message.lastHeight = reader.int64();
          break;
        case 3:
          message.nextHeight = reader.int64();
          break;
        case 4:
          message.distributionFraction = reader.string();
          break;
        case 5:
          message.total = reader.string();
          break;
        case 6:
          message.toProvider = reader.string();
          break;
        case 7:
          message.toConsumer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<NextFeeDistributionEstimate>): NextFeeDistributionEstimate {
    const message = createBaseNextFeeDistributionEstimate();
    message.currentHeight = object.currentHeight !== undefined && object.currentHeight !== null ? BigInt(object.currentHeight.toString()) : BigInt(0);
    message.lastHeight = object.lastHeight !== undefined && object.lastHeight !== null ? BigInt(object.lastHeight.toString()) : BigInt(0);
    message.nextHeight = object.nextHeight !== undefined && object.nextHeight !== null ? BigInt(object.nextHeight.toString()) : BigInt(0);
    message.distributionFraction = object.distributionFraction ?? "";
    message.total = object.total ?? "";
    message.toProvider = object.toProvider ?? "";
    message.toConsumer = object.toConsumer ?? "";
    return message;
  },
  fromAmino(object: NextFeeDistributionEstimateAmino): NextFeeDistributionEstimate {
    return {
      currentHeight: BigInt(object.currentHeight),
      lastHeight: BigInt(object.lastHeight),
      nextHeight: BigInt(object.nextHeight),
      distributionFraction: object.distribution_fraction,
      total: object.total,
      toProvider: object.toProvider,
      toConsumer: object.toConsumer
    };
  },
  toAmino(message: NextFeeDistributionEstimate): NextFeeDistributionEstimateAmino {
    const obj: any = {};
    obj.currentHeight = message.currentHeight ? message.currentHeight.toString() : undefined;
    obj.lastHeight = message.lastHeight ? message.lastHeight.toString() : undefined;
    obj.nextHeight = message.nextHeight ? message.nextHeight.toString() : undefined;
    obj.distribution_fraction = message.distributionFraction;
    obj.total = message.total;
    obj.toProvider = message.toProvider;
    obj.toConsumer = message.toConsumer;
    return obj;
  },
  fromAminoMsg(object: NextFeeDistributionEstimateAminoMsg): NextFeeDistributionEstimate {
    return NextFeeDistributionEstimate.fromAmino(object.value);
  },
  fromProtoMsg(message: NextFeeDistributionEstimateProtoMsg): NextFeeDistributionEstimate {
    return NextFeeDistributionEstimate.decode(message.value);
  },
  toProto(message: NextFeeDistributionEstimate): Uint8Array {
    return NextFeeDistributionEstimate.encode(message).finish();
  },
  toProtoMsg(message: NextFeeDistributionEstimate): NextFeeDistributionEstimateProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.NextFeeDistributionEstimate",
      value: NextFeeDistributionEstimate.encode(message).finish()
    };
  }
};
function createBaseQueryNextFeeDistributionEstimateRequest(): QueryNextFeeDistributionEstimateRequest {
  return {};
}
export const QueryNextFeeDistributionEstimateRequest = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateRequest",
  encode(_: QueryNextFeeDistributionEstimateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNextFeeDistributionEstimateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextFeeDistributionEstimateRequest();
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
  fromPartial(_: Partial<QueryNextFeeDistributionEstimateRequest>): QueryNextFeeDistributionEstimateRequest {
    const message = createBaseQueryNextFeeDistributionEstimateRequest();
    return message;
  },
  fromAmino(_: QueryNextFeeDistributionEstimateRequestAmino): QueryNextFeeDistributionEstimateRequest {
    return {};
  },
  toAmino(_: QueryNextFeeDistributionEstimateRequest): QueryNextFeeDistributionEstimateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryNextFeeDistributionEstimateRequestAminoMsg): QueryNextFeeDistributionEstimateRequest {
    return QueryNextFeeDistributionEstimateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNextFeeDistributionEstimateRequestProtoMsg): QueryNextFeeDistributionEstimateRequest {
    return QueryNextFeeDistributionEstimateRequest.decode(message.value);
  },
  toProto(message: QueryNextFeeDistributionEstimateRequest): Uint8Array {
    return QueryNextFeeDistributionEstimateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryNextFeeDistributionEstimateRequest): QueryNextFeeDistributionEstimateRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateRequest",
      value: QueryNextFeeDistributionEstimateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryNextFeeDistributionEstimateResponse(): QueryNextFeeDistributionEstimateResponse {
  return {
    data: NextFeeDistributionEstimate.fromPartial({})
  };
}
export const QueryNextFeeDistributionEstimateResponse = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateResponse",
  encode(message: QueryNextFeeDistributionEstimateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.data !== undefined) {
      NextFeeDistributionEstimate.encode(message.data, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNextFeeDistributionEstimateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextFeeDistributionEstimateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = NextFeeDistributionEstimate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryNextFeeDistributionEstimateResponse>): QueryNextFeeDistributionEstimateResponse {
    const message = createBaseQueryNextFeeDistributionEstimateResponse();
    message.data = object.data !== undefined && object.data !== null ? NextFeeDistributionEstimate.fromPartial(object.data) : undefined;
    return message;
  },
  fromAmino(object: QueryNextFeeDistributionEstimateResponseAmino): QueryNextFeeDistributionEstimateResponse {
    return {
      data: object?.data ? NextFeeDistributionEstimate.fromAmino(object.data) : undefined
    };
  },
  toAmino(message: QueryNextFeeDistributionEstimateResponse): QueryNextFeeDistributionEstimateResponseAmino {
    const obj: any = {};
    obj.data = message.data ? NextFeeDistributionEstimate.toAmino(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNextFeeDistributionEstimateResponseAminoMsg): QueryNextFeeDistributionEstimateResponse {
    return QueryNextFeeDistributionEstimateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNextFeeDistributionEstimateResponseProtoMsg): QueryNextFeeDistributionEstimateResponse {
    return QueryNextFeeDistributionEstimateResponse.decode(message.value);
  },
  toProto(message: QueryNextFeeDistributionEstimateResponse): Uint8Array {
    return QueryNextFeeDistributionEstimateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryNextFeeDistributionEstimateResponse): QueryNextFeeDistributionEstimateResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryNextFeeDistributionEstimateResponse",
      value: QueryNextFeeDistributionEstimateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    return {};
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    return {
      params: object?.params ? Params.fromAmino(object.params) : undefined
    };
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryProviderInfoRequest(): QueryProviderInfoRequest {
  return {};
}
export const QueryProviderInfoRequest = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoRequest",
  encode(_: QueryProviderInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProviderInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderInfoRequest();
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
  fromPartial(_: Partial<QueryProviderInfoRequest>): QueryProviderInfoRequest {
    const message = createBaseQueryProviderInfoRequest();
    return message;
  },
  fromAmino(_: QueryProviderInfoRequestAmino): QueryProviderInfoRequest {
    return {};
  },
  toAmino(_: QueryProviderInfoRequest): QueryProviderInfoRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryProviderInfoRequestAminoMsg): QueryProviderInfoRequest {
    return QueryProviderInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderInfoRequestProtoMsg): QueryProviderInfoRequest {
    return QueryProviderInfoRequest.decode(message.value);
  },
  toProto(message: QueryProviderInfoRequest): Uint8Array {
    return QueryProviderInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderInfoRequest): QueryProviderInfoRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoRequest",
      value: QueryProviderInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryProviderInfoResponse(): QueryProviderInfoResponse {
  return {
    consumer: ChainInfo.fromPartial({}),
    provider: ChainInfo.fromPartial({})
  };
}
export const QueryProviderInfoResponse = {
  typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoResponse",
  encode(message: QueryProviderInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumer !== undefined) {
      ChainInfo.encode(message.consumer, writer.uint32(10).fork()).ldelim();
    }
    if (message.provider !== undefined) {
      ChainInfo.encode(message.provider, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProviderInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProviderInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumer = ChainInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.provider = ChainInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryProviderInfoResponse>): QueryProviderInfoResponse {
    const message = createBaseQueryProviderInfoResponse();
    message.consumer = object.consumer !== undefined && object.consumer !== null ? ChainInfo.fromPartial(object.consumer) : undefined;
    message.provider = object.provider !== undefined && object.provider !== null ? ChainInfo.fromPartial(object.provider) : undefined;
    return message;
  },
  fromAmino(object: QueryProviderInfoResponseAmino): QueryProviderInfoResponse {
    return {
      consumer: object?.consumer ? ChainInfo.fromAmino(object.consumer) : undefined,
      provider: object?.provider ? ChainInfo.fromAmino(object.provider) : undefined
    };
  },
  toAmino(message: QueryProviderInfoResponse): QueryProviderInfoResponseAmino {
    const obj: any = {};
    obj.consumer = message.consumer ? ChainInfo.toAmino(message.consumer) : undefined;
    obj.provider = message.provider ? ChainInfo.toAmino(message.provider) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProviderInfoResponseAminoMsg): QueryProviderInfoResponse {
    return QueryProviderInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProviderInfoResponseProtoMsg): QueryProviderInfoResponse {
    return QueryProviderInfoResponse.decode(message.value);
  },
  toProto(message: QueryProviderInfoResponse): Uint8Array {
    return QueryProviderInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProviderInfoResponse): QueryProviderInfoResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.QueryProviderInfoResponse",
      value: QueryProviderInfoResponse.encode(message).finish()
    };
  }
};
function createBaseChainInfo(): ChainInfo {
  return {
    chainID: "",
    clientID: "",
    connectionID: "",
    channelID: ""
  };
}
export const ChainInfo = {
  typeUrl: "/interchain_security.ccv.consumer.v1.ChainInfo",
  encode(message: ChainInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainID !== "") {
      writer.uint32(10).string(message.chainID);
    }
    if (message.clientID !== "") {
      writer.uint32(18).string(message.clientID);
    }
    if (message.connectionID !== "") {
      writer.uint32(26).string(message.connectionID);
    }
    if (message.channelID !== "") {
      writer.uint32(34).string(message.channelID);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ChainInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChainInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainID = reader.string();
          break;
        case 2:
          message.clientID = reader.string();
          break;
        case 3:
          message.connectionID = reader.string();
          break;
        case 4:
          message.channelID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ChainInfo>): ChainInfo {
    const message = createBaseChainInfo();
    message.chainID = object.chainID ?? "";
    message.clientID = object.clientID ?? "";
    message.connectionID = object.connectionID ?? "";
    message.channelID = object.channelID ?? "";
    return message;
  },
  fromAmino(object: ChainInfoAmino): ChainInfo {
    return {
      chainID: object.chainID,
      clientID: object.clientID,
      connectionID: object.connectionID,
      channelID: object.channelID
    };
  },
  toAmino(message: ChainInfo): ChainInfoAmino {
    const obj: any = {};
    obj.chainID = message.chainID;
    obj.clientID = message.clientID;
    obj.connectionID = message.connectionID;
    obj.channelID = message.channelID;
    return obj;
  },
  fromAminoMsg(object: ChainInfoAminoMsg): ChainInfo {
    return ChainInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ChainInfoProtoMsg): ChainInfo {
    return ChainInfo.decode(message.value);
  },
  toProto(message: ChainInfo): Uint8Array {
    return ChainInfo.encode(message).finish();
  },
  toProtoMsg(message: ChainInfo): ChainInfoProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.ChainInfo",
      value: ChainInfo.encode(message).finish()
    };
  }
};