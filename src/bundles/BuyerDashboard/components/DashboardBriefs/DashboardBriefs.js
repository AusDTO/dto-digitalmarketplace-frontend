import React from 'react';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';
import parse from 'date-fns/parse'
import {sortByDate} from '../../../../helpers'

import './DashboardBriefs.css'


export const DashboardBriefs = props => {
  let {live = [], closed = [], draft = []} = props.briefs;
  let teamBriefView = props.teamBriefView;

  // sortByDate(dateArray, briefTypeString, sortDirections)
  live = Array.from(sortByDate(live, 'live', 'asc')) || live;
  closed = Array.from(sortByDate(closed, 'closed', 'asc')) || closed;
  draft = Array.from(sortByDate(draft, 'draft', 'asc')) || draft;

  return (
    <div styleName="dashboard-main">
      <DraftBriefs
        draft={draft}
        teamBriefView={teamBriefView}
      />

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
};

DashboardBriefs.propTypes = {
  live: React.PropTypes.array,
  closed: React.PropTypes.array,
  draft: React.PropTypes.array,
  teamBriefView: React.PropTypes.bool
};

export const DraftBriefs = props => {
  const {draft, teamBriefView} = props

  return (
    <section>
      <h2>Draft briefs</h2>
      {(isEmpty(draft) ?
          "You haven't started any opportunities." :
          <table styleName="brief-table summary-item-body">
            <thead styleName="summary-item-field-heading">
            <tr>
              <th styleName="left-header">{(teamBriefView ? "Brief Preview" : "Brief Overview")}</th>
              <th styleName="middle-header">{(teamBriefView ? "Author" : "Created")}</th>
              <th styleName="middle-header">{(teamBriefView ? "Created" : "Questions left")}</th>
            </tr>
            </thead>
            <tbody>
            {draft.map((item, i) => {
              return (
                <tr className="summary-item-row" key={i}>
                  <td styleName="item-field-first-full">
                    <h5>Brief overview</h5>
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

                  {(teamBriefView ?
                    <td styleName="item-field-second-left">
                      <h5>Author</h5>
                      {item.author}
                    </td>
                      :
                    <td styleName="item-field-second-left">
                      <h5>Created</h5>
                      {formatDate(item.createdAt)}
                    </td>
                  )}
                  {(teamBriefView ?
                    <td styleName="item-field-third-right">
                    <h5>Created</h5>
                      {formatDate(item.createdAt)}
                    </td>
                      :
                    <td styleName="item-field-third-right">
                      <h5>Questions left</h5>
                      <div>{item.unanswered_required} required</div>
                      <div>{item.unanswered_optional} optional</div>
                    </td>
                  )}
                </tr>
              )
            })}
            </tbody>
          </table>
      )}
    </section>
  )
};

DraftBriefs.propTypes = {
  draft: React.PropTypes.array.isRequired
};


export const ClosedBriefs = props => {
  const {closed, teamBriefView} = props;

  return (
    <section>
      <h2>Closed briefs</h2>
      {(isEmpty(closed) ?
          "You don't have any closed briefs." :
          <table styleName="brief-table summary-item-body">
            <thead styleName="summary-item-field-heading">
            <tr>
              <th styleName="left-header">{(teamBriefView ? "Brief Preview" : "Brief Overview")}</th>
              <th styleName="middle-header">Author</th>
              <th styleName="middle-header">Closed</th>
            </tr>
            </thead>
            <tbody>
            {closed.map((item, i) => {
              return (
                <tr className="summary-item-row" key={i}>
                  <td styleName="item-field-first-full">
                    <h5>Brief preview</h5>
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
                  <td styleName="item-field-second-left">
                    <h5>Author</h5>
                    {item.author}
                  </td>
                  <td styleName="item-field-third-right">
                    <h5>Closed</h5>
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
};

ClosedBriefs.propTypes = {
  closed: React.PropTypes.array.isRequired
};

export const LiveBriefs = props => {
  const {live, teamBriefView} = props;

  return (
    <section styleName="live-brief-container">
      <h2>Live briefs</h2>
      {(isEmpty(live) ?
          "You don't have any live briefs." :
          <table styleName="brief-table summary-item-body">
            <thead styleName="summary-item-field-heading">
            <tr>
              <th styleName="left-header">Brief Overview</th>
              <th styleName="middle-header">Author</th>
              <th styleName="middle-header">Published</th>
              <th styleName="middle-header">Q&A</th>
            </tr>
            </thead>
            <tbody>
            {live.map((item, i) => {
              return (
                <tr className="summary-item-row" key={i}>
                  <td styleName="item-field-first">
                    <h5>Brief preview</h5>
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id)}>
                      {item.title}
                    </a>
                  </td>
                  <td styleName="item-field-second-right">
                    <h5>Author</h5>
                    {item.author}
                  </td>
                  <td styleName="item-field-third-left">
                    <h5>Published</h5>
                    {formatDate(item.dates.published_date)}
                  </td>
                  <td styleName="item-field-fourth">
                    <h5>Q&A</h5>
                    <a href={"/buyers/frameworks/digital-marketplace/requirements/".concat(
                      item.lotSlug, "/",
                      item.id,
                      "/supplier-questions")}>
                      Answer a question
                    </a>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
      )}
    </section>
  )
};

LiveBriefs.propTypes = {
  live: React.PropTypes.array.isRequired
};

const formatDate = date => {
  let dateObj = parse(new Date(date || ''));
  return format(dateObj, 'dddd D MMMM YYYY')
};
