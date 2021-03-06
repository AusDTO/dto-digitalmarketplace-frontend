import React from 'react';
import styles from './SellerProfile.css'; // eslint-disable-line no-unused-vars


const Row = ({ title, children, marginBot, show }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="row"  styleName={marginBot ? "styles.row rowNoMargin" : "styles.row"}>
            <hr />
            <div className="col-sm-3 col-xs-12">
                <h2 className="seller-profile__section-title au-display-lg">{title}</h2>
            </div>
            <div className="col-sm-8 col-sm-push-1 col-xs-12">
                {children}
            </div>
        </div>
    )
}

export default Row;
