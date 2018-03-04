import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import text from 'util/text'
import TippableAuthor from 'components/TippableAuthor'

class NewsFeedItemDetail extends React.Component {
    render() {
        const { author, pathname, id, comments, ethToUsdRate } = this.props
        const numberOfComments = comments.length
        return (
            <div>
                <TippableAuthor author={author} ethToUsdRate={ethToUsdRate} />
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
    author: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    state: PropTypes.object,
    ethToUsdRate: PropTypes.number
}

export default NewsFeedItemDetail
