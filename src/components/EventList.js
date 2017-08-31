import React, { Component } from 'react';
import { uniqBy } from 'ramda';
import { 
    TextInput, 
    View, 
    Picker,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Linking
} from 'react-native';

import { 
    Container, 
    Content, 
    InputGroup, 
    Input, 
    Item,
    Header,
    Icon,
    Spinner,
    Button
} from 'native-base';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';

import Event from './Event';
import Panel from './Panel';
import SelectTag from './SelectTag';
import data from '../data.json';
import { bg_primary, app_silver, button_styles } from '../common/styles';

const API_KEY   = 'app_key=bJx8JLMK3sMPxZXS',
      URL       = `http://api.eventful.com/json/events/search?&${API_KEY}`,
      BTN_COLOR = 'rgba(226,10,139, .4)';

const styles = StyleSheet.create({
    centerAlign:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerScreen:{
        flexDirection: 'column',
        height: Dimensions.get('window').height / 1.6,
    },
    noEvents:{
        textAlign:"center",
        color: '#f4f4f4',
        justifyContent: "center",
        fontSize: 20
    },
    searchBar:{
        borderRadius: 5,
        marginTop: 15,
        padding: 5,
        backgroundColor: '#191919',
        flexDirection: 'row',
    },
    searchIcon:{
        marginLeft: 3,
        position: 'relative',
        top: 13,
        left: 5
    },
    advancedSearch: {
        backgroundColor:'#000',
        padding: 3,
        paddingRight: 3,
        marginRight: 3,
        borderRadius: 5
    }
});

export default class EventList extends Component{
    constructor(props){
        super(props);
        const { latitude, longitude } = props.navigation.state.params.coords;

        this.state = {
            events: [],
            address: (!!latitude) ? (latitude + "," + longitude) : "Los Angeles",
            date:'Today',
            keywords: null,
            pageNumber: 1,
            pageCount: 0,
            radius: 20,
            loading: true,
            expanded: false,
            refreshing: false,
            searchToggle: false
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        const { renderHeaderRight } = state.params;
        return {
            title: 'Events',
            headerRight: (
                <TouchableOpacity onPress={() => Linking.openURL('http://eventful.com/events/new')}>
                    <SIcon 
                        name={"plus"} 
                        color="#FFF" size={20} 
                        style={{
                            textAlign: 'center',
                            paddingRight: 20,
                            paddingLeft: 20
                        }}/>
                </TouchableOpacity>
                )
        }
    };
    
    componentWillMount(){
        this.fetchEvents();
    }

    searchEvents = () => this.setState({ refreshing: true }, this.fetchEvents);

    refreshEvents = () => this.setState({ pageNumber: 1, refreshing: true }, this.fetchEvents);

    fetchMoreEvents = ({ distanceFromEnd }) => {
        const { pageCount, pageNumber } = this.state;
        
        if(pageCount > 1 && (pageNumber + 1) <= pageCount){
            this.setState({ pageNumber: pageNumber + 1 }, this.fetchEvents);
        }
    };

    fetchEvents = () => {
        const { date, address, radius, pageNumber } = this.state,
              _emptyEvents = { events: [], loading: false, refreshing: false, pageCount: 0 };

        let category  = this.props.navigation.state.params.title,
            keywords  = !!this.state.keywords ? `&keywords=${this.state.keywords}` : "",
            apiSearch = `${URL}&q=${category}&t=${date}&l=${address}&within=${radius}&unit=miles${keywords}&page_number=${pageNumber}`;

        this.setState({ loading: true });
        fetch(apiSearch)
            .then(res => res.json())
            .then(res => {
                setTimeout(() => {
                    if(!res.events){
                        this.setState(_emptyEvents);
                        return null;
                    }
                    this.setState({ 
                        events: !this.state.refreshing ? uniqBy(event => event.id, [...this.state.events, ...res.events.event]) : uniqBy(e => e.id, res.events.event),
                        pageCount: res.page_count,
                        loading: false,
                        refreshing: false
                    });
                }, 800);
                
            })
            .catch(() => {
                setTimeout(() => {
                    this.setState(_emptyEvents);
                }, 1000);
                
            });
    };

    showPanel = () => this.setState({ expanded: !this.state.expanded }, () => this.panel.toggle());

    renderHeader = () =>{
        return(
            <View style={{ flex: 1 }}>
                {/* Searchbar */}
                <View style={styles.searchBar}>
                    <SIcon name="magnifier" color={app_silver} size={15} style={styles.searchIcon} />
                    <TextInput 
                        onSubmitEditing={this.searchEvents}
                        placeholderTextColor={app_silver}
                        style={{color: app_silver, marginTop: 4, paddingLeft: 10, paddingRight: 5, flex: 7, height: 37 }}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder={`Search For ${this.props.navigation.state.params.title}...`}
                        onChangeText={(keywords) => this.setState({ keywords })}
                    />
                    
                    <TouchableOpacity 
                        style={
                            [
                                styles.centerAlign, 
                                styles.advancedSearch, 
                                {backgroundColor: (this.state.searchToggle) ? BTN_COLOR : `#000`}
                            ]
                        } 
                        onPress={() => { 
                                this.setState({searchToggle: !this.state.searchToggle});
                                this.showPanel(); 
                            }
                        }>
                        <SIcon name='equalizer' color="#FFF" size={19} />
                    </TouchableOpacity>
                    
                </View>

                {/* Accordion */}
                {
                    this.renderPanel()
                }
            </View>
        );
    };

    renderPanel = () => {
        return(
            <Panel style={{ opacity: (this.state.expanded) ? 1 : 0 }} ref={instance => { this.panel = instance; }}>
                <SelectTag 
                    data={data.dates} 
                    defaultSelection={data.dates[0].key}
                    styles={{ color: app_silver}}
                    onValueChange={(date) => this.setState({ date })}
                />

                <SelectTag 
                    data={data.radi} 
                    defaultSelection={data.radi[2].key}
                    styles={{ color: app_silver}}
                    onValueChange={(radius) => this.setState({ radius })}
                />

                <Item>
                    <Input 
                        onSubmitEditing={this.searchEvents}
                        placeholderTextColor="#9ea7ac"
                        placeholder='Enter Address...'
                        onChangeText={(address) => this.setState({address})}
                        style={{ color: app_silver, borderWidth: 0 }}
                    />
                </Item>
                <Button dark large block style={{ backgroundColor: BTN_COLOR, marginTop: 10, marginBottom: 10 }} onPress={this.searchEvents}>
                    <Text style={[ button_styles, { color: app_silver }]}>Search</Text>
                </Button>
            </Panel>
        );
    };

    renderSpinner = () => (!this.state.events) ? this.renderEmpty() : <View style={[styles.centerAlign, styles.centerScreen]}><Spinner color='#75B7C9' /></View>

    renderEmpty = () => {
        const _emptyMsg = (
            <View style={[styles.centerAlign, styles.centerScreen]}>
                <FAIcon name="frown-o" color={app_silver} size={65} />
                <Text style={styles.noEvents}>Sorry, no results were found.</Text>
            </View>
        );

        return (this.state.loading) ? this.renderSpinner() : _emptyMsg
    }

    renderRow = ({ item }) => <Event event={item} navigation={this.props.navigation} />;

    renderFooter = () => {
        return (this.state.pageNumber >= this.state.pageCount)? null:
        (
            <View style={{ paddingVertical: 20 }}>
                <Spinner color='#75B7C9' />
            </View>
        );
    };

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: bg_primary, paddingLeft: 10 }}>
                <FlatList
                    style={{ paddingRight: 10, marginBottom: 10 }}
                    keyExtractor={item => item.id}
                    data={this.state.events}
                    renderItem={this.renderRow}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refreshEvents}
                    onEndReached={this.fetchMoreEvents}
                    onEndReachedThreshold={.5}
                    ListHeaderComponent={this.renderHeader}
                    ListEmptyComponent={this.renderEmpty}
                    ListFooterComponent={this.renderFooter}
                />
            </View>
        );
    }
}
