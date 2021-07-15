import React from 'react';
import { Link } from 'gatsby';

import * as classes from './home.module.scss';

import { motion } from 'framer-motion';

import ProjectsSlider from '../../components/projectsSlider/projectsSlider';
import PrimaryButton from '../../components/buttons/primaryButton';
import SocialLink from '../../components/buttons/socialLink';

import githubIcon from '../../images/icons/green/githubIcon.svg';
import codesandbox from '../../images/icons/green/codesandboxIcon.svg';


function HomeComponent() {
    return (
        <div className={ classes.homeComponent }>
            <div className={ classes.details }>
                <div className={ classes.about }>
                    <motion.h1 
                        initial={{ y:10, opacity: 0 }} 
                        animate={{ y:0, opacity: 1 }}
                        transition={{ duration: .2 }}
                        className={ classes.title }>
                        Hi, my name is <br/>
                        <strong>Amir Arab</strong> a <br/>
                        <strong>Front-end dev</strong><br/>
                    </motion.h1>
                    <motion.div
                        initial={{ y:10, opacity: 0 }} 
                        animate={{ y:0, opacity: 1 }}
                        transition={{ delay: .2, duration: .2 }}>
                        <PrimaryButton>
                            <Link to="/about">About me</Link>
                        </PrimaryButton>
                    </motion.div>
                </div>
                <motion.div 
                    initial={{ y:10, opacity: 0 }} 
                    animate={{ y:0, opacity: 1 }}
                    transition={{ delay: .4, duration: .2 }}
                    className={ classes.links }>
                    <SocialLink className={ classes.link } href="https://github.com/amir4rab">
                        <img src={ githubIcon } className={ classes.imgIcon } alt="github icon" />
                    </SocialLink>
                    <SocialLink className={ classes.link } href="https://codesandbox.io/amir4rab">
                        <img src={ codesandbox } className={ classes.imgIcon } alt="codesandbox icon" />
                    </SocialLink>
                </motion.div>
            </div>
            <div className={ classes.projectSliderDiv }>
                <ProjectsSlider />
            </div>
        </div>
    );
};

export default HomeComponent;
