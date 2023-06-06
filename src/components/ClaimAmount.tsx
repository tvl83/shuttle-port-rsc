"use client"
import {useShuttle}          from '@delphi-labs/shuttle';
import {useEffect, useState} from 'react';
import {useShuttlePortStore} from '@/config/store';
import axios                 from 'axios';

function ClaimAmount() {
	const {getWallets}                        = useShuttle();
	const currentNetworkId                    = useShuttlePortStore(
		(state) => state.currentNetworkId
	);
	const wallet                              = getWallets({chainId: currentNetworkId})[0];
	const [claimable, setClaimable]           = useState(0);
	const [vestingAddress, setVestingAddress] = useState("");

	useEffect(() => {
		if (wallet?.account?.address !== undefined) {
			console.log(`connected with ${wallet?.account?.address}`)
			axios.get('/api/getclaimable')
			     .then((res) => {
						 console.log(`res.data`,res.data)
				     setVestingAddress(res?.data?.address);
				     setClaimable(res?.data?.claimable);
			     })
		}
	}, [])

	return (
		<>
			{wallet?.account?.address !== undefined ? (
				<>
					{vestingAddress} can claim {claimable}WHALE
				</>
			) : (
				<>
					Connect Wallet
				</>
			)}
		</>
	)
}

export default ClaimAmount;
