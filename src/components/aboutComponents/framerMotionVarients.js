export const titleVarients = {
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .3
        }
    },
    hidden: {
        y: 10,
        opacity: 0,
    }
}
export const textsVarients = {
    visible: i => ({
        x: 0,
        opacity: 1,
        transition: {
            delay: i * 0.3,
        },
    }),
    hidden: {
        x: 10,
        opacity: 0,
    }
}
export const heroVarients = {
    visible:{
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            delay: .3,
            duration: .3
        }
    },
    hidden: {
        y: -30,
        opacity: 0,
        scale: .9
    }
}