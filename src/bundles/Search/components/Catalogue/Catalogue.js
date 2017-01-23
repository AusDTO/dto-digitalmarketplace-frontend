import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';

import Card         from '../../../../shared/Card';
import CheckboxList from '../../../../shared/CheckboxList';

import { actionCreators as actions } from '../../redux/modules/query';

import './Catalogue.css';

// Temp import until either moved to shared or provided via service.
import domains from '../../../SellerRegistration/components/DomainSelector/domains';

// Temp
const sellerTypeList = [
  {
    key: 'travel',
    label: 'Works regionally or interstate'
  },
  {
    key: 'indigenous',
    label: '50% Indigenous owned business'
  },
  {
    key: 'disability',
    label: 'Australian disability enterprise'
  },
  {
    key: 'not_for_profit',
    label: 'Not-for-profit organisation'
  }
];

export class Catalogue extends React.Component {

  render () {
    const { actions, results = [], keyword = '' } = this.props;

    return (
      <section>
        <article className="row">
          <div className="col-xs-12 col-sm-3">
            <h2 styleName="heading">Seller catalogue</h2>
          </div>
          <div className="col-xs-12 col-sm-8 col-sm-push-1" styleName="autocomplete">
            <Autocomplete 
              value={keyword}
              inputProps={{name: 'keyword', id: 'keyword'}}
              items={results.slice(0, 10)}
              getItemValue={({ name }) => name}
              onSelect={(value, item) => actions.updateKeyword(value)}
              onChange={(e, value) => actions.updateKeyword(value)}
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
          </div>
        </article>
        <article>
          <aside className="col-xs-12 col-sm-4" styleName="sidebar">
            <h4>Filter by</h4>
            
            <form onSubmit={e => e.preventDefault()}>
              <CheckboxList 
                id="role" 
                list={domains} 
                onChange={actions.updateRole} 
              />
            </form>
            
            <a href="">Learn more about these services</a>

            <form onSubmit={e => e.preventDefault()}>
              <CheckboxList 
                id="type" 
                list={sellerTypeList} 
                onChange={actions.updateType} 
              />
            </form>
          </aside>
          <div className="col-xs-12 col-sm-8">
            {/*TODO*/}
            # Sellers Found
            <hr/>
            {results.length ? (
              results.map((result, i) => (
                <Card {...result} key={i} />
              ))
            ) : (
              <h4>No results found</h4>
            )}
          </div>
        </article>
      </section>
    )
  }
};

// TODO
export const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);