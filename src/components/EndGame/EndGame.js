import React,{Component} from 'react';
import "./EndGame.scss";
import {NavLink} from "react-router-dom";


class EndGame extends Component {
    render(){
        return(
            <section className="container summaryBackground">
                <div className="row">
                    <div className="main col-6"></div>
                    <div className="main col-6">
                    <div className='summary'>
                        <h1>Gratulacje!</h1>
                        <h2>Twój wynik to:{this.props.score}pts</h2>
                        <p>Zagraj jeszcze raz!</p>
                        <NavLink to="/" ><button>Start</button></NavLink>
                    </div>
                </div>
            <div className="main col-6"></div>
            </div>
            </section>
        )}
}

export default EndGame;
