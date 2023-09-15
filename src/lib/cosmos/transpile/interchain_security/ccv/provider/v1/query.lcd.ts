import { LCDClient } from "@cosmology/lcd";
import { QueryConsumerGenesisRequest, QueryConsumerGenesisResponseSDKType, QueryConsumerChainsRequest, QueryConsumerChainsResponseSDKType, QueryConsumerChainStartProposalsRequest, QueryConsumerChainStartProposalsResponseSDKType, QueryConsumerChainStopProposalsRequest, QueryConsumerChainStopProposalsResponseSDKType, QueryValidatorConsumerAddrRequest, QueryValidatorConsumerAddrResponseSDKType, QueryValidatorProviderAddrRequest, QueryValidatorProviderAddrResponseSDKType, QueryThrottleStateRequest, QueryThrottleStateResponseSDKType, QueryThrottledConsumerPacketDataRequest, QueryThrottledConsumerPacketDataResponseSDKType, QueryRegisteredConsumerRewardDenomsRequest, QueryRegisteredConsumerRewardDenomsResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
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
  /* ConsumerGenesis queries the genesis state needed to start a consumer chain
   whose proposal has been accepted */
  async queryConsumerGenesis(params: QueryConsumerGenesisRequest): Promise<QueryConsumerGenesisResponseSDKType> {
    const endpoint = `interchain_security/ccv/provider/consumer_genesis/${params.chainId}`;
    return await this.req.get<QueryConsumerGenesisResponseSDKType>(endpoint);
  }
  /* ConsumerChains queries active consumer chains supported by the provider
   chain */
  async queryConsumerChains(_params: QueryConsumerChainsRequest = {}): Promise<QueryConsumerChainsResponseSDKType> {
    const endpoint = `interchain_security/ccv/provider/consumer_chains`;
    return await this.req.get<QueryConsumerChainsResponseSDKType>(endpoint);
  }
  /* QueryConsumerChainStarts queries consumer chain start proposals. */
  async queryConsumerChainStarts(_params: QueryConsumerChainStartProposalsRequest = {}): Promise<QueryConsumerChainStartProposalsResponseSDKType> {
    const endpoint = `interchain_security/ccv/provider/consumer_chain_start_proposals`;
    return await this.req.get<QueryConsumerChainStartProposalsResponseSDKType>(endpoint);
  }
  /* QueryConsumerChainStops queries consumer chain stop proposals. */
  async queryConsumerChainStops(_params: QueryConsumerChainStopProposalsRequest = {}): Promise<QueryConsumerChainStopProposalsResponseSDKType> {
    const endpoint = `interchain_security/ccv/provider/consumer_chain_stop_proposals`;
    return await this.req.get<QueryConsumerChainStopProposalsResponseSDKType>(endpoint);
  }
  /* QueryValidatorConsumerAddr queries the address
   assigned by a validator for a consumer chain. */
  async queryValidatorConsumerAddr(params: QueryValidatorConsumerAddrRequest): Promise<QueryValidatorConsumerAddrResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.chainId !== "undefined") {
      options.params.chain_id = params.chainId;
    }
    if (typeof params?.providerAddress !== "undefined") {
      options.params.provider_address = params.providerAddress;
    }
    const endpoint = `interchain_security/ccv/provider/validator_consumer_addr`;
    return await this.req.get<QueryValidatorConsumerAddrResponseSDKType>(endpoint, options);
  }
  /* QueryProviderAddr returns the provider chain validator
   given a consumer chain validator address */
  async queryValidatorProviderAddr(params: QueryValidatorProviderAddrRequest): Promise<QueryValidatorProviderAddrResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.chainId !== "undefined") {
      options.params.chain_id = params.chainId;
    }
    if (typeof params?.consumerAddress !== "undefined") {
      options.params.consumer_address = params.consumerAddress;
    }
    const endpoint = `interchain_security/ccv/provider/validator_provider_addr`;
    return await this.req.get<QueryValidatorProviderAddrResponseSDKType>(endpoint, options);
  }
  /* QueryThrottleState returns the main on-chain state relevant to currently
   throttled slash packets */
  async queryThrottleState(_params: QueryThrottleStateRequest = {}): Promise<QueryThrottleStateResponseSDKType> {
    const endpoint = `interchain_security/ccv/provider/throttle_state`;
    return await this.req.get<QueryThrottleStateResponseSDKType>(endpoint);
  }
  /* QueryThrottledConsumerPacketData returns a list of pending packet data
   instances (slash packet and vsc matured) for a single consumer chain */
  async queryThrottledConsumerPacketData(params: QueryThrottledConsumerPacketDataRequest): Promise<QueryThrottledConsumerPacketDataResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.chainId !== "undefined") {
      options.params.chain_id = params.chainId;
    }
    const endpoint = `interchain_security/ccv/provider/pending_consumer_packets`;
    return await this.req.get<QueryThrottledConsumerPacketDataResponseSDKType>(endpoint, options);
  }
  /* QueryRegisteredConsumerRewardDenoms returns a list of consumer reward
   denoms that are registered */
  async queryRegisteredConsumerRewardDenoms(_params: QueryRegisteredConsumerRewardDenomsRequest = {}): Promise<QueryRegisteredConsumerRewardDenomsResponseSDKType> {
    const endpoint = `interchain_security/ccv/provider/registered_consumer_reward_denoms`;
    return await this.req.get<QueryRegisteredConsumerRewardDenomsResponseSDKType>(endpoint);
  }
}