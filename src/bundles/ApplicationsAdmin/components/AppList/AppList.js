import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {convertApplicationToSeller, rejectApplication, searchApplications, deleteApplication} from '../../redux/modules/applications';
import {Modal} from '../../../../shared/Modal/Modal';
import {ConnectedRevertedForm} from '../RevertNotification/RevertNotification'
import format from 'date-fns/format';

import {templateString} from '../../revertEmailTemplate';
import './AppList.css'

class AppList extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired,
    applications: PropTypes.array,
    onRejectClick: PropTypes.func.isRequired,
    onAcceptClick: PropTypes.func.isRequired,
    onKeywordChange: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    keyword: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      msg: '',
      updated: false,
      responseModalOpen: false,
      keyword: 'ddddddd'
    };
  }

  sortDate(applications) {
    return applications.sort(function (a, b) {
     return new Date(a.submitted_at) - new Date(b.submitted_at);
    });
  }

  toggleModal(id, msg) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      applicationID: id || null,
      msg: msg
    });
  };
 
  toggleResponseModal() {
    this.setState({
      responseModalOpen: !this.state.responseModalOpen
    })
  }

  handleOnChange = event =>{
    this.setState({
      keyword: event.target.value
    })
    this.props.onKeywordChange(event)
  }

  render() {
    const {
      meta = {},
      applications = [],
      onRejectClick,
      onAcceptClick,
      onKeywordChange,
      onDeleteClick
    } = this.props;

    let revertedAppID = this.state.applicationID || null;
    let revertedApp = (!revertedAppID ? null : applications.filter(x => x.id === revertedAppID)[0]);

    let {revertStatus, name: revertName} = (!revertedApp ? {} : revertedApp);

    return (
      <div styleName="appList">
        <div className="row">
            <div className="col-sm-8 col-xs-12">
              <h2 className="au-display-lg">{meta.heading}</h2>
            </div>
            <div className="col-sm-4 col-xs-12">
              <label htmlFor="keyword">Search:</label>
              <input id="keyword" type="text" size="30" placeholder="id or name" onChange={this.handleOnChange}/>
            </div>
        </div>
        <div className="row">
          {this.state.keyword}
        </div>
        <Modal show={this.state.responseModalOpen}>
          <div styleName={`callout--${(revertStatus ? 'info' : 'warning')}`}>
            {(revertStatus ? (this.state.msg !== '' ?
                <h4 className="au-display-sm">{`Reversion email sent successfully to ${revertName}`}</h4> :
                <h4 className="au-display-sm">{`Application from ${revertName} successfully reverted without email notification`}</h4>) :
                <h4 className="au-display-sm">{`Reversion email was not sent to ${revertName}`}</h4>
            )}
          </div>
          <button
            type="button"
            style={{width: '90px', height: '30px'}}
            onClick={() => this.toggleResponseModal()}>
            close
          </button>
        </Modal>

        {this.state.applicationID &&
        <div id="modal-wrapper">
          <Modal show={ this.state.modalOpen }>
            <ConnectedRevertedForm
              defaultMessage={templateString}
              onClose={(id, msg) => this.toggleModal(id, msg)}
              appID={this.state.applicationID}
              revertStatus={revertStatus}
            />
          </Modal>
        </div>}
        <table className="content-table">

          <thead>
          <tr>
            <th>submitted_at</th>
            <th>name</th>
            <th>type</th>
            <th>status</th>
            <th>jira</th>
            <th>actions</th>
          </tr>
          </thead>

          <tbody>

          {(this.sortDate(applications) || applications).map((a, i) => {
            return (
              <tr key={i}>
                <td>{format(new Date(a.submitted_at), 'YYYY-MM-DD HH:mm')}</td>
                <td><a target="_blank" href={meta.url_preview.concat(a.id) } className="application">{a.name || "[no name]"}
                  {a.supplier_code && (<span className="badge--default">Existing</span>)}
                  {(a.recruiter === 'yes' || a.recruiter === 'both') && (
                    <span className="badge--beta">Recruiter</span>)}
                </a></td>
                <td>{a.type}</td>
                <td>{a.status}</td>
                <td>
                  {a.tasks && a.tasks.subtasks.map((t, i) =>
                    <a target="_blank" rel="noopener noreferrer" styleName={t.status} key={t.key} href={t.link}>{t.summary}</a>
                  )}
                </td>
                <td>
                  {
                    (a.status === 'submitted' && !a.revertStatus) && <span>

                  <button onClick={e => {
                    e.preventDefault();
                    this.toggleModal(a.id)
                    this.toggleResponseModal()
                  }} name="Revert" styleName="revert">Revert</button>

                  <button onClick={e => {
                    e.preventDefault();
                    onAcceptClick(a.id);
                  }} name="Accept">Accept</button>

                  <a href="#" onClick={e => {
                    e.preventDefault();
                    onRejectClick(a.id);
                  }} name="Reject" styleName="action">Reject</a>
                  
                  <a href={meta.url_edit_application.concat(a.id,'/start')} styleName="action">Edit</a>

                    </span>
                  }
                  {
                    (a.status === 'submitted' || a.status === 'saved') && <span>
                      <a href={`/admin/applications/${a.id}/edit`} styleName="action">JSON Editor</a>
                    </span>
                  }
                  {
                    a.type === 'edit' && <span>
                      <a href={`/admin/applications/${a.id}/diff`} styleName="action">Diff</a>
                    </span>
                  }
                  {(a.status !== 'deleted' &&
                    <span>
                      
                      <a href={`/admin/applications/${a.id}/users`} styleName="action">Users</a>
                      <a href="#" onClick={e => {
                        e.preventDefault(); 
                        if (window.confirm('Are you sure ?')) {
                          onDeleteClick(a.id);
                        }
                      }} name="Delete" styleName="action">Delete</a>
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({applications, meta, onRejectClick, onAcceptClick, onKeywordChange, onDeleteClick}, ownProps) => {
  return {
    ...ownProps,
    applications,
    meta,
    onRejectClick,
    onAcceptClick,
    onKeywordChange,
    onDeleteClick
  };
};

const mapDispatchToProps = (dispatch) => {
  var searchTimeout;
  return {
    onAcceptClick: (id) => {
      dispatch(convertApplicationToSeller(id))
    },
    onRejectClick: (id) => {
      dispatch(rejectApplication(id))
    },
    onKeywordChange: (event) => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
        searchTimeout = 0;
      }
      let callback = (value) => {
        dispatch(searchApplications(value));
      }
      searchTimeout = setTimeout(callback.bind(null, event.target.value), 1000);
    },
    onDeleteClick: (id) => {
      dispatch(deleteApplication(id))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
