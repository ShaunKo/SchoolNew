import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    SectionList,
    TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { school, major } from '../Data/Data';
export const { width, height } = Dimensions.get('window');

// 按下後父層傳入是什麼的然後資料區別
export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPress: false, // 是否展開
            school: '學校', // 我的學校
            major: props.major, //所有系所
            prevMajor: props.major, //前一次傳來的 major
            myMajor: '系所',
            data: props.data,
        };
    }

    static defaultProps = {
        major: '',
    };

    componentDidMount() {
        this.searchData();
    }

    searchData = (text) => {
        console.log(this.props.data)
        if (this.props.data !== undefined && this.props.data !== '') {
            let arrData = this.props.data[0].data;
            let data = arrData.filter((item, index, array) => {
                return item.indexOf(text) !== -1;
            });
            let newData = []
            if (this.props.switch === 'school') {
                newData.push({title: '學校', data: data});
                this.props.getNewData(newData);
            } else if (this.props.switch === 'major') {
                newData.push({title: '系所', data: data});
                this.props.getNewMajorData(newData);
            }
            
            console.log(newData, 'shuan777')
        } else if (text === '') {
            this.props.getNewData(this.props.data);
            this.props.getNewMajorData(this.props.data);
        }
    }

    render() {

        return (
            <View>
                {this.props.isPress ?
                    <View style={styles.dataContainer}>
                        <TextInput
                            placeholder={'搜尋'}
                            style={styles.textInput}
                            onChangeText={(text)=>{this.searchData(text)}}
                        />
                        <SectionList
                            sections={this.props.arrSchool}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item, section: { title } }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (this.props.switch === 'school') {
                                                this.setState({ school: item, isPress: false });
                                                this.props.getSchool(item);
                                                this.props.getSchoolClose(false);
                                            } else if (this.props.switch === 'major') {
                                                this.setState({ myMajor: item, isPress: false, });
                                                this.props.getMajor(item);
                                                this.props.getMajorClose(false);
                                            }

                                        }}
                                    >
                                        <Text style={{ padding: 5, }}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    :
                    <View />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    space: {
        width: width - 123,
    },
    dataContainer: {
        padding: 5,
        height: 200,
    },
    textInput: {
        fontSize: 18,
    },
});