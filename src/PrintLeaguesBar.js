import {useLocation} from "react-router-dom";

function PrintLeaguesBar(props){

    return(
        <div >
            <table id={"leaguesBar"} state={"show"}>

                {
                    props.leagues.map((league)=>{

                        return(

                            <tr id={"rowBar"} onClick={()=>props.chosenLeague(league.id)}>
                                {league.name} league
                            </tr>
                        )

                    })
                }
            </table>

        </div>
    )
}

export default PrintLeaguesBar;