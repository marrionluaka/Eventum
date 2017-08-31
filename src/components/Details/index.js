import React, { Component } from 'react';
import moment from 'moment';
import {
    TouchableOpacity,
    Text,
    ToastAndroid
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import { compose, ifElse } from 'ramda';
import { view, renderBookmark } from './view';
import { excerpt } from '../../lib';

const _sanitizeDate = (dateStr) => {
    const pos = dateStr.indexOf("Z"),
    el  = ".00";

    return [dateStr.slice(0, pos), el, dateStr.slice(pos)].join('')
};

const _utcFormat = date => moment.utc(date).format();

const _stopTimes = startTime => stopTime => !!stopTime ? _utcFormat(stopTime) : moment.utc(startTime).add(1, 'days').format();

export default class Details extends Component {
    state = {
        evtId: null,
        isIdFound: false
    };

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: <Text style={{fontFamily: 'raleway'}}>Info</Text>,
            headerRight: <TouchableOpacity onPress={() => params.toggle()}>{renderBookmark(params.isIdFound)}</TouchableOpacity>
        }
    };

    componentWillMount() {
        this.props.navigation.setParams({ toggle: this.toggle });

        RNCalendarEvents.authorizeEventStore()
            .then(this.fetchEvent)
            .catch(console.log);
    }

    toggle = () => {
        ifElse(x => x, this.removeEvent, this.saveEvent)(this.state.isIdFound);
        this.setState({ isIdFound: !this.state.isIdFound });
        this.fetchEvent();
    };

    fetchEvent = () =>{
        const { params: { event } } = this.props.navigation.state;
        const _start = compose(_sanitizeDate,_utcFormat)(event.start_time),
              _end   = compose(_sanitizeDate,_stopTimes(event.start_time))(event.stop_time);

        RNCalendarEvents.fetchAllEvents(_start, _end,['1'])
            .then(events => { 
                setTimeout(() => {
                    this.setState({ showTriangle: true }, () => this.marker1.showCallout());
                }, 100);
                
                if(!!events.length){
                    this.setState({ evtId: events[0].id, isIdFound: true });
                }
                ifElse(e => !!e.length, 
                    () => this.props.navigation.setParams({ isIdFound: true }), 
                    () =>  this.props.navigation.setParams({ isIdFound: false }))(events);
            })
            .catch(console.log);
    };

    saveEvent = () =>{
        const { params: { event } } = this.props.navigation.state;

        RNCalendarEvents.saveEvent(event.title, {
            location: event.venue_address,
            notes: excerpt(event.description || "There is no description available."),
            startDate: compose(_sanitizeDate,_utcFormat)(event.start_time),
            endDate: compose(_sanitizeDate,_stopTimes(event.start_time))(event.stop_time)
        }).then(() => {
            ToastAndroid.showWithGravity(`The event '${event.title}' was added to your calendar.`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }).catch(console.error);
    };

    removeEvent = () => RNCalendarEvents.removeEvent(this.state.evtId)
                            .then(() => {
                                ToastAndroid.showWithGravity(`Event removed from calendar.`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                            })
                            .catch(console.log);
    
    render(){
        return view(this);
    }
}