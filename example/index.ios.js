/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,

} from 'react-native';
var NetUtil = require('./netutil.js');
var Pingpp = require('react-native-pingpp');

export default class reactPingpp extends Component {


    setDebugModel = (enabled)=>{
      Pingpp.setDebugModel(enabled);

    };

    pay =  (channel) => {
        NetUtil.postJson("http://218.244.151.190/demo/charge",
            {amount:1,channel:channel,order_no:new Date().getTime()},
            function(object){
                Pingpp.createPayment(
                    {
                        "object":object,
                        "scheme":"YOU-URL-SCHEME"

                    }, function(res,error) {

                    	alert(res);
                        console.log(error);
                                     
                        alert(JSON.stringify(error));
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
            onPress = {()=>{this.pay("alipay")}}
                >
                    <Text style={styles.welcome}>
                        支付宝
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {()=>{this.pay("wx")}}
                >
                    <Text style={styles.welcome}>
                        微信
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {()=>{this.pay("upacp")}}
                >
                    <Text style={styles.welcome}>
                        银联
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {()=>{this.pay("qpay")}}
                >
                    <Text style={styles.welcome}>
                        QQ钱包
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {()=>{this.setDebugModel(true)}}
                >
                    <Text style={styles.welcome}>
                        开启调试
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('reactPingpp', () => reactPingpp);









