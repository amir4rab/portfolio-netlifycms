import React from 'react';
import './indicators.scss';

const elementMaker = (len, activeIndex, setIndex) => {
    const elmentArr = []
    for (let i = 0; i < len ; i++ ) {
        elmentArr.push(
            <button 
                className={[
                    'indicator',
                    `${ i === activeIndex ? 'activeIndex' : '' }`
                ].join(' ')} 
                key={`indicator${i}`}
                onClick={ _ => setIndex(i) }
                aria-label="indicator"
            />
        )
    }
    return elmentArr;
}

function Indicators({ len, activeIndex, setIndex }) {
    return (
        <div className='projectsIndicatorsWrapper'>
            {
                elementMaker(len, activeIndex, setIndex)
            }
        </div>
    );
};

export default Indicators;
