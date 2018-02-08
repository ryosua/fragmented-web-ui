const tippable = (web3Context, user) => {
    return web3Context.networkId === '1' && user.publicAddress
}

export default tippable
