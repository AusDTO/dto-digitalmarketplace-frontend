import React from 'react';
import {connect} from 'react-redux';
import { Match, Link } from 'react-router';
import ApplicationPreview from './ApplicationPreview'

const Review = ({pathname, ...rest}) => (
    <div>
        <Match pattern={pathname} exactly render={() => (
            <div>
                <h3>Review</h3>
                <p>Review the information that Buyers will see on your company profile. If the information is correct, continue to the final step to submit your application. If not, you can continue editing.</p>
                <p>
                    <Link to={`${pathname}/profile`}>Preview your profile</Link>
                </p>
            </div>
        )}/>
        <Match 
            pattern={`${pathname}/profile`}
            render={(routerProps) => (
                <ApplicationPreview {...routerProps} {...rest}  />
            )}
            component={ApplicationPreview} />
    </div>
);

const mapStateToProps = (state, ownProps) => {
    return ownProps
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Review);