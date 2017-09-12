import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReportView from '../components/Reports/ReportView'
import { rootPath } from '../routes'

const itemData = {
  title: 'Digital Marketplace insights:',
  date: 'August 2017',
  items: [
    {
      heading: 'Who is buying?',
      subitems: [
        {
          text: null,
          image: 'of-the-172-entities-registered-on-the-marketplace-54-are-federal.svg',
          mobileImage: 'of-the-172-entities-registered-on-the-marketplace-54-are-federal.svg',
          imageAlt: 'Of the 172 entities registered on the Marketplace 54% are federal'
        },
        {
          text: null,
          image: '768-top-5-agencies-listing-briefs-on-the-marketplace.svg',
          mobileImage: '767-top-5-agencies-listing-briefs-on-the-marketplace.svg',
          imageAlt: 'Top 5 agencies listing briefs on the Marketplace'
        }
      ]
    },
    {
      heading: 'How are we encouraging competition?',
      subitems: [
        {
          text: 'Assistant Minister Taylor announces reform to ICT Procurement at an industry briefing in Canberra:',
          image: null,
          mobileImage: null,
          imageAlt: null
        },
        {
          formattedImage: true,
          image:
            '768-government-will-set-a-target-to-increase-by-10-the-sme-share-of-government-s-annual-ict-spend.svg',
          mobileImage:
            '767-government-will-set-a-target-to-increase-by-10-the-sme-share-of-government-s-annual-ict-spend.svg',
          imageAlt: null
        },
        {
          image: '81-of-the-contracted-value-has-been-awarded-to-sm-es.svg',
          mobileImage: '81-of-the-contracted-value-has-been-awarded-to-sm-es.svg',
          imageAlt: '81% of the contracted value has been awarded to SMEs'
        },
        {
          image: '39-9-m-has-been-contracted-through-the-marketplace.svg',
          mobileImage: '39-9-m-has-been-contracted-through-the-marketplace.svg',
          imageAlt: '$39.9m has been contracted through the Marketplace'
        },
        {
          image: '255-opportunities-have-been-listed-in-the-last-12-months.svg',
          mobileImage: '255-opportunities-have-been-listed-in-the-last-12-months.svg',
          imageAlt: '255 opportunities have been listed in the last 12 months'
        },
        {
          image: '600-sellers-have-registered-to-offer-digital-and-ict-services.svg',
          mobileImage: '600-sellers-have-registered-to-offer-digital-and-ict-services.svg',
          imageAlt: '600 sellers have registered to offer digital and ICT services'
        },
        {
          image: '69-of-briefs-are-open-to-all.svg',
          mobileImage: '69-of-briefs-are-open-to-all.svg',
          imageAlt: '69% of briefs are open to all'
        },
        {
          image: '57-of-briefs-are-for-digital-specialists.svg',
          mobileImage: '57-of-briefs-are-for-digital-specialists.svg',
          imageAlt: '57% of briefs are for digital specialists'
        }
      ]
    },
    {
      heading: 'How does the Marketplace break down procurement?',
      subitems: [
        {
          text: null,
          fullWidth: true,
          image: '768-briefs-by-phase.svg',
          mobileImage: '767-briefs-by-phase.svg',
          imageAlt: 'Briefs by phase'
        },
        {
          text: null,
          image: '768-trends-for-day-rates-offered-per-area-of-expertise.svg',
          mobileImage: '767-trends-for-day-rates-offered-per-area-of-expertise.svg',
          imageAlt: 'Trends for day rates offered per area of expertise'
        },
        {
          text: null,
          image: '768-types-of-briefs-on-the-marketplace.svg',
          mobileImage: '767-types-of-briefs-on-the-marketplace.svg',
          imageAlt: 'Types of briefs on the Marketplace'
        }
      ]
    },
    {
      heading: 'How active is the Marketplace?',
      subitems: [
        {
          text: null,
          fullWidth: true,
          image: '768-number-of-sellers-per-area-of-expertise.svg',
          mobileImage: '767-number-of-sellers-per-area-of-expertise.svg',
          imageAlt: 'number of sellers per area of expertise'
        },
        {
          text: null,
          fullWidth: true,
          image: '768-seller-applications-per-brief.svg',
          mobileImage: '767-seller-applications-per-brief.svg',
          imageAlt: 'seller applications per brief'
        }
      ]
    },
    {
      heading: 'Who is winning the work?',
      subitems: [
        {
          text: null,
          image: '768-top-10-sellers-awarded-contracts-over-3-months.svg',
          mobileImage: '767-top-10-sellers-awarded-contracts-over-3-months.svg',
          imageAlt: 'Top 10 sellers awarded contracts over 3 months'
        },
        {
          text: null,
          image: '80-of-contracts-have-been-awarded-to-sme-sellers-this-month.svg',
          mobileImage: '80-of-contracts-have-been-awarded-to-sme-sellers-this-month.svg',
          imageAlt: '80% of contracts have been awarded to SME sellers this month'
        },
        {
          text: null,
          image: '21-breifs-have-been-contracted-in-august-2017.svg',
          mobileImage: '21-breifs-have-been-contracted-in-august-2017.svg',
          imageAlt: '21 briefs have been contracted in August 2017'
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
        media: '',
        subitems: []
      }
    ]
  },
  match: () => ({ url: `${rootPath}/reports` })
}

const matchStateToProps = state => ({
  media: state.media
})

export default withRouter(connect(matchStateToProps)(ReportPageContainer))
