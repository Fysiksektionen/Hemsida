import React from "react";
import {RepresentativesPageContentTree} from '../types/page_specific/types_RepresentativesPage'
import {APIResponse} from "../types/general";

function RepresentativesPage(props: RepresentativesPageContentTree){

    return (
        <div>
            {props.items.infoBox.items.text}
            Hello representatives
        </div>
    )
}
