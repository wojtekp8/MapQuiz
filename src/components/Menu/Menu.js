import React,{Component} from 'react';
import './Menu.scss';
import {NavLink} from "react-router-dom";

class Menu extends Component{
    render(){
        return(<>
            <section className="container menuBackground">
                <div className="row">
                    <div className="main col-6"></div>
                    <div className="main col-6">
                        <div className='menu'>
                            <h1>Quiz</h1>
                            <h2>Wskaż miasta</h2>
                            <p>W lewym górnym rogu losowane są miasta, Twoim zadaniem jest kliknięcię na mape
                            w miejsce w którym to miasto się znajduje. Im bliżej tym więcej punktów,
                                dodatkowo przyznawane sa bonusowe punkty za czas!
                            </p>
                            <NavLink to="/GameMain/" ><button>Start</button></NavLink>
                        </div>
                    </div>
                    <div className="main col-6"></div>
                </div>
            </section>
        </>)
    }
}

export default Menu