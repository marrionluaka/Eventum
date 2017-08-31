import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Panel extends Component {
    constructor(props){
        super(props);
        
        this.icons = {
            'up': <Icon name="plus" color="#000" size={15} />,
            'down': <Icon name="minus" color="#000" size={15} />
        };

        this.state = {
            title: props.title,
            expanded: false,
            animation: new Animated.Value()
        };
    }

    toggle(){
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue   = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({ 
            expanded: !this.state.expanded,
            title: (!this.state.expanded) ? this.props.closedTitle : this.props.title
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(this.state.animation, { 
            toValue: finalValue
        }).start();
    }

    _setMaxHeight(e){
        this.setState({
            maxHeight: e.nativeEvent.layout.height
        });
    }

    _setMinHeight(e){
        this.setState({
            minHeight: e.nativeEvent.layout.height
        });
        this.state.animation.setValue(e.nativeEvent.layout.height);
    }

    render(){
        let icon = (this.state.expanded) ? this.icons['down'] : this.icons['up']
        
        return(
            <Animated.View style={[styles.container, { height: this.state.animation}, this.props.style]}>
                <View 
                    onLayout={this._setMinHeight.bind(this)}
                    style={styles.titleContainer}
                >
                    <TouchableOpacity
                        style={styles.button}
                        underlayColor="#f1f1f1"
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.icon}> 
                                
                            </Text>
                            <Text style={styles.title}> 
                                {this.state.title} 
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                
                <View 
                    onLayout={this._setMaxHeight.bind(this)}
                    style={styles.body}>
                    {this.props.children}
                </View>
            </Animated.View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        height: 10
    },
    title: {
        padding: 10,
        color: "#2a2f43",
        fontWeight: 'bold',
    },
    button: {
        flex: 1,
        alignItems: 'center'
    },
    body: {
        padding: 5,
        paddingBottom: 0,
        paddingTop: 0
    }
});