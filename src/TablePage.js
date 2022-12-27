import React from "react";
import PrintPageTitle from "./PrintPageTitle";
import axios from "axios";
import PrintTable from "./PrintTable";

const teamView = {
    name: "",
    numOfMatches: "",
    scored: "",
    conceded: "",
    difference: "",
    points: ""
}

class TablePage extends React.Component {

    state = {
        teams: [],
        chosenLeague: 1,
        t: [],
        load: false,
        x: []


    }

    componentDidMount() {
        this.setChosenLeague(1);


    }

    setChosenLeague = (league) => {
        axios.get("https://app.seker.live/fm1/teams/" + league).then((response) => {
            let teams=response.data;
            this.setState({
                teams: teams
            })
            this.a(teams);


        });
    }


    getTeamGoals = (matches, teamId, conceded) => {
        let home = true;
        let scored = 0;
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].awayTeam.id === teamId) {
                home = !conceded;
            } else {
                home = conceded;
            }
            let goals = matches[i].goals;
            for (let j = 0; j < goals.length; j++) {
                if (goals[j].home === home) {
                    scored++;
                }
            }
        }
        return scored;
    }
    calculateTeamPoints = (matches, teamId) => {
        let wins = 0;
        let draw=0;
        let points=0;
        let home = true;
        debugger;
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].awayTeam.id === teamId) {
                home = false;
            } else {
                home = true;
            }
            let awayGoals = 0;
            let homeGoals = 0;
            const gameGoals = matches[i].goals;
            for (let j = 0; j < gameGoals.length; j++) {
                if (gameGoals[j].home === true) {
                    homeGoals++;
                } else {
                    awayGoals++;
                }
            }
                if (awayGoals===homeGoals){
                    draw++;
                }else if (awayGoals>homeGoals&&home===false){
                    wins++;
                }else if (awayGoals<homeGoals&&home===true){
                    wins++;
                }
        }
        points=(wins*3)+draw;
        return [points, wins, draw];
    }
    a = (teams) => {
        let y = [];
        for (let i = 0; i < teams.length; i++) {
            axios.get("https://app.seker.live/fm1/history/" + teams[i].league.id + "/" + teams[i].id).then((response) => {
                let matches = response.data;
                let name = teams[i].name;
                let numOfMatches = matches.length;
                let scored = this.getTeamGoals(matches, teams[i].id, true);
                let conceded = this.getTeamGoals(matches, teams[i].id, false);
                let difference = scored - conceded;
                let array = this.calculateTeamPoints(matches, teams[i].id);
                let points=array[0];
                let wins=array[1];
                let draw=array[2];
                let lose=matches.length-wins-draw;
                const team = {
                    name: name,
                    numOfMatches: numOfMatches,
                    scored: scored,
                    conceded: conceded,
                    difference: difference,
                    wins:wins,
                    draw:draw,
                    lose:lose,
                    points:points
                }
                y.push(team);
                this.setState({
                    x: y
                })

            })
        }
    }


    render() {
        return (
            <div>
                <div>
                    <PrintPageTitle title={this.props.title}/>
                </div>

                <div>
                    <PrintTable teams={this.state.x}/>
                </div>
            </div>

        )
            ;

    }
}

export default TablePage;