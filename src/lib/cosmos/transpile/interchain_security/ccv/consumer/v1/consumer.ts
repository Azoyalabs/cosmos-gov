import { Any, type AnySDKType } from "../../../../google/protobuf/any";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { encodePubkey, decodePubkey } from "@cosmjs/proto-signing";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/**
 * CrossChainValidator defines the type used to store validator information internal
 * to the consumer CCV module.  Note one cross chain validator entry is persisted for
 * each consumer validator, where incoming VSC packets update this data, which is eventually
 * forwarded to comet for consumer chain consensus.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface CrossChainValidator {
  address: Uint8Array;
  power: bigint;
  /** pubkey is the consensus public key of the validator, as a Protobuf Any. */
  pubkey: Any;
}
/**
 * CrossChainValidator defines the type used to store validator information internal
 * to the consumer CCV module.  Note one cross chain validator entry is persisted for
 * each consumer validator, where incoming VSC packets update this data, which is eventually
 * forwarded to comet for consumer chain consensus.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface CrossChainValidatorSDKType {
  address: Uint8Array;
  power: bigint;
  pubkey: AnySDKType;
}
/**
 * A record storing the state of a slash packet sent to the provider chain
 * which may bounce back and forth until handled by the provider.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface SlashRecord {
  waitingOnReply: boolean;
  sendTime: Date;
}
/**
 * A record storing the state of a slash packet sent to the provider chain
 * which may bounce back and forth until handled by the provider.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface SlashRecordSDKType {
  waiting_on_reply: boolean;
  send_time: Date;
}
function createBaseCrossChainValidator(): CrossChainValidator {
  return {
    address: new Uint8Array(),
    power: BigInt(0),
    pubkey: Any.fromPartial({})
  };
}
export const CrossChainValidator = {
  typeUrl: "/interchain_security.ccv.consumer.v1.CrossChainValidator",
  encode(message: CrossChainValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (message.power !== BigInt(0)) {
      writer.uint32(16).int64(message.power);
    }
    if (message.pubkey !== undefined) {
      Any.encode(message.pubkey, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CrossChainValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCrossChainValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        case 2:
          message.power = reader.int64();
          break;
        case 3:
          message.pubkey = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CrossChainValidator>): CrossChainValidator {
    const message = createBaseCrossChainValidator();
    message.address = object.address ?? new Uint8Array();
    message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
    message.pubkey = object.pubkey !== undefined && object.pubkey !== null ? Any.fromPartial(object.pubkey) : undefined;
    return message;
  },
  fromAmino(object: CrossChainValidatorAmino): CrossChainValidator {
    return {
      address: object.address,
      power: BigInt(object.power),
      pubkey: object?.pubkey ? encodePubkey(object.pubkey) : undefined
    };
  },
  toAmino(message: CrossChainValidator): CrossChainValidatorAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.power = message.power ? message.power.toString() : undefined;
    obj.pubkey = message.pubkey ? decodePubkey(message.pubkey) : undefined;
    return obj;
  },
  fromAminoMsg(object: CrossChainValidatorAminoMsg): CrossChainValidator {
    return CrossChainValidator.fromAmino(object.value);
  },
  fromProtoMsg(message: CrossChainValidatorProtoMsg): CrossChainValidator {
    return CrossChainValidator.decode(message.value);
  },
  toProto(message: CrossChainValidator): Uint8Array {
    return CrossChainValidator.encode(message).finish();
  },
  toProtoMsg(message: CrossChainValidator): CrossChainValidatorProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.CrossChainValidator",
      value: CrossChainValidator.encode(message).finish()
    };
  }
};
function createBaseSlashRecord(): SlashRecord {
  return {
    waitingOnReply: false,
    sendTime: new Date()
  };
}
export const SlashRecord = {
  typeUrl: "/interchain_security.ccv.consumer.v1.SlashRecord",
  encode(message: SlashRecord, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.waitingOnReply === true) {
      writer.uint32(8).bool(message.waitingOnReply);
    }
    if (message.sendTime !== undefined) {
      Timestamp.encode(toTimestamp(message.sendTime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SlashRecord {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlashRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.waitingOnReply = reader.bool();
          break;
        case 2:
          message.sendTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SlashRecord>): SlashRecord {
    const message = createBaseSlashRecord();
    message.waitingOnReply = object.waitingOnReply ?? false;
    message.sendTime = object.sendTime ?? undefined;
    return message;
  },
  fromAmino(object: SlashRecordAmino): SlashRecord {
    return {
      waitingOnReply: object.waiting_on_reply,
      sendTime: object.send_time
    };
  },
  toAmino(message: SlashRecord): SlashRecordAmino {
    const obj: any = {};
    obj.waiting_on_reply = message.waitingOnReply;
    obj.send_time = message.sendTime;
    return obj;
  },
  fromAminoMsg(object: SlashRecordAminoMsg): SlashRecord {
    return SlashRecord.fromAmino(object.value);
  },
  fromProtoMsg(message: SlashRecordProtoMsg): SlashRecord {
    return SlashRecord.decode(message.value);
  },
  toProto(message: SlashRecord): Uint8Array {
    return SlashRecord.encode(message).finish();
  },
  toProtoMsg(message: SlashRecord): SlashRecordProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.SlashRecord",
      value: SlashRecord.encode(message).finish()
    };
  }
};