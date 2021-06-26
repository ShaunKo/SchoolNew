import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

// import Toast from 'react-native-root-toast';
import Toast, { DURATION } from 'react-native-easy-toast'


const { width, height } = Dimensions.get('window');
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            visible: false,
        }
    }

    sendEmail = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
            // Email sent.
            this.toast.show('電子郵件已寄出請至信箱查看！', 5000);
            console.log('email sent')
            // 電子郵件已寄出請至信箱查看
        }).catch((error) => {
            // An error happened.
            // 該帳號未曾註冊
            this.toast.show('該帳號未曾註冊！', 5000);
            console.log(error)
        });
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: 'row', backgroundColor: 'black' }}>
                    <View style={{ width: width / 3, alignItems: 'flex-start', padding: 10 }}>
                        <Icon name="chevron-left" size={30} color="white" onPress={() => {
                            this.props.navigation.goBack();
                        }} />
                    </View>
                    <View style={{ width: width / 3, alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Text style={{ fontSize: 18, padding: 5, color: 'white' }}>忘記密碼</Text> */}
                    </View>
                    <View style={{ width: width / 3, alignItems: 'flex-end', padding: 10 }} />
                </View>
                <Text style={styles.textTitle}>忘記密碼？</Text>
                <View style={styles.emailContainer}>
                    <View style={styles.icon}>
                        <Icon name="email" size={30} color={'white'} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            numberOfLines={1}
                            style={styles.inputEmail}
                            onChangeText={(text) => { this.setState({ email: text }); }}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.sendEmail();
                }}>
                    <Text style={styles.buttonText}>寄送電子郵件</Text>
                </TouchableOpacity>

                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{ backgroundColor: 'white' }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'black', fontSize: 15 }}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    textTitle: {
        fontSize: 15,
        margin: 20,
        color: 'white',
        marginTop: height / 20,
    },
    inputEmail: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: width - 70.5,
        fontSize: 25,
        color: 'white',
    },
    emailContainer: {
        flexDirection: 'row',
    },
    icon: {
        padding: 10,
    },
    inputContainer: {
        padding: 10,
    },
    button: {
        backgroundColor: 'black', // FF7575
        padding: 15,
        alignItems: 'center',
        width: (width - 50) / 2,
        alignSelf: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    }
});