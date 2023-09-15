import { AminoMsg } from "@cosmjs/amino";
import { MsgAssignConsumerKey, MsgRegisterConsumerRewardDenom } from "./tx";
export interface MsgAssignConsumerKeyAminoType extends AminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey";
  value: {
    chain_id: string;
    provider_addr: string;
    consumer_key: string;
  };
}
export interface MsgRegisterConsumerRewardDenomAminoType extends AminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenom";
  value: {
    denom: string;
    depositor: string;
  };
}
export const AminoConverter = {
  "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
    toAmino: ({
      chainId,
      providerAddr,
      consumerKey
    }: MsgAssignConsumerKey): MsgAssignConsumerKeyAminoType["value"] => {
      return {
        chain_id: chainId,
        provider_addr: providerAddr,
        consumer_key: consumerKey
      };
    },
    fromAmino: ({
      chain_id,
      provider_addr,
      consumer_key
    }: MsgAssignConsumerKeyAminoType["value"]): MsgAssignConsumerKey => {
      return {
        chainId: chain_id,
        providerAddr: provider_addr,
        consumerKey: consumer_key
      };
    }
  },
  "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenom": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgRegisterConsumerRewardDenom",
    toAmino: ({
      denom,
      depositor
    }: MsgRegisterConsumerRewardDenom): MsgRegisterConsumerRewardDenomAminoType["value"] => {
      return {
        denom,
        depositor
      };
    },
    fromAmino: ({
      denom,
      depositor
    }: MsgRegisterConsumerRewardDenomAminoType["value"]): MsgRegisterConsumerRewardDenom => {
      return {
        denom,
        depositor
      };
    }
  }
};