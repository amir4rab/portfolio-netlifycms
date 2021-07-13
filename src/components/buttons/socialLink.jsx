import React from 'react';

function SocialLink({ href, className, children }) {
    return (
        <div className={className}>
            <a href={ href } target="_">
                { children }
            </a>
        </div>
    );
};

export default SocialLink;
