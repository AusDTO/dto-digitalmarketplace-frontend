import React from 'react';

export const newline = (val) => {
    if (!val) return val;
    // https://medium.com/@kevinsimper/react-newline-to-break-nl2br-a1c240ba746
    return val.replace(/(\r\n|\n|\r)/gm, '\n').split('\n').map(function (item, key) {
        return (
            <span key={key}>
                {item}
                <br/>
            </span>
        )
    });
};
export default {
    newline
}