import React,{Component} from 'react';
import "./GameSidebar.scss";

class GameSidebar extends Component{

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.gameState===0){
            this.class=''
        }
        else{
            this.class='progress-bar'
        }
    }

    render(){
        return (<div className={this.class} ></div>);
    }
}

export default GameSidebar