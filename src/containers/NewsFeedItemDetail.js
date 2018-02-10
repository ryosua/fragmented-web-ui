import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import text from 'util/text'
import tippable from 'util/tippable'
import TipModal from 'containers/TipModal'

const eth = get(window, 'web3.eth', undefined)
const amount = 1292607577265618

const tip = user =>
    eth.sendTransaction(
        {
            from: eth.coinbase,
            to: user.publicAddress,
            value: amount
        },
        (error, result) => {
            if (!error) {
                console.log('Transaction successul!')
                console.log(result)
            } else {
                console.log('Error sending transaction.')
                console.log(error)
            }
        }
    )

class NewsFeedItemDetail extends React.Component {
    state = {
        showTipModel: false
    }

    handleCloseTipModal = () => this.setState({ showTipModel: false })
    handleShowTipModal = () => this.setState({ showTipModel: true })

    render() {
        const web3Context = this.context.web3
        const { user, pathname, id, comments, ethToUsdRate } = this.props
        const numberOfComments = comments.length
        return (
            <div>
                <TipModal
                    user={user}
                    show={this.state.showTipModel}
                    onClose={this.handleCloseTipModal}
                    onTip={() => tip(user)}
                    ethToUsdRate={ethToUsdRate}
                />
                <p>
                    {`${text.NewsItems.usernamePrefix} ${user.username}  `}
                    {tippable(web3Context, user) && (
                        <a id="tipButton" onClick={this.handleShowTipModal}>
                            (tip)
                        </a>
                    )}
                </p>
                <Link to={{ pathname: pathname, search: `?id=${id}` }}>{`${numberOfComments} ${text.Comments.comments(
                    numberOfComments
                )}`}</Link>
            </div>
        )
    }
}

NewsFeedItemDetail.propTypes = {
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    state: PropTypes.object,
    ethToUsdRate: PropTypes.number
}

NewsFeedItemDetail.contextTypes = {
    web3: PropTypes.object
}

export default NewsFeedItemDetail
