import React from 'react';
import "./card.styles.css";

export const Card = props => (
    <div className="card-container">
        <h1>No. {props.player.number}</h1>
        <img className='player-image' src={props.player.photo} alt="Player" ></img>
        <h2>{props.player.name} ({props.player.position})</h2>
        
    </div>
);
