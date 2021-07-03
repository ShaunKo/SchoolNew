import React, { Component, useCallback } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Linking,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
} from 'react-native-popup-menu';

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
            style={{ borderRadius: 5 , opacity: 0.3 }}
        >
            <Text style={{ fontSize: 16, justifyContent: 'center'}}>{children}</Text>
        </TouchableOpacity>
    );
};

export default class Order extends Component {
    render() {
        const { plan, school, major, description, googleDriveUrl, time, pushId, price, name, finishTime } = this.props.route.params;
        let year = new Date(finishTime).getFullYear();
        let month = new Date(finishTime).getMonth() + 1;
        let day = new Date(finishTime).getDate();
        return (
            <SafeAreaView style={{ backgroundColor: 'black' }}>
                <View style={{ backgroundColor: 'black', height: 120 }}>
                    <View style={styles.flexRow}>
                        <View style={{ width: width / 3, alignItems: 'flex-start', padding: 10, }}>
                            <Icon name="chevron-left" size={30} color={'white'} onPress={() => {
                                this.props.navigation.goBack();
                            }} />
                        </View>
                        <View style={{ width: width / 3, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, padding: 5, color: 'white' }}>{plan}</Text>
                        </View>
                        <View style={{ width: width / 3, padding: 10, alignItems: 'flex-end' }} />
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', height: 100 }} />
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'white', width: width - 50, position: 'absolute', marginTop: height / 9, height: 150, borderRadius: 20, alignSelf: 'center',
                    shadowColor: '#999',  //设置阴影色
                    shadowOffset: { width: 4, height: 4 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
                    shadowOpacity: 0.5,
                    shadowRadius: 1.5,
                }}>
                    <View style={{flex:3}}>
                        <Text style={{ fontSize: 18, padding: 20 }}>募資金額：</Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10, }}>＄ 0 / {price}</Text>
                    </View>
                    {/* <TouchableOpacity style={{
                        flex:1,
                        height: 60,
                        width: 60,
                        borderRadius: 100,
                        backgroundColor: 'black',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        //position: 'absolute',
                        // margin: 15,
                        // marginLeft: width-130,
                        // shadowColor: '#999',  //设置阴影色
                        // shadowOffset: { width: 4, height: 4 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
                        // shadowOpacity: 0.5,
                        // shadowRadius: 1.5,
                    }}>
                        <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 30 }}>+</Text>
                    </TouchableOpacity> */}
                </View>

                <ScrollView style={{ backgroundColor: 'white',marginBottom: 220 }}>
                    <View style={{ margin: 10 }}>
                        <View style={{
                            shadowColor: '#999',  //设置阴影色
                            shadowOffset: { width: 4, height: 4 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
                            shadowOpacity: 1,
                            shadowRadius: 1.5, width: width - 20, borderRadius: 5, backgroundColor: '#F0F0F0', flexDirection: 'row'
                        }}>
                            <Text style={{ padding: 15 }}>姓名：</Text>
                            <Text style={{ padding: 15 }}>{name}</Text>
                        </View>
                        <View style={{
                            shadowColor: '#999',  //设置阴影色
                            shadowOffset: { width: 4, height: 4 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
                            shadowOpacity: 1, marginTop: 15,
                            shadowRadius: 1.5, width: width - 20, borderRadius: 5, backgroundColor: '#F0F0F0', flexDirection: 'row'
                        }}>
                            <Text style={{ padding: 15 }}>學系：</Text>
                            <Text style={{ padding: 15 }}>{school}/{major}</Text>
                        </View>
                        <View style={{
                            shadowColor: '#999',  //设置阴影色
                            shadowOffset: { width: 4, height: 4 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
                            shadowOpacity: 1, marginTop: 15,
                            shadowRadius: 1.5, height: 200, width: width - 20, borderRadius: 5, backgroundColor: '#F0F0F0'
                        }}>
                            <Text style={{ padding: 15 }}>內容描述：</Text>
                            <Text style={{ padding: 15 }}>{description}</Text>
                        </View>
                        <View style={{
                            shadowColor: '#999',  //设置阴影色
                            shadowOffset: { width: 4, height: 4 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
                            shadowOpacity: 1,
                            shadowRadius: 1.5, marginTop: 15,
                            width: width - 20, borderRadius: 5, backgroundColor: '#F0F0F0', flexDirection: 'row'
                        }}>
                            <Text style={{ padding: 15 }}>完成時間：</Text>
                            <Text style={{ padding: 15 }}>{year}年{month}月{day}日</Text>
                        </View>
                        <View style={{
                            shadowColor: '#999',  //设置阴影色
                            shadowOffset: { width: 4, height: 4 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
                            shadowOpacity: 1,
                            shadowRadius: 1.5, marginTop: 15,
                            width: width - 20, borderRadius: 5, backgroundColor: '#F0F0F0', flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{ paddingTop: 10,paddingBottom: 10,paddingLeft: 10 }}>googleDrive：</Text>
                            <OpenURLButton url={googleDriveUrl}>{"前往google drive"}</OpenURLButton>
                        </View>

                        <View style={{
                            shadowColor: '#999',  //设置阴影色
                            shadowOffset: { width: 4, height: 4 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
                            shadowOpacity: 1,
                            shadowRadius: 1.5, marginTop: 15,
                            width: width - 20, borderRadius: 5, backgroundColor: '#F0F0F0', flexDirection: 'row'
                        }}>
                            <Text style={{ padding: 15 }}>募資金額與已獲得金額：</Text>
                            <Text style={{ padding: 15 }}>/{price}</Text>
                        </View>

                    </View>
                </ScrollView>



            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
});