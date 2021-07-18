import React, { useState, useEffect } from 'react';
import './imageSlider.scss';

import { GatsbyImage } from 'gatsby-plugin-image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const imagesVarinets = {
    onTop: {
        x: 0,
        zIndex: 50,
        opacity: 1,
        scale: 1
    },
    goOnTop: {
        x: [ -75, 10, 0],
        zIndex: 50,
        opacity: 1,
        scale: 1,
        transition: {
            duration: .3
        }
    },
    onBack: {
        x: [ 0, -85, -75],
        zIndex: 15,
        scale: .8,
        opacity: .9,
        transition: {
            duration: .3
        }
    },
    hidden: {
        opacity: 0
    }
}

const mainVarinets = {
    visible: {
        opacity: 1,
        transition: {
            duration: .5
        }
    },
    hidden: {
        opacity: 0
    }
}


const addIdToArray = (arr) => arr.map(( arrItem, i ) => ({
    image: arrItem.childImageSharp.gatsbyImageData,
    id: `id${Math.floor(Math.random() * 1000000000)}`,
    index: i,
}));

function ImageSlider({ imagesArr }) {
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ dataArr ] = useState(addIdToArray(imagesArr));
    const mainControls = useAnimation();

    const { ref, inView } = useInView({
        threshold: .5,
        triggerOnce: true
    })
    useEffect( _ => {
        if ( inView ) {
            mainControls.start('visible');
        } else {
            mainControls.start('hidden');
        }
    },[ dataArr, inView, mainControls ])

    useEffect( _ => {
        if ( inView ) {
            mainControls.start('initial');
        } else {
            mainControls.start('hidden');
        }
    },[ dataArr, inView, mainControls ])

    return (
        <div ref={ ref } className='projectimageSlider'>
            <motion.div 
                animate={ mainControls }
                variants={ mainVarinets }
                initial={ 'hidden' }
                className='indicators'>
                {
                    dataArr.map(item => (
                        <button 
                            key={`${item.id}-indicator`}
                            className={[ 
                                'indicator',
                                item.index === activeIndex ? 'active' : '',
                            ].join(' ')}
                            onClick={ _ => setActiveIndex(item.index)}
                            aria-label='indicator'
                        />
                        ))
                }
            </motion.div>
            <motion.div
                className="inner"
                animate={ mainControls }
                variants={ mainVarinets }
                initial={ 'hidden' }
            >
                {
                    dataArr.map(( data, i ) => 
                        <motion.div
                            className='imageWrapper'
                            key={ data.id }
                            inital="hidden"
                            animate={ !inView ? 'hidden' : activeIndex === data.index ? 'goOnTop' : 'onBack' }
                            variants={ imagesVarinets }
                        >
                            <GatsbyImage image={ data.image } alt='image' />
                        </motion.div>)
                }
            </motion.div>
        </div>
    );
};

export default ImageSlider;
