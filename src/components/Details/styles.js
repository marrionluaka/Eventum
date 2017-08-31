import { StyleSheet, Dimensions } from 'react-native';
import { bg_primary, app_silver, app_light_blue } from '../../common/styles';

export default StyleSheet.create({
    mapContainer:{
        flex: 1,
        backgroundColor: 'powderblue',
    },
    row:{
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 3 
    },
    rowText:{
        flex: 10,
        fontSize: 11,
        color: app_light_blue
    },
    icons:{
        flex: 1,
        paddingRight: 3,
        textAlign: 'center'
    },
    descriptionContainer:{
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: "#2B3652"
    },
    boxShadow:{
        backgroundColor: '#3b445f',
        borderRadius: 4
    },
    rowContainer:{
        marginTop: 10,
        padding: 15,
        paddingLeft: 10,
        paddingRight: 7,
        marginBottom: 10
    },
    content_desc:{
        padding: 15,
        marginBottom: 10
    },
    desc_title:{
        fontSize: 15,
        paddingLeft: 3,
        paddingBottom: 4,
        fontWeight: 'bold',
        color: app_silver,
        fontFamily: 'raleway'
        // fontFamily: 'sans-serif-condensed'
    },
    desc_text:{
        lineHeight: 25,
        paddingBottom: 10,
        fontFamily: 'lusitana',
        color: app_silver, 
        paddingBottom: 3
    },
    img:{
        borderRadius: 4, 
        flex: 1,
        width: Dimensions.get('window').width / 3,
        height: 100,
    },
    bookmark:{
        textAlign: 'center',
        paddingRight: 20,
        paddingLeft: 20
    },
    map:{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute'
    },
    marker:{
        height: 15,
        width: 15,
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: 'rgb(226,10,139)'
    },
    radius:{
        marginTop: 10,
        height: 50,
        width: 50,
        borderRadius: 50 /2,
        overflow: 'hidden',
        backgroundColor: 'rgba(226,10,139, .4)',
        borderWidth: 2,
        borderColor: 'rgb(226,10,139)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    callout:{
        backgroundColor: 'rgba(59, 68, 95, .95)',
        width: 200,
        padding: 10,
        alignItems: 'center',
    },
    calloutText:{
        textAlign: 'center',
        color: app_silver
    },
    triangle:{ 
        position:'absolute',
        top: 0,
        alignSelf: 'center',
        width: 0,
        height: 0,
        borderRightWidth: 5,
        borderLeftWidth: 5,
        borderColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: 'rgba(59, 68, 95, .95)'
    }
});