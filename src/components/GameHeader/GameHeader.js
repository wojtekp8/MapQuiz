import React,{Component} from 'react';
import './GameHeader.scss';


class GameHeader extends Component{
    render(){
        let counter;
        if(this.props.actCity){
            counter=<span>{this.props.counter+1}/10</span>
        }
        else{
            counter=null;
        }
        return(<>
            <h1>{counter} {this.props.actCity}</h1>
            <h2>{this.props.actPoints}</h2>
        </>)
    }
}

export default GameHeader

