import { useEthers} from '@usedapp/core'


export function MaskConnection() {
    const { activateBrowserWallet, account, deactivate } = useEthers()

    return (
        <div>
        {!account && <button onClick={activateBrowserWallet}> Connect </button>}
        {account && <button onClick={deactivate}> Disconnect </button>}
        {account && <p>Account: {account}</p>}
        </div>
    );
}