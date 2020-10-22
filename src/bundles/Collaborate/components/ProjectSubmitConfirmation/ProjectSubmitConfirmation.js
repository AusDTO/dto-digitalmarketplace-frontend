import React from 'react';
import {connect} from 'react-redux';
import Icon from '../../../../shared/Icon';

import './ProjectSubmitConfirmation.css'

class ProjectSubmitConfirmation extends React.Component {

    render() {
        return (
            <section>
                <h1 className="au-display-xl"><Icon value="complete-tick" size={30}/><span styleName="callout-heading">Thanks for adding your project!</span></h1>
                <p>Your project will be added to the new collaboration area on the Marketplace in the coming weeks.<br/>
                    If you have any questions or feedback, email us at <a href="mailto:marketplace@dta.gov.au">marketplace@dta.gov.au</a>.</p>
            </section>
        )
    }
}

ProjectSubmitConfirmation.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.form_options,
        ...ownProps
    }
}

export default connect(mapStateToProps)(ProjectSubmitConfirmation)
