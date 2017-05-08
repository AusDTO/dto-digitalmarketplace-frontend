import React from 'react';
import {connect} from 'react-redux';

import format from 'date-fns/format';
import distanceInWords from 'date-fns/distance_in_words';
import isBefore from 'date-fns/is_before';

import has from 'lodash/has';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';

import {approveAssessment} from '../../redux/modules/assessments';

import './AssessmentList.css';

class AssessmentList extends React.Component {
    render() {
        const {assessments, url_approve, onApproveClick} = this.props;
        let brief_assessments = {};

        assessments.forEach((assessment) => {
            assessment.briefs.forEach((brief) => {
                if (!has(brief_assessments, brief.title)
                ) {

                    brief_assessments[brief.title] = {
                        'title': brief.title,
                        'closing_at': brief.dates.closing_date,
                        'assessments': []
                    }
                }
                if (assessment.supplier_domain.status !== 'assessed') {
                    brief_assessments[brief.title].assessments.push(assessment)
                }
            })
        })
        let sorted_brief_assessments = orderBy(values(brief_assessments).filter(v => !isEmpty(v.assessments)), 'closing_at', 'asc');
        return (<span>{sorted_brief_assessments.map((brief, i) => {
            let date = (isBefore( new Date(brief.closing_at), new Date()) ?
                'closed on '+ brief.closing_at :
                `${distanceInWords(new Date(), new Date(brief.closing_at), {addSuffix: true})} (${brief.closing_at})`);
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
                                            <button name="Reject" styleName="reject">Reject</button>
                                            <button onClick={e => {
                                                e.preventDefault();
                                                onApproveClick(a.id);
                                            }} name="Approve">Approve
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentList);
