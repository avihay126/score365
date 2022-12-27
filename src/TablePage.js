import React from "react";
import PrintPageTitle from "./PrintPageTitle";
import PrintLeaguesBar from "./PrintLeaguesBar";
import axios from "axios";
import PrintTable from "./PrintTable";

const teamView={
    name:"",
    numOfMatches:"",
    scored:"",
    conceded:"",
    difference:"",
    points:""
}

class TablePage extends React.Component {

    state = {
        teams:[],
        chosenLeague:1,
        t:[],
        load: false


    }
    componentDidMount() {
       this.setChosenLeague(this.props.league)


    }
    setChosenLeague = (league) => {
        axios.get("https://app.seker.live/fm1/teams/" + league).then((response) => {
            this.setState({
                teams:response.data
            })
        });
    }
    getTeamMatches=(leagueId, teamId,i,teamName)=>{
        let x=[];
        axios.get("https://app.seker.live/fm1/history/"+leagueId+"/"+teamId).then((response)=>{
            let matches=response.data;
            debugger;
            let name=teamName;
            let numOfMatches=matches.length;
            let scored=this.getTeamGoals(matches,teamId,true);
            let conceded=this.getTeamGoals(matches,teamId,false);
            let difference=scored-conceded;

            const team={
                name: name,
                numOfMatches:numOfMatches,
                scored: scored,
                conceded:conceded,
                difference:difference
            }

            x.push(team);
            this.setState({
                t:x
            });
        });

    }

    getTeamGoals=(matches,teamId,conceded)=>{
        let home=true;
        let scored=0;
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].awayTeam.id===teamId){
                home=!conceded;
            }else {
                home=conceded;
            }
            let goals=matches[i].goals;
            for (let j = 0; j < goals.length; j++) {
                if (goals[j].home===home){
                    scored++;
                }
            }
        }
        return scored;
    }

    initTable=()=>{


        let points=0

        for (let i = 0; i < this.state.teams.length; i++) {
            this.getTeamMatches(this.state.teams[i].league.id,this.state.teams[i].id,i,this.state.teams[i].name);
        }


    }




    render() {
        return (
            <div>
                <div>
                    <PrintPageTitle title={this.props.title}/>
                    <button onClick={this.initTable}></button>
                </div>

                <div>
                    <PrintTable teams={this.state.teams}/>
                </div>
            </div>

        )
            ;

    }
}

export default TablePage;