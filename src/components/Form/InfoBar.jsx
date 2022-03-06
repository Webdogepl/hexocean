import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./animations";

function InfoBar(props) {
	return (
		<motion.div variants={fadeIn} initial="hidden" animate="visible">
			{props.message}
		</motion.div>
	);
}

export default InfoBar;
