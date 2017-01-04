import React from 'react';

const Row = ({ title, children, show }) => {
    if (!show) {
        return null;
    }

    return (
        <span>
            <hr/>
            <br/>
            <div className="row seller-profile__row">
              <div className="col-sm-3"><b>{title}</b></div>
              <div className="col-sm-8 col-sm-push-1">{children}</div>
            </div>
            <br/>
        </span>
    )
}

export default Row;