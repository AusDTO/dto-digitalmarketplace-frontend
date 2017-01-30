import React from 'react';
import { connect } from 'react-redux';
import {Form, actions} from 'react-redux-form';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';

import { required } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';
import Textarea     from '../../../../shared/form/Textarea';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';

class ProductsForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired
  }

  onAdd(e) {
      e.preventDefault();
      const {model, createProduct, productsForm} = this.props;
      createProduct(model, productsForm);
  }

  onRemove(id, e) {
      e.preventDefault();
      const {model, removeProduct} = this.props;
      removeProduct(model, id);
  }

  render() {
    const { action, csrf_token, model, form, buttonText, children, onSubmit, productsForm } = this.props;

    return (
      <Layout>
        <header>
          <h1 tabIndex="-1">Products</h1>
          <p>To add a product to your profile simply share your product name, product summary and add links to extra information for interested buyers. You can add as many products as you like.</p>
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model}/>
          <Form model={model}
            action={action}
            method="post"
            id="products"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            {isArray(productsForm.products) && productsForm.products.map((product, key) => {
              return (
                <div key={key}>
                  <h2>{`Product ${key+1}`}</h2>
                  <button type="submit" onClick={this.onRemove.bind(this, key)}>Remove</button>
                  <Textfield
                      model={`${model}.products.${key}.name`}
                      name="name"
                      id="name"
                      htmlFor="name"
                      label="Product name"
                      validators={{ required }}
                      messages={{
                          required: 'Product name is required',
                      }}
                  />
                  <Textarea
                      model={`${model}.products.${key}.summary`}
                      name="summary"
                      id="summary"
                      controlProps={{limit: 50}}
                      label="Product Summary"
                      description="This is your ‘elevator pitch’ — in a single sentence tell us about your product."
                      messages={{
                          required: 'You must provide a product summary'
                      }}
                      validators={{required}}
                  />
                  <Textfield
                      model={`${model}.products.${key}.website`}
                      name="website"
                      id="website"
                      htmlFor="website"
                      label="Product website link"
                      description="Add a link to your product’s website."
                      validators={{ required }}
                      messages={{
                          required: 'Product website link is required',
                      }}
                  />
                  <Textfield
                      model={`${model}.products.${key}.pricing`}
                      name="pricing"
                      id="pricing"
                      htmlFor="pricing"
                      label="Product pricing link"
                      description="Add a link to your product’s pricing page."
                      validators={{ required }}
                      messages={{
                          required: 'Product pricing link is required',
                      }}
                  />
                  <Textfield
                      model={`${model}.products.${key}.support`}
                      name="support"
                      id="support"
                      htmlFor="support"
                      label="Product support link"
                      description="Add a link to your product’s support page."
                      validators={{ required }}
                      messages={{
                          required: 'Product support link is required',
                      }}
                  />

                </div>
              )
            })}

            {children}

            <button type="submit" onClick={this.onAdd.bind(this)}>{isEmpty(productsForm.products) ? 'Add a product' : 'Add another product'}</button>
            <input type="submit" value={isEmpty(productsForm.products) ? 'I do not have any products' : buttonText} role="button" />
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
    ...formProps(state, 'productsForm')
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProduct: (model, products) => {
            return dispatch(actions.push(`${model}.products`, {}));
        },
        removeProduct: (model, id) => {
            return dispatch(actions.remove(`${model}.products`, id));
        }
    }
}

export {
  Textfield,
  mapStateToProps,
  ProductsForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForm);
