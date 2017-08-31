import React, { Component } from 'react';

import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import EventList from './EventList';
import Details from './Details';
import { bg_primary } from '../common/styles'; 

const styles = StyleSheet.create({
    scrollContainer:{
        flex: 1,
        backgroundColor: bg_primary
    },
    container:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box:{
        height: 180,
        width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    text:{
        backgroundColor: 'transparent',
        color: "white",
        fontSize: 20,
        fontWeight: "500",
        paddingTop: 5,
        fontFamily: 'raleway'
    },
    overlay:{
        position:'absolute',
        backgroundColor: 'rgba(0,0,0,.35)',
        top:0,
        right:0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerStyle:{
        backgroundColor: '#191919',
        marginTop: 0
    },
    headerTitleStyle:{
        color: '#FFF',
        fontFamily: 'raleway',
        alignSelf: 'center',
        fontWeight: '100',
        justifyContent: 'center'
    }
});

class Categories extends Component {
    constructor(props){
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    static navigationOptions = {
        title: "Eventum",
        tabBarLabel: 'Events',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="calendar" 
                color={tintColor} 
                size={15} 
            />
        )
    };

    state = {
        coords: {},
        categories: [
            {"key": "music" , "value": "Concerts", "img": require("../img/Concerts.jpeg"), "icon": "music"},
            {"key": "conference" , "value": "Conferences", "img": require("../img/Conferences.jpg"), "icon": "users"},
            {"key": "comedy" , "value": "Comedy", "img": require("../img/Comedy.jpeg"), "icon": "smile-o"},
            {"key": "learning_education" , "value": "Education", "img": require("../img/Education.jpeg"), "icon": "cubes"},
            {"key": "family_fun_kids" , "value": "Family", "img": require("../img/Family.jpeg"), "icon": "child"},
            {"key": "festivals_parades" , "value": "Festivals", "img": require("../img/Festivals.jpeg"), "icon": "ticket"},
            {"key": "movies_film" , "value": "Film", "img": require("../img/Film.jpeg"), "icon": "video-camera"},
            {"key": "food" , "value": "Food", "img": require("../img/Food.jpeg"), "icon": "cutlery"},
            {"key": "fundraisers" , "value": "Fundraisers", "img": require("../img/Fundraisers.jpeg"), "icon": "money"},
            {"key": "art" , "value": "Galleries", "img": require("../img/Galleries.jpeg"), "icon": "picture-o"},
            {"key": "support" , "value": "Health", "img": require("../img/Health.jpeg"), "icon": "heartbeat"},
            {"key": "holiday" , "value": "Holiday", "img": require("../img/Holiday.jpeg"), "icon": "compass"},
            {"key": "books" , "value": "Literary", "img": require("../img/Literary.jpg"), "icon": "book"},
            {"key": "attractions" , "value": "Museum", "img": require("../img/Museum.jpeg"), "icon": "paint-brush"},
            {"key": "community" , "value": "Neighborhood", "img": require("../img/Neighborhood.jpeg"), "icon": "building"},
            {"key": "singles_social" , "value": "Nightlife", "img": require("../img/Nightlife.jpeg"), "icon": "glass"},
            {"key": "alumni" , "value": "On Campus", "img": require("../img/Compus.jpg"), "icon": "graduation-cap"},
            {"key": "clubs_associations" , "value": "Organizations", "img": require("../img/Organizations.jpg"), "icon": "cc-diners-club"},
            {"key": "outdoors_recreation" , "value": "Outdoors", "img": require("../img/Outdoors.jpeg"), "icon": "tree"},
            {"key": "performing_arts" , "value": "Performing", "img": require("../img/Performing.jpeg"), "icon": "diamond"},
            {"key": "animals" , "value": "Pets", "img": require("../img/Pets.jpg"), "icon": "paw"},
            {"key": "politics_activism" , "value": "Politics", "img": require("../img/Politics.jpg"), "icon": "institution"},
            {"key": "sales" , "value": "Sales", "img": require("../img/Sales.jpeg"), "icon": "handshake-o"},
            {"key": "science" , "value": "Science", "img": require("../img/Science.jpeg"), "icon": "flask"},
            {"key": "religion_spirituality" , "value": "Spirituality", "img": require("../img/Spirituality.jpeg"), "icon": "circle-o"},
            {"key": "sports" , "value": "Sports", "img": require("../img/Sports.jpg"), "icon": "futbol-o"},
            {"key": "technology" , "value": "Technology", "img": require("../img/Technology.jpeg"), "icon": "database"},
            {"key": "other" , "value": "Other", "img": require("../img/Other.jpeg"), "icon": "ellipsis-h"}
        ]
    };

    componentWillMount(){
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = parseFloat(pos.coords.latitude),
                  long = parseFloat(pos.coords.longitude);
            
            const coords = {
                latitude: lat,
                longitude: long
            };
            
            this.setState({ coords });
        }, error => this.setState({ coords: {} }));
    }

    renderRow(category, idx){
        const { navigation } = this.props;
        return(
            <TouchableOpacity 
                key={idx}
                onPress={() => navigation.navigate("EventList", { 
                    title: category.value,
                    coords: this.state.coords
                })}
            >
                <Image 
                    style={styles.box}
                    source={category.img}
                >
                    <View style={styles.overlay}>
                        <Icon name={category.icon} size={25} color="white"/>
                        <Text style={styles.text}>{category.value}</Text>
                    </View>
                </Image> 
            </TouchableOpacity>
        );
    }

    render(){
        return(
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    { this.state.categories.map(this.renderRow) }          
                </View>
            </ScrollView>
        );
    }
}

export default StackNavigator(
    {
        Home: { screen: Categories },
        EventList: { 
                screen: EventList, 
                navigationOptions: ({navigation}) => ({
                    title: navigation.state.params.title
                }),
                
            },
        Details: { screen: Details }
    },
    {
    navigationOptions: {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: "#FFF"
    }
  }
);