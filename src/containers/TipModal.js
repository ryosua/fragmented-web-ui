import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { Modal, Button } from 'react-bootstrap'
import text from 'util/text'
import FormField from 'components/FormField'
import tip from 'util/tip'

const { tipBody, ethAmount, usdAmount, tipButton, closeTipModal } = text.Tipping
const defaultTipAmountInUsd = 1

class TipModal extends React.Component {
    state = {
        ethAmount: this.props.ethToUsdRate ? defaultTipAmountInUsd * this.props.ethToUsdRate : 0,
        usdAmount: this.props.ethToUsdRate ? defaultTipAmountInUsd : 0
    }

    handleEthAmountChange = e => {
        const value = e.target.value
        const usdValue = this.props.ethToUsdRate ? value / this.props.ethToUsdRate : undefined
        this.setState({ ethAmount: value, usdAmount: usdValue })
    }

    handleUsdAmountChange = e => {
        const value = e.target.value
        const ethValue = value * this.props.ethToUsdRate
        this.setState({ ethAmount: ethValue, usdAmount: value })
    }

    render() {
        const { user, show, onClose, ethToUsdRate } = this.props
        const onTip = debounce(() => tip(user, this.state.ethAmount), 1000)
        return (
            <Modal show={show} onHide={onClose}>
                <div className="tipModal">
                    <Modal.Header>
                        <Modal.Title>Tip {user.username}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{tipBody(user.username)}</Modal.Body>
                    <FormField
                        label={ethAmount}
                        type="number"
                        placeholder=""
                        value={this.state.ethAmount + ''}
                        onChange={this.handleEthAmountChange}
                    />
                    {ethToUsdRate && (
                        <FormField
                            label={usdAmount}
                            type="number"
                            placeholder=""
                            value={this.state.usdAmount + ''}
                            onChange={this.handleUsdAmountChange}
                        />
                    )}

                    <Modal.Footer>
                        <Button onClick={onClose}>{closeTipModal}</Button>
                        <Button onClick={onTip} bsStyle="primary" disabled={!this.state.ethAmount}>
                            {tipButton}
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        )
    }
}

TipModal.propTypes = {
    user: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    ethToUsdRate: PropTypes.number
}

export default TipModal
