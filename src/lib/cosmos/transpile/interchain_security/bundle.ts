import * as _127 from "./ccv/consumer/v1/consumer";
import * as _128 from "./ccv/consumer/v1/query";
import * as _129 from "./ccv/provider/v1/genesis";
import * as _130 from "./ccv/provider/v1/provider";
import * as _131 from "./ccv/provider/v1/query";
import * as _132 from "./ccv/provider/v1/tx";
import * as _133 from "./ccv/v1/shared_consumer";
import * as _134 from "./ccv/v1/wire";
import * as _244 from "./ccv/provider/v1/tx.amino";
import * as _245 from "./ccv/provider/v1/tx.registry";
import * as _246 from "./ccv/consumer/v1/query.lcd";
import * as _247 from "./ccv/provider/v1/query.lcd";
import * as _248 from "./ccv/consumer/v1/query.rpc.Query";
import * as _249 from "./ccv/provider/v1/query.rpc.Query";
import * as _250 from "./ccv/provider/v1/tx.rpc.msg";
import * as _257 from "./lcd";
import * as _258 from "./rpc.query";
import * as _259 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._127,
        ..._128,
        ..._246,
        ..._248
      };
    }
    export namespace provider {
      export const v1 = {
        ..._129,
        ..._130,
        ..._131,
        ..._132,
        ..._244,
        ..._245,
        ..._247,
        ..._249,
        ..._250
      };
    }
    export const v1 = {
      ..._133,
      ..._134
    };
  }
  export const ClientFactory = {
    ..._257,
    ..._258,
    ..._259
  };
}