import axios, {type AxiosRequestConfig} from 'axios';

type Endpoint = {
  name: string;
  urls: string[];
  preprocess?: (url: string) => {
    url: string;
    method: 'get' | 'post';
    data?: any;
    config?: AxiosRequestConfig;
  };
  expected?: (response: any) => boolean;
  target?: string;
};

type EndointHealth = {
  name: string;
  urls: {url: string; health: boolean}[];
  target: string;
};

const endpoints: Endpoint[] = [
  {
    name: 'AW LOGO',
    urls: [
      'https://alphawallet.com/wp-content/themes/alphawallet/img/alphawallet-logo.svg',
    ],
  },
  {
    name: 'Coingecko API',
    urls: ['https://api.coingecko.com/api/v3/ping'],
  },
  {
    name: 'Explorer Endpoints',
    urls: [
      'https://api-cn.etherscan.com/api',
      'https://api-kovan.etherscan.io/api',
      'https://api-ropsten.etherscan.io/api',
      'https://api-rinkeby.etherscan.io/api',
      'https://api-goerli.etherscan.io/api',
      'https://blockscout.com/etc/mainnet/api',
      'https://explorer.callisto.network/api',
      'https://blockscout.com/poa/core/api',
      'https://blockscout.com/poa/xdai/api',
      'https://blockscout.com/poa/sokol/api',
      'https://explorer.sigma1.artis.network/api',
      'https://explorer.tau1.artis.network/api',
      'https://api.bscscan.com/api',
      'https://api-testnet.bscscan.com/api',
      'https://api-testnet.hecoinfo.com/api',
      'https://api.hecoinfo.com/api',
      'https://api.ftmscan.com/api',
      'https://api.polygonscan.com/api',
      'https://api-testnet.polygonscan.com/api',
      'https://api-optimistic.etherscan.io/api',
      'https://api-kovan-optimistic.etherscan.io/api',
      'https://api.arbiscan.io/api',
    ],
    preprocess: (url: string) => {
      return {
        url: `${url}?module=account&action=tokentx&address=0x007bEe82BDd9e866b2bd114780a47f2261C684E3`,
        method: 'get',
      };
    },
  },
  {
    name: 'RPC Endpoints',
    urls: [
      'https://mainnet.infura.io/v3/3f22e503f06448d89617f6b9b252865e',
      'https://www.ethercluster.com/etc',
      'https://explorer.callisto.network/api/eth-rpc',
      'https://kovan.infura.io/v3/3f22e503f06448d89617f6b9b252865e',
      'https://ropsten.infura.io/v3/3f22e503f06448d89617f6b9b252865e',
      'https://rinkeby.infura.io/v3/3f22e503f06448d89617f6b9b252865e',
      'https://core.poa.network',
      'https://sokol.poa.network',
      'https://goerli.infura.io/v3/3f22e503f06448d89617f6b9b252865e',
      'https://rpc.xdaichain.com',
      'https://rpc.sigma1.artis.network',
      'https://rpc.tau1.artis.network',
      'https://bsc-dataseed1.binance.org:443',
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://http-mainnet.hecochain.com',
      'https://http-testnet.hecochain.com',
      'https://rpcapi.fantom.network',
      'https://rpc.testnet.fantom.network/',
      'https://api.avax.network/ext/bc/C/rpc',
      'https://api.avax-test.network/ext/bc/C/rpc',
      'https://polygon-mainnet.infura.io/v3/3f22e503f06448d89617f6b9b252865e',
      'https://polygon-mumbai.infura.io/v3/3f22e503f06448d89617f6b9b252865e',
      'https://mainnet.optimism.io',
      'https://kovan.optimism.io',
      'https://arbitrum-mainnet.infura.io/v3/3f22e503f06448d89617f6b9b252865e',
    ],
    preprocess: (url: string) => {
      return {
        url: `${url}?module=account&action=tokentx&address=0x007bEe82BDd9e866b2bd114780a47f2261C684E3`,
        method: 'post',
        data: {id: 1, method: 'eth_blockNumber', jsonrpc: '2.0', params: []},
        config: {
          headers: {
            userAgent: 'AlphaWallet/395 CFNetwork/1237 Darwin/20.5.0',
          },
        },
      };
    },
    expected: (response: any) => {
      return Number(response.data.result) > 0;
    },
  },
  {
    name: 'TokenScript.org Subdomains',
    urls: [
      'https://repo.tokenscript.org/2020/06/0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14',
      'https://community.tokenscript.org',
    ],
  },
  {
    name: 'WalletConnect Bridges',
    urls: [
      'https://bridge.walletconnect.org/hello',
      'https://j.bridge.walletconnect.org/hello',
      'https://w.bridge.walletconnect.org/hello',
      'https://5.bridge.walletconnect.org/hello',
      'https://uniswap.bridge.walletconnect.org/hello',
    ],
  },
  {
    name: 'Gas estimator API',
    urls: [
      'https://api-cn.etherscan.com/api?module=gastracker&action=gasoracle',
      'https://api.bscscan.com/api?module=gastracker&action=gasoracle',
      'https://api.hecoinfo.com/api?module=gastracker&action=gasoracle',
      'https://api.polygonscan.com/api?module=gastracker&action=gasoracle',
    ],
    expected: (response: any) => {
      return response.data.status === '1';
    },
  },
  {
    name: 'aw.app/apple-app-site-association',
    urls: ['https://aw.app/apple-app-site-association'],
    expected: (response: any) => {
      return (
        response.data.applinks.details[0].appID ===
        'LRAW5PL536.com.stormbird.alphawallet'
      );
    },
  },
];

const defaultTarget =
  'https://discord.com/api/webhooks/877382890634219591/vqfy2BQGr8yrolpImVQ0uYmTp7wEgR3WjEUGdbxJNaEo34WSg_PH4ct6-PE0aH8PymeU';

function statusCode200(response: any): boolean {
  return response.status === 200;
}

async function checkingUrls(endpoint: Endpoint) {
  const urlsHealth: {url: string; health: boolean}[] = [];
  const urlCheckers = endpoint.urls.map((url: string) => {
    if (!endpoint.preprocess) {
      return axios.get(url);
    } else {
      const result = endpoint.preprocess(url);
      if (result.method === 'get') {
        return axios.get(result.url, result.config);
      } else {
        return axios.post(result.url, result.data, result.config);
      }
    }
  });
  const results = await Promise.allSettled(urlCheckers);
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      urlsHealth.push({url: endpoint.urls[index], health: false});
    } else {
      urlsHealth.push({
        url: endpoint.urls[index],
        health: endpoint.expected
          ? endpoint.expected(result.value)
          : statusCode200(result.value),
      });
    }
  });
  return urlsHealth;
}

export async function checking() {
  const endpointsHealth: EndointHealth[] = [];
  const checkers = endpoints.map(checkingUrls);
  const results = await Promise.allSettled(checkers);
  results.forEach((result, index) => {
    const endpoint = endpoints[index];
    if (result.status === 'rejected') {
      endpointsHealth.push({
        name: endpoint.name,
        urls: endpoint.urls.map(url => {
          return {url, health: false};
        }),
        target: endpoints[index].target || defaultTarget,
      });
    } else {
      endpointsHealth.push({
        name: endpoint.name,
        urls: result.value,
        target: endpoints[index].target || defaultTarget,
      });
    }
  });

  return endpointsHealth;
}

// export function sendUnhealthyServicesReports(endpointsHealth: EndointHealth[]) {
//   const reports: {[key: string]: {name: string; url: string}[]} = {};
//   endpointsHealth.forEach(endpoint => {
//     const unhealthyUrls = endpoint.urls.filter(url => !url.health);
//     if (unhealthyUrls && unhealthyUrls.length) {
//       unhealthyUrls.forEach(url => {
//         if (!reports[endpoint.target]) {
//           reports[endpoint.target] = [];
//         }
//         reports[endpoint.target].push({name: endpoint.name, url: url.url});
//       });
//     }
//   });
//   Object.keys(reports).forEach(key => {});
// }
