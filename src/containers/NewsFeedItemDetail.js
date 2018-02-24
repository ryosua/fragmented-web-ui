import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import text from 'util/text'
import tippable from 'util/tippable'
import TipModal from 'containers/TipModal'
import PointerLink from 'styles/PointerLink'

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
                    ethToUsdRate={ethToUsdRate}
                />
                <p>
                    {`${text.NewsItems.usernamePrefix} ${user.username}  `}
                    {tippable(web3Context, user) && <PointerLink onClick={this.handleShowTipModal}>(tip)</PointerLink>}
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
