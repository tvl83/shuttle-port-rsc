"use client";
import {MsgExecuteContract, SimulateResult, useShuttle} from '@delphi-labs/shuttle';
import {useShuttlePortStore}                            from '@/config/store';
import useWallet                                        from '../hooks/useWallet';
import {useEffect, useState}                            from 'react';
import useFeeEstimate                                   from '@/hooks/useFeeEstimate';
import {useQuery}                                       from '@tanstack/react-query';
import {isMobile}                                       from '@walletconnect/browser-utils';

function ClaimButton() {
	const {broadcast, getWallets}     = useShuttle();
	const currentNetworkId            = useShuttlePortStore(
		(state) => state.currentNetworkId
	);
	const wallet                      = getWallets({chainId: currentNetworkId})[0];
	const [isClaiming, setIsClaiming] = useState(false);
	const [msgs, setMsgs]             = useState<MsgExecuteContract[]>([]);

	const handleClickClaim = async () => {
		setIsClaiming(true);
		let tx = {
			wallet,
			messages : [
				new MsgExecuteContract(
					{
						sender  : wallet.account.address,
						contract: 'migaloo15l9a6jpc86dkh366vpqn588pjuhvh0k87kwgmsqp2hsp349w0hvqguj5aw',
						msg     : {claim: {}},
						funds   : []
					})
			],
			mobile   : isMobile()
		}
		console.log(tx)
		broadcast(tx)
	}

	return (
		<>
			<button
				onClick={handleClickClaim}
				disabled={isClaiming || (wallet?.account?.address !== 'migaloo192ycaszmefnf5nve0rx9ude8pu7lgwrh037djw')}
			>
				{isClaiming ? "Processing..." : "Claim"}
			</button>
		</>
	)
}

export default ClaimButton;
