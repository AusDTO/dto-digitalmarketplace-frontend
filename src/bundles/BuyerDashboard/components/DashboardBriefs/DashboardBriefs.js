import React from 'react';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';
import parse from 'date-fns/parse'

import './DashboardBriefs.css'


export const DashboardBriefs = props => {
  let {live = [], closed = [], draft = []} = props.briefs;
  let teamBriefView = props.teamBriefView

  return (
    <div styleName="dashboard-main">
      <DraftBriefs
        draft={draft}
        teamBriefView={teamBriefView}
      />

      {!teamBriefView && (
        <div styleName="create-opportunity-link">
          <p>
            <a href={"/buyers/frameworks/digital-marketplace/requirements/digital-professionals"}>
              Create a new opportunity for a digital specialist
            </a>
          </p>
          <p>
            <a href={"/buyers/frameworks/digital-marketplace/requirements/digital-outcome/"}>
              Create a new opportunity for an outcome
            </a>
          </p>
        </div>
      )}

      <LiveBriefs
        live={live}
        teamBriefView={teamBriefView}
      />

      <ClosedBriefs
        closed={closed}
        teamBriefView={teamBriefView}
      />

      <div>
        <h3>Need a hand?</h3>
        <span>
        <a href="/buyers-guide">Read the buyers guide </a>or
        <a href={"mailto:" + "marketplace@digital.gov.au"}> send us an email </a>
        - We can help you write your brief.
      </span>
      </div>
    </div>
  )
}

DashboardBriefs.propTypes = {
  live: React.PropTypes.array,
  closed: React.PropTypes.array,
  draft: React.PropTypes.array,
  teamBriefView: React.PropTypes.bool
}

export const DraftBriefs = props => {
  const {draft, teamBriefView} = props

  return (
    <section>
      <h2>Draft briefs</h2>
      {(isEmpty(draft) ?
          "You haven't started any opportunities." :
          <table styleName="brief-table summary-item-body">
            <thead className="summary-item-field-headings-visible">
            <tr>
              <th styleName="left-header">{(teamBriefView ? "Brief Preview" : "Brief Overview")}</th>
              <th>Created</th>
              <th styleName="right-header">Unanswered questions</th>
            </tr>
            </thead>
            <tbody>
            {draft.map((item, i) => {
              return (
                <tr className="summary-item-row" key={i}>
                  <td styleName="item-field">
                    {(teamBriefView &&
                    <a href={"/" + item.frameworkSlug + "/opportunities/" + item.id}>
                      {item.title}
                    </a>)}
                    {(!teamBriefView &&
                      <a href={"/buyers/frameworks/".concat(
                        item.frameworkSlug,
                        "/requirements/",
                        item.lotSlug, "/",
                        item.id)}>
                        {item.title}
                      </a>
                    )}
                  </td>
                  <td styleName="item-field">
                    {formatDate(item.createdAt)}
                  </td>
                  <td styleName="item-field">
                    <div>{item.unanswered_required} required</div>
                    <div>{item.unanswered_optional} optional</div>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
      )}
    </section>
  )
}

DraftBriefs.propTypes = {
  draft: React.PropTypes.array.isRequired
}


export const ClosedBriefs = props => {
  const {closed, teamBriefView} = props;

  return (
    <section>
      <h2>Closed briefs</h2>
      {(isEmpty(closed) ?
          "You don't have any closed briefs." :
          <table styleName="brief-table summary-item-body">
            <thead className="summary-item-field-headings-visible">
            <tr>
              <th styleName="left-header">{(teamBriefView ? "Brief Preview" : "Brief Overview")}</th>
              <th styleName="middle-header">Closed</th>
              <th styleName="right-header">{teamBriefView ? "Brief Response" : "Work Order"}</th>
            </tr>
            </thead>
            <tbody>
            {closed.map((item, i) => {
              return (
                <tr className="summary-item-row" key={i}>
                  <td styleName="closed-item-field-title">
                    {(teamBriefView &&
                    <a href={"/" + item.frameworkSlug + "/opportunities/" + item.id}>
                      {item.title}
                    </a>)}
                    {(!teamBriefView &&
                      <a href={"/buyers/frameworks/".concat(
                        item.frameworkSlug,
                        "/requirements/",
                        item.lotSlug, "/",
                        item.id)}>
                        {item.title}
                      </a>
                    )}
                  </td>
                  <td styleName="closed-item-field-date">
                    {formatDate(item.dates.closing_date)}
                  </td>
                  <td styleName="closed-item-field-actions">
                  <span>
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id, '/responses')}>
                      View responses
                    </a>{' '}
                    {(!teamBriefView &&
                      <span>
                      {(!item.work_order_id ?
                        <a href={"/buyers/frameworks/".concat(
                          item.frameworkSlug,
                          "/requirements/",
                          item.lotSlug, "/",
                          item.id,
                          '/work-orders/create')}>
                          Create work order
                        </a> :
                        <a href={
                          '/work-orders/' +
                          item.work_order_id}>
                          Edit work order
                        </a>)}
                      </span>
                    )}
                  </span>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
      )}
    </section>
  )
}

ClosedBriefs.propTypes = {
  closed: React.PropTypes.array.isRequired
}

export const LiveBriefs = props => {
  const {live, teamBriefView} = props;

  return (
    <section styleName="live-brief-container">
      <h2>Live briefs</h2>
      {(isEmpty(live) ?
          "You don't have any live briefs." :
          <table styleName="brief-table summary-item-body">
            <thead>
            <tr>
              <th styleName="left-header">Brief Overview</th>
              <th styleName="middle-header">Published</th>
              <th styleName="right-header">Closing</th>
            </tr>
            </thead>
            <tbody>
            {live.map((item, i) => {
              return (
                <tr className="summary-item-row" key={i}>
                  <td styleName="item-field">
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id)}>
                      {item.title}
                    </a>
                  </td>
                  <td styleName="item-field">
                    {formatDate(item.dates.published_date)}
                  </td>
                  <td styleName="item-field">
                    {formatDate(item.dates.closing_date)}
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
      )}
    </section>
  )
}

LiveBriefs.propTypes = {
  live: React.PropTypes.array.isRequired
}

const formatDate = date => {
  let dateObj = parse(new Date(date || ''));
  return format(dateObj, 'dddd D MMMM YYYY')
}
