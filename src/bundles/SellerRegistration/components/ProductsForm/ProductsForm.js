import React from 'react';
import { connect } from 'react-redux';
import {Form, actions} from 'react-redux-form';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

import { required, validLinks } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';
import Textarea      from '../../../../shared/form/Textarea';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';

import './ProductsForm.css';

class ProductsForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired
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

  render() {
    const { action, csrf_token, model, form, buttonText, children, onSubmit, onSubmitFailed, productsForm } = this.props;
    const submitClass = classNames({'button-secondary': isEmpty(productsForm.products)})
    const addClass = classNames({'button-secondary': !isEmpty(productsForm.products)})
    return (
      <Layout>
        <header>
          <h1 tabIndex="-1">Products</h1>
          <p>If your business has developed any digital products, you can now offer them through the Digital Marketplace. Just remember they have to be your own, not a product you’re reselling.</p>
            <p>For now this is an MVP. We want to learn more about the types of products sellers are offering before we create a solution for selling them through the Digital Marketplace. </p>
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
            onSubmitFailed={onSubmitFailed}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            {Object.keys(productsForm.products).map((key, i) => {
              const index = i +1;
              return (
                <div styleName="product-wrapper" key={key}>
                  {i !== 0 && <hr styleName="hr"/>}
                  <div className="row">
                    <div className="col-xs-12 col-sm-10">
                      <h2 styleName="heading">{`Product ${index}`}</h2>
                    </div>
                    <div className="col-xs-12 col-sm-2">
                      <button type="submit" styleName="remove-button" className="button-secondary" onClick={this.onRemove.bind(this, key)}>Remove</button>
                    </div>  
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
                      />
                      <Textarea
                          model={`${model}.products.${key}.summary`}
                          name={`summary-${index}`}
                          id={`summary-${index}`}
                          controlProps={{limit: 50}}
                          label="Product summary"
                          description="This is your ‘elevator pitch’ — in a single sentence tell us about your product."
                          messages={{
                              required: `Please provide a product summary`
                          }}
                          validators={{required}}
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
                      />
                    </div>
                  </div>
                </div>
              )
            })}

            {children}

            <button type="submit" className={addClass} onClick={this.onAdd.bind(this)}>{isEmpty(productsForm.products) ? 'Add a product' : 'Add another product'}</button>
            {!isEmpty(productsForm.products) && <br/>}
            <input type="submit" className={submitClass} value={isEmpty(productsForm.products) ? 'I don\'t have any products' : buttonText} role="button" />
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
            dispatch(actions.change(`${model}.products.${Object.keys(products).length}`, {}));
        },
        removeProduct: (model, id) => {
            dispatch(actions.omit(`${model}.products`, id));
            // added due to bug in adding empty product then removing without submit
            dispatch(actions.setValidity(`${model}.products.${id}`, true));
        }
    }
}

export {
  Textfield,
  mapStateToProps,
  ProductsForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForm);
