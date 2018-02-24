const tippable = (web3Context, user) => {
    return web3Context.networkId === '1' && web3Context.selectedAccount && user.publicAddress
}

export default tippable
