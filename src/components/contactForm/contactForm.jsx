import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import './contactForm.scss';

import PrimaryButton from '../buttons/primaryButton';

const formVariants = {
    hidden: {
        opacity: 0,
        y: +10,
        transiton: {
            duration: .3
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transiton: {
            duration: .3
        }
    }
};

const resVariants = {
    hidden: {
        opacity: 0,
        x: -10,
        y: '1rem',
        transiton: {
            duration: .3,
            delay: .3
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        y: '1rem',
        transiton: {
            duration: .3,
            delay: .3
        }
    }
};

const loadingVariants = {
    hidden: {
        opacity: 0,
        transiton: {
            duration: .3,
            delay: .3
        }
    },
    visible: {
        opacity: 1,
        transiton: {
            duration: .3,
            delay: .3
        }
    }
};

const encodeForNetlify = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
};

function ContactForm({ inView }) {
    const [ netlifyRes, setNetlifyRes ] = useState(null);
    const [ netlifyLoading, setNetlifyLoading ] = useState(false);

    //** managing inputs **//
    const nameInputRef = useRef('');
    const emailInputRef = useRef('');
    const messageInputRef = useRef('');
    const honeypot = useRef('');

    //** handeling form event **//
    const handleSubmit = (event) => {
        event.preventDefault();
        setNetlifyLoading(true);

        const formObj = {
            "form-name": event.target.getAttribute("name"),
            "name": nameInputRef.current.value,
            "email": emailInputRef.current.value,
            "message": messageInputRef.current.value,
            "date": new Date()
        };
        
        if( honeypot.current.value !== '' ){
            formObj["honeypot"] = honeypot.current.value;
        } 
        
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encodeForNetlify(formObj)
        })
            .then( res => {
                res.ok ? 
                    setNetlifyRes(true) 
                    :
                    setNetlifyRes(false);
                setNetlifyLoading(false);
            })
            .catch( _ => {
                setNetlifyRes(false);
                setNetlifyLoading(false);
            });
    };

    console.log(`netlifyRes: ${netlifyRes}`, `netlifyLoading: ${netlifyLoading}`)

    return (
        <div className='formComponent'>
            <motion.div 
                initial="hidden"
                variants={ resVariants }
                animate={ inView && netlifyRes !== null && !netlifyLoading ? 'visible' : 'hidden' }
            >
                {
                    netlifyRes === true ? 
                    <div>
                        your message has been reserved
                    </div>
                    : null
                }
                {
                    netlifyRes === false ? 
                    <div>
                        <p>
                            something went wrong, you can contact me on this email address <b>contact@amir4rab.com</b>
                        </p>
                    </div>
                    : null
                }
            </motion.div>
            <motion.div
                initial="hidden"
                variants={ loadingVariants }
                animate={ inView && netlifyRes === null && netlifyLoading ? 'visible' : 'hidden' }
            >
                <div className='loadingElement' />
            </motion.div>
            <motion.form 
                initial="hidden"
                variants={ formVariants }
                animate={ inView && netlifyRes === null && !netlifyLoading ? 'visible' : 'hidden' }
                name="contact-v1" 
                method="post" 
                data-netlify="true" 
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
            >
                <input type="hidden" name="form-name" value="contact-v1.11" />
                <p hidden>
                    <label>
                        Don’t fill this out: <input name="bot-field" ref={honeypot} />
                    </label>
                </p>
                <p hidden>
                    <label>
                        Date <input name="date" type="date" />
                    </label>
                </p>
                <div className='row'>
                    <div className='inputGroup'>
                        <label>
                            <p>Your Name</p>
                            <input 
                                ref={nameInputRef} 
                                type="text" 
                                name="name"
                                required={ true }
                            />
                        </label>
                    </div>
                    <div className='inputGroup'>
                        <label>
                            <p>Your Email</p>
                            <input 
                                ref={emailInputRef} 
                                type="email" 
                                name="email"
                                required={ true }
                            />
                        </label>
                    </div>
                </div>
                <div className='inputGroup'>
                    <label>
                        <p>Message</p>
                        <textarea 
                            name="message"
                            ref={ messageInputRef }
                            required={ true }
                        ></textarea>
                    </label>
                </div>
                <div className='buttons'>
                    <PrimaryButton type="submit">
                        send
                    </PrimaryButton>
                </div>
            </motion.form>
        </div>
    );
};

export default ContactForm;
