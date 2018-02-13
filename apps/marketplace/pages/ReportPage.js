import React, { Component } from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReportView from '../components/Reports/ReportView'
import { rootPath } from '../routes'

const itemData = {
  title: 'Digital Marketplace insights:',
  date: 'January 2018',
  items: [
    {
      heading: 'Who is buying?',
      subitems: [
        {
          text: null,
          image: '189 entities have registered.svg',
          mobileImage: '189 entities have registered.svg',
          imageAlt: 'Of the 202 entities registered on the Marketplace, 48%% are Australian Government entities'
        },
        {
          text: null,
          image: '>768 Top 5 agencies listing briefs on the Marketplace.svg',
          mobileImage: '787 Top 5 buyers October 17.svg',
          imageAlt: '',
          imageCaption:
            'Top 5 agencies listing briefs on the Marketplace for December 2017 were the DTA (12 briefs), ' +
            'Department of Defense (3 briefs), Department of Human Services (3 briefs), ' +
            'Australian Tax Office (2 Briefs) and Department of Education (2 briefs)'
        }
      ]
    },
    {
      heading: 'How are we encouraging competition?',
      subitems: [
        {
          text: null,
          image: '67%25 of all briefs have been open to all.svg',
          mobileImage: '67%25 of all briefs have been open to all.svg',
          imageAlt: '67% of all briefs have been open to all'
        },
        {
          text: null,
          image: '56%25 of briefs have been for digital specialists.svg',
          mobileImage: '56%25 of briefs have been for digital specialists.svg',
          imageAlt: '58% of briefs have been for digital specialists'
        },
        {
          image: '768 81 of the value contracted has been awarded to SMEs.svg',
          mobileImage: '767 value contracted since launch awarded to SMEs.svg',
          imageAlt:
            '71% Of the dollar value contracted through the Marketplace since 29 August 2016 has been awarded to SMEs'
        },
        {
          image: '768 $ contracted since launch.svg',
          mobileImage: '767 $ contracted since launch.svg',
          imageAlt: '$67.48 Contracted through the Marketplace since 29 August 2016. $7.46M this month'
        },
        {
          image: '768 num of sellers.svg',
          mobileImage: '768 num of sellers.svg',
          imageAlt: '757 sellers have registered to offer digital and ICT services, 28 new sellers this month'
        },
        {
          image: '768 total opportunities.svg',
          mobileImage: '767 total opportunities.svg',
          imageAlt: '421 Total opportunities since 29 August 2016. 35 new briefs this month'
        }
      ]
    },
    {
      heading: 'How does the Marketplace break down procurement?',
      subitems: [
        {
          text: null,
          fullWidth: true,
          image: '>768 Briefs by phase.svg',
          mobileImage: '767 briefs by phase.svg',
          imageAlt: '',
          imageCaption: 'Briefs by phase, 16% Pre-discovery, 33% Discovery, 14% Alpha, 14% Beta, 9% Live and 15% Other'
        },
        {
          text: null,
          image: '768 seller rates per role.svg',
          mobileImage: '767 seller bids per role.svg',
          imageAlt: '',
          imageCaption:
            'Trends for day rates offered per area of expertise, User research and design, ' +
            'Software engineering and development and Agile Delivery and Governance trend towards $1000 a' +
            ' day while Data science and Cyber Security are closer to $2000 a day'
        },
        {
          text: null,
          image: '>768 Types of briefs on the Marketplace.svg',
          mobileImage: '767 types of briefs on marketplace.svg',
          imageAlt: '',
          imageCaption:
            'Top 5 areas of expertise since 29 August 2016, , ' +
            '74 Software engineering and development, 60 User research and design, ' +
            '46 Agile delivery and governance, 14 Change training and transformation,' +
            '14 Cyber security, 38 Other areas of experience and 175 Outcomes briefs (area not specified)'
        }
      ]
    },
    {
      heading: 'How active is the Marketplace?',
      subitems: [
        {
          text: null,
          fullWidth: true,
          image: '>768 number of sellers per area of expertise.svg',
          mobileImage: '767 num sellers per area of expertise.svg',
          imageAlt: '',
          imageCaption:
            'number of sellers per area of expertise, ' +
            '239 Strategy and policy, 339 User research and design, ' +
            '405 Agile delivery and governance, 426 Software engineering and development,' +
            '194 Support and operations, 160 Content and publishing, ' +
            '320 Change, training and transformation, 142 Marketing, communications and engagement, ' +
            '210 Cyber security, 180 data science and 152 Emerging technologies'
        },
        {
          text: null,
          fullWidth: true,
          image: '768 average seller response.svg',
          mobileImage: '767 average num of responses per brief.svg',
          imageAlt: 'Buyers receive on average 12 responses per brief as of December 2017'
        }
      ]
    },
    {
      heading: 'Who is winning the work?',
      subitems: [
        {
          text: null,
          image: '768 sellers awarded contracts.svg',
          mobileImage: '767 sellers awarded contracts this financial year.svg',
          imageAlt: '',
          imageCaption:
            'Top 10 sellers awarded contracts over 3 months, ' +
            'Oakton (Large Enterprise) 10 contracts, HiTech group (SME) 11 contracts, ' +
            'Paxus (SME) 6 contracts, Paper Giant (SME) 6 contracts, 2XM Technology Pty Ltd (SME) 5 contracts,' +
            'Adelphi Digital Consulting Group (SME) 4 contracts,' +
            'Thoughtworks (Large Enterprise) 3 contracts, Thinkplace (SME) 4 contracts' +
            'FinXL IT (SME) 4 contracts, Oxide Interactive (SME) 4 contracts, ' +
            'Other SME 55 contracts, Other Large Enterprise 15 contracts '
        },
        {
          text: null,
          image: 'contracts awarded by volume.svg',
          mobileImage: 'contracts awarded by volume.svg',
          imageAlt: '63% Contracts have been awarded by volume to SME sellers this month.'
        },
        {
          text: null,
          image: 'num contracts awarded this month.svg',
          mobileImage: 'num contracts awarded this month.svg',
          imageAlt: '41 Briefs have been contracted this month.'
        }
      ]
    }
  ]
}

export class ReportPageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataLoaded: false
    }
  }

  render() {
    const { match } = this.props

    return (
      <div id="report-page">
        <Switch>
          <Route
            exact
            path={match.url}
            render={() => <ReportView {...this.props} data={itemData} dataLoaded={this.state.dataLoaded} />}
          />
          <Redirect to={{ pathname: `${rootPath}/reports` }} />
        </Switch>
      </div>
    )
  }
}

ReportPageContainer.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        image: PropTypes.string
      })
    )
  }),
  match: PropTypes.object
}

ReportPageContainer.defaultProps = {
  data: {
    title: 'Marketplace Reports',
    date: null,
    items: [
      {
        heading: '',
        subitems: []
      }
    ]
  },
  match: () => ({ url: `${rootPath}/reports` })
}

export default withRouter(ReportPageContainer)
