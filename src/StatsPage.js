import React from "react";
import PrintPageTitle from "./PrintPageTitle";
import PrintLeaguesBar from "./PrintLeaguesBar";

class StatsPage extends React.Component{
    state={

    }
    render() {
        return(
            <div>
                <div >
                    <PrintPageTitle  title={this.props.title}/>
                </div>

                {/*<div>*/}
                {/*    <PrintLeaguesBar leagues={this.props.leagues}/>*/}
                {/*</div>*/}
            </div>
        );

    }
}
export default StatsPage;