/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Button,
    Alert,
    TextInput,
    ListView,
    View,
    ToastAndroid,
    ProgressBarAndroid
} from 'react-native';

var Pingpp = require('react-native-pingpp');
var NetUtil = require('./netutil.js');

var SimpleList = React.createClass({
    render: function () {
        return (
            <View style={styles.container}>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("alipay")}>
                    支付宝
                </Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("wx")}>
                    微信支付
                </Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("upacp")}>
                    银联支付
                </Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("qpay")}>
                    QQ钱包
                </Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("bfb_wap")}>
                    百付宝wap
                </Text>
                <Text style={styles.payBtn} onPress={() => this.textOnclick("jdpay_wap")}>
                    京东支付wap
                </Text>
                <Text style={styles.payBtn} onPress={() => Pingpp.setDebug(true)}>
                    开启调试
                </Text>
            </View>
        );
    },

    textOnclick: function (channel) {
        NetUtil.postJson("http://218.244.151.190/demo/charge",
            {amount:1,channel:channel,order_no:new Date().getTime()},
            function(obejct){
                Pingpp.createPayment(obejct, function(result) {
                    //JSON.parse(result);
                    ToastAndroid.show("react-result:" + result, ToastAndroid.SHORT);
                });
        });
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    payBtn: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor:"#DEDEDE",
        padding:5
    }
});

AppRegistry.registerComponent('reactPingpp', () => SimpleList);
