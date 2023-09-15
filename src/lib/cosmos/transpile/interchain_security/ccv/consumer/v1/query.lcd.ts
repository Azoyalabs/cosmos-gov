import { LCDClient } from "@cosmology/lcd";
import { QueryNextFeeDistributionEstimateRequest, QueryNextFeeDistributionEstimateResponseSDKType, QueryParamsRequest, QueryParamsResponseSDKType, QueryProviderInfoRequest, QueryProviderInfoResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.queryNextFeeDistribution = this.queryNextFeeDistribution.bind(this);
    this.queryParams = this.queryParams.bind(this);
    this.queryProviderInfo = this.queryProviderInfo.bind(this);
  }
  /* ConsumerGenesis queries the genesis state needed to start a consumer chain
   whose proposal has been accepted */
  async queryNextFeeDistribution(_params: QueryNextFeeDistributionEstimateRequest = {}): Promise<QueryNextFeeDistributionEstimateResponseSDKType> {
    const endpoint = `interchain_security/ccv/consumer/next-fee-distribution`;
    return await this.req.get<QueryNextFeeDistributionEstimateResponseSDKType>(endpoint);
  }
  /* QueryParams queries the ccv/consumer module parameters. */
  async queryParams(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `interchain_security/ccv/consumer/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* QueryProviderInfo */
  async queryProviderInfo(_params: QueryProviderInfoRequest = {}): Promise<QueryProviderInfoResponseSDKType> {
    const endpoint = `interchain_security/ccv/consumer/provider-info`;
    return await this.req.get<QueryProviderInfoResponseSDKType>(endpoint);
  }
}