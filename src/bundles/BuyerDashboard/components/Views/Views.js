import React from 'react';
import {Link} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';

import './Views.css'

export const MyBriefs = ({all, closed, draft, live}) => (
  <div className="content-main">
    <h2>Drafts</h2>
    {(isEmpty(draft) ?
        "You haven't started any opportunities." :
        <table className="content-table summary-item-body">
          <thead className="summary-item-field-headings-visible">
          <tr>
            <th className="summary-item-field-heading-first">Brief Overview</th>
            <th className="summary-item-field-heading">Created</th>
            <th className="summary-item-field-heading">Unanswered questions</th>
          </tr>
          </thead>
          <tbody>
          {draft.map((item, i) => {
            return (
              <tr className="summary-item-row" key={i}>
                <td className="summary-item-field">
                  <a href={"/buyers/frameworks/".concat(
                    item.frameworkSlug,
                    "/requirements/",
                    item.lotSlug, "/",
                    item.id)}>
                    {item.title}
                  </a>
                </td>
                <td className="summary-item-field">
                  {format(item.createdAt, 'dddd d MMMM YYYY')}
                </td>
                <td className="summary-item-field">
                  <div>{item.unanswered_required} required</div>
                  <div>{item.unanswered_optional} optional</div>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
    )}
    <div>
      <p>
        <a href={(!isEmpty(all) ?
          "/buyers/frameworks/".concat(
            all[0].frameworkSlug,
            "/requirements/digital-professionals"
          ) : '')}>
          Create a new opportunity for a digital specialist
        </a>
      </p>
      <p>
        <a href={(!isEmpty(all) ?
          "/buyers/frameworks/".concat(
            all[0].frameworkSlug,
            "/requirements/",
            all[0].lotSlug, "/"
          ) : '')}>
          Create a new opportunity for an outcome
        </a>
      </p>
    </div>

    <h2>Live briefs</h2>
    {(isEmpty(live) ?
        "You don't have any live briefs." :
        <table className="content-table summary-item-body">
          <thead className="summary-item-field-headings-visible">
          <tr>
            <th className="summary-item-field-heading-first">Brief Overview</th>
            <th className="summary-item-field-heading">Published</th>
            <th className="summary-item-field-heading">Closing</th>
          </tr>
          </thead>
          <tbody>
          {live.map((item, i) => {
            return (
              <tr className="summary-item-row" key={i}>
                <td className="summary-item-field">
                  <a href={"/buyers/frameworks/".concat(
                    item.frameworkSlug,
                    "/requirements/",
                    item.lotSlug, "/",
                    item.id)}>
                    {item.title}
                  </a>
                </td>
                <td className="summary-item-field">
                  {format(item.dates.published_date || '', 'dddd d MMMM YYYY')}
                </td>
                <td className="summary-item-field">
                  {format(item.dates.closing_date || '', 'dddd d MMMM YYYY')}
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
    )}

    <h2>Closed briefs</h2>
    {(isEmpty(closed) ?
        "You don't have any live briefs." :
        <table className="content-table summary-item-body">
          <thead className="summary-item-field-headings-visible">
          <tr>
            <th styleName="summary-item-field-heading-first">Brief Overview</th>
            <th styleName="summary-item-field-heading">Closed</th>
            <th styleName="summary-item-field-heading">Work order</th>
          </tr>
          </thead>
          <tbody>
          {closed.map((item, i) => {
            return (
              <tr className="summary-item-row" key={i}>
                <td className="summary-item-field">
                  <a href={"/buyers/frameworks/".concat(
                    item.frameworkSlug,
                    "/requirements/",
                    item.lotSlug, "/",
                    item.id)}>
                    {item.title}
                  </a>
                </td>
                <td className="summary-item-field">
                  {format(item.dates.closing_date || '', 'dddd d MMMM YYYY')}
                </td>
                <td styleName="summary-item-field">
                  <span>
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id, '/responses')}>
                      View responses
                    </a>{' '}
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id,
                      '/work-orders/create')}>
                      Create work order
                    </a>
                  </span>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
    )}
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


export const TeamBriefs = ({members}) => {
  const closed=[], all=[], live=[], draft=[]

  return (
    <div className="content-main">
      <h2>Team Drafts</h2>
      {(isEmpty(draft) ?
          "You haven't started any opportunities." :
          <table className="content-table summary-item-body">
            <thead className="summary-item-field-headings-visible">
            <tr>
              <th className="summary-item-field-heading-first">Brief Overview</th>
              <th className="summary-item-field-heading">Created</th>
              <th className="summary-item-field-heading">Unanswered questions</th>
            </tr>
            </thead>
            <tbody>
            {draft.map((item, i) => {
              return (
                <tr className="summary-item-row" key={i}>
                  <td className="summary-item-field">
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id)}>
                      {item.title}
                    </a>
                  </td>
                  <td className="summary-item-field">
                    {format(item.createdAt, 'dddd d MMMM YYYY')}
                  </td>
                  <td className="summary-item-field">
                    <div>{item.unanswered_required} required</div>
                    <div>{item.unanswered_optional} optional</div>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
      )}
      <div>
        <p>
          <a href={(!isEmpty(all) ?
            "/buyers/frameworks/".concat(
              all[0].frameworkSlug,
              "/requirements/digital-professionals"
            ) : '')}>
            Create a new opportunity for a digital specialist
          </a>
        </p>
        <p>
          <a href={(!isEmpty(all) ?
            "/buyers/frameworks/".concat(
              all[0].frameworkSlug,
              "/requirements/",
              all[0].lotSlug, "/"
            ) : '')}>
            Create a new opportunity for an outcome
          </a>
        </p>
      </div>

      <h2>Live briefs</h2>
      {(isEmpty(live) ?
          "You don't have any live briefs." :
          <table className="content-table summary-item-body">
            <thead className="summary-item-field-headings-visible">
            <tr>
              <th className="summary-item-field-heading-first">Brief Overview</th>
              <th className="summary-item-field-heading">Published</th>
              <th className="summary-item-field-heading">Closing</th>
            </tr>
            </thead>
            <tbody>
            {live.map((item, i) => {
              return (
                <tr className="summary-item-row" key={i}>
                  <td className="summary-item-field">
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id)}>
                      {item.title}
                    </a>
                  </td>
                  <td className="summary-item-field">
                    {format(item.dates.published_date || '', 'dddd d MMMM YYYY')}
                  </td>
                  <td className="summary-item-field">
                    {format(item.dates.closing_date || '', 'dddd d MMMM YYYY')}
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
      )}

      <h2>Closed briefs</h2>
      {(isEmpty(closed) ?
          "You don't have any live briefs." :
          <table className="content-table summary-item-body">
            <thead className="summary-item-field-headings-visible">
            <tr>
              <th styleName="summary-item-field-heading-first">Brief Overview</th>
              <th styleName="summary-item-field-heading">Closed</th>
              <th styleName="summary-item-field-heading">Work order</th>
            </tr>
            </thead>
            <tbody>
            {closed.map((item, i) => {
              return (
                <tr className="summary-item-row" key={i}>
                  <td className="summary-item-field">
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id)}>
                      {item.title}
                    </a>
                  </td>
                  <td className="summary-item-field">
                    {format(item.dates.closing_date || '', 'dddd d MMMM YYYY')}
                  </td>
                  <td styleName="summary-item-field">
                  <span>
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id, '/responses')}>
                      View responses
                    </a>{' '}
                    <a href={"/buyers/frameworks/".concat(
                      item.frameworkSlug,
                      "/requirements/",
                      item.lotSlug, "/",
                      item.id,
                      '/work-orders/create')}>
                      Create work order
                    </a>
                  </span>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
      )}
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

export const TeamOverview = ({teamName, members}) => (
  <div className="content-main">

    <h3>Active team members</h3>
    <table className="content-table summary-item-body">
      <thead className="summary-item-field-headings-visible">
      <tr>
        <th className="summary-item-field-heading-first">Name</th>
        <th className="summary-item-field-heading">Email</th>
      </tr>
      </thead>
      <tbody>
      {members.map((tm, i) => {
        return (
          <tr className="summary-item-row" key={i}>
            <td className="summary-item-field">{tm.name}</td>
            <td className="summary-item-field"><a href={"mailto:" + tm.email_address}>{tm.email_address}</a></td>
          </tr>
        )
      })}
      </tbody>
    </table>
  </div>
)

