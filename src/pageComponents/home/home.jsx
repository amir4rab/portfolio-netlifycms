import React from 'react';
import * as classes from './home.module.scss';
import { Link } from 'gatsby';
// import { GatsbyImage } from "gatsby-plugin-image"

function HomeComponent() {
    return (
        <div className={ classes.homeComponent }>
            <div className={ classes.details }>
                <div className={ classes.about }>
                    <h1 className={ classes.title }>
                        Hi, my name is <br/>
                        <strong>Amir Arab</strong> a <br/>
                        <strong>Front-end dev</strong><br/>
                    </h1>
                    <button>
                        <Link to="/about">About me</Link>
                    </button>
                </div>
                <div className={ classes.links }>
                    github, twitter, email
                </div>
            </div>
            <div className={ classes.projectSliderDiv }>

            </div>
        </div>
    );
};

export default HomeComponent;
