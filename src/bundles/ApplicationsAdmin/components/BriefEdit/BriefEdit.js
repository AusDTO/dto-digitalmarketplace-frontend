import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Control, LocalForm } from 'react-redux-form';
import {briefSave} from '../../redux/modules/brief';
import './BriefEdit.css';


class BriefEdit extends Component {

  render() {
    const {brief, onBriefSubmit} = this.props;
    const data = brief.data;

    let errorMsg = null;
    if (brief.error === false){
      errorMsg = '';
    } else {
      errorMsg = brief.error ? 
          <p className="error-message">{brief.error}</p> :
          <p><b>Saved!</b></p>
    }

    return (
      <article id="content" className="content-main">
        <header className="page-heading page-heading-without-breadcrumb">
          <h1 className="au-display-xl">
            {data.title} ({data.id})
          </h1>
        </header>
        {errorMsg}
        <LocalForm onSubmit={onBriefSubmit} initialState={brief}>
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
    onBriefSubmit: (values) => {
      dispatch(briefSave(values))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BriefEdit);
