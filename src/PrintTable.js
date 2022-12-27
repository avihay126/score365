import PrintPageTitle from "./PrintPageTitle";
import React from "react";

function PrintTable(props){
    return(
        <div>
            <div>
                <table id={"leagueTable"}>
                    {props.teams.map((team) => {
                        return (
                            <tr>
                                {team.name}
                            </tr>
                        )
                    })


                    }
                </table>

            </div>
        </div>
    )
}
export default PrintTable;