import React from 'react';
import Cookies from 'js-cookie';

var cstoken = Cookies.get('cstoken');

const CSToken = () => {
    return (
        <input type="hiddent" name="csrfmiddlewaretoken" value={cstoken} />
    );
};

export default CSToken;