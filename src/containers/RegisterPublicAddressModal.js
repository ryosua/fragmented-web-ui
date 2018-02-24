import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Modal, Button } from 'react-bootstrap'
import text from 'util/text'
import UpdateUserPublicAddress from 'graphql/mutations/UpdateUserPublicAddress'
import getPublicAddressFromContext from 'util/getPublicAddressFromContext'

const {
    unlinkedAccountNavHelp,
    unlinkedAccountHelpBody,
    unlinkedAccountHelpConclusion,
    closeTipModal,
    linkButton
} = text.Tipping

const readyToLink = web3Context => web3Context.networkId === '1' && web3Context.selectedAccount

class RegisterPublicAddressModal extends React.Component {
    linkAccount = web3Context => {
        const publicAddress = getPublicAddressFromContext(web3Context)
        this.props
            .mutate({ variables: { id: this.props.user.id, publicAddress } })
            .then(({ data }) => console.log('registered address from Modal'))
            .catch(error => console.log(error))
    }

    render() {
        const { show, onClose } = this.props
        const web3Context = this.context.web3
        return (
            <Modal show={show} onHide={onClose}>
                <div className="modal-custom">
                    <Modal.Header>
                        <Modal.Title> {unlinkedAccountNavHelp}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{unlinkedAccountHelpBody}</p>
                        <ol>
                            <li>
                                If you do not have MetaMask installed,{' '}
                                <a href="https://metamask.io/">install Metamask</a>
                            </li>
                            <li>Create a wallet using MetaMask</li>
                            <li>Unlock your MetaMask wallet</li>
                            <li>{`Click the "${linkButton}" button below`}</li>
                        </ol>
                        <p>{unlinkedAccountHelpConclusion}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onClose}>{closeTipModal}</Button>
                        <Button
                            onClick={() => this.linkAccount(web3Context)}
                            bsStyle="primary"
                            disabled={!readyToLink(web3Context)}>
                            {linkButton}
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        )
    }
}

RegisterPublicAddressModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

RegisterPublicAddressModal.contextTypes = {
    web3: PropTypes.object
}

export default graphql(UpdateUserPublicAddress)(RegisterPublicAddressModal)
