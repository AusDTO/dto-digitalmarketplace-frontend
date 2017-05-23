import React, {Component} from 'react';
import {connect} from 'react-redux';
import {convertApplicationToSeller, rejectApplication, revertApplication} from '../../redux/modules/applications';
import {Modal} from '../../../../shared/Modal/Modal';
import RevertNotificationForm from '../RevertNotification/RevertNotification'
import format from 'date-fns/format';

import './AppList.css'

class AppList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      msg: ''
    };
  }

  toggleModal(id) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      applicationID: id || null
    });
  };

  render() {
    const {meta = {}, applications, onRejectClick, onRevertClick, onAcceptClick} = this.props;
    let revertedAppID = this.state.applicationID || null;
    let revertedApp = (!revertedAppID ? null : applications.filter(x => x.id === revertedAppID)[0]);

    let {revertStatus, name: revertName} = (!revertedApp ? {} : revertedApp);

    return (
      <div styleName="appList">
        <h2>{meta.heading}</h2>
        {typeof revertStatus === 'boolean' &&
        <div styleName="callout--info">
          {(revertStatus ?
              <h4>{`Reversion email sent successfully to ${revertName}`}</h4> :
              <h4>{`Reversion email was not sent to ${revertName}`}</h4>
          )}
        </div>
        }
        <Modal show={ this.state.modalOpen }
               onClose={() => this.toggleModal()}>
          <RevertNotificationForm
            onSubmit={onRevertClick}
            altSubmit={(id) => this.toggleModal(id)}
            id={this.state.applicationID}
          />
        </Modal>
        <table className="content-table">

          <thead>
          <tr>
            <th>created_at/submitted_at</th>
            <th>name</th>
            <th>type</th>
            <th>jira</th>
            <th>actions</th>
          </tr>
          </thead>

          <tbody>

          {applications.map((a, i) => {
            var latestDate = a.created_at;
            if (a.submitted_at) {
              latestDate = a.submitted_at;
            }
            return (
              <tr key={a.id}>
                <td>{format(new Date(latestDate), 'YYYY-MM-DD HH:mm')}</td>
                <td><a target="_blank" href={meta.url_preview.concat(a.id) }>{a.name || "[no name]"}
                  {a.supplier_code && (<span className="badge--default">Existing</span>)}
                  {(a.recruiter === 'yes' || a.recruiter === 'both') && (
                    <span className="badge--beta">Recruiter</span>)}
                </a></td>
                <td>{a.type}</td>
                <td>
                  {a.tasks && a.tasks.subtasks.map((t, i) =>
                    <a target="_blank" rel="external" styleName={t.status} key={t.key} href={t.link}>{t.summary}</a>
                  )}
                </td>
                <td>
                  { a.status === 'submitted' &&
                  <button onClick={e => {
                    e.preventDefault();
                    onRejectClick(a.id);
                  }} name="Reject" styleName="reject">Reject</button>
                  }
                  { a.status === 'submitted' &&
                  <button onClick={e => {
                    e.preventDefault();
                    onAcceptClick(a.id);
                  }} name="Accept">Accept</button>
                  }
                  { (a.status === 'submitted' && a.type === 'edit') &&
                  <button onClick={e => {
                    e.preventDefault();
                    this.toggleModal(a.id)
                  }} name="Revert" styleName="revert">Revert</button>
                  }
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

const mapStateToProps = ({applications, meta, form_options}, ownProps) => {
  return {
    ...ownProps,
    applications,
    meta,
    form_options
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAcceptClick: (id) => {
      dispatch(convertApplicationToSeller(id))
    },
    onRevertClick: (id, msg) => {
      dispatch(revertApplication(id, msg))
    },
    onRejectClick: (id) => {
      dispatch(rejectApplication(id))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
