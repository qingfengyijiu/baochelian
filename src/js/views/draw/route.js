import React, {Component} from 'react'
import {Route, IndexRoute} from 'react-router'
import Draw from "./Draw.jsx"
import Introduction from "./Introduction.jsx"
import WinningList from "./WinningList.jsx"

export default (
	<Route path="draw">
		<IndexRoute component={Draw} />
		<Route path="introduction" component={Introduction} />
		<Route path="winninglist" component={WinningList} />
	</Route>
)