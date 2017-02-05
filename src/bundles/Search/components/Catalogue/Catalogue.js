import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import isEmpty from 'lodash/isEmpty';

import Card         from '../../../../shared/Card';
import CheckboxList from '../../../../shared/CheckboxList';
import Icon         from '../../../../shared/Icon';

import Pagination from '../Pagination';

import { actionCreators as actions } from '../../redux/modules/search';
import { actionCreators as paginationActions } from '../../redux/modules/pagination';

import './Catalogue.css';

export class Catalogue extends React.Component {

  render () {
    const { router, actions, results = [], search = {}, pagination = {} } = this.props;
    return (
      <section>
        <article className="row">
          <div className="col-xs-12 col-sm-4">
            <h2 styleName="heading">Seller catalogue</h2>
          </div>
          <div className="col-xs-12 col-sm-8" styleName="autocomplete">
            <form onSubmit={e => e.preventDefault()} styleName="keyword-search">
              <article className="col-xs-10">
                <label htmlFor="keyword" className="visually-hidden">
                  Search by company name, role you need or the outcome you’re after
                </label>
                <Autocomplete
                  value={search.keyword || ''}
                  inputProps={{
                    name: 'keyword',
                    id: 'keyword',
                    placeholder: 'Type to search by company name, role you need or the outcome you\'re after'
                  }}
                  items={results.slice(0, 10)}
                  getItemValue={({ name }) => name}
                  onSelect={(value, item) => actions.updateKeyword(router, value)}
                  onChange={(e, value) => actions.updateKeyword(router, value)}
                  renderItem={(item, isHighlighted) => (
                    <div
                      styleName={isHighlighted ? 'autocompleteItemHighlighted' : 'autocompleteItem' }
                      key={item.abbr}
                      id={item.abbr}
                    >{item.name}</div>
                  )}
                  renderMenu={(items, value, style) => {
                    // renderMenu can't return null, internals of Autocomplete
                    // call clone on this result. Empty span will have to do.
                    if (!value || items.length === 0) {
                      return <span/>;
                    }

                    return (
                      <div styleName="autocompleteMenu" style={{...style, position: 'absolute', left: 0, top: '53px'}}>
                        {items}
                      </div>
                    )
                  }}
                />
              </article>
              <article className="col-xs-2">
                <button type="submit" value="" style={{ border: 'none' }}>
                  <Icon value="search" size={22} />
                </button>
              </article>
            </form>
          </div>
        </article>
        <article>
          <aside className="col-xs-12 col-sm-4" styleName="sidebar">
            <h4>Filter your results</h4>
            
            <a href="">Learn more about these services</a>

            <form onSubmit={e => e.preventDefault()}>
              <CheckboxList 
                id="role" 
                list={search.role}
                onChange={actions.updateRole.bind(null, router)}
              />

              <hr/>

              <CheckboxList 
                id="type" 
                list={search.type}
                onChange={actions.updateType.bind(null, router)}
              />
            </form>
          </aside>
          <div className="col-xs-12 col-sm-8">

            {isEmpty(search.results) ? (
              <article>
                <h2>No exact matches</h2>
                <p>Try tweaking your search criteria for more results or <a href="" onClick={(e) => {
                  e.preventDefault();
                  actions.resetQuery(router);
                }}>clear all and start again</a>.</p>
              </article>
            ) : (
              <div>
                <article styleName="filters">
                  <strong styleName="active-filter filter">
                    <span>{search.results.length}</span> Sellers found
                  </strong>
                  <hr/>
                </article>

                <article>
                  {search.results.map((result, i) => (
                    <Card {...result} key={i} />
                  ))}
                </article>

                <hr/>

                <Pagination
                  {...pagination}
                  onClick={(page) => actions.updatePage(router, page)}
                  onBack={(page) => actions.updatePage(router, page)}
                  onNext={(page) => actions.updatePage(router, page)}
                />
              </div>
            )}

          </div>
        </article>
      </section>
    )
  }
};

export const mapStateToProps = ({ search, pagination }, ownProps) => {
  return {
    search,
    pagination
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions, ...paginationActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);