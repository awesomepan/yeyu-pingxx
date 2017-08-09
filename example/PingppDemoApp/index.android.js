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

var Pingpp = require('pingpp-react-native');
var NetUtil = require('./netutil.js');

export default class PingppDemoApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.payBtn} onPress={() => this.textOnclick("alipay")}>支付宝</Text>
        <Text style={styles.payBtn} onPress={() => this.textOnclick("wx")}>微信支付</Text>
        <Text style={styles.payBtn} onPress={() => this.textOnclick("upacp")}>银联支付</Text>
        <Text style={styles.payBtn} onPress={() => this.textOnclick("qpay")}>QQ钱包</Text>
        <Text style={styles.payBtn} onPress={() => this.textOnclick("bfb_wap")}>百付宝wap</Text>
        <Text style={styles.payBtn} onPress={() => this.textOnclick("jdpay_wap")}>京东支付wap</Text>
        <Text style={styles.payBtn} onPress={() => Pingpp.setDebug(true)}>开启调试</Text>
        <Text style={styles.payBtn} onPress={() => this.getVersion()}>版本号</Text>
      </View>
    );
  }

  getVersion() {
    Pingpp.getVersion(function(version){
      ToastAndroid.show("version:" + version, ToastAndroid.SHORT);
    });
  }

  textOnclick(channel) {
    NetUtil.postJson(
      "http://218.244.151.190/demo/charge",
      {amount: 1, channel: channel, order_no: new Date().getTime()},
      function(object) {
        Pingpp.createPayment(object, function(result) {
          //JSON.parse(result);
          ToastAndroid.show("react-result:" + result, ToastAndroid.SHORT);
        });
      }
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
  payBtn: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor:"#DEDEDE",
    padding:5
  },
});

AppRegistry.registerComponent('PingppDemoApp', () => PingppDemoApp);
