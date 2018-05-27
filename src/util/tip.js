import get from 'lodash/get'

const eth = get(window, 'web3.eth', undefined)
const WEI_PER_ETHER = 1000000000000000000

const tip = (user, ethAmount) => {
    const value = Math.round(WEI_PER_ETHER * ethAmount)
    eth.sendTransaction({
        from: eth.coinbase,
        to: user.publicAddress,
        value
    })
}

export default tip
