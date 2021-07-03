import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    Dimensions,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { Icon } from 'react-native-elements';
// import PlanDetails from './PlanDetails';

import EditAdventurer from './EditAdventurer';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import { REVIEW } from '../Data/Constant';

const { width, height } = Dimensions.get('window');

export default class Adventurer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: true,
            planData: [],
            modalVisible: false,
        }
    }

    componentDidMount() {
        this.getUserPlanData();
    }

    getUserPlanData = () => {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('Adventurer/' + userId).on("value", (snapshot) => {
            var data = snapshot.val();
            if (data !== null && data !== undefined) {
                var planData = Object.values(data);
                console.log(planData)
                this.setState({ planData: planData });
            }
        });
    }
    // 是否是修改狀態
    setIsEdit = (isEdit) => {
        this.setState({ isEdit: isEdit });
    }

    render() {
        return (


            <SafeAreaView>{/*#46A3FF blue*/}
                {this.state.isEdit ?
                    <View>
                        <View style={styles.flexRow}>
                            <View style={{ width: width / 3, padding: 10, alignItems: 'flex-start' }} />
                            <View style={{ width: width / 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, padding: 5, }}>冒險者</Text>
                            </View>
                            <View style={{ width: width / 3, alignItems: 'flex-end', padding: 10, }}>
                                <Icon name="cached" size={30} onPress={() => {
                                    this.setState({ isEdit: false });
                                }} />
                            </View>
                        </View>
                        {/*flatlist 點擊詳細資料*/}
                        <View style={{ backgroundColor: 'white', height: 100 + '%' }}>
                            <FlatList
                                data={this.state.planData}
                                renderItem={(item, index) => {
                                    var time = item.item.time;
                                    var d = new Date(time);
                                    var hours = d.getHours()
                                    var minutes = d.getMinutes()
                                    return (
                                        <TouchableOpacity key={index} style={{ flexDirection: 'row', padding: 5 }} onPress={() => {
                                            this.setState({ modalVisible: true });
                                            this.props.navigation.navigate('PlanDetails', {
                                                plan: item.item.plan,
                                                school: item.item.school,
                                                major: item.item.major,
                                                price: item.item.price,
                                                description: item.item.description,
                                                googleDriveUrl: item.item.googleDriveUrl,
                                                time: item.item.time,
                                                pushId: item.item.pushId,
                                                finishTime: item.item.finishTime,
                                                check: item.item.check,
                                            });
                                        }}>
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text>{item.index + 1}</Text>
                                            </View>
                                            <View style={{ flex: 4 }}>
                                                <Text style={{ fontSize: 25, padding: 10 }}>{item.item.plan}</Text>
                                            </View>
                                            <View style={{ flex: 2 }}>
                                                <Text style={{ padding: 5, alignSelf: 'flex-end', fontSize: 12 }}>{hours}:{minutes}</Text>
                                                <Text
                                                    style={{
                                                        color: item.item.check === REVIEW.CHECK ? 'orange' :
                                                            item.item.check === REVIEW.SUCCESS ? 'green' : 'red',
                                                        alignSelf: 'flex-end',
                                                        padding: 2,
                                                        fontSize: 15,
                                                    }}>{item.item.check}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                                ItemSeparatorComponent={() => {
                                    return (
                                        <View style={styles.separator} />
                                    )
                                }}
                                keyExtractor={item => item.pushId}
                            />
                        </View>
                    </View>

                    :
                    <EditAdventurer setIsEdit={this.setIsEdit.bind(this)} />
                }


                {/* <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        // onRequestClose={() => {
        //   this.setState({modalVisible: true})
        // }}
      >
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{width: width / 4, backgroundColor: 'transparent', height: height,}} onPress={()=>{this.setState({modalVisible: false})}}/>
            <SafeAreaView style={{width: width / 4 * 3,marginTop: 20,height: height,backgroundColor: 'white',borderRadius: 50}}>
                <View style={{flexDirection: 'row',borderBottomWidth: 1,borderBottomColor: 'black',}}>
                    <TouchableOpacity style={{padding: 10, justifyContent: 'center'}} onPress={()=>{
                        
                    }}>
                        <Icon name='edit' size={30} />
                    </TouchableOpacity>
                    <View style={{width: width / 4 * 3 - 111, alignSelf: 'center',alignItems: 'center',padding: 5,marginBottom: 10,marginLeft:5,marginRight: 5,borderRadius: 5, }}>
                        <Text style={{fontSize: 20}}>titlekkkkkkkkkkkkkklllllliijooookkkk</Text>
                    </View>
                    <TouchableOpacity style={{padding: 10, justifyContent: 'center'}} onPress={()=>{
                        this.setState({modalVisible: false});
                    }}>
                        <Icon name='cancel' size={30} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{marginLeft: 10,marginTop: 10,fontSize: 18}}>學校/系所：</Text>
                    <View style={{margin: 10,backgroundColor: 'black',borderRadius: 5}}>
                        <Text style={{color: 'white', fontSize: 15,padding: 5,}}>學校/系所</Text>
                    </View>
                    <Text style={{marginLeft: 10,marginTop: 10,fontSize: 18}}>計畫內容：</Text>
                    <View style={{margin: 10,backgroundColor: 'black',borderRadius: 5,height: 300}}>
                        <Text style={{color: 'white', fontSize: 15,padding: 5,}}>內容</Text>
                    </View>
                    <Text style={{alignSelf: 'center',fontSize: 18}}>googleDrive 網址</Text>
                    <Text style={{marginLeft: 10,marginTop: 10,fontSize: 18}}>完成時間：</Text>
                    <View style={{margin: 10,backgroundColor: 'black',borderRadius: 5}}>
                        <Text style={{color: 'white', fontSize: 15,padding: 5,}}>年月日</Text>
                    </View>
                    <Text style={{marginLeft: 10,marginTop: 10,fontSize: 18}}>募資金額：</Text>
                    <View style={{margin: 10,backgroundColor: 'black',borderRadius: 5}}>
                        <Text style={{color: 'white', fontSize: 15,padding: 5,}}>600</Text>
                    </View>
                </View>
            </SafeAreaView>
          </View>
      </Modal> */}

            </SafeAreaView>



        )
    }
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        borderBottomColor: '#3C3C3C',
        borderBottomWidth: 1,
    },
    separator: {
        borderWidth: 0.5,
        borderColor: 'black',
        width: 90 + '%',
        alignSelf: 'center',
    },
});