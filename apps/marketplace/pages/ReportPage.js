import React, { Component } from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReportView from '../components/Reports/ReportView'
import { rootPath } from '../routes'

const itemData = {
  title: 'Digital Marketplace insights:',
  date: 'February 2018',
  items: [
    {
      heading: 'Who is buying?',
      subitems: [
        {
          text: null,
          image: 'Entities registered.svg',
          mobileImage: 'Entities registered.svg',
          imageAlt: 'Of the 217 entities registered on the Marketplace, 48%% are Australian Government entities'
        },
        {
          text: null,
          image: '768 Top 5 buyers.svg',
          mobileImage: '767 Top 5 buyers.svg',
          imageAlt: '',
          imageCaption:
            'Top 5 agencies listing opportunities on the Marketplace for February 2018 were the ' +
            'DTA (18 opportunities), Department of Human Services (14 opportunities), ' +
            'Australian Transaction Reports & Analysis Centre (5 opportunities), ' +
            'Australian Digital Health Agency (3 opportunities) ' +
            'and National Health and Medical Research Council (2 opportunities)'
        }
      ]
    },
    {
      heading: 'How are we encouraging competition?',
      subitems: [
        {
          text: null,
          image: 'Percentage of briefs open to all.svg',
          mobileImage: 'Percentage of briefs open to all.svg',
          imageAlt: '68% of all opportunities have been open to all'
        },
        {
          text: null,
          image: 'Percentage of briefs for digital specialists.svg',
          mobileImage: 'Percentage of briefs for digital specialists.svg',
          imageAlt: '63% of opportunities have been for digital specialists'
        },
        {
          image: '768 Percentage of dollar value contracted awarded to SMEs.svg',
          mobileImage: '767 Percentage of dollar value contracted awarded to SMEs.svg',
          imageAlt:
            '72% of the dollar value contracted through the Marketplace since 29 August 2016 has been awarded to SMEs'
        },
        {
          image: '768 Total contracted since launch.svg',
          mobileImage: '767 Total contracted since launch.svg',
          imageAlt: '$84.82M contracted through the Marketplace since 29 August 2016, $8.51M this month'
        },
        {
          image: '768 Number of sellers.svg',
          mobileImage: '767 Number of sellers.svg',
          imageAlt: '819 sellers have registered to offer digital and ICT services, 33 new sellers this month'
        },
        {
          image: '768 total opportunities.svg',
          mobileImage: '767 total opportunities.svg',
          imageAlt: '541 total opportunities since 29 August 2016, 67 new opportunities this month'
        }
      ]
    },
    {
      heading: 'How does the Marketplace break down procurement?',
      subitems: [
        {
          text: null,
          fullWidth: true,
          image: '768 Briefs by phase.svg',
          mobileImage: '767 Briefs by phase.svg',
          imageAlt: '',
          imageCaption:
            'Opportunities by phase, 16% Pre-discovery, 34% Discovery, 13% Alpha, 13% Beta, 8% Live and 16% Other'
        },
        {
          text: null,
          image: '768 Daily rates per role.svg',
          mobileImage: '767 Daily rates per role.svg',
          imageAlt: '',
          imageCaption:
            'Trends for day rates offered per area of expertise: ' +
            'User research and design, Software engineering and development, Data science, ' +
            'Agile Delivery and Governance and Content and Publishing trend towards $1000 a ' +
            'day while Strategy and policy and Cyber security are closer to $2000 a day'
        },
        {
          text: null,
          image: '768 Top 5 areas of expertise.svg',
          mobileImage: '767 Top 5 areas of expertise.svg',
          imageAlt: '',
          imageCaption:
            'Top 5 areas of expertise since 29 August 2016: ' +
            '96 opportunities published for Software engineering and development, ' +
            '73 opportunities published for User research and design, ' +
            '68 opportunities published for Agile delivery and governance, ' +
            '20 opportunities published for Content and Publishing, ' +
            '20 opportunities published for Cyber security,' +
            '60 opportunities published for Other areas of expertise and ' +
            '204 opportunities published for Outcomes (area not specified)'
        }
      ]
    },
    {
      heading: 'How active is the Marketplace?',
      subitems: [
        {
          text: null,
          fullWidth: true,
          image: '768 Number of sellers per area of expertise.svg',
          mobileImage: '767 Number of sellers per area of expertise.svg',
          imageAlt: '',
          imageCaption:
            'Number of sellers per area of expertise: ' +
            '262 selling Strategy and policy, ' +
            '353 selling User research and design, ' +
            '436 selling Agile delivery and governance, ' +
            '460 selling Software engineering and development, ' +
            '212 selling Support and operations, ' +
            '173 selling Content and publishing, ' +
            '342 selling Change, training and transformation, ' +
            '155 selling Marketing, communications and engagement, ' +
            '222 selling Cyber security, ' +
            '189 selling Data science and ' +
            '162 selling Emerging technologies'
        },
        {
          text: null,
          fullWidth: true,
          image: '768 Average responses per brief.svg',
          mobileImage: '767 Average responses per brief.svg',
          imageAlt: 'Buyers receive on average 12 responses per opportunity as of January 2018'
        }
      ]
    },
    {
      heading: 'Who is winning the work?',
      subitems: [
        {
          text: null,
          image: '768 Top sellers awarded contracts in FY.svg',
          mobileImage: '767 Top sellers awarded contracts in FY.svg',
          imageAlt: '',
          imageCaption:
            'Top 10 sellers awarded contracts this financial year: ' +
            'HiTech Group (SME) 11 contracts, ' +
            'Oakton (Large Enterprise) 11 contracts, ' +
            'Paxus (SME) 8 contracts, ' +
            'Paper Giant (SME) 7 contracts, ' +
            '2XM Technology Pty Ltd (SME) 5 contracts, ' +
            'Deloitte Touche Tohmatsu (Large Enterprise) 5 contracts, ' +
            'Thinkplace (SME) 5 contracts, ' +
            'FinXL IT Professional Services (Large Enterprise) 5 contracts, ' +
            'Senuamedia (SME) 5 contracts and ' +
            'ThoughtWorks (Large Enterprise) 4 contracts, ' +
            'Other SME 132 contracts, ' +
            'Other Large Enterprise 32 contracts'
        },
        {
          text: null,
          image: 'Percentage of contracts awarded by volume to SMEs.svg',
          mobileImage: 'Percentage of contracts awarded by volume to SMEs.svg',
          imageAlt: '80% of contracts have been awarded by volume to SME sellers this month'
        },
        {
          text: null,
          image: 'Number of contracts awarded this month.svg',
          mobileImage: 'Number of contracts awarded this month.svg',
          imageAlt: '50 opportunities have been contracted this month'
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
