import React, { useState } from 'react';

//** importing components **//
import { Link } from "gatsby";
import { motion } from 'framer-motion';

//** importing images **//
import mobileMenu from '../images/icons/colored/mobileMenu.svg'

//** importing styles **//
import "@fontsource/gothic-a1";
import "@fontsource/gothic-a1/900.css";
import "@fontsource/gothic-a1/600.css";
import "../scss/globalStyle.scss";
import "./layout.scss"

//** importing components **/
import IconLink from '../components/iconLink/iconLink';

const mobileOverlayVariants = {
    visible: {
        left: 0,
        opacity: 1,
        transition: {
            duration: .3
        }
    },
    hidden: {
        left: '-100%',
        opacity: 0,
        transition: {
            duration: .3
        }
    }
}

const overlayLinksVariants = {
    visible: i => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: (i * .15) + .3,
            duration: .15
        }
    }),
    hidden: {
        y: -10,
        opacity: 0,
    }
}


const Layout = ({ children }) => {
    const [ mobileOverlay, setMobileOverlay ] = useState(false);

    return (
        <main className='layout'>
            <nav className="navbar">
                <div>
                    <IconLink />
                </div>
                <li>
                    <ul>
                        <Link activeClassName="activeLink" to="/">Home</Link>
                    </ul>
                    <ul>
                        <Link activeClassName="activeLink" to="/about">About</Link>
                    </ul>
                    <ul>
                        <Link activeClassName="activeLink" to="/projects">Projects</Link>
                    </ul>
                    <ul>
                        <Link activeClassName="activeLink" to="/contact">Contact</Link>
                    </ul>
                    <ul>
                        <Link activeClassName="activeLink" to="/blog">Blog</Link>
                    </ul>
                </li>
            </nav>
            <motion.div className='mobileOverlay'
                variants={ mobileOverlayVariants }
                animate={ mobileOverlay ? 'visible' : 'hidden' }
                initial='hidden'
            >
                <div className="inner">
                    <motion.button
                        variants={ overlayLinksVariants }
                        custom={ 0 }
                        initial='hidden'
                        animate={ mobileOverlay ? 'visible' : 'hidden' }
                        className='link'
                        onClick={ _ => setMobileOverlay(!mobileOverlay) }
                    >
                        <Link activeClassName="activeLink" to="/">Home</Link>
                    </motion.button>
                    <motion.button
                        variants={ overlayLinksVariants }
                        custom={ 1 }
                        initial='hidden'
                        animate={ mobileOverlay ? 'visible' : 'hidden' }
                        className='link'
                        onClick={ _ => setMobileOverlay(!mobileOverlay) }
                    >
                        <Link activeClassName="activeLink" to="/about">About</Link>
                    </motion.button>
                    <motion.button
                        variants={ overlayLinksVariants }
                        custom={ 2 }
                        initial='hidden'
                        animate={ mobileOverlay ? 'visible' : 'hidden' }
                        className='link'
                        onClick={ _ => setMobileOverlay(!mobileOverlay) }
                    >
                        <Link activeClassName="activeLink" to="/projects">Projects</Link>
                    </motion.button>
                    <motion.button
                        variants={ overlayLinksVariants }
                        custom={ 3 }
                        initial='hidden'
                        animate={ mobileOverlay ? 'visible' : 'hidden' }
                        className='link'
                        onClick={ _ => setMobileOverlay(!mobileOverlay) }
                    >
                        <Link activeClassName="activeLink" to="/contact">Contact</Link>
                    </motion.button>
                    <motion.button
                        variants={ overlayLinksVariants }
                        custom={ 4 }
                        initial='hidden'
                        animate={ mobileOverlay ? 'visible' : 'hidden' }
                        className='link'
                        onClick={ _ => setMobileOverlay(!mobileOverlay) }
                    >
                        <Link activeClassName="activeLink" to="/blog">Blog</Link>
                    </motion.button>
                    <motion.button
                        variants={ overlayLinksVariants }
                        custom={ 4 }
                        initial='hidden'
                        animate={ mobileOverlay ? 'visible' : 'hidden' }
                        className='exit'
                        onClick={ _ => setMobileOverlay(!mobileOverlay) }
                    >
                        close
                    </motion.button>
                </div>
            </motion.div>
            { children }
            <div className="mobileBtn">
                <button
                    onClick={ _ => setMobileOverlay(!mobileOverlay) }
                >
                    <img src={ mobileMenu } alt="mobile menu icon" />
                </button>
            </div>
        </main>
    );
};

export default Layout;
