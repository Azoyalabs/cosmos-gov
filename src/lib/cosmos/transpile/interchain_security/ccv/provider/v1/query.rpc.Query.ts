import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryConsumerGenesisRequest, QueryConsumerGenesisResponse, QueryConsumerChainsRequest, QueryConsumerChainsResponse, QueryConsumerChainStartProposalsRequest, QueryConsumerChainStartProposalsResponse, QueryConsumerChainStopProposalsRequest, QueryConsumerChainStopProposalsResponse, QueryValidatorConsumerAddrRequest, QueryValidatorConsumerAddrResponse, QueryValidatorProviderAddrRequest, QueryValidatorProviderAddrResponse, QueryThrottleStateRequest, QueryThrottleStateResponse, QueryThrottledConsumerPacketDataRequest, QueryThrottledConsumerPacketDataResponse, QueryRegisteredConsumerRewardDenomsRequest, QueryRegisteredConsumerRewardDenomsResponse } from "./query";
export interface Query {
  /**
   * ConsumerGenesis queries the genesis state needed to start a consumer chain
   * whose proposal has been accepted
   */
  queryConsumerGenesis(request: QueryConsumerGenesisRequest): Promise<QueryConsumerGenesisResponse>;
  /**
   * ConsumerChains queries active consumer chains supported by the provider
   * chain
   */
  queryConsumerChains(request?: QueryConsumerChainsRequest): Promise<QueryConsumerChainsResponse>;
  /** QueryConsumerChainStarts queries consumer chain start proposals. */
  queryConsumerChainStarts(request?: QueryConsumerChainStartProposalsRequest): Promise<QueryConsumerChainStartProposalsResponse>;
  /** QueryConsumerChainStops queries consumer chain stop proposals. */
  queryConsumerChainStops(request?: QueryConsumerChainStopProposalsRequest): Promise<QueryConsumerChainStopProposalsResponse>;
  /**
   * QueryValidatorConsumerAddr queries the address
   * assigned by a validator for a consumer chain.
   */
  queryValidatorConsumerAddr(request: QueryValidatorConsumerAddrRequest): Promise<QueryValidatorConsumerAddrResponse>;
  /**
   * QueryProviderAddr returns the provider chain validator
   * given a consumer chain validator address
   */
  queryValidatorProviderAddr(request: QueryValidatorProviderAddrRequest): Promise<QueryValidatorProviderAddrResponse>;
  /**
   * QueryThrottleState returns the main on-chain state relevant to currently
   * throttled slash packets
   */
  queryThrottleState(request?: QueryThrottleStateRequest): Promise<QueryThrottleStateResponse>;
  /**
   * QueryThrottledConsumerPacketData returns a list of pending packet data
   * instances (slash packet and vsc matured) for a single consumer chain
   */
  queryThrottledConsumerPacketData(request: QueryThrottledConsumerPacketDataRequest): Promise<QueryThrottledConsumerPacketDataResponse>;
  /**
   * QueryRegisteredConsumerRewardDenoms returns a list of consumer reward
   * denoms that are registered
   */
  queryRegisteredConsumerRewardDenoms(request?: QueryRegisteredConsumerRewardDenomsRequest): Promise<QueryRegisteredConsumerRewardDenomsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.queryConsumerGenesis = this.queryConsumerGenesis.bind(this);
    this.queryConsumerChains = this.queryConsumerChains.bind(this);
    this.queryConsumerChainStarts = this.queryConsumerChainStarts.bind(this);
    this.queryConsumerChainStops = this.queryConsumerChainStops.bind(this);
    this.queryValidatorConsumerAddr = this.queryValidatorConsumerAddr.bind(this);
    this.queryValidatorProviderAddr = this.queryValidatorProviderAddr.bind(this);
    this.queryThrottleState = this.queryThrottleState.bind(this);
    this.queryThrottledConsumerPacketData = this.queryThrottledConsumerPacketData.bind(this);
    this.queryRegisteredConsumerRewardDenoms = this.queryRegisteredConsumerRewardDenoms.bind(this);
  }
  queryConsumerGenesis(request: QueryConsumerGenesisRequest): Promise<QueryConsumerGenesisResponse> {
    const data = QueryConsumerGenesisRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerGenesis", data);
    return promise.then(data => QueryConsumerGenesisResponse.decode(new BinaryReader(data)));
  }
  queryConsumerChains(request: QueryConsumerChainsRequest = {}): Promise<QueryConsumerChainsResponse> {
    const data = QueryConsumerChainsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChains", data);
    return promise.then(data => QueryConsumerChainsResponse.decode(new BinaryReader(data)));
  }
  queryConsumerChainStarts(request: QueryConsumerChainStartProposalsRequest = {}): Promise<QueryConsumerChainStartProposalsResponse> {
    const data = QueryConsumerChainStartProposalsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChainStarts", data);
    return promise.then(data => QueryConsumerChainStartProposalsResponse.decode(new BinaryReader(data)));
  }
  queryConsumerChainStops(request: QueryConsumerChainStopProposalsRequest = {}): Promise<QueryConsumerChainStopProposalsResponse> {
    const data = QueryConsumerChainStopProposalsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChainStops", data);
    return promise.then(data => QueryConsumerChainStopProposalsResponse.decode(new BinaryReader(data)));
  }
  queryValidatorConsumerAddr(request: QueryValidatorConsumerAddrRequest): Promise<QueryValidatorConsumerAddrResponse> {
    const data = QueryValidatorConsumerAddrRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryValidatorConsumerAddr", data);
    return promise.then(data => QueryValidatorConsumerAddrResponse.decode(new BinaryReader(data)));
  }
  queryValidatorProviderAddr(request: QueryValidatorProviderAddrRequest): Promise<QueryValidatorProviderAddrResponse> {
    const data = QueryValidatorProviderAddrRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryValidatorProviderAddr", data);
    return promise.then(data => QueryValidatorProviderAddrResponse.decode(new BinaryReader(data)));
  }
  queryThrottleState(request: QueryThrottleStateRequest = {}): Promise<QueryThrottleStateResponse> {
    const data = QueryThrottleStateRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryThrottleState", data);
    return promise.then(data => QueryThrottleStateResponse.decode(new BinaryReader(data)));
  }
  queryThrottledConsumerPacketData(request: QueryThrottledConsumerPacketDataRequest): Promise<QueryThrottledConsumerPacketDataResponse> {
    const data = QueryThrottledConsumerPacketDataRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryThrottledConsumerPacketData", data);
    return promise.then(data => QueryThrottledConsumerPacketDataResponse.decode(new BinaryReader(data)));
  }
  queryRegisteredConsumerRewardDenoms(request: QueryRegisteredConsumerRewardDenomsRequest = {}): Promise<QueryRegisteredConsumerRewardDenomsResponse> {
    const data = QueryRegisteredConsumerRewardDenomsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryRegisteredConsumerRewardDenoms", data);
    return promise.then(data => QueryRegisteredConsumerRewardDenomsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    queryConsumerGenesis(request: QueryConsumerGenesisRequest): Promise<QueryConsumerGenesisResponse> {
      return queryService.queryConsumerGenesis(request);
    },
    queryConsumerChains(request?: QueryConsumerChainsRequest): Promise<QueryConsumerChainsResponse> {
      return queryService.queryConsumerChains(request);
    },
    queryConsumerChainStarts(request?: QueryConsumerChainStartProposalsRequest): Promise<QueryConsumerChainStartProposalsResponse> {
      return queryService.queryConsumerChainStarts(request);
    },
    queryConsumerChainStops(request?: QueryConsumerChainStopProposalsRequest): Promise<QueryConsumerChainStopProposalsResponse> {
      return queryService.queryConsumerChainStops(request);
    },
    queryValidatorConsumerAddr(request: QueryValidatorConsumerAddrRequest): Promise<QueryValidatorConsumerAddrResponse> {
      return queryService.queryValidatorConsumerAddr(request);
    },
    queryValidatorProviderAddr(request: QueryValidatorProviderAddrRequest): Promise<QueryValidatorProviderAddrResponse> {
      return queryService.queryValidatorProviderAddr(request);
    },
    queryThrottleState(request?: QueryThrottleStateRequest): Promise<QueryThrottleStateResponse> {
      return queryService.queryThrottleState(request);
    },
    queryThrottledConsumerPacketData(request: QueryThrottledConsumerPacketDataRequest): Promise<QueryThrottledConsumerPacketDataResponse> {
      return queryService.queryThrottledConsumerPacketData(request);
    },
    queryRegisteredConsumerRewardDenoms(request?: QueryRegisteredConsumerRewardDenomsRequest): Promise<QueryRegisteredConsumerRewardDenomsResponse> {
      return queryService.queryRegisteredConsumerRewardDenoms(request);
    }
  };
};