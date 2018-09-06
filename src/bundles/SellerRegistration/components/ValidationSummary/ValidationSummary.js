import React from 'react';
import PageAlert from '@gov.au/page-alerts';
import { Link } from 'react-router-dom';

export default class ValidationSummary extends React.Component {
    render() {
        const {
            form,
            applicationErrors,
            renderLink,
            title,
            filterFunc
        } = this.props;

        let errors = applicationErrors;
        if (filterFunc) {
            errors = applicationErrors.filter(filterFunc);
        }
        return (
            ((form && form.submitFailed === false) || !form) && errors.length > 0 ? (
                <PageAlert as="error">
                    <h3>{title}</h3>
                    <ul>
                        {errors.map(ae => {
                            return (renderLink) ?
                                <li key={ae.message}><Link to={ae.field ? `/${ae.step}#${ae.field}`: `/${ae.step}`} key={ae.message}>{ae.message}</Link></li> :
                                <li key={ae.message}>{ae.message}</li>
                        })}
                    </ul>
                </PageAlert>) : ''
        );
    }
}

ValidationSummary.defaultProps = {
    applicationErrors: [],
    renderLink: true,
    form: null,
    title: 'Errors',
    filterFunc: (() => true)
}
