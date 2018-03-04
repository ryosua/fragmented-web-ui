import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from 'react-bootstrap'
import text from 'util/text'
import tippable from 'util/tippable'
import PointerLink from 'styles/PointerLink'
import TipModal from 'containers/TipModal'

class TippableAuthor extends React.Component {
    state = {
        showTipModel: false
    }

    handleCloseTipModal = () => this.setState({ showTipModel: false })
    handleShowTipModal = () => this.setState({ showTipModel: true })

    render() {
        const web3Context = this.context.web3
        const { author, ethToUsdRate } = this.props
        return (
            <span>
                <TipModal
                    recipient={author}
                    show={this.state.showTipModel}
                    onClose={this.handleCloseTipModal}
                    ethToUsdRate={ethToUsdRate}
                />
                <p>
                    {`${text.NewsItems.usernamePrefix} ${author.username}  `}
                    {tippable(web3Context, author) && (
                        <PointerLink onClick={this.handleShowTipModal}>
                            <Badge>{text.Tipping.tipButton}</Badge>
                        </PointerLink>
                    )}
                </p>
            </span>
        )
    }
}
TippableAuthor.propTypes = {
    author: PropTypes.object.isRequired,
    ethToUsdRate: PropTypes.number
}

TippableAuthor.contextTypes = {
    web3: PropTypes.object
}

export default TippableAuthor
