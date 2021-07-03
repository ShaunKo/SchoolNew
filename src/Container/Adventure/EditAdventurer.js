import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Button,
    Image,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Alert,
    Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { school, major } from '../Data/Data';
import DateTimePicker from '@react-native-community/datetimepicker';
import Dropdown from '@school/Container/Adventure/Dropdown'
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Images from '@image';
import { PHOTOTYPE, PHOTOCHECK, REVIEW, } from '../Data/Constant';
const { width, height } = Dimensions.get('window');

const DATA = [
    {
        id: '1',
        title: '1. 文件檔名請設定為您的真實姓名＋學號',
    },
    {
        id: '2',
        title: '2. 您的學校名稱',
    },
    {
        id: '3',
        title: '3. 文件內須包含您欲完成計畫之名稱',
    },
    {
        id: '4',
        title: '4. 文件內須包含您欲完成計畫之詳細內容及時程規劃',
    },
    {
        id: '5',
        title: '5. 設定您完成目標所需募資的金額（不得超過？？？）',
    },
    {
        id: '6',
        title: '6. 募資時間設定半個月內，若募資金額過半則可延長募資時間',
    },
];


export default class EditAdventurer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,

            majorData: '', // 系所資料
            isSchoolOpen: false, // 學校 dropdown
            isMajorOpen: false,//系所 dropdown 

            name: '', // 真實姓名
            plan: '', // 計劃名稱
            googleDriveUrl: '', //google drive 連結
            myMajor: '系所', // 取得系所
            school: '學校', // 取得學校
            description: '', // 描述
            price: 0,
            finishTime: Date.now() + 2592000000,
            arrSchool: '',

            imageType: '', // 判別上傳哪張圖
            idFrontUrl: '',
            idBackUrl: '',
            insuranceUrl: '',
            studentUrl: '',

            checkImage: PHOTOCHECK.WITHOUTAPPLY, // 檢查是否已通過身份驗證

            timeModal: false,
        }
    }

    componentDidMount() {
        // 檢查是否已上傳過圖片 Personal 內確認
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('Personal/' + userId).on('value', (snapshot) => {
            let data = snapshot.val();
            this.setState({ checkImage: data.checkImage });
        })

        this.setState({ arrSchool: school });
    }



    googleDriveRules = () => {
        return (
            DATA.map((item, i) => {
                return (
                    <Text key={i} style={{ lineHeight: 20 }}>{item.title}</Text>
                )
            })
        );
    }

    // 取得選擇的school, 加入系所資料
    getSchool = (school) => {
        this.setState({ school: school, myMajor: '系所' }, () => {
            let majorData = major.find((item) => {
                return item.title === this.state.school;
            });
            this.setState({ majorData: [majorData] });
        });
    }

    // 取得選擇系所
    getMajor = (myMajor) => {
        this.setState({ myMajor: myMajor })
    }

    // 取得搜尋後學校
    getNewData = (arrSchool) => {
        this.setState({ arrSchool: arrSchool })
    }

    // 取得搜尋後學校
    getNewMajorData = (majorData) => {
        this.setState({ majorData: majorData })
    }


    // dropdown  修改開關
    getSchoolClose = (isSchoolOpen) => {
        this.setState({ isSchoolOpen: isSchoolOpen });
    }

    getMajorClose = (isMajorOpen) => {
        this.setState({ isMajorOpen: isMajorOpen });
    }

    checkUploadData = async () => {
        var pattern = /^https:\/\/docs.google.com\/document\/d\/([A-Za-z0-9_\-\/])+$/; // google drive 連結格式

        if (this.state.name === '') {
            Alert.alert('請填寫姓名欄位');
        } else if (this.state.school === '學校') {
            Alert.alert('請選擇您就讀的學校');
        } else if (this.state.myMajor === '系所') {
            Alert.alert('請選擇您就讀的科系');
        } else if (this.state.plan === '') {
            Alert.alert('請填寫您的計畫名稱欄位');
        } else if (this.state.price <= 100) {
            Alert.alert('募資金額不得低於100元');
        } else if (this.state.googleDriveUrl === '') {
            Alert.alert('請填寫Google Drive連結欄位');
        } else if (!pattern.test(this.state.googleDriveUrl)) { // google drive 格式
            Alert.alert('Google Drive連結格式不正確');
        } else if (this.state.description === '') {
            Alert.alert('請填寫描述欄位');
        }
        // 照片
        else if (this.state.idFrontUrl === '') {
            Alert.alert('請上傳身分證正面照片');
        } else if (this.state.idBackUrl === '') {
            Alert.alert('請上傳身分證背面照片');
        } else if (this.state.insuranceUrl === '') {
            Alert.alert('請上傳健保卡正面照片');
        } else if (this.state.studentUrl === '') {
            Alert.alert('請上傳學生證正面照片');
        } else {
            // 上傳資料
            let time = Date.now();
            let userId = firebase.auth().currentUser.uid;
            let pushId = firebase.database().ref('/Adventurer/' + firebase.auth().currentUser.uid).push().key;
            firebase.database().ref('/Adventurer/' + userId + '/' + pushId).set({
                uid: firebase.auth().currentUser.uid,
                name: this.state.name,
                plan: this.state.plan,
                major: this.state.myMajor,
                school: this.state.school,
                googleDriveUrl: this.state.googleDriveUrl,
                description: this.state.description,
                price: this.state.price,
                pushId: pushId,
                time: time,
                finishTime: this.state.finishTime,
                // 審核計畫是否成功
                check: REVIEW.CHECK, //審核中
            });

            // 上傳圖片
            let reference = storage().ref(userId); // uid

            //身分證正面
            // path to existing file on filesystem
            const idFront = (this.state.idFrontUrl).toString();
            // uploads file
            await reference.child('IDFRONT').putFile(idFront);

            // 身分證背面
            const idBack = (this.state.idBackUrl).toString();
            await reference.child('IDBACK').putFile(idBack);

            // 健保卡
            const insurance = (this.state.insuranceUrl).toString();
            await reference.child('INSURANCE').putFile(insurance);

            // 學生證
            const student = (this.state.studentUrl).toString();
            await reference.child('STUDENT').putFile(student);

            // 圖片上傳審核
            firebase.database().ref('Personal/' + userId).update({
                checkImage: PHOTOCHECK.WITHOUTCHECK,
            });
        }
    }


    render() {
        return (
            <SafeAreaView>{/*#46A3FF blue*/}

                <View style={styles.flexRow}>
                    <View style={{ width: width / 3, padding: 10, alignItems: 'flex-start' }}>
                        <Icon name="chevron-left" size={30} onPress={() => {
                            //this.props.navigation.goBack();
                            this.props.setIsEdit(true);
                        }} />
                    </View>

                    <View style={{ width: width / 3, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 20, padding: 5, }}>冒險者</Text>
                    </View>

                    <View style={{ width: width / 3, alignItems: 'flex-end', padding: 10, }} />
                </View>

                <ScrollView style={{ marginBottom: 100, backgroundColor: 'white' }}>
                    <View style={styles.textInputContainer}>
                        <Icon name="perm-identity" size={30} />
                        <Text style={styles.text}>真實姓名</Text>
                    </View>
                    <TextInput
                        placeholderTextColor="grey"
                        placeholder="真實姓名"
                        style={styles.placeholderStyle}
                        maxLength={10}
                        onChangeText={(text) => { this.setState({ name: text }); }}
                    />

                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.touch}
                            onPress={() => {
                                this.setState({ isSchoolOpen: !this.state.isSchoolOpen });
                            }}>
                            <Text style={{ fontSize: 18 }}>{this.state.school}</Text>
                            {/* <Icon name="keyboard-arrow-down" style={styles.icon} /> */}
                        </TouchableOpacity>
                        <Dropdown
                            switch="school"
                            data={school}
                            arrSchool={this.state.arrSchool}
                            getNewData={this.getNewData.bind(this)}
                            getSchool={this.getSchool.bind(this)}
                            getSchoolClose={this.getSchoolClose.bind(this)}
                            isPress={this.state.isSchoolOpen}
                        />{/*學校 單*/}
                    </View>

                    <View style={[styles.container, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={styles.touch}
                            onPress={() => {
                                this.setState({ isMajorOpen: !this.state.isMajorOpen });
                            }}>
                            <Text style={{ fontSize: 18 }}>{this.state.myMajor}</Text>
                            {/* <Icon name="keyboard-arrow-down" style={styles.icon} /> */}
                        </TouchableOpacity>
                        <Dropdown
                            switch="major"
                            data={major}
                            arrSchool={this.state.majorData}
                            getNewMajorData={this.getNewMajorData.bind(this)}
                            getMajor={this.getMajor.bind(this)}
                            getMajorClose={this.getMajorClose.bind(this)}
                            isPress={this.state.isMajorOpen}
                        />
                        {/*系所 單*/}
                    </View>

                    <View style={styles.textInputContainer}>
                        <Icon name="assignment" size={30} />
                        <Text style={styles.text}>欲完成計畫之名稱</Text>
                    </View>
                    <TextInput
                        placeholderTextColor="grey"
                        placeholder="最多10字"
                        style={styles.placeholderStyle}
                        maxLength={10}
                        onChangeText={(text) => { this.setState({ plan: text }); }}
                    />

                    <View style={styles.textInputContainer}>
                        <Icon name="money" size={30} />
                        <Text style={styles.text}>希望募資金額</Text>
                    </View>
                    <TextInput
                        placeholderTextColor="grey"
                        placeholder="100~999999"
                        style={styles.placeholderStyle}
                        keyboardType='numeric'
                        maxLength={6}
                        onChangeText={(text) => { this.setState({ price: text }); }}
                    />

                    <View style={styles.textInputContainer}>
                        <Icon name="alternate-email" size={30} />
                        <Text style={styles.text}>Google Drive連結</Text>
                    </View>
                    <TextInput
                        placeholderTextColor="grey"
                        placeholder="Google Drive連結"
                        style={styles.placeholderStyle}
                        onChangeText={(text) => { this.setState({ googleDriveUrl: text }); }}
                    />

                    <View style={{ backgroundColor: '#E0E0E0', width: width - 20, margin: 10, borderRadius: 15, padding: 10 }}>
                        <Text style={{ fontSize: 20, alignSelf: 'center', padding: 5, fontWeight: 'bold' }}>GOOGLE 文件格式</Text>
                        <Text style={{ margin: 5, fontSize: 15, fontWeight: 'bold' }}>google 文件內容請包含以下項目：</Text>
                        {this.googleDriveRules()}
                    </View>


                    <View>
                        <View style={styles.textInputContainer}>
                            <Icon name="description" size={30} />
                            <Text style={styles.text}>描述</Text>
                        </View>

                        <TextInput
                            multiline
                            numberOfLines={5}
                            maxLength={500}
                            placeholderTextColor={'grey'}
                            style={{
                                borderColor: 'grey',
                                borderWidth: 1,
                                marginLeft: 10,
                                marginRight: 10,
                                borderRadius: 5,
                                height: 200,
                                fontSize: 18,
                                padding: 20,
                            }}
                            placeholder={'簡單描述您的構想（500字）'}
                            onChangeText={(text) => { this.setState({ description: text }); }}
                        />
                    </View>

                    <View style={styles.textInputContainer}>
                        <Icon name="access-time" size={30} />
                        <Text style={styles.text}>計畫完成時間(至少一個月後)</Text>
                    </View>
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        {Platform.OS === 'ios' ?
                            <DateTimePicker
                                value={new Date(this.state.finishTime)}
                                mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                                is24Hour={true}
                                display="default"
                                // 多30天（2592000000毫秒）
                                minimumDate={Date.now() + 2592000000}
                                onChange={(event, selectedDate) => {
                                    let finishTime = Date.parse(selectedDate);
                                    this.setState({ finishTime: finishTime });
                                }}
                                locale="zh"
                            /> :
                            <TouchableOpacity onPress={() => { this.setState({ timeModal: true }) }}>
                                <Text>選擇時間</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    {/* 上傳照片二階段 
                                已上傳，等待驗證，
                                驗證成功（曾上傳過）可以不用再上傳
                            */}

                    {this.state.checkImage === PHOTOCHECK.WITHOUTCHECK ||
                        this.state.checkImage === PHOTOCHECK.SUCCESS ?
                        null :
                        <View>
                            <View style={styles.textInputContainer}>
                                <Icon name="cloud-upload" size={30} />
                                <Text style={styles.text}>上傳身分證照片</Text>
                            </View>
                            <TouchableOpacity onPress={() => { this.setState({ isVisible: true, imageType: PHOTOTYPE.IDCARDFRONT }) }}>
                                <Image
                                    style={{ width: 299, height: 177, alignSelf: 'center', marginTop: 10, marginBottom: 5 }}
                                    source={this.state.idFrontUrl !== '' ? { uri: this.state.idFrontUrl } : Images.id.idCardFront}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ isVisible: true, imageType: PHOTOTYPE.IDCARDBACK }) }}>
                                <Image
                                    style={{ width: 299, height: 177, alignSelf: 'center', marginTop: 10, marginBottom: 5 }}
                                    source={this.state.idBackUrl !== '' ? { uri: this.state.idBackUrl } : Images.id.idCardBack}
                                />
                            </TouchableOpacity>

                            <View style={styles.textInputContainer}>
                                <Icon name="cloud-upload" size={30} />
                                <Text style={styles.text}>上傳健保卡正面照片</Text>
                            </View>
                            <TouchableOpacity onPress={() => { this.setState({ isVisible: true, imageType: PHOTOTYPE.INSURANCECARD }) }}>
                                <Image
                                    style={{ width: 299, height: 177, alignSelf: 'center', marginTop: 10, marginBottom: 5 }}
                                    source={this.state.insuranceUrl !== '' ? { uri: this.state.insuranceUrl } : Images.id.insurance}
                                />
                            </TouchableOpacity>

                            <View style={styles.textInputContainer}>
                                <Icon name="cloud-upload" size={30} />
                                <Text style={styles.text}>上傳學生證正面照片</Text>
                            </View>
                            <TouchableOpacity onPress={() => { this.setState({ isVisible: true, imageType: PHOTOTYPE.STUDENTCARD }) }}>
                                <Image
                                    style={{ width: 299, height: 177, alignSelf: 'center', marginTop: 10, marginBottom: 5 }}
                                    source={this.state.studentUrl !== '' ? { uri: this.state.studentUrl } : Images.id.student}
                                />
                            </TouchableOpacity>

                            <Modal
                                visible={this.state.isVisible}
                                animationType={'slide'}
                                transparent={true}
                            >
                                <TouchableWithoutFeedback onPress={() => {
                                    this.setState({ isVisible: false })
                                }}>
                                    <View style={{ backgroundColor: 'transparent', width: width, height: height - 350 }} />
                                </TouchableWithoutFeedback>
                                <View style={{ backgroundColor: '#FFFAF4', height: 350, width: width, position: 'absolute', bottom: 0, alignSelf: 'center', margin: 5, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                    <View style={{ alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'grey', marginBottom: 10 }}>
                                        <Text style={{ fontSize: 20, padding: 20 }}>上傳相片</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{ backgroundColor: 'black', borderRadius: 10, width: 80 + '%', alignSelf: 'center', margin: 10 }}
                                        onPress={() => {
                                            launchCamera(
                                                {
                                                    mediaType: 'photo',
                                                    includeBase64: false,
                                                    maxHeight: 200,
                                                    maxWidth: 200,
                                                },
                                                (response) => {
                                                    if (response.assets !== undefined) {
                                                        //setResponse(response);
                                                        let res = response.assets.find(function (item, index, array) {
                                                            return item;
                                                        });

                                                        let state = {};
                                                        if (this.state.imageType === PHOTOTYPE.IDCARDFRONT) {
                                                            state.idFrontUrl = res.uri;
                                                        } else if (this.state.imageType === PHOTOTYPE.IDCARDBACK) {
                                                            state.idBackUrl = res.uri;
                                                        } else if (this.state.imageType === PHOTOTYPE.INSURANCECARD) {
                                                            state.insuranceUrl = res.uri;
                                                        } else if (this.state.imageType === PHOTOTYPE.STUDENTCARD) {
                                                            state.studentUrl = res.uri;
                                                        }
                                                        state.isVisible = false;
                                                        this.setState(state);
                                                    }
                                                },
                                            )
                                        }}
                                    >
                                        <Text style={{ padding: 20, alignSelf: 'center', fontSize: 18, color: 'white' }}>拍照</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 10, width: 80 + '%', alignSelf: 'center', margin: 10 }}
                                        onPress={() => {
                                            launchImageLibrary(
                                                {
                                                    mediaType: 'photo',
                                                    includeBase64: false,
                                                    maxHeight: 200,
                                                    maxWidth: 200,
                                                },
                                                (response) => {
                                                    //setResponse(response);
                                                    console.log(response, 'shaun')
                                                    if (response.assets !== undefined) {
                                                        let res = response.assets.find(function (item, index, array) {
                                                            return item;
                                                        });

                                                        let state = {};
                                                        if (this.state.imageType === PHOTOTYPE.IDCARDFRONT) {
                                                            state.idFrontUrl = res.uri;
                                                        } else if (this.state.imageType === PHOTOTYPE.IDCARDBACK) {
                                                            state.idBackUrl = res.uri;
                                                        } else if (this.state.imageType === PHOTOTYPE.INSURANCECARD) {
                                                            state.insuranceUrl = res.uri;
                                                        } else if (this.state.imageType === PHOTOTYPE.STUDENTCARD) {
                                                            state.studentUrl = res.uri;
                                                        }
                                                        state.isVisible = false;
                                                        this.setState(state);
                                                    }
                                                },
                                            )
                                        }}
                                    >
                                        <Text style={{ padding: 20, alignSelf: 'center', fontSize: 18, color: 'white' }}>相簿</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 10, width: 80 + '%', alignSelf: 'center', margin: 10 }}
                                        onPress={() => { this.setState({ isVisible: false }) }}>
                                        <Text style={{ padding: 20, alignSelf: 'center', fontSize: 18, color: 'red' }}>取消</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>
                    }

                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => {
                            this.checkUploadData();
                        }}
                    >
                        <Text style={styles.confirmButtonText}>確認上傳</Text>
                    </TouchableOpacity>
                </ScrollView>
                {/* <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.timeModal}

        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <DateTimePicker
                            // value={new Date(this.state.finishTime)}
                            // mode={'date'}
                            // is24Hour={true}
                            // display="default"
                            // // 多30天（2592000000毫秒）
                            // minimumDate={Date.now() + 2592000000}
                            // onChange={(event, selectedDate) => {
                            //     let finishTime = Date.parse(selectedDate);
                            //     this.setState({ finishTime: finishTime });
                            // }}
                            // locale="zh"
                            mode="date" value={new Date()}
                        />
      </Modal> */}
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        borderBottomColor: '#3C3C3C',
        borderBottomWidth: 1,
    },
    textInputContainer: { // 輸入外匡
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 20,
        margin: 10,
    },
    placeholderStyle: { // 提示字
        fontSize: 18,
        margin: 10,
    },
    container: {
        width: width - 20,
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        alignSelf: 'center',
    },
    touch: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
        padding: 5,
    },
    icon: {
        padding: 5,
    },
    confirmButton: { // 確認鈕
        width: width - 200,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
    },
    confirmButtonText: { // 確認鈕字
        fontSize: 18,
        color: 'white',
    },
});