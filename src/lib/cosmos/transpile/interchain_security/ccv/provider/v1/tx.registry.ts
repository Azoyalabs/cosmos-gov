import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgAssignConsumerKey, MsgRegisterConsumerRewardDenom } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/interchain_security.ccv.provider.v1.MsgAssignConsumerKey", MsgAssignConsumerKey], ["/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenom", MsgRegisterConsumerRewardDenom]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    assignConsumerKey(value: MsgAssignConsumerKey) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
        value: MsgAssignConsumerKey.encode(value).finish()
      };
    },
    registerConsumerRewardDenom(value: MsgRegisterConsumerRewardDenom) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenom",
        value: MsgRegisterConsumerRewardDenom.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    assignConsumerKey(value: MsgAssignConsumerKey) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
        value
      };
    },
    registerConsumerRewardDenom(value: MsgRegisterConsumerRewardDenom) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenom",
        value
      };
    }
  },
  fromPartial: {
    assignConsumerKey(value: MsgAssignConsumerKey) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
        value: MsgAssignConsumerKey.fromPartial(value)
      };
    },
    registerConsumerRewardDenom(value: MsgRegisterConsumerRewardDenom) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenom",
        value: MsgRegisterConsumerRewardDenom.fromPartial(value)
      };
    }
  }
};