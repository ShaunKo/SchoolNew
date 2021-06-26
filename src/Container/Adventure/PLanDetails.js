import React, { Component, useCallback } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableOpacity,
    Linking,
    Button,
    ScrollView,
    Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`無法開啟網頁`);
        }
    }, [url]);

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{margin: 10, backgroundColor: 'black', borderRadius: 5,shadowColor: '#999',  //设置阴影色
            shadowOffset: { width: 7, height: 7 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
            shadowOpacity: 0.7,
            shadowRadius: 1.5, }}
        >
            <Text style={{color: 'white', fontSize: 16, padding: 5, margin: 10}}>{children}</Text>
        </TouchableOpacity>
    );
};


export default class PlanDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    render() {
        const { plan, school, major, description, googleDriveUrl, time, pushId, price, finishTime } = this.props.route.params;
        let year = new Date(finishTime).getFullYear();
        let month = new Date(finishTime).getMonth() + 1;
        let day = new Date(finishTime).getDate();
        console.log(finishTime, 'shaun7777')
        return (

            <SafeAreaView >

                <View style={styles.flexRow}>
                    <TouchableOpacity style={{ padding: 10, justifyContent: 'center' }} onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Icon name='chevron-left' size={30} />
                    </TouchableOpacity>

                    <View style={{ width: width - 111, alignSelf: 'center', alignItems: 'center', padding: 5, marginBottom: 10, marginLeft: 5, marginRight: 5, borderRadius: 5, }}>
                        <Text style={{ fontSize: 20,}}>{plan}</Text>
                    </View>
                </View>

                <ScrollView style={{ backgroundColor: 'white', marginBottom: 50 }}>

                    <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 18 }}>學校/系所：</Text>
                    <View style={{ margin: 10, backgroundColor: 'black', borderRadius: 5 }}>
                        <Text style={{ color: 'white', fontSize: 15, padding: 5, margin: 10 }}>{school}/{major}</Text>
                    </View>

                    <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 18 }}>計畫內容：</Text>
                    <View style={{ margin: 10, backgroundColor: 'black', borderRadius: 5, height: 300 }}>
                        <Text style={{ color: 'white', fontSize: 16, padding: 5, margin: 10 }}>{description}</Text>
                    </View>

                    <Text style={{ marginLeft: 10, marginTop: 10,fontSize: 18 }}>前往google drive看詳細資訊：</Text>
                    <OpenURLButton url={googleDriveUrl}>{plan}</OpenURLButton>

                    <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 18 }}>完成時間：</Text>
                    <View style={{ margin: 10, backgroundColor: 'black', borderRadius: 5 }}>
                        <Text style={{ color: 'white', fontSize: 15, padding: 5, margin: 10 }}>{year} 年 {month} 月 {day} 日</Text>
                    </View>

                    <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 18 }}>募資金額：</Text>
                    <View style={{ margin: 10, backgroundColor: 'black', borderRadius: 5 }}>
                        <Text style={{ color: 'white', fontSize: 15, padding: 5, margin: 10 }}>???/600</Text>
                    </View>

                    <TouchableOpacity style={styles.delete} onPress={async ()=>{
                        let userId = firebase.auth().currentUser.uid;
                        await firebase.database().ref('/Adventurer/'+ userId + '/' + pushId).remove();
                        this.props.navigation.navigate('Adventurer');
                    }}>
                        <Icon name="delete" color={'white'} style={{padding: 5}}/>
                        <Text style={{color: 'white',fontSize: 15 }}>刪除</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        borderBottomColor: '#3C3C3C',
        borderBottomWidth: 1,
    },
    delete: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'red', // FF7575
        padding: 5,
        alignItems: 'center',
        width: (width - 50) / 2,
        alignSelf: 'center',
        borderRadius: 50,
        margin: 10,
        shadowColor: '#999',  //设置阴影色
        shadowOffset: { width: 5, height: 5 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
        shadowOpacity: 0.7,
        shadowRadius: 1.5,
    },
});