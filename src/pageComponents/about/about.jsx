import React from 'react';

import AEducation from '../../components/aboutComponents/aEducation';
import ALanguage from '../../components/aboutComponents/aLanguage';
import AProgramming from '../../components/aboutComponents/aProgramming';

function AboutComponent() {
    return (
        <div>
            <AProgramming />
            <AEducation />
            <ALanguage />
        </div>
    );
};

export default AboutComponent;
