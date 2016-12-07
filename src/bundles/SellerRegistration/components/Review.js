import React from 'react';
import {connect} from 'react-redux';
import { Match, Link } from 'react-router';
import ApplicationPreview from './ApplicationPreview'

const Review = ({pathname, ...rest}) => (
    <div>
        <Match pattern={pathname} exactly render={() => (
            <div>
                <h1 tabIndex="-1">Preview</h1>
                <p>Make sure all your information is correct before you continue. </p>
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