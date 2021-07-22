import React from 'react';
import * as classes from './contact.module.scss';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import ContactForm from '../../components/contactForm/contactForm';
import SocialLink from '../../components/buttons/socialLink';

import githubLogo from '../../images/icons/green/githubIcon.svg';
import twitterLogo from '../../images/icons/green/twitterIcon.svg';
import codesandboxLogo from '../../images/icons/green/codesandboxIcon.svg';

const titleVariants = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: .3
        }
    }
}

const subtitleVariants = {
    hidden: {
        opacity: 0,
        y: -10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .3
        }
    }
}

const linkVariants = {
    hidden: {
        opacity: 0,
        x: -15,
    },
    visible: i => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: .3,
            delay: (.3 * i)
        }
    })
}

function ContactComponent() {
    const [ ref, inView ] = useInView({
        triggerOnce: true,
    });

    return (
        <div 
            ref={ ref }
            className={ classes.contactComponent }>
            <motion.h1 
                variants={ titleVariants }
                initial='hidden'
                animate={ inView ? 'visible' : 'hidden' }
                className={ classes.title }>
                Contact
            </motion.h1>
            <div className={ classes.section }>
                <motion.h3 
                    className={ classes.subTitle }
                    variants={ subtitleVariants }
                    initial='hidden'
                    animate={ inView ? 'visible' : 'hidden' }
                >
                    socials
                </motion.h3>
                <div className={ classes.socialLinks }>
                    <motion.div 
                        className={ classes.socialLinkItem }
                        variants={ linkVariants }
                        custom={ 0 }
                        initial='hidden'
                        animate={ inView ? 'visible' : 'hidden' }
                    >
                        <SocialLink href='https://github.com/amir4rab'>
                            <img src={ githubLogo } alt="github" />
                        </SocialLink>
                    </motion.div>
                    <motion.div 
                        className={ classes.socialLinkItem }
                        variants={ linkVariants }
                        custom={ 1 }
                        initial='hidden'
                        animate={ inView ? 'visible' : 'hidden' }
                    >
                        <SocialLink href='https://twitter.com/amir4rab'>
                            <img src={ twitterLogo } alt="twitter" />
                        </SocialLink>
                    </motion.div>
                    <motion.div 
                        className={ classes.socialLinkItem }
                        variants={ linkVariants }
                        custom={ 2 }
                        initial='hidden'
                        animate={ inView ? 'visible' : 'hidden' }
                    >
                        <SocialLink href='https://codesandbox.io/u/amir4rab'>
                            <img src={ codesandboxLogo } alt="codesandbox" />
                        </SocialLink>
                    </motion.div>
                </div>
            </div>
            <div className={ classes.section }>
                <motion.h3 
                    className={ classes.subTitle }
                    variants={ subtitleVariants }
                    initial='hidden'
                    animate={ inView ? 'visible' : 'hidden' }
                >
                    contact form
                </motion.h3>
                <ContactForm inView={ inView } />
            </div>
        </div>
    );
};

export default ContactComponent;
