import * as React from "react";
import { useState } from "react";

export const RightsObligations = ({ handleChange, mainFormData, setMainFormData }) => {
    
	return (
		<div className="formContainer">
			<>
				<label>Срок передачи товара</label>
				<input type="number" name="term" value={mainFormData.term} onChange={handleChange} />

				<label>Срок принятия товара</label>
				<input
					type="number"
					name="deadline"
					value={mainFormData.deadline}
					onChange={handleChange}
				/>
			</>
		</div>
	);
};
