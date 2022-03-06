export const springFromTop = {
	hidden: { y: -1000 },
	visible: {
		y: 0,
		transition: { duration: 2, delay: 1, type: "spring", stiffness: 80 },
	},
};

export const fieldAnimation = {
	hidden: { height: 0, opacity: 0 },
	visible: { height: "auto", opacity: 1, transition: { duration: 1 } },
};

export const fadeIn = {
	hidden: {
		opacity: 0,
		height: 0,
	},
	visible: { opacity: 1, height: "auto", transition: { duration: 1 } },
};
