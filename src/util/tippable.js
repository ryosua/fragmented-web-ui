const tippable = (web3Context, recipient) => {
    return web3Context.networkId === '1' && web3Context.selectedAccount && recipient.publicAddress
}

export default tippable
