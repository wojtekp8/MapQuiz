import React,{Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper,Polyline} from 'google-maps-react';
import './GoogleMapWrapper.scss';



const style = {
    width: '59.5rem',
    height: '30rem',
    border: '1px solid gold',
    borderRadius:'10px'
};

class GoogleMapWrapper extends Component{
    state={
        mapDrawState:0
    };
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.gameState===0) {
            this.setState({mapDrawState: 1});
        }else{
            this.setState({mapDrawState:0})
        }
    }

    render(){
        let drawClickedPlaceMarker,drawCityMarker,drawLine;
        if(this.state.mapDrawState===1){
            drawClickedPlaceMarker=<Marker position={this.props.randCityMarker} icon={{url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}}/>;
            drawCityMarker=<Marker position={this.props.clickedCityMarker} icon={{url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}/>;
            drawLine=<Polyline path={this.props.polyline} options={{strokeColor: '#00ffff', strokeOpacity: 1, strokeWeight: 1, icons: [{icon: "hello", offset: '0', repeat: '10px'}],}}/>;
        }else{
            drawClickedPlaceMarker=null;
            drawCityMarker=null;
            drawLine=null;
        }
            return (<>
                            <Map
                                styles = {[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},
                                    {"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},
                                    {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},

                                    {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14}, {"weight":1.4}]},
                                    {"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},
                                    {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},
                                    {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
                                    {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},
                                    {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
                                    {"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},
                                    {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},
                                    {"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},
                                    {"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]},
                                    {"elementType": "labels", "stylers": [{"visibility": "off"}]},
                                    {"featureType": "administrative.neighborhood", "stylers": [{"visibility": "off"}]},
                                    {"featureType": "road", "stylers": [{"visibility": "off"}]}
                                    ]}
                                mapTypeControl={false}
                                streetViewControl={false}
                                fullscreenControl={false}
                                zoomControl={false}
                                panControl={false}
                                scrollwheel={false}
                                gestureHandling='none'
                                style={style}
                                google={this.props.google}
                                initialCenter={{
                                    lat: 51.990000, lng: 19.239267
                                }}
                                zoom={6.09}
                                onClick={this.props.handleClick}
                            >
                                {drawClickedPlaceMarker}
                                {drawCityMarker}
                                {drawLine}
                            </Map>
            </>)
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCO6rDTp-t-B-DMEFjWlvIYW9n5mqpnUUs'
})(GoogleMapWrapper)
