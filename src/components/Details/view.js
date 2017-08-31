import React from 'react';
import moment from 'moment';
import {
    View,
    ScrollView,
    Text,
    Image,
    Linking
} from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'native-base'
import FAIcon from 'react-native-vector-icons/FontAwesome';

import mapStyle from '../mapstyle.json';
import { dateFormatter, excerpt } from '../../lib';
import styles from './styles';
import { button_styles } from '../../common/styles';

const LATITUDE_DELTA = 0.03358723958820065,
      LONGITUDE_DELTA = 0.03250270688370961,
      MAP_URL = "https://maps.google.com?saddr=Current+Location&daddr=";

const IconRow = ({ iconName, text }) => {
    return (
        <View style={styles.row}>
            <FAIcon name={iconName} color="#75B7C9" size={15} style={styles.icons} />
            <Text style={styles.rowText}>{text}</Text>
        </View>
    );
};

export const renderBookmark = predicate => <FAIcon name={ predicate ? "bookmark" : "bookmark-o"} color="#FFF" size={20}  style={styles.bookmark}/>

export const view = (ctrl) =>{
    const { params: { event } } = ctrl.props.navigation.state;
    const thumbnail_image = !!event.image ? 
        <Image source={{ uri: event.image.medium.url }} style={styles.img}/> : 
        <Image source={require("../../img/eventum_icon.png")} style={styles.img}/>
    
    return (
        <View style={{ flex: 1 }}>
            {/*Map*/}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    onPress={() => ctrl.setState({ showTriangle: false })}
                    customMapStyle={mapStyle}
                    initialRegion={{
                    latitude: parseFloat(event.latitude),
                    longitude: parseFloat(event.longitude),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <MapView.Marker
                        ref={ref => { ctrl.marker1 = ref; }}
                        onPress={()=> ctrl.setState({ showTriangle: true })}
                        coordinate={{
                            latitude: parseFloat(event.latitude),
                            longitude: parseFloat(event.longitude)
                        }}
                        title={event.title}
                        description={event.venue_address}
                    >
                        <View style={styles.radius}>
                            <View style={styles.marker}/>
                        </View>

                        { ctrl.state.showTriangle ? <View style={styles.triangle}/> : null }

                        <MapView.Callout 
                            tooltip
                            onPress={() => Linking.openURL(`${MAP_URL}${event.latitude},${event.longitude}`)}
                            style={styles.callout}>
                            <View style={{ flex:1, justifyContent: 'center', alignItems:'center'}}>
                                <Text style={[styles.calloutText, { fontSize: 17, fontWeight:'bold'}]}>{event.venue_name}</Text>
                                <Text style={styles.calloutText}>{event.venue_address}</Text>
                                <Text style={[styles.calloutText, { paddingTop: 10 }]}>Tap For Directions</Text>
                            </View>
                            
                        </MapView.Callout>
                    </MapView.Marker>
                </MapView>
            </View>

            {/*Descrition*/}
            <View style={{ flex: 1 }} >
                <ScrollView style={styles.descriptionContainer}>

                    <View style={[styles.rowContainer, styles.boxShadow]}>
                        
                        
                        <View style={{ flexDirection: 'row' }}>
                            
                            <View style={{ paddingRight: 5 , flex: 2 }}>
                                {thumbnail_image}
                            </View>

                            <View style={{flex: 3}}>
                                <Text style={styles.desc_title}>{excerpt(event.title, 40)} </Text>
                                <IconRow iconName="map-marker" text={event.venue_name} />
                                <IconRow iconName="calendar" text={dateFormatter(moment(event.start_time).format('MMMM Do'), moment(event.stop_time).format('MMMM Do'), "Invalid date")} />
                                <IconRow iconName="clock-o"  text={dateFormatter(moment(event.start_time).format('h:mm a'), moment(event.stop_time).format('h:mm a'), "Invalid date")} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.content_desc, styles.boxShadow]}>
                        <Text style={{ fontFamily: 'raleway', fontWeight: 'bold', fontSize: 18, color: "#D5D9DB", paddingBottom: 5 }}>Details</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderColor: '#D5D9DB'
                        }} />
                        {
                            !!event.description ? <Text style={styles.desc_text}>{excerpt(event.description).trim()}</Text> : <Text style={styles.desc_text}>There is no description available.</Text>
                        }
                        <Button 
                            dark
                            large
                            block 
                            style={{ backgroundColor: 'rgba(226,10,139, .4)', marginTop: 5 }} 
                            onPress={() => Linking.openURL(event.url)}>
                            <Text style={button_styles}>View More</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};