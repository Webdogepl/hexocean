import { useState } from "react";
import styles from "./DishForm.module.scss";
import InfoBar from "./InfoBar";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { fieldAnimation, springFromTop } from "./animations";

function DishForm() {
	const [response, setResponse] = useState();

	const onSubmit = async (values) => {
		console.log(values);
		axios({
			method: "post",
			url: "https://frosty-wood-6558.getsandbox.com:443/dishes",
			data: values,
		})
			.then(function (response) {
				console.log(response);
				setResponse("Data submitted succesfully ✔️");
			})
			.catch(function (error) {
				console.log(error);
				setResponse("Data send failed, please try again later ❌");
			});
	};

	const Condition = ({ when, is, children }) => (
		<Field name={when} subscription={{ value: true }}>
			{({ input: { value } }) => (value === is ? children : null)}
		</Field>
	);

	const parseToFloat = (value) =>
		isNaN(parseFloat(value)) ? "" : parseFloat(value);

	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				className={styles.formContainer}
				variants={springFromTop}
				initial="hidden"
				animate="visible"
			>
				<h1 className={styles.title}>HexOcean Dish Form</h1>

				<Form
					onSubmit={onSubmit}
					initialValues={{ preparation_time: "01:00:00" }}
					render={({ handleSubmit, form, submitting, pristine, values }) => (
						<form
							onSubmit={(event) => {
								handleSubmit(event).then(form.reset);
							}}
						>
							<div>
								<label>Dish name</label>
								<Field name="name" component="input" type="text" required />
							</div>
							<div>
								<label>Preparation time</label>
								<Field
									name="preparation_time"
									component="input"
									type="time"
									value=""
									min="00:00:00"
									max="12:00:00"
									step="1"
									required
								/>
							</div>
							<div>
								<label>Dish type</label>
								<Field name="type" component="select" required>
									<option value="" disabled>
										Choose
									</option>
									<option value="pizza">Pizza 🍕</option>
									<option value="soup">Soup 🍲</option>
									<option value="sandwich">Sandwich 🥪</option>
								</Field>
							</div>

							<Condition when="type" is="pizza">
								<motion.div
									variants={fieldAnimation}
									initial="hidden"
									animate="visible"
								>
									<div>
										<label>Number of slices</label>
										<Field
											name="no_of_slices"
											component="input"
											type="number"
											min="0"
											parse={parseToFloat}
											required
										/>
									</div>

									<div>
										<label>Diameter</label>
										<Field
											name="diameter"
											component="input"
											min="1"
											type="number"
											parse={parseToFloat}
											required
										/>
									</div>
								</motion.div>
							</Condition>

							<Condition when="type" is="soup">
								<motion.div
									variants={fieldAnimation}
									initial="hidden"
									animate="visible"
								>
									<label>Spiciness scale (1-10)</label>
									<Field
										name="spiciness_scale"
										component="input"
										type="number"
										min="1"
										max="10"
										parse={parseToFloat}
										required
									/>
								</motion.div>
							</Condition>

							<Condition when="type" is="sandwich">
								<motion.div
									variants={fieldAnimation}
									initial="hidden"
									animate="visible"
								>
									<label>Slices of bread</label>
									<Field
										name="slices_of_bread"
										component="input"
										min="0"
										type="number"
										parse={parseToFloat}
										required
									/>
								</motion.div>
							</Condition>

							<div className={styles.buttonsWrapper}>
								<button type="submit" disabled={submitting || pristine}>
									Submit
								</button>
								<button
									type="button"
									onClick={form.reset}
									disabled={submitting || pristine}
								>
									Reset
								</button>
							</div>

							{response && <InfoBar message={response} />}
						</form>
					)}
				/>
			</motion.div>
		</AnimatePresence>
	);
}

export default DishForm;
