import React, { useEffect } from "react";
import Head from './Head';
import Main from './Main';
import LogsList from "./sideMenu/logsList";
import ProductsEditor from "./inMain/ProductsEditor";
import fetchDispatcher from "../services/fetch-query.service";

export default function Home() {

	useEffect(() => {

		// validation request for api testing
		// delete after connecting all methods
		// eslint-disable-next-line no-unused-vars
		const getList = fetchDispatcher({ fetchType: 'GET_CLIENTS' });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	return (
		<React.Fragment>
			<Head />
			<Main />
			<LogsList />
			<ProductsEditor />
		</React.Fragment>
	);
}