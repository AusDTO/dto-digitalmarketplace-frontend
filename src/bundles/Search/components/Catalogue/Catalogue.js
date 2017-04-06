import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';

import Card         from '../../../../shared/Card';
import CheckboxList from '../../../../shared/CheckboxList';
import Icon         from '../../../../shared/Icon';
import LocalNav     from '../../../../shared/LocalNav';

import Pagination from '../Pagination';

import { actionCreators as actions } from '../../redux/modules/search';
import { actionCreators as paginationActions } from '../../redux/modules/pagination';

import './Catalogue.css';

export class Catalogue extends React.Component {

  render () {
    const { actions, search = {}, pagination = {} } = this.props;

    const cards = search.view === 'sellers' ? search.results : search[search.view];

    return (
      <section>
        <form onSubmit={e => e.preventDefault()}>
          <article className="row">
            <div className="col-xs-12 col-sm-4">
              <h2 styleName="heading">Seller catalogue</h2>
            </div>
            <div className="col-xs-12 col-sm-8" styleName="autocomplete">
              <article styleName="keyword-search">
                <article className="col-xs-10">
                  <label htmlFor="keyword" className="visually-hidden">
                    Search by company name, role you need or the outcome you are after
                  </label>
                  <Autocomplete
                    value={search.keyword || ''}
                    inputProps={{
                      name: 'keyword',
                      id: 'keyword',
                      placeholder: 'Type to search by company name, role you need or the outcome you\'re after'
                    }}
                    items={search.results.slice(0, 10)}
                    getItemValue={({ title }) => title}
                    onSelect={(value, item) => actions.updateKeyword(value)}
                    onChange={(e, value) => actions.updateKeyword(value)}
                    renderItem={(item, isHighlighted) => (
                      <div
                        styleName={isHighlighted ? 'autocompleteItemHighlighted' : 'autocompleteItem' }
                        key={item.abbr}
                        id={item.abbr}
                      >{item.title}</div>
                    )}
                    renderMenu={(items, value, style) => {
                      //return <span/>;
                      // renderMenu can't return null, internals of Autocomplete
                      // call clone on this result. Empty span will have to do.
                      if (!value || items.length === 0) {
                        return <span/>;
                      }

                      return (
                        <div styleName="autocompleteMenu" style={{...style, position: 'absolute', display: 'none', left: 0, top: '53px'}}>
                          {items}
                        </div>
                      )
                    }}
                  />
                </article>
                <article className="col-xs-2">
                  <button type="submit" value="" style={{ border: 'none', backgroundColor: '#18788d', color: '#fff' }}>
                    <Icon value="search" size={22} />
                  </button>
                </article>
              </article>
            </div>
          </article>
          <article className="row">
            <section className="col-xs-12 col-sm-4">
              <h4 className="local-nav-heading">Filter your results</h4>
              <LocalNav navClassName="filter-navigation" text="Filter your results">
                <CheckboxList
                  id="role"
                  list={search.role}
                  onChange={actions.updateRole}
                />

                <hr/>

                <CheckboxList
                  id="type"
                  list={search.type}
                  onChange={actions.updateType}
                />

              </LocalNav>
            </section>
            <div className="col-xs-12 col-sm-8">
              {search.error ? (
                <article styleName={search.querying ? 'fadeOut' : 'fadeIn'}>
                  <h2>Something went wrong!</h2>
                  <p><Link to="/" onClick={(e) => {
                    e.preventDefault();
                    actions.resetQuery();
                  }}>Reset and try again</Link>.</p>
                </article>
              ) : (
                  <div>
                    <article styleName="filters" className="row">
                      <div className="row">
                        <div className="col-xs-12 col-sm-7">
                          <Link
                            to={{ search: 'view=sellers' }}
                            onClick={(e) => {
                              e.preventDefault();

                              if (pagination.page !== 1) {
                                  actions.updatePage(1);
                              }

                              actions.updateView('sellers');
                            }}
                            styleName={`${search.view === 'sellers' ? 'active-filter' : ''} filter`}>
                            <span>{pagination.total}</span> Sellers
                          </Link>
                          <Link
                            to={{ search: 'view=products' }}
                            onClick={(e) => {
                              e.preventDefault();

                              if (pagination.page !== 1) {
                                  actions.updatePage(1);
                              }

                              actions.updateView('products');
                            }}
                            styleName={`${search.view === 'products' ? 'active-filter' : ''} filter`}>
                            <span>{pagination.total_products}</span> Products
                          </Link>
                          <Link
                            to={{ search: 'view=casestudies' }}
                            onClick={(e) => {
                              e.preventDefault();

                              if (pagination.page !== 1) {
                                  actions.updatePage(1);
                              }

                              actions.updateView('casestudies');
                            }}
                            styleName={`${search.view === 'casestudies' ? 'active-filter' : ''} filter`}>
                            <span>{pagination.total_casestudies}</span> Case Studies
                          </Link>
                        </div>

                        <div className="col-xs-12 col-sm-5" styleName="sortBy">
                          <fieldset>
                            <legend>Sort by</legend>
                            <div>
                              <input
                                type="radio"
                                name="sort_by"
                                id="sort-a-z"
                                value="a-z"
                                checked={search.sort_by === 'a-z'}
                                onChange={actions.updateSort}
                              />
                              <label htmlFor="sort-a-z">A to Z</label>
                            </div>

                            <div>
                              <input
                                type="radio"
                                name="sort_by"
                                id="sort-latest"
                                value="latest"
                                checked={search.sort_by === 'latest'}
                                onChange={actions.updateSort}
                              />
                              <label htmlFor="sort-latest">Newest</label>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                      <hr/>
                    </article>
                    {isEmpty(cards) ? (
                        <article styleName={search.querying ? 'fadeOut' : 'fadeIn'}>
                          <h2>No exact matches</h2>
                          <p>Try tweaking your search criteria for more results or <Link to="/" onClick={(e) => {
                            e.preventDefault();
                            actions.resetQuery();
                          }}>clear all and start again</Link>.</p>
                        </article>
                      ) :
                    (<article>
                      {cards.map((result, i) => (
                        <Card {...result} key={i} />
                      ))}
                    </article>)}

                    <hr/>

                    <Pagination
                      {...pagination}
                      onClick={actions.updatePage}
                      onBack={actions.updatePage}
                      onNext={actions.updatePage}
                    />
                  </div>
              )}

            </div>
          </article>
        </form>
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
