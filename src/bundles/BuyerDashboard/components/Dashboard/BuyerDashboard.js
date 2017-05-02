import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {withRouter, Link} from 'react-router-dom';
import {MyBriefs, TeamBriefs, TeamOverview} from '../Views/Views';

import './BuyerDashboard.css'

import {actionCreators as actions} from '../../redux/modules/team';

class BuyerDashboard extends Component {

  onSelectView(value) {
    const {updateView} = this.props;
    updateView(value)
  }

  render() {
    const {team = {}, match, location} = this.props;
    let pathname = location.pathname;
    let briefView = pathname.slice(pathname.lastIndexOf('/')+1, pathname.length);
    if(briefView === 'buyers') { briefView = 'mybriefs'}

    return (
      <section>
          <article styleName="team-view">
            <section styleName="team-view-heading">
              <div styleName="team-view-teamname">
                {team.teamName}
              </div>
              <div styleName="team-view-username">
                {team.currentUserName}
              </div>
            </section>
            <article styleName="filters" className="row">
              <div className="row">
                <div className="col-xs-12 col-sm-12">
                  <Link to="/buyers/mybriefs"
                        onClick={() => this.onSelectView('mybriefs')}
                        styleName={`${briefView === 'mybriefs' ? 'active-filter' : ''} filter`}>
                    My briefs
                  </Link>
                  <Link to="/buyers/teambriefs"
                        onClick={() => this.onSelectView('teambriefs')}
                        styleName={`${briefView === 'teambriefs' ? 'active-filter' : ''} filter`}>
                    Team briefs
                  </Link>
                  <Link to="/buyers/teamoverview"
                        onClick={() => this.onSelectView('teamoverview')}
                        styleName={`${briefView === 'teamoverview' ? 'active-filter' : ''} filter`}>
                    Team overview
                  </Link>
                </div>
              </div>
              <hr/>
            </article>
            <article>
              {(briefView === 'mybriefs') && (
                <MyBriefs {...team.briefs}/>
              )}
              {(briefView === 'teambriefs') && (
                <TeamBriefs {...team}/>
              )}
              {(briefView === 'teamoverview') && (
                <TeamOverview {...team}/>
              )}
            </article>
          </article>

      </section>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const {team = {teamName, members, briefs}} = state;
  return {
    team,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...actions,}, dispatch),
  updateView: (value) => {
    dispatch(actions.updateView(value))
  }
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerDashboard));

