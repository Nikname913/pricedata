import React from "react";
import Head from './Head';
import Main from './Main';
import LogsList from "./sideMenu/logsList";
import ProductsEditor from "./inMain/ProductsEditor";

export default function Home() {
	return(
		<React.Fragment>
			<Head/>
			<Main/>
			<LogsList/>
			<ProductsEditor/>
		</React.Fragment>
	);
}