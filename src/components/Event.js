import React, { Component } from 'react';
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity
} from 'react-native';
import { 
    ListItem,
    Thumbnail,
    Body
} from 'native-base';

import moment from 'moment';
import { dateFormatter } from '../lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import { app_silver, app_light_blue } from '../common/styles';

export default (props) => {
    const { event, navigation } = props;
    let thumbnail_image = !!event.image ? 
        <Thumbnail large source={{ uri: event.image.medium.url }} style={{ borderRadius: 4 , flex: 2 }}/> : 
        <Thumbnail large source={require("../img/eventum_icon.png")} style={{ borderRadius: 4 , flex: 2 }}/>
    
    return (
        <TouchableOpacity style={{ paddingRight: 10, flex: 1, backgroundColor: '#2B3652' }} onPress={() => navigation.navigate("Details", { event })}>
            <View style={styles.listItem}> 
                {thumbnail_image}
                <View style={styles.content}>
                    <Text style={styles.title}>{event.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="calendar" color={app_light_blue} size={11} style={{ paddingTop: 3, paddingRight: 3 }}/>
                        <Text style={styles.subTitle}>{ dateFormatter(moment(event.start_time).format('MMMM Do'), moment(event.stop_time).format('MMMM Do'), "Invalid date") }</Text>
                    </View>
                </View>
                <Icon name="angle-right" color={app_silver} size={25} style={{ marginLeft: 4 }}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    content:{
        paddingLeft: 15,
        flex: 4
    },
    title:{
        fontSize: 14,
        color: app_silver,
        flexWrap: 'wrap',
        fontWeight: "500",
        paddingBottom: 3,
        fontFamily: 'raleway'
    },
    subTitle: {
        fontSize: 11,
        color: app_light_blue,
        fontFamily: 'lusitana'
        
    },
    listItem:{
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row', 
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor:'#344163'
    }
});