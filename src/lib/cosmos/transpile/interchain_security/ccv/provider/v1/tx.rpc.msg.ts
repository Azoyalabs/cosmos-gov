import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { MsgAssignConsumerKey, MsgAssignConsumerKeyResponse, MsgRegisterConsumerRewardDenom, MsgRegisterConsumerRewardDenomResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  assignConsumerKey(request: MsgAssignConsumerKey): Promise<MsgAssignConsumerKeyResponse>;
  registerConsumerRewardDenom(request: MsgRegisterConsumerRewardDenom): Promise<MsgRegisterConsumerRewardDenomResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.assignConsumerKey = this.assignConsumerKey.bind(this);
    this.registerConsumerRewardDenom = this.registerConsumerRewardDenom.bind(this);
  }
  assignConsumerKey(request: MsgAssignConsumerKey): Promise<MsgAssignConsumerKeyResponse> {
    const data = MsgAssignConsumerKey.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "AssignConsumerKey", data);
    return promise.then(data => MsgAssignConsumerKeyResponse.decode(new BinaryReader(data)));
  }
  registerConsumerRewardDenom(request: MsgRegisterConsumerRewardDenom): Promise<MsgRegisterConsumerRewardDenomResponse> {
    const data = MsgRegisterConsumerRewardDenom.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "RegisterConsumerRewardDenom", data);
    return promise.then(data => MsgRegisterConsumerRewardDenomResponse.decode(new BinaryReader(data)));
  }
}