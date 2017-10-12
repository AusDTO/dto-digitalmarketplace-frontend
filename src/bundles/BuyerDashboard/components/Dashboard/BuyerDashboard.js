import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {withRouter, Link} from 'react-router-dom';
import DashboardBriefs from '../DashboardBriefs';
import TeamOverview from '../TeamOverview';
import BriefChoice from '../BriefChoice/BriefChoice';

import './BuyerDashboard.css'

import {actionCreators as actions} from '../../redux/modules/team';

class BuyerDashboard extends Component {

  constructor(props){
    super(props)
    this.state = {
      briefChoice: false
    }
  }

  toggleBriefChoice(){
    this.setState({
      briefChoice: !this.state.briefChoice
    })
  }

  onSelectView(value) {
    const {updateView} = this.props;
    updateView(value)
  }

  render() {
    const {team, location} = this.props;
    let pathname = location.pathname;
    let briefView = pathname.slice(pathname.lastIndexOf('/') + 1, pathname.length);
    briefView = (['teambriefs', 'teamoverview'].includes(briefView) ? briefView : 'mybriefs')
    
    return (
      <section>
      {(this.state.briefChoice ?
        <section>
          <article>
            <div>
                <BriefChoice handleToggle={() => this.toggleBriefChoice()}/>
            </div>
          </article>
        </section>
        :
        <section>
          <article styleName="team-view">
            <section styleName="team-view-heading">
              <div id="team-view-teamname" styleName="team-view-teamname">
                {team.teamName}
              </div>
              <div styleName="team-view-username">
              <span>
              <h1> Dashboard</h1>
                <button type="button" onClick={() => this.toggleBriefChoice()}>Start a new brief</button>
              </span>
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

                <hr/>
              </div>
            </article>
            <article>
              {(briefView === 'mybriefs') && (
                <DashboardBriefs
                  teamBriefView={false}
                  briefs={team.briefs}
                />
              )}
              {(briefView === 'teambriefs') && (
                <DashboardBriefs
                  teamBriefView={true}
                  briefs={team.teamBriefs}
                />
              )}
              {(briefView === 'teamoverview') && (
                <TeamOverview {...team}/>
              )}
            </article>
          </article>
        </section>
      )}
      </section>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const {team} = state;
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

