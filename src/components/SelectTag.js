import React, { Component } from 'react';
import { View, Picker } from 'react-native';
// import { Picker } from 'native-base';

const Item = Picker.Item;

export default class SelectTag extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            selectdItem: undefined,
            selected1: props.defaultSelection,
            results: {
                items: []
            }
        };
        this.onValueChange = this.onValueChange.bind(this);
    }

    onValueChange(value){
        this.setState({ selected1: value });
        this.props.onValueChange(value);
    }

    render(){
        return (
            <View>
                <Picker
                    supportedOrientations={['portrait', 'landscape']}
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange}
                    style={this.props.styles}
                >
                    {
                        this.props.data.map((item, idx) => {
                            return (
                                <Item key={idx} label={item.value} value={item.key} />
                            );
                        })
                    }
                </Picker>
            </View>
        );
    }
}