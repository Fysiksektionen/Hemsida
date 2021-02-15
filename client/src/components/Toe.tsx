import React from "react";

interface IToeProps {
    webmaster: String;
    currYear: Number;
}

export default function Toe({ webmaster, currYear } : IToeProps) {
    return (
        <div className="container-fluid py-4 bg-dark text-white text-center"
            style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
        >
            <div style={{ paddingRight: "2rem" }}>
                {"© " + currYear + " Fysiksektionen, organisationsnummer 802411-8948"}
            </div>
            <div style={{ fontWeight: "bold", paddingLeft: "2rem" }}>
                {"Webmaster: " + webmaster + " – webmaster@f.kth.se"}
            </div>
        </div>
    );
}