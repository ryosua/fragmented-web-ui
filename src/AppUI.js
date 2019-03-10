import React from 'react'
import { number, func, shape } from 'prop-types'
import Home from 'components/Home'
import NewsFeedContainer from 'containers/NewsFeedContainer'
import NavigationContainer from 'containers/NavigationContainer'
import LoginContainer from 'containers/LoginContainer'
import SignupContainer from 'containers/SignupContainer'
import Submissions from 'components/Submissions'
import CreateNewsItemContainer from 'containers/CreateNewsItemContainer'
import Logout from 'components/Logout'
import NewsItemDetailView from 'components/NewsItemDetailView'
import { AppView } from '@aragon/ui'
import { Route } from 'react-router-dom'

const AppUI = ({ ethToUsdRate, onLogin, onLogout }) => (
    <AppView appBar={<NavigationContainer />}>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/newest" render={props => <NewsFeedContainer {...props} ethToUsdRate={ethToUsdRate} />} />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/login" render={() => <LoginContainer onLogin={onLogin} />} />
            <Route path="/create-post" component={CreateNewsItemContainer} />
            <Route
                path="/news-item-detail"
                render={props => <NewsItemDetailView {...props} ethToUsdRate={ethToUsdRate} />}
            />
            <Route path="/submissions" component={Submissions} />
            <Route path="/logout" render={() => <Logout onLogout={onLogout} />} />
        </div>
    </AppView>
)

AppUI.propTypes = {
    ethToUsdRate: number,
    onLogin: func,
    onLogout: func,
    history: shape({
        push: func
    })
}

export default AppUI
