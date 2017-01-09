import React from 'react';

const Row = ({ title, children, show }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="row seller-profile__row">
            <hr />
            <div className="col-sm-3">
                <h4 className="seller-profile__section-title">{title}</h4>
            </div>
            <div className="col-sm-8 col-sm-push-1">
                {children}
            </div>
        </div>
    )
}

export default Row;