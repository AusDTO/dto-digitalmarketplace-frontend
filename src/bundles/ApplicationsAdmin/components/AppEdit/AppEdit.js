import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Control, LocalForm } from 'react-redux-form';
import {appSave} from '../../redux/modules/application';
import './AppEdit.css';


class AppEdit extends Component {

  render() {
    const {application, onAppSubmit} = this.props;
    const data = application.data

    let errorMsg = null;
    if (application.error === false){
      errorMsg = '';
    } else {
      errorMsg = application.error ? 
          <p className="error-message">{application.error}</p> :
          <p><b>Saved!</b></p>
    }

    return (
      <article id="content" className="content-main">
        <header className="page-heading page-heading-without-breadcrumb">
          <h1 className="au-display-xl">
            {data.name} ({data.supplierCode})
          </h1>
        </header>
        {errorMsg}
        <LocalForm onSubmit={onAppSubmit} initialState={application}>
          <Control.textarea autoComplete="off" className="text-box" model=".jsonData"/>
          <button className="button-save">Save</button>
        </LocalForm>
      </article>
    )
  }
}

const mapStateToProps = (ownProps) => {
  return {
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAppSubmit: (values) => {
      dispatch(appSave(values))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppEdit);
