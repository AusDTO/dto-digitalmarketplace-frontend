import React from 'react';
import {connect} from 'react-redux';

import format from 'date-fns/format';
import distanceInWords from 'date-fns/distance_in_words';
import isBefore from 'date-fns/is_before';

import has from 'lodash/has';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';

import {approveAssessment, rejectAssessment} from '../../redux/modules/assessments';

import './AssessmentList.css';

class AssessmentList extends React.Component {
    render() {
        const {assessments, onApproveClick, onRejectClick} = this.props;
        let brief_assessments = {};

        assessments.forEach((assessment) => {
            if (assessment.briefs) {
                assessment.briefs.forEach((brief) => {
                    if (!has(brief_assessments, brief.title)
                    ) {

                        brief_assessments[brief.title] = {
                            'title': brief.title,
                            'closing_at': brief.dates.closing_date,
                            'assessments': []
                        }
                    }
                    if (assessment.supplier_domain.status !== 'assessed' && assessment.active) {
                        brief_assessments[brief.title].assessments.push(assessment)
                    }
                })
            }
        })
        let sorted_brief_assessments = orderBy(values(brief_assessments).filter(v => !isEmpty(v.assessments)), 'closing_at', 'asc');
        return (<span>{sorted_brief_assessments.map((brief, i) => {
            let closingTime = new Date(brief.closing_at +' UTC').setHours(18);
            let date = (isBefore( closingTime, new Date()) ?
                'closed on '+ brief.closing_at :
                `${distanceInWords(new Date(), closingTime, {addSuffix: true})} (${format(closingTime, 'YYYY-MM-DD HH:mm Z')} AEST)`);
            return (
                <div key={i}>
                    <strong> {brief.title}</strong> <small>{date}</small>
                    <table className="content-table">
                        <thead>
                        <tr>
                            <th>applied</th>
                            <th>supplier</th>
                            <th>domain</th>
                            <th>actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {brief.assessments.map((a, i) => {
                                return (
                                    <tr key={a.id}>
                                        <td width="10%">{format(new Date(a.created_at), 'YYYY-MM-DD HH:mm')}</td>
                                        <td width="20%"><a
                                            href={"/admin/assessments/supplier/" + a.supplier_domain.supplier.code}>{a.supplier_domain.supplier.name}
                                            (#{a.supplier_domain.supplier.code})</a></td>
                                        <td width="60%">{a.supplier_domain.domain.name}</td>
                                        <td styleName="buttons" width="10%">
                                            <button name="Reject" onClick={e => {
                                                e.preventDefault();
                                                if (window.confirm('Do you want to reject supplier "'+a.supplier_domain.supplier.name+"' for '"+a.supplier_domain.domain.name+"'?")) {
                                                    onRejectClick(a.id);
                                                }
                                            }} styleName="reject" className={a.supplier_domain.status === 'unassessed' ? "" : "disabled"}>Reject</button>
                                            <button onClick={e => {
                                                e.preventDefault();
                                                if (window.confirm('Do you want to approve supplier "'+a.supplier_domain.supplier.name+"' for '"+a.supplier_domain.domain.name+"'?")) {
                                                    onApproveClick(a.id);
                                                }
                                            }} name="Approve" className={a.supplier_domain.status === 'unassessed' ? "" : "disabled"}>Approve
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>

                </div>)
        })}</span>)
    };
}


const mapStateToProps = ({assessments, meta}) => {
    return {assessments, meta}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onApproveClick: (id) => {
            dispatch(approveAssessment(id))
        },
        onRejectClick: (id) => {
            dispatch(rejectAssessment(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentList);
