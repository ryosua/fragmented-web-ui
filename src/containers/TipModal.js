import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import text from 'util/text'
import FormField from 'components/FormField'
import getConversionRate from 'util/getConversionRate'

const { tipBody, ethAmount, usdAmount } = text.Tipping

class TipModal extends React.Component {
    state = {
        ethAmount: 0,
        usdAmount: 0
    }

    componentDidMount() {
        getConversionRate()
            .then(response => {
                console.log(JSON.stringify(response.data.rates.ETH))
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { user, show, onClose, onTip } = this.props
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
                        onChange={() => {}}
                    />
                    <FormField
                        label={usdAmount}
                        type="number"
                        placeholder=""
                        value={this.state.usdAmount + ''}
                        onChange={() => {}}
                    />
                    <Modal.Footer>
                        <Button onClick={onClose}>Close</Button>
                        <Button onClick={onTip} bsStyle="primary">
                            Tip
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
    onTip: PropTypes.func.isRequired
}

export default TipModal
