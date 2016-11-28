import React from 'react';
import {connect} from 'react-redux';
import ApplicationPreview from './ApplicationPreview'

const ApplicationPreviewOnly = ({application}) => (
    <ApplicationPreview application={application}/>
);


const mapStateToProps = (state) => {
    return {
        application: state.application
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(ApplicationPreviewOnly);