import {NavLink} from "react-router-dom";

function PrintNavLink(props){
    return(
        <span id={"navLink"}>
            <NavLink  to={props.url}>{props.name}</NavLink>
        </span>
    )
}

export default PrintNavLink;