import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import MonitoringCorrectForm from "./MonCorrectForm";
import MonitoringCard from "./MonCard";

export default function MonitoringCardRouter({ props }) {

	const history = props;

	return(
		<Switch>
			<Route
				history={history}
				path="/card/correct/:id"
				component={MonitoringCorrectForm}
			/>
			<Route
				history={history}
				path="/card/view/:id"
				component={MonitoringCard}
			/>
			<Redirect
				from="/card"
				to="/history"
			/>
		</Switch>
	);
}