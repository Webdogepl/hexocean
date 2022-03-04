/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Form, Field } from "react-final-form";

function DishForm() {
	const onSubmit = async (values) => {
		window.alert(JSON.stringify(values, 0, 2));
	};

	const Condition = ({ when, is, children }) => (
		<Field name={when} subscription={{ value: true }}>
			{({ input: { value } }) => (value === is ? children : null)}
		</Field>
	);

	return (
		<>
			<Form
				onSubmit={onSubmit}
				initialValues={{}}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div>
							<label>Dish name</label>
							<Field name="name" component="input" type="text" required />
						</div>
						<div>
							<label>Preparation time</label>
							<Field
								name="preparation_time"
								component="input"
								type="number"
								min="0"
								max="12"
								required
							/>
						</div>
						<div>
							<label>Dish type</label>
							<Field name="type" component="select" required>
								<option>Choose</option>
								<option value="pizza">Pizza 🍕</option>
								<option value="soup">Soup 🍲</option>
								<option value="sandwich">Sandwich 🥪</option>
							</Field>
						</div>

						<Condition when="type" is="pizza">
							<label>Number of slices</label>
							<Field
								name="no_of_slices"
								component="input"
								type="number"
								required
							/>

							<label>Diameter</label>
							<Field name="diameter" component="input" type="number" required />
						</Condition>

						<Condition when="type" is="soup">
							<label>Spiciness scale</label>
							<Field
								name="spiciness_scale"
								component="input"
								type="number"
								required
							/>
						</Condition>

						<Condition when="type" is="sandwich">
							<label>Slices of bread</label>
							<Field
								name="slices_of_bread"
								component="input"
								type="number"
								required
							/>
						</Condition>

						<div className="buttons">
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
						<pre>{JSON.stringify(values, 0, 2)}</pre>
					</form>
				)}
			/>
		</>
	);
}

export default DishForm;
