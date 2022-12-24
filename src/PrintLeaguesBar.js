function PrintLeaguesBar(props){
    return(
        <div >
            <table id={"leaguesBar"} >

                {
                    props.leagues.map((league)=>{

                        return(
                            <tr id={"rowBar"} >
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