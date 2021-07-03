import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Images from '@image';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.props.navigation.navigate('NavigationList')
                console.log('user', user)
            } else {
                // No user is signed in.
                console.log('not a user')
            }
        });
    }

    checkLogin = () => {
        if (this.state.email === '') {
            Alert.alert('電子信箱欄位不得為空');
        } else if (this.state.password === '') {
            Alert.alert('密碼欄位不得為空');
        }
    }


    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'black' }}>
                <ScrollView style={{ height: 100 + '%', backgroundColor: 'black' }}>
                    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={120} >
                        <Image
                            style={{ width: 250, height: 250, alignSelf: 'center', borderRadius: 100, marginTop: 10 + '%', marginBottom: 5 + '%' }}
                            source={Images.logo.logoPng}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>電子信箱</Text>
                            <TextInput
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                numberOfLines={1}
                                style={styles.inputEmail}
                                onChangeText={(text) => { this.setState({ email: text }); }}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>密碼</Text>
                            <View style={styles.inputPasswordContainer}>
                                <TextInput
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    numberOfLines={1}
                                    style={styles.inputPassword}
                                    secureTextEntry={true}
                                    onChangeText={(text) => { this.setState({ password: text }); }}
                                />
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('ForgotPassword');
                                }}>
                                    <Text style={styles.forgotPassword}>忘記密碼？</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.login} onPress={() => {
                            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                                .then((userCredential) => {
                                    console.log(userCredential);
                                    this.props.navigation.navigate('NavigationList');
                                })
                                .catch((error) => {
                                    Alert.alert('帳號或密碼輸入錯誤');
                                    console.log(error.code)
                                    console.log(error.message)
                                });
                        }}>
                            <Text style={styles.loginText}>登入</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.enroll} onPress={() => {
                            this.props.navigation.navigate('Enroll');
                        }}>
                            <Text style={styles.loginText}>註冊</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        padding: 20,
    },
    textTitle: {
        margin: 10,
        color: 'white',
    },
    inputEmail: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: width - 40,
        fontSize: 20,
        color: 'white',
    },
    inputPasswordContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        width: width - 40,
        borderBottomColor: 'white',
    },
    inputPassword: {
        width: (width - 40) / 5 * 4,
        fontSize: 20,
        color: 'white',
    },
    login: {
        backgroundColor: 'red', // FF7575
        padding: 15,
        alignItems: 'center',
        width: (width - 50) / 2,
        alignSelf: 'center',
        borderRadius: 50,
        margin: 5,
    },
    enroll: {
        backgroundColor: 'black', // FF7575
        padding: 15,
        alignItems: 'center',
        width: (width - 50) / 2,
        alignSelf: 'center',
        borderRadius: 50,
        margin: 5,
    },
    loginText: {
        fontSize: 18,
        color: 'white',
    },
    forgotPassword: {
        color: '#ADADAD',
    },
});