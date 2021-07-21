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
        transiton: {
            duration: .3
        }
    }
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
                <h3 className={ classes.subTitle }>
                    socials
                </h3>
                <div className={ classes.socialLinks }>
                    <div className={ classes.socialLinkItem }>
                        <SocialLink href='https://github.com/amir4rab'>
                            <img src={ githubLogo } alt="github" />
                        </SocialLink>
                    </div>
                    <div className={ classes.socialLinkItem }>
                        <SocialLink href='https://twitter.com/amir4rab'>
                            <img src={ twitterLogo } alt="twitter" />
                        </SocialLink>
                    </div>
                    <div className={ classes.socialLinkItem }>
                        <SocialLink href='https://codesandbox.io/u/amir4rab'>
                            <img src={ codesandboxLogo } alt="codesandbox" />
                        </SocialLink>
                    </div>
                </div>
            </div>
            <div className={ classes.section }>
                <h3 className={ classes.subTitle }>
                    contact form
                </h3>
                <ContactForm inView={ inView } />
            </div>
        </div>
    );
};

export default ContactComponent;
