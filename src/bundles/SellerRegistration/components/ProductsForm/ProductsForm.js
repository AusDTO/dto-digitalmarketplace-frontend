import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Form, actions} from 'react-redux-form';
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import some from 'lodash/some';
import classNames from 'classnames';

import { required, validLinks } from '../../../../validators';

import { actions as applicationActions }    from '../../redux/modules/application';
import { actions as stepActions }    from '../../redux/modules/steps';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';
import Textarea      from '../../../../shared/form/Textarea';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';
import StepNav       from '../StepNav';
import SaveError     from '../../../../shared/SaveError';
import { getNextKey } from '../../../../helpers';
import ValidationSummary from '../ValidationSummary';

import styles from '../SellerRegistration.css'
import products from './ProductsForm.css';

const filterProducts = products => {
  return omitBy(products, product => !product);
};

class ProductsForm extends BaseForm {

  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object.isRequired
  }

  onAdd(e) {
      e.preventDefault();
      const {model, createProduct, productsForm} = this.props;
      createProduct(model, productsForm.products);
  }

  onRemove(id, e) {
      e.preventDefault();
      const {model, removeProduct} = this.props;
      removeProduct(model, id);
  }

  onClearProducts() {
    const {clearProducts, nextRoute} = this.props;
    clearProducts(nextRoute)
  }

  render() {
    const { action, csrf_token, model, form, buttonText, children, onSubmit, onSubmitFailed, productsForm, nextRoute, submitClicked, applicationErrors, type } = this.props;
    const hasProducts = !isEmpty(filterProducts(productsForm.products));
    const submitClass = classNames({'button-secondary': !hasProducts});
    const addClass = classNames({'button-secondary': hasProducts});
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }
    return (
      <Layout>
        <header styleName="styles.content">
          <ValidationSummary form={form} applicationErrors={applicationErrors} filterFunc={(ae) => ae.step === 'products' && type === 'edit'} />
          <h1 className="au-display-xl" styleName="styles.content-heading" tabIndex="-1">Products</h1>
            <p>If your business has developed any digital products, you can showcase them through your profile. Just remember, they have to be your own proprietary products.</p>

          {hasProducts && [<div className="calloutMistake">
            <b> Avoid common mistakes </b>
            <ul className="mistake-list">
              <li>Only provide details for your own proprietary products, not services offered by the company.</li>
              <li>Do not include hardware products.</li>
              <li>If using acronyms, their meaning must be written out clearly.</li>
              <li><b>Product links</b> - consider targeting URLs to pricing and support pages for the product rather than a generic landing page.</li>
              <li>Check that all URLs provided are working.</li>
            </ul>
          </div>,<br/>]}
        </header>
        <article role="main">
          <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
          <Form model={model}
            action={action}
            method="post"
            id="products"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
            onSubmitFailed={onSubmitFailed}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            {Object.keys(productsForm.products).map((key, i) => {
              const index = i +1;
              return (
                <div styleName="products.product-wrapper" key={key}>
                  {i !== 0 && <hr styleName="products.hr"/>}
                  <div className="row">
                    <div className="col-xs-12 col-sm-10">
                      <h2 className="au-display-lg">{`Product ${index}`}</h2>
                    </div>
                    <div className="col-xs-12 col-sm-2" />
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-10">
                      <Textfield
                          model={`${model}.products.${key}.name`}
                          name={`name-${index}`}
                          id={`name-${index}`}
                          htmlFor={`name-${index}`}
                          label="Product name"
                          validators={{ required }}
                          messages={{
                              required: `Product ${index} name is required`,
                          }}
                          disabled
                      />
                      <Textarea
                          model={`${model}.products.${key}.summary`}
                          name={`summary-${index}`}
                          id={`summary-${index}`}
                          controlProps={{limit: 50}}
                          label="Product summary"
                          description="This is your ‘elevator pitch’ — in a single sentence tell us about your product."
                          showMessagesDuringFocus={true}
                          messages={{
                              required: `Please provide a product summary`
                          }}
                          validators={{required}}
                          disabled
                      />
                      <Textfield
                          model={`${model}.products.${key}.website`}
                          name={`website-${index}`}
                          id={`website-${index}`}
                          htmlFor={`website-${index}`}
                          label="Product website link"
                          description="Add a link to your product’s website. The link must start with http"
                          validators={{ required, validLinks }}
                          messages={{
                              required: `Please add the product website starting with http`,
                              validLinks: `Please add the product website starting with http`,
                          }}
                          disabled
                      />
                      <Textfield
                          model={`${model}.products.${key}.pricing`}
                          name={`pricing-${index}`}
                          id={`pricing-${index}`}
                          htmlFor={`pricing-${index}`}
                          label="Product pricing link"
                          description="Add a link to your product’s pricing page. The link must start with http"
                          validators={{ required, validLinks }}
                          messages={{
                              required: `Please add the product pricing webpage link starting with http`,
                              validLinks: `Please add the product pricing webpage link starting with http`,
                          }}
                          disabled
                      />
                      <Textfield
                          model={`${model}.products.${key}.support`}
                          name={`support-${index}`}
                          id={`support-${index}`}
                          htmlFor={`support-${index}`}
                          label="Product support link"
                          description="Add a link to your product’s support page. The link must start with http"
                          validators={{ required, validLinks }}
                          messages={{
                              required: `Please add the product support webpage link starting with http`,
                              validLinks: `Please add the product support webpage link starting with http`,
                          }}
                          disabled
                      />
                    </div>
                  </div>
                </div>
              )
            })}

            {children}
          </Form>
        </article>
      </Layout>
    )
  }
}

ProductsForm.defaultProps = {
  buttonText: 'Save and continue',
  title: 'Add your products'
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'productsForm'),
    applicationErrors: state.application_errors
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProduct: (model, products) => {
            dispatch(actions.change(`${model}.products.${getNextKey(products)}`, {}));
        },
        removeProduct: (model, id) => {
            dispatch(actions.omit(`${model}.products`, id));
            // added due to bug in adding empty product then removing without submit
            dispatch(actions.setValidity(`${model}.products.${id}`, true));
            dispatch(applicationActions.submitApplication());
        },
        clearProducts: (nextRoute) => {
          dispatch(stepActions.stepComplete('products'));
          dispatch(applicationActions.navigateToStep(nextRoute));
        }
    }
}

export {
  Textfield,
  mapStateToProps,
  ProductsForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForm);
