import logo from './logo.svg';
import './App.css';
import React from "react";

import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import HomePage from "./HomePage";
import NoPage from "./NoPage";
import TablePage from "./TablePage";
import HistoryResultsPage from "./HistoryResultsPage";
import TopScorerPage from "./TopScorerPage";
import StatsPage from "./StatsPage";
import PrintNavLink from "./PrintNavLink";
import axios from "axios";


class App extends React.Component{

    state={
        pages:[],
        leagues:[]
    }
    componentDidMount() {
    this.getApi();
    }
    getApi=()=>{
        axios.get("https://app.seker.live/fm1/leagues").
        then((response)=>{
            this.setState({
                leagues: response.data
            })
        });
    }

    render() {

    return (
        <div className="App">
            <BrowserRouter >
                <PrintNavLink url={"/"}name={"Home"}/>
                <PrintNavLink url={"/table"}name={"Tables"}/>
                <PrintNavLink url={"/history"}name={"History Results"}/>
                <PrintNavLink url={"/topScorer"}name={"Top Scorer"}/>
                <PrintNavLink url={"/Stats"}name={"Statistics"}/>
                <Routes>
                    <Route path={"/"} element={<HomePage />}/>
                    <Route path={"*"} element={<NoPage/>}/>
                    <Route path={"/table"} element={<TablePage title={"Table"} leagues={this.state.leagues}/>}/>
                    <Route path={"/history"} element={<HistoryResultsPage title={"History Results"} leagues={this.state.leagues}/>}/>
                    <Route path={"/topScorer"} element={<TopScorerPage title={"Top Scorer"}leagues={this.state.leagues}/>}/>
                    <Route path={"/stats"} element={<StatsPage title={"Statistics"}leagues={this.state.leagues}/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    );
  }
}

export default App;
