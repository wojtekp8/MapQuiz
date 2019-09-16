import React,{Component} from 'react';
import './GameMain.scss';
import GameHeader from '../GameHeader/GameHeader';
import GameSidebar from '../GameSidebar/GameSidebar';
import Info from '../Info/Info';
import GoogleMapWrapper from '../GoogleMapWrapper/GoogleMapWrapper';
import EndGame from '../EndGame/EndGame';

const cities=[{name:'Września',lat:52.32512,lng:17.56519},{name:'Białystok',lat:53.13333,lng:23.16433},
    {name:'Warszawa',lat:52.229676,lng:21.012229},{name:'Gdańsk',lat:54.35205,lng:18.64637},
    {name:'Kraków',lat:50.0646501,lng:19.9449799},{name:'Radom',lat:51.40253,lng:21.14714},{name:'Legnica',lat:51.20701,lng:16.15532},
    {name:'Łomża',lat:53.17812,lng:22.05903},{name:'Elbląg',lat:54.15606,lng:19.40449},{name:'Chełm',lat:	51.14312,lng:23.47120},
    {name:'Kalisz',lat:51.76728,lng:18.08535},{name:'Świnoujście',lat:53.91053,lng:14.24712},
    {name:'Leszno',lat:51.84199,lng:16.59375},{name:'Żory',lat:50.04472,lng:18.70064},
    {name:'Słupsk',lat:54.46415,lng:17.02848},{name:'Krosno',lat:49.68248,lng:21.76605},{name:'Siedlce',lat:52.16760,lng:22.29016},
    {name:'Gorzów Wielkopolski',lat:52.73253,lng:15.23693},{name:'Piotrków Trybunalski',lat:51.40517,lng:19.70302},{name:'Tarnobrzeg',lat:	50.57291,lng:21.67907},
    {name:'Konin',lat:52.226139,lng:18.243139},{name:'Przemyśl',lat:49.783699,lng:22.768030},{name:'Rzeszów',lat:50.041187,lng:21.999121},{name:'Zamość',lat:50.717369,lng:23.252760},
    {name:'Kielce',lat:50.869930,lng:20.640961},{name:'Ełk',lat:53.828053,lng:22.364662},{name:'Olsztyn',lat:53.775711,lng:20.477980},{name:'Suwałki',lat:54.099920,lng:22.926980},
    {name:'Mrągowo',lat:53.874531,lng:21.305950},{name:'Grudziądz',lat:53.487419,lng:18.756310},{name:'Włocławek',lat:52.653160,lng:19.059940},{name:'Płock',lat:52.546345,lng:19.706535},
    {name:'Częstochowa',lat:50.811817,lng:19.120310},{name:'Rybnik',lat:50.089722,lng:18.530880},{name:'Katowice',lat:50.264893,lng:19.023781},{name:'Opole',lat:50.667728,lng:17.928600},
    {name:'Wałbrzych',lat:50.785290,lng:16.286930},{name:'Jelenia Góra',lat:50.904171,lng:15.735570},{name:'Zielona Góra',lat:51.936620,lng:15.508690},{name:'Piła',lat:53.151741,lng:16.742889},
    {name:'Gdynia',lat:54.516842,lng:18.541941},{name:'Sopot',lat:54.441582,lng:18.560097},{name:'Kołobrzeg',lat:54.181679,lng:15.569580},{name:'Koszalin',lat:54.189949,lng:16.181030},
    {name:'Szczecinek',lat:53.710979,lng:16.691111},{name:'Gniezno',lat:52.538551,lng:17.597549},{name:'Jarocin',lat:51.973759,lng:17.501551},{name:'Śrem',lat:52.086182,lng:17.018539}
];
const getRandomCity=(citiesArr,range)=>{
    let randomCities=[];
    for(let i=0;i<range;i++) {
        let index = Math.ceil(Math.random() * citiesArr.length - 1);
        let newArr = citiesArr.filter((el) => {
            return el !== citiesArr[index]
        });
        randomCities.push(citiesArr[index]);
        citiesArr = newArr;
    }
    return randomCities;
};

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function bonus(time,distance) {
    let bonus;
    if (time>20 || distance>200) {
        bonus = 0;
    } else if (time <= 20 && time >= 15) {
        bonus = 1000;
    } else if (time < 15 && time >= 10) {
        bonus = 2000;
    } else if (time < 10 && time >= 5) {
        bonus = 3000;
    } else if (time < 5) {
        bonus = 4000;
    }
    return bonus;
}

function score(distance,timeBonus) {
    let points, result;
    if (distance >= 200) {
        points = 0;
        timeBonus = 0;
    } else if (distance < 200 && distance >= 100) {
        points = 3000;
    } else if (distance < 100 && distance >= 50) {
        points = 5000;
    } else if (distance < 50 && distance >= 20) {
        points = 8000;
    } else if (distance < 20) {
        points = 10000;
    }
    result = points + timeBonus;
    return result;
}

class GameMain extends Component{
    state={
        gameState:1,
        counter:0,
        city:{},
        score:0,
        time:0,
        play:true
    }

    componentDidMount() {
        this.targets=getRandomCity(cities,10);
        let startTime=new Date();
        startTime=startTime.getTime();
        this.setState({city:this.targets[this.state.counter],time:startTime});
    }

    mapClicked=(mapProps, map, clickEvent)=> {
            if(this.state.gameState===1) {
                this.clickTime=new Date();
                this.clickTime=this.clickTime.getTime();
                this.playerTime = (this.clickTime-this.state.time)/1000;
                this.clickedPlaceLat=clickEvent.latLng.lat();
                this.clickedPlaceLng=clickEvent.latLng.lng();
                this.distance=Math.floor(distance(this.state.city.lat, this.state.city.lng, this.clickedPlaceLat, this.clickedPlaceLng));
                this.timeBonus=bonus(this.playerTime,this.distance);
                this.points=score(this.distance,this.timeBonus);
                this.prevCityName=this.state.city.name;
                this.prevCityLat=this.state.city.lat;
                this.prevCityLng=this.state.city.lng;

                this.setState({
                    gameState:0,
                    city:{},
                    counter:this.state.counter+1
                });
                this.Timeout = setTimeout(() => {
                    if(this.state.counter===this.targets.length){
                        this.setState({play:false,gameState:1, score: this.state.score + this.points,city:this.targets[this.state.counter]})}
                        else{this.setState({gameState:1, score: this.state.score + this.points,time:this.clickTime+2000,city:this.targets[this.state.counter]});}
                    clearTimeout(this.Timeout);}, 2000);
            }
    };
    render(){
        console.log('tttiem=>'+this.state.time)
        let randCityCoordinates={lat: this.prevCityLat,lng:this.prevCityLng};
        let clickedCityCoordinates={lat: this.clickedPlaceLat, lng: this.clickedPlaceLng};
        let pathCoordinates = [{lat: this.clickedPlaceLat, lng: this.clickedPlaceLng}, {lat: this.prevCityLat,lng:this.prevCityLng}];
        let info;
        if(this.state.gameState===0) { info=<Info cityName={this.prevCityName} points={this.points} distance={this.distance} timeBonus={this.timeBonus}/>}
        if(this.state.play) {
                return (<>
                    <section className="container">
                        <div className="row">
                            <div className="col-1"> </div>
                            <div className="head col-15">
                                <GameHeader counter={this.state.counter} actCity={this.state.city.name} actPoints={this.state.score} />
                            </div>
                            <div className="col-2"> </div>
                        </div>
                        <div className="row">
                            <div className="main col-17">
                                {info}
                                <GoogleMapWrapper
                                    handleClick={this.mapClicked}
                                                  gameState={this.state.gameState}
                                                  polyline={pathCoordinates}
                                                  randCityMarker={randCityCoordinates}
                                                  clickedCityMarker={clickedCityCoordinates}
                                > </GoogleMapWrapper>
                            </div>
                            <div className="main-side col-1">
                                <GameSidebar gameState={this.state.gameState}/>
                            </div>
                        </div>
                    </section>
                </>
                    )
        }else{
            return(<EndGame score={this.state.score}/>)
        }
    }
}

export default GameMain;