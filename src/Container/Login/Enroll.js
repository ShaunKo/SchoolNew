import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import { REVIEW } from '../Data/Constant';

const { width } = Dimensions.get('window');

export default class Enroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            check: true,
        }
    }
    login = () => {
        // 如果符合條件才做登入動作
        var emailPattern = /^([A-Za-z0-9_\-\.])+\@(gmail.com|gmail.com.tw)$/;
        var numberPattern = /[0-9]/;
        var letterPattern = /[a-zA-Z]/;
        console.log(this.state.password.search(numberPattern) === -1 || this.state.password.search(letterPattern) === -1);
        if (this.state.email === '' || this.state.password === '') { // 是否有輸入
            Alert.alert('請填寫帳號密碼');
        } else if (this.state.email.search(emailPattern) === -1) { // 電子信箱格式
            Alert.alert('請確認電子信箱格式是否正確');
        } else if (this.state.password.search(numberPattern) === -1 || this.state.password.search(letterPattern) === -1 || this.state.password.length < 6 || this.state.password.length > 15) {
            Alert.alert('密碼需為大、小英文字母及數字之6-15字元');
        } else if (this.state.password !== this.state.confirmPassword) {
            Alert.alert('請確認兩組密碼是否相同');
        } else if (this.state.check === false) {
            Alert.alert('請詳閱隱私權條款後勾選以表同意');
        } else {
            firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    firebase.database().ref('/Personal/' + firebase.auth().currentUser.uid).set({
                        email: this.state.email,
                        password: this.state.password,
                    });
                    this.props.navigation.navigate('NavigationList');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        // console.log('That email address is already in use!');
                        Alert.alert('該帳號已被使用');
                    }
                    // console.error(error);
                });
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'black' }}>
                    <View style={{ width: width / 3, alignItems: 'flex-start', padding: 10 }}>
                        <Icon name="chevron-left" size={30} color="white" onPress={() => {
                            this.props.navigation.goBack();
                        }} />
                    </View>
                    <View style={{ width: width / 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, padding: 5, color: 'white' }}>註冊</Text>
                    </View>
                    <View style={{ width: width / 3, alignItems: 'flex-end', padding: 10 }}>
                        <Icon name="chevron-right" size={30} color="white" onPress={() => {
                            this.login();
                            //this.props.navigation.navigate('NavigationList');
                        }} />
                    </View>
                </View>
                <View style={styles.allContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>電子信箱 (請使用Gmail信箱)</Text>
                        <TextInput
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            numberOfLines={1}
                            style={styles.input}
                            onChangeText={(text) => { this.setState({ email: text }); }}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>密碼</Text>
                        <TextInput
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            numberOfLines={1}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ password: text }); }}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>確認密碼</Text>
                        <TextInput
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            numberOfLines={1}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ confirmPassword: text }); }}
                        />
                    </View>
                    <View style={styles.checkContainer}>
                        <TouchableOpacity
                            onPress={() => { this.setState({ check: !this.state.check }); }}
                            style={{ width: 15, height: 15, borderColor: 'white', borderWidth: 1, borderRadius: 3, marginLeft: 5, marginRight: 5, }}>
                            {this.state.check ?
                                <Icon name="done" color={'green'} size={15} />
                                :
                                null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Privacy');
                            }}>
                            <Text style={{ color: 'white', fontSize: 15, padding: 5 }}>使用者隱私權及平台服務同意書</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    allContainer: {
        backgroundColor: 'black',
        flex: 1,
    },
    textContainer: {
        padding: 20,
    },
    textTitle: {
        margin: 10,
        fontSize: 15,
        color: 'white',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: width - 40,
        fontSize: 20,
        color: 'white',
    },
    login: {
        backgroundColor: 'black',
        padding: 15,
        alignItems: 'center',
        width: width - 50,
        alignSelf: 'center',
        borderRadius: 50,
        margin: 5,
    },
    loginText: {
        fontSize: 18,
        color: 'white',
    },
    checkContainer: {
        width: width - 40,
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
});