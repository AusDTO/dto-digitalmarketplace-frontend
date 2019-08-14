import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { PanelCategorySelect } from 'marketplace/components/SellerSelect/SellerSelect'
import RadioList from 'shared/form/RadioList'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'

export class BuyerATMSelectStage extends Component {
  constructor(props) {
    super(props)
    this.handleSellerCategorySelect = this.handleSellerCategorySelect.bind(this)
  }

  handleSellerCategorySelect(category) {
    if (category !== this.props[this.props.model].sellerCategory) {
      this.props.updateSelectedSellerCategory(category)
    }
  }

  render() {
    const categories = [
      {
        value: '',
        text: 'Select category'
      }
    ]
    this.props.domains.map(domain => {
      categories.push({
        value: domain.id,
        text: domain.name
      })
      return true
    })

    return (
      <Form
        model={this.props.model}
        validators={{
          '': {
            requiredChoice: formValues => formValues.openTo,
            requiredCategory: formValues =>
              !formValues.openTo ||
              formValues.openTo === 'all' ||
              (formValues.openTo === 'category' && formValues.sellerCategory)
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Who can respond?
        </AUheading>
        <ErrorAlert
          title="An error occurred"
          model={this.props.model}
          messages={{
            requiredChoice: 'You must select who can respond',
            requiredCategory: 'You must select a panel category'
          }}
        />
        <div>
          <RadioList
            id="openTo"
            label=""
            name="openTo"
            model={`${this.props.model}.openTo`}
            options={[
              {
                label: 'Accept responses from any seller on the panel',
                value: 'all'
              },
              {
                label: 'Any seller in a panel category',
                value: 'category'
              }
            ]}
            messages={{}}
            onChange={() => this.props.resetSelectedSellerCategory()}
          />
        </div>
        {this.props[this.props.model].openTo === 'category' && (
          <PanelCategorySelect
            id="select-seller"
            categories={categories}
            onChange={e => this.handleSellerCategorySelect(e.target.value)}
            selectedCategory={this.props[this.props.model].sellerCategory}
          />
        )}
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerATMSelectStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerATMSelectStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  domains: state.brief.domains
})

const mapDispatchToProps = (dispatch, props) => ({
  resetSelectedSellerCategory: () => dispatch(actions.change(`${props.model}.sellerCategory`, '')),
  updateSelectedSellerCategory: category => dispatch(actions.change(`${props.model}.sellerCategory`, category))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerATMSelectStage)
