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
          image: '787 Entities registered.svg',
          mobileImage: '787 Entities registered.svg',
          imageAlt: 'Of the 210 entities registered on the Marketplace, 47%% are Australian Government entities'
        },
        {
          text: null,
          image: '768 Top 5 buyers.svg',
          mobileImage: '787 Top 5 buyers.svg',
          imageAlt: '',
          imageCaption:
            'Top 5 agencies listing briefs on the Marketplace for January 2018 were the ' +
            'Department of Human Services (10 briefs), DTA (10 briefs), ' +
            'Department of Health (4 briefs), Australian Maritime Safety Authority (3 Briefs) ' +
            'and Department of Industry Innovation and Science (3 briefs)'
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
          imageAlt: '67% of all briefs have been open to all'
        },
        {
          text: null,
          image: 'Percentage of briefs for digital specialists.svg',
          mobileImage: 'Percentage of briefs for digital specialists.svg',
          imageAlt: '60% of briefs have been for digital specialists'
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
          imageAlt: '$76.31M contracted through the Marketplace since 29 August 2016, $8.83M this month'
        },
        {
          image: '768 Number of sellers.svg',
          mobileImage: '767 Number of sellers.svg',
          imageAlt: '787 sellers have registered to offer digital and ICT services, 30 new sellers this month'
        },
        {
          image: '768 total opportunities.svg',
          mobileImage: '767 total opportunities.svg',
          imageAlt: '474 total opportunities since 29 August 2016, 53 new briefs this month'
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
          imageCaption: 'Briefs by phase, 15% Pre-discovery, 34% Discovery, 13% Alpha, 14% Beta, 9% Live and 15% Other'
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
            '85 briefs published for Software engineering and development, ' +
            '65 briefs published for User research and design, ' +
            '52 briefs published for Agile delivery and governance, ' +
            '17 briefs published for Content and Publishing, ' +
            '16 briefs published for Cyber security,' +
            '49 briefs published for Other areas of expertise and ' +
            '190 briefs published for Outcomes (area not specified)'
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
            '251 selling Strategy and policy, ' +
            '347 selling User research and design, ' +
            '419 selling Agile delivery and governance, ' +
            '443 selling Software engineering and development, ' +
            '201 selling Support and operations, ' +
            '168 selling Content and publishing, ' +
            '330 selling Change, training and transformation, ' +
            '146 selling Marketing, communications and engagement, ' +
            '216 selling Cyber security, ' +
            '186 selling Data science and ' +
            '157 selling Emerging technologies'
        },
        {
          text: null,
          fullWidth: true,
          image: '768 Average responses per brief.svg',
          mobileImage: '767 Average responses per brief.svg',
          imageAlt: 'Buyers receive on average 12 responses per brief as of January 2018'
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
            'Oakton (Large Enterprise) 10 contracts, ' +
            'Paxus (SME) 6 contracts, ' +
            'Paper Giant (SME) 6 contracts, ' +
            '2XM Technology Pty Ltd (SME) 5 contracts, ' +
            'ThoughtWorks (SME) 4 contracts, ' +
            'Deloitte Touche Tohmatsu (Large Enterprise) 4 contracts, ' +
            'Thinkplace (SME) 4 contracts, ' +
            'FinXL IT Professional Services (SME) 4 contracts, ' +
            'Senuamedia (Large Enterprise) 4 contracts and ' +
            'Other SME 96 contracts, ' +
            'Other Large Enterprise 25 contracts'
        },
        {
          text: null,
          image: 'Percentage of contracts awarded by volume to SMEs.svg',
          mobileImage: 'Percentage of contracts awarded by volume to SMEs.svg',
          imageAlt: '75% of contracts have been awarded by volume to SME sellers this month'
        },
        {
          text: null,
          image: 'Number of contracts awarded this month.svg',
          mobileImage: 'Number of contracts awarded this month.svg',
          imageAlt: '20 briefs have been contracted this month'
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
