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
    onBack: {
        x: -75,
        zIndex: 15,
        scale: .9,
        opacity: .9
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
    const [ animatedIn, setAnimatedIn ] = useState(false);

    // const imageOneControls = useAnimation();
    // const imageTwoControls = useAnimation();
    const mainControls = useAnimation();

    const { ref, inView } = useInView({
        threshold: .5
    })


    useEffect( _ => {
        if ( animatedIn ) return;
        if ( inView ) {
            mainControls.start('visible');
            setAnimatedIn(true);
        } else {
            mainControls.start('hidden');
        }
    },[ setAnimatedIn, dataArr, inView, mainControls, animatedIn ])

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
                            animate={ activeIndex === data.index ? 'onTop' : 'onBack' }
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
