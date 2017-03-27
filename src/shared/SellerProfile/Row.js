import React from 'react';
import styles from './SellerProfile.css'; // eslint-disable-line no-unused-vars


const Row = ({ title, children, marginBot, show }) => {
    if (!show) {
        return null;
    }

    var margin = "";
    if (marginBot) {
        margin = "styles.row rowNoMargin";
    } else {
        margin = "styles.row";
    }
    
    return (
        <div className="row"  styleName={margin}>
            <hr />
            <div className="col-sm-3 col-xs-12">
                <h4 className="seller-profile__section-title">{title}</h4>
            </div>
            <div className="col-sm-8 col-sm-push-1 col-xs-12">
                {children}
            </div>
        </div>
    )
}

export default Row;
