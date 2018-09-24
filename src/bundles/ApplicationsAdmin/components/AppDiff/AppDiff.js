import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, LocalForm } from 'react-redux-form';
import { appSave } from '../../redux/modules/application';
import { diff_match_patch } from 'diff-match-patch';
import styles from './AppDiff.css';
import traverse from 'traverse';


class AppDiff extends Component {
  cleanup(supplier, application) {
    if (supplier) {
      delete supplier.links;
      delete supplier.prices;
      delete supplier.domains;
      delete supplier.steps;
      delete supplier.updated_at;
      delete supplier.last_update_time;
      delete supplier.lastUpdateTime;
      delete supplier.created_at;
      delete supplier.createdAt;
      delete supplier.creationTime;
      delete supplier.creation_time;
      delete supplier.text_vector;
      delete supplier.contacts;
      delete supplier.supplierCode;
      delete supplier.supplier_code;
      delete supplier.frameworks;
      delete supplier.status;
      delete supplier.id;
      delete supplier.application_id;
      delete supplier.signed_agreements;
    }
    if (application) {
      delete application.links;
      delete application.steps;
      delete application.updated_at;
      delete application.last_update_time;
      delete application.lastUpdateTime;
      delete application.created_at;
      delete application.createdAt;
      delete application.creationTime;
      delete application.creation_time;
      delete application.text_vector;
      delete application.supplierCode;
      delete application.supplier_code;
      delete application.frameworks;
      delete application.type;
      delete application.status;
      delete application.id;
      delete application.application_id;
    }
  }
  render() {
    const { application, meta } = this.props;
    this.cleanup(meta.supplier, application.data);

    var differences = [];
    traverse(meta.supplier).forEach(function (v) {
      if (this.isLeaf && this.path.indexOf('links') < 0) {
        differences.push({
          property: this.path.join('.'),
          original: v ? v : '',
          updated: '',
          html: undefined
        });
      }
    });

    traverse(application.data).forEach(function (v) {
      if (this.isLeaf && this.path.indexOf('links') < 0) {
        const property = this.path.join('.');
        const existing = differences.find(e => e.property == property);

        if (existing) {
          existing.updated = v ? v : '';
        } else {
          differences.push({
            property,
            original: '',
            updated: v ? v : '',
            html: undefined
          });
        }
      }
    });
    differences.forEach(v => {
      if (`${v.original}` !== `${v.updated}`) {
        let dmp = new diff_match_patch();
        let diffs = dmp.diff_main(`${v.original}`, `${v.updated}`);
        dmp.diff_cleanupEfficiency(diffs);
        v.html = dmp.diff_prettyHtml(diffs);;
      }
    })
    differences.sort((a, b) => {
      if (a.property < b.property) {
        return -1;
      }
      if (a.property > b.property) {
        return 1;
      }
      return 0;
    })
    return (
      <article id="content">
        <table styleName="diff-table">
          <tbody>
            <tr>
              <th>{'Property'}</th>
              <th>{'Original'}</th>
              <th>{'Updated'}</th>
              <th>{'Difference'}</th>
            </tr>
            {differences.map(d => {
              return d.html && <tr key={d.property}>
                <td>{d.property}</td>
                <td>{`${d.original}`}</td>
                <td>{`${d.updated}`}</td>
                <td><span dangerouslySetInnerHTML={{ __html: d.html }} /></td>
              </tr>
            })}
          </tbody>
        </table>
      </article>
    )
  }
}

const mapStateToProps = (ownProps) => {
  return {
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAppSubmit: (values) => {
      dispatch(appSave(values))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppDiff);
