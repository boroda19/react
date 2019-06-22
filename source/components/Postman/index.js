import React from 'react';
import  { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

import { withProfile } from 'components/HOC/withProfile';
import Styles from './styles.m.css';

const animatePostmanEnter = (composer) => {
    fromTo(
        composer,
        1,
        { x: 300 },
        { x: 0 },
    );
};

const animatePostmanEntered = (composer) => {
    fromTo(
        composer,
        1,
        { x: 0 },
        { x: 300 },
    );
};

const Postman = (props) => {
    return (
        <Transition
            appear
            in
            timeout = { 4000 }
            onEnter = { animatePostmanEnter }
            onEntered = { animatePostmanEntered }>
            <section className = { Styles.postman }>
                <img src = { props.avatar } />
                <span>Welcome online, { props.currentUserFirstname }</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
