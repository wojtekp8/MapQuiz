import React,{Component} from 'react';
import './Info.scss';

class Info extends Component{
    render(){
        return(<>
            <div className='info'>
                <h1>{this.props.cityName}</h1>
                <p className='distance'><span>{this.props.distance}km</span> od celu</p>
                <p className='time'>bonus: {this.props.timeBonus} pts</p>
                <h2>{this.props.points}pts</h2>
            </div>
        </>);
    }
}

export default Info