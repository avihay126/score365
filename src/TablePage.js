import React from "react";
import PrintPageTitle from "./PrintPageTitle";
import PrintLeaguesBar from "./PrintLeaguesBar";
import axios from "axios";

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
        leagues: this.props.leagues,
        teams:[],
        chosenLeague:1
    }
    componentDidMount() {
       this.setChosenLeague(this.state.chosenLeague)
    }
    setChosenLeague = (league) => {
        axios.get("https://app.seker.live/fm1/teams/" + league).then((response) => {
            this.setState({
                teams:response.data
            })
        });
    }


    render() {
        return (
            <div>
                <div>
                    <PrintPageTitle title={this.props.title}/>
                </div>
                <div>
                    <table id={"leagueTable"}>
                        {this.state.teams.map((team) => {
                            return (
                                <tr>
                                    {team.name}
                                </tr>
                            )
                        })


                        }
                    </table>

                </div>
                <div>
                    <PrintLeaguesBar leagues={this.state.leagues} chosenLeague={this.setChosenLeague}/>
                </div>

            </div>

        )
            ;

    }
}

export default TablePage;