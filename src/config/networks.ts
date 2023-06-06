import {Network} from "@delphi-labs/shuttle";

export const TERRA_MAINNET: Network = {
	name           : "Terra 2 Mainnet",
	chainId        : "phoenix-1",
	chainPrefix    : "terra",
	rpc            : "https://multichain-nodes.astroport.fi/phoenix-1/rpc/",
	rest           : "https://multichain-nodes.astroport.fi/phoenix-1/lcd/",
	bip44          : {
		coinType: 330
	},
	defaultCurrency: {
		coinDenom       : "LUNA",
		coinMinimalDenom: "uluna",
		coinDecimals    : 6,
		coinGeckoId     : "terra-luna-2"
	},
	gasPrice       : "0.015uluna"
};

export const TERRA_TESTNET: Network = {
	name           : "Terra 2 Testnet",
	chainId        : "pisco-1",
	chainPrefix    : "terra",
	rpc            : "https://multichain-nodes.astroport.fi/pisco-1/rpc/",
	rest           : "https://multichain-nodes.astroport.fi/pisco-1/lcd/",
	bip44          : {
		coinType: 330
	},
	defaultCurrency: {
		coinDenom       : "LUNA",
		coinMinimalDenom: "uluna",
		coinDecimals    : 6,
		coinGeckoId     : "terra-luna-2"
	},
	gasPrice       : "0.015uluna"
};

export const MARS_MAINNET: Network = {
	name           : "Mars Mainnet",
	chainId        : "mars-1",
	chainPrefix    : "mars",
	rpc            : "https://rpc.marsprotocol.io",
	rest           : "https://lcd.marsprotocol.io",
	defaultCurrency: {
		coinDenom       : "MARS",
		coinMinimalDenom: "mars",
		coinDecimals    : 6,
		coinGeckoId     : "mars"
	},
	gasPrice       : "0.015mars"
};

export const OSMOSIS_MAINNET: Network = {
	name           : "Osmosis Mainnet",
	chainId        : "osmosis-1",
	chainPrefix    : "osmosis",
	rpc            : "https://rpc.osmosis.zone",
	rest           : "https://lcd.osmosis.zone",
	defaultCurrency: {
		coinDenom       : "OSMO",
		coinMinimalDenom: "uosmo",
		coinDecimals    : 6,
		coinGeckoId     : "osmosis"
	},
	gasPrice       : "0.015uosmo"
};

export const MIGALOO_MAINNET: Network = {
	name           : "Migaloo Mainnet",
	"chainId"      : "migaloo-1",
	"rpc"          : "https://migaloo-rpc.dalnim.finance/",
	"rest"         : "https://migaloo-api.dalnim.finance/",
	"bip44"        : {
		"coinType": 118
	},
	defaultCurrency: {
		"coinDenom"       : "WHALE",
		"coinMinimalDenom": "uwhale",
		"coinDecimals"    : 6,
		"coinGeckoId"     : "white-whale"
	},
	"feeCurrencies": [
		{
			"coinDenom"       : "WHALE",
			"coinMinimalDenom": "uwhale",
			"coinDecimals"    : 6,
			"coinGeckoId"     : "white-whale",
			"gasPriceStep"    : {
				"low"    : 0.25,
				"average": 0.5,
				"high"   : 0.75
			}
		}
	],
	gasPrice       : "0.5uwhale",
	"stakeCurrency": {
		"coinDenom"       : "WHALE",
		"coinMinimalDenom": "uwhale",
		"coinDecimals"    : 6,
		"coinGeckoId"     : "white-whale"
	},
	"features"     : [
		"ibc-transfer",
		"ibc-go"
	]
}

export const DEFAULT_MAINNET = MIGALOO_MAINNET;

export const networks = [
	TERRA_MAINNET,
	TERRA_TESTNET,
	OSMOSIS_MAINNET,
	MARS_MAINNET,
	MIGALOO_MAINNET
];

export function getNetworkByChainId(chainId: string): Network {
	const network = networks.find((network) => network.chainId === chainId);
	if (!network) {
		throw new Error(`Network with chainId ${chainId} not found`);
	}
	return network;
}

export function fromNetworkToNativeDenom(chainId: string): string {
	switch (chainId) {
		case "phoenix-1":
			return "uluna";
		case "pisco-1":
			return "uluna";
		case "osmosis-1":
			return "uosmo";
		case "mars-1":
			return "umars";
		case "migaloo-1":
			return "uwhale";
		default:
			throw new Error(`Network with chainId ${chainId} not found`);
	}
}

export function fromNetworkToNativeSymbol(chainId: string): string {
	const denom = fromNetworkToNativeDenom(chainId);

	switch (denom) {
		case "uluna":
			return "LUNA";
		case "inj":
			return "INJ";
		case "uosmo":
			return "OSMO";
		case "umars":
			return "MARS";
		case "uwhale":
			return "WHALE";
		default:
			throw new Error(`Network with chainId ${chainId} not found`);
	}
}
