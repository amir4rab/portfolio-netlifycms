import React from 'react';
import * as classes from './terminal.module.scss';
import { useStaticQuery, graphql } from 'gatsby';

const randomizer = (inputArr) => inputArr[Math.floor(Math.random() * inputArr.length)];

function TerminalComponent() {
    const data = useStaticQuery(graphql`
        query TerminalContentsQuery {
            allFile(filter: {sourceInstanceName: {eq: "terminalContents"}}) {
                nodes {
                    childMarkdownRemark {
                        html
                    }
                }
            }
        }
    `);
    randomizer(data.allFile.nodes);


    return (
        <div className={ classes.terminal }>
            <div className={ classes.inner }>
                <div className={ classes.header }>
                    <div className={ classes.buttons }>
                        <button aria-label='none' className={ classes.close }></button>
                        <button aria-label='none' className={ classes.min }></button>
                        <button aria-label='none' className={ classes.max }></button>
                    </div>
                    <div className={ classes.title }>amir4rab</div>
                </div>
                <div className={ classes.body } dangerouslySetInnerHTML={{ __html: randomizer(data.allFile.nodes).childMarkdownRemark.html }}>
                </div>
            </div>
        </div>
    );
};

export default TerminalComponent;
