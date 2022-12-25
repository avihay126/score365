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
import PrintLeaguesBar from "./PrintLeaguesBar";




class App extends React.Component{

    state={
        currentUrl:window.location.pathname,
        leagues:[],

    }
    componentDidMount() {
    this.getLeagues();

    }
    getLeagues=()=>{
        axios.get("https://app.seker.live/fm1/leagues").
        then((response)=>{
            this.setState({
                leagues: response.data,
            })
        });
    }



    changeCurrentUrl=()=>{
        this.setState({
            currentUrl: window.location.pathname
        })
    }
    render() {
    return (
        <div className="App">
            <BrowserRouter >
                <PrintNavLink url={"/"}name={"Home"} changeUrl={this.changeCurrentUrl} />
                <PrintNavLink url={"/table"}name={"Tables"} changeUrl={this.changeCurrentUrl} />
                <PrintNavLink url={"/history"}name={"History Results"}changeUrl={this.changeCurrentUrl} />
                <PrintNavLink url={"/topScorer"}name={"Top Scorer"}  changeUrl={this.changeCurrentUrl}/>
                <PrintNavLink url={"/Stats"}name={"Statistics"} changeUrl={this.changeCurrentUrl} />
                <Routes>
                    <Route path={"/"} element={<HomePage  />}/>
                    <Route path={"*"} element={<NoPage/>}/>
                    <Route path={"/table"} element={<TablePage title={"Table"}leagues={this.state.leagues} />}/>
                    <Route path={"/history"} element={<HistoryResultsPage title={"History Results"} />}/>
                    <Route path={"/topScorer"} element={<TopScorerPage title={"Top Scorer"}/>}/>
                    <Route path={"/stats"} element={<StatsPage title={"Statistics"}/>}/>
                </Routes>
            </BrowserRouter>
            {/*{window.location.pathname !== "/" && <PrintLeaguesBar leagues={this.state.leagues} chosenLeague={this.checkChosenLeague}/>}*/}
        </div>
    );
  }
}

export default App;
