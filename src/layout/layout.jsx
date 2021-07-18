import React from 'react';

//** importing components **//
import { Link } from "gatsby";

//** importing styles **//
import "@fontsource/gothic-a1";
import "@fontsource/gothic-a1/900.css";
import "@fontsource/gothic-a1/600.css";
import "../scss/globalStyle.scss";
import "./layout.scss"

//** importing components **/
import IconLink from '../components/iconLink/iconLink';


const Layout = ({ children }) => {
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
            { children }
        </main>
    );
};

export default Layout;
