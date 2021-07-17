import React, { memo } from 'react';
import * as classes from './terminal.module.scss';
import { useStaticQuery, graphql } from 'gatsby';

const randomGuesser = (max) => {
    return Math.floor(Math.random() * max);
}

const TerminalComponent = memo(() => {
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
                <div 
                    className={ classes.body } 
                    dangerouslySetInnerHTML={{ __html: data.allFile.nodes[randomGuesser(data.allFile.nodes.length)].childMarkdownRemark.html }}>
                </div>
            </div>
        </div>
    );
});

export default TerminalComponent;
