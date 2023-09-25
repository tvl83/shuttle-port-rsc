import {NextRequest, NextResponse} from 'next/server';

const VESTING_CONTRACT: string      = `migaloo15l9a6jpc86dkh366vpqn588pjuhvh0k87kwgmsqp2hsp349w0hvqguj5aw`;
const MIGALOO_REST_ROOT_URL: string = 'https://api-whitewhale-ia.cosmosia.notional.ventures'
const BBL_VESTING_ACCOUNT: string   = 'migaloo192ycaszmefnf5nve0rx9ude8pu7lgwrh037djw'

export async function GET() {
	try {
		const availableAmount = (await getAvailableAmount(BBL_VESTING_ACCOUNT)).data;
		console.log(convertUWhaleToWhale(availableAmount))
		return new Response(JSON.stringify(
			{
				address: BBL_VESTING_ACCOUNT,
				claimable: convertUWhaleToWhale(availableAmount)
			})
		);
	} catch (e) {
		console.log(e)
		return new Response(JSON.stringify({error: "error"}));
	}
}



const vestingAccountsQueryMsgBase64 = () => {
	let msg = `{"vesting_accounts":{}}`
	return Buffer.from(msg).toString('base64')
}

const availableAmountQueryMsgBase64 = (address: string) => {
	let msg = `{"available_amount":{"address":"${address}"}}`
	return Buffer.from(msg).toString('base64')
}

async function getVestingAccounts() {
	try {
		const queryMsg: string = vestingAccountsQueryMsgBase64();
		const response         = await fetch(`${MIGALOO_REST_ROOT_URL}/cosmwasm/wasm/v1/contract/${VESTING_CONTRACT}/smart/${queryMsg}`,
		                                     {
			                                     method: 'GET'
		                                     });
		return await response.json();
	} catch (e) {
		console.error("getVestingAccounts error")
		console.log(e)
		return {};
	}
}

async function getAvailableAmount(address: string) {
	const queryMsg: string = availableAmountQueryMsgBase64(address);
	const response         = await fetch(`${MIGALOO_REST_ROOT_URL}/cosmwasm/wasm/v1/contract/${VESTING_CONTRACT}/smart/${queryMsg}`,
	                                     {
		                                     next  : {revalidate: 60},
		                                     method: 'GET'
	                                     })
	return await response.json()
}

function convertUWhaleToWhale(uwhale: string) {
	return Number(uwhale) / 1000000
}
