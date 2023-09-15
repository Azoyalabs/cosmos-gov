import { BinaryReader, BinaryWriter } from "../../../../binary";
export interface MsgAssignConsumerKey {
  /** The chain id of the consumer chain to assign a consensus public key to */
  chainId: string;
  /** The validator address on the provider */
  providerAddr: string;
  /**
   * The consensus public key to use on the consumer.
   * in json string format corresponding to proto-any, ex:
   * `{"@type":"/cosmos.crypto.ed25519.PubKey","key":"Ui5Gf1+mtWUdH8u3xlmzdKID+F3PK0sfXZ73GZ6q6is="}`
   */
  consumerKey: string;
}
export interface MsgAssignConsumerKeySDKType {
  chain_id: string;
  provider_addr: string;
  consumer_key: string;
}
export interface MsgAssignConsumerKeyResponse {}
export interface MsgAssignConsumerKeyResponseSDKType {}
/**
 * MsgRegisterConsumerRewardDenom allows an account to register
 * a consumer reward denom, i.e., add it to the list of denoms
 * accepted by the provider as rewards.
 */
export interface MsgRegisterConsumerRewardDenom {
  denom: string;
  depositor: string;
}
/**
 * MsgRegisterConsumerRewardDenom allows an account to register
 * a consumer reward denom, i.e., add it to the list of denoms
 * accepted by the provider as rewards.
 */
export interface MsgRegisterConsumerRewardDenomSDKType {
  denom: string;
  depositor: string;
}
/**
 * MsgRegisterConsumerRewardDenomResponse defines the
 * Msg/RegisterConsumerRewardDenom response type.
 */
export interface MsgRegisterConsumerRewardDenomResponse {}
/**
 * MsgRegisterConsumerRewardDenomResponse defines the
 * Msg/RegisterConsumerRewardDenom response type.
 */
export interface MsgRegisterConsumerRewardDenomResponseSDKType {}
function createBaseMsgAssignConsumerKey(): MsgAssignConsumerKey {
  return {
    chainId: "",
    providerAddr: "",
    consumerKey: ""
  };
}
export const MsgAssignConsumerKey = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
  encode(message: MsgAssignConsumerKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddr !== "") {
      writer.uint32(18).string(message.providerAddr);
    }
    if (message.consumerKey !== "") {
      writer.uint32(26).string(message.consumerKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAssignConsumerKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssignConsumerKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddr = reader.string();
          break;
        case 3:
          message.consumerKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAssignConsumerKey>): MsgAssignConsumerKey {
    const message = createBaseMsgAssignConsumerKey();
    message.chainId = object.chainId ?? "";
    message.providerAddr = object.providerAddr ?? "";
    message.consumerKey = object.consumerKey ?? "";
    return message;
  },
  fromAmino(object: MsgAssignConsumerKeyAmino): MsgAssignConsumerKey {
    return {
      chainId: object.chain_id,
      providerAddr: object.provider_addr,
      consumerKey: object.consumer_key
    };
  },
  toAmino(message: MsgAssignConsumerKey): MsgAssignConsumerKeyAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.provider_addr = message.providerAddr;
    obj.consumer_key = message.consumerKey;
    return obj;
  },
  fromAminoMsg(object: MsgAssignConsumerKeyAminoMsg): MsgAssignConsumerKey {
    return MsgAssignConsumerKey.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAssignConsumerKeyProtoMsg): MsgAssignConsumerKey {
    return MsgAssignConsumerKey.decode(message.value);
  },
  toProto(message: MsgAssignConsumerKey): Uint8Array {
    return MsgAssignConsumerKey.encode(message).finish();
  },
  toProtoMsg(message: MsgAssignConsumerKey): MsgAssignConsumerKeyProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
      value: MsgAssignConsumerKey.encode(message).finish()
    };
  }
};
function createBaseMsgAssignConsumerKeyResponse(): MsgAssignConsumerKeyResponse {
  return {};
}
export const MsgAssignConsumerKeyResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKeyResponse",
  encode(_: MsgAssignConsumerKeyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAssignConsumerKeyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssignConsumerKeyResponse();
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
  fromPartial(_: Partial<MsgAssignConsumerKeyResponse>): MsgAssignConsumerKeyResponse {
    const message = createBaseMsgAssignConsumerKeyResponse();
    return message;
  },
  fromAmino(_: MsgAssignConsumerKeyResponseAmino): MsgAssignConsumerKeyResponse {
    return {};
  },
  toAmino(_: MsgAssignConsumerKeyResponse): MsgAssignConsumerKeyResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAssignConsumerKeyResponseAminoMsg): MsgAssignConsumerKeyResponse {
    return MsgAssignConsumerKeyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAssignConsumerKeyResponseProtoMsg): MsgAssignConsumerKeyResponse {
    return MsgAssignConsumerKeyResponse.decode(message.value);
  },
  toProto(message: MsgAssignConsumerKeyResponse): Uint8Array {
    return MsgAssignConsumerKeyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAssignConsumerKeyResponse): MsgAssignConsumerKeyResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKeyResponse",
      value: MsgAssignConsumerKeyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterConsumerRewardDenom(): MsgRegisterConsumerRewardDenom {
  return {
    denom: "",
    depositor: ""
  };
}
export const MsgRegisterConsumerRewardDenom = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenom",
  encode(message: MsgRegisterConsumerRewardDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.depositor !== "") {
      writer.uint32(18).string(message.depositor);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterConsumerRewardDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterConsumerRewardDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.depositor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterConsumerRewardDenom>): MsgRegisterConsumerRewardDenom {
    const message = createBaseMsgRegisterConsumerRewardDenom();
    message.denom = object.denom ?? "";
    message.depositor = object.depositor ?? "";
    return message;
  },
  fromAmino(object: MsgRegisterConsumerRewardDenomAmino): MsgRegisterConsumerRewardDenom {
    return {
      denom: object.denom,
      depositor: object.depositor
    };
  },
  toAmino(message: MsgRegisterConsumerRewardDenom): MsgRegisterConsumerRewardDenomAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.depositor = message.depositor;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterConsumerRewardDenomAminoMsg): MsgRegisterConsumerRewardDenom {
    return MsgRegisterConsumerRewardDenom.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterConsumerRewardDenomProtoMsg): MsgRegisterConsumerRewardDenom {
    return MsgRegisterConsumerRewardDenom.decode(message.value);
  },
  toProto(message: MsgRegisterConsumerRewardDenom): Uint8Array {
    return MsgRegisterConsumerRewardDenom.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterConsumerRewardDenom): MsgRegisterConsumerRewardDenomProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenom",
      value: MsgRegisterConsumerRewardDenom.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterConsumerRewardDenomResponse(): MsgRegisterConsumerRewardDenomResponse {
  return {};
}
export const MsgRegisterConsumerRewardDenomResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenomResponse",
  encode(_: MsgRegisterConsumerRewardDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterConsumerRewardDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterConsumerRewardDenomResponse();
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
  fromPartial(_: Partial<MsgRegisterConsumerRewardDenomResponse>): MsgRegisterConsumerRewardDenomResponse {
    const message = createBaseMsgRegisterConsumerRewardDenomResponse();
    return message;
  },
  fromAmino(_: MsgRegisterConsumerRewardDenomResponseAmino): MsgRegisterConsumerRewardDenomResponse {
    return {};
  },
  toAmino(_: MsgRegisterConsumerRewardDenomResponse): MsgRegisterConsumerRewardDenomResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterConsumerRewardDenomResponseAminoMsg): MsgRegisterConsumerRewardDenomResponse {
    return MsgRegisterConsumerRewardDenomResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterConsumerRewardDenomResponseProtoMsg): MsgRegisterConsumerRewardDenomResponse {
    return MsgRegisterConsumerRewardDenomResponse.decode(message.value);
  },
  toProto(message: MsgRegisterConsumerRewardDenomResponse): Uint8Array {
    return MsgRegisterConsumerRewardDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterConsumerRewardDenomResponse): MsgRegisterConsumerRewardDenomResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenomResponse",
      value: MsgRegisterConsumerRewardDenomResponse.encode(message).finish()
    };
  }
};