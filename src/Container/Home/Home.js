import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
const { width, height } = Dimensions.get('window');

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { REVIEW } from '../Data/Constant';

// import FilterButton from './FilterButton.js';


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      text: '', // 搜尋字
    }
  }
  componentDidMount() {
    this.getNeedData();
  }

  // 取得資料
  getNeedData = () => {
    firebase.database().ref('/Adventurer').on('value', (snapshot) => {
      if (snapshot.val() !== null && snapshot.val() !== undefined) {
        let a = Object.values(snapshot.val());
        let b = a.map(function (item, index, array) {
          let c = Object.values(item);
          console.log(c, 'shaun')
          return c
        });
        let arr = [];
        for (i = 0; i < b.length; i++) {
          for (j = 0; j < b[i].length; j++) {
            arr.push(b[i][j]);
          }
        }

        // 判斷是否檢查通過
        var review = arr.filter(function(item, index, array){
          return item.check === REVIEW.SUCCESS; // 審核中或審核失敗不顯示
        });

        this.setState({ allData: review });
        console.log(review, '8')
      }
    });
  }

  filterData = (filter) => {
    if(filter) {
      let data = this.state.allData.filter((item, index, array) => {
        let uppercasePlan = item.plan.toUpperCase();
        let uppercaseFliter = filter.toUpperCase();
        return uppercasePlan.indexOf(uppercaseFliter) !== -1;
      })
      this.setState({allData: data});
    } else {
      this.getNeedData();
    }
  }

  render() {
    return (
      <SafeAreaView>{/*#46A3FF blue*/}
        <View>
          <View style={styles.flexRow}>
            <View style={{ width: width / 3, alignItems: 'flex-start', padding: 10, }}>
              <Icon name="miscellaneous-services" color={'black'} size={30} onPress={() => {
                firebase.auth().signOut()
                  .then(() => this.props.navigation.navigate('Login'));
              }} />
            </View>
            <View style={{ width: width / 3, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, padding: 5, color: 'black' }}>校園小霸王</Text>
            </View>
            <View style={{ width: width / 3, padding: 10, alignItems: 'flex-end' }} />
          </View>
        </View>

        

        <View style={{ backgroundColor: 'white', }}>
        <View style={{
          flexDirection: 'row',
          borderColor: 'black',
          borderWidth: 1,
          backgroundColor: 'white', width: width - 50, borderRadius: 20, alignSelf: 'center',
          marginTop: 5,
        //   shadowColor: '#999',  //设置阴影色
        //   shadowOffset: { width: 4, height: 4 },  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
        //   shadowOpacity: 0.5,
        //   shadowRadius: 1.5,
        }}>
          <View style={{ margin: 5, width: width - 120.5,justifyContent: 'center' }}>
            <TextInput
              placeholderTextColor="grey"
              placeholder="搜尋"
              style={{ fontSize: 15, }}
              onChangeText={(text) => {
                this.setState({text: text});
                if(text === ''){
                  this.filterData(text);
                }
              }}
            />
          </View>
          <View style={{ margin: 5 }}>
            <Icon name="search" size={30} onPress={()=>{this.filterData(this.state.text);}}/>
          </View>
        </View>
          <FlatList
            style={{ marginTop: 10, height: 100 + '%' }}
            data={this.state.allData}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity
                  style={{ flexDirection: 'row', padding: 5, }}
                  key={index}
                  onPress={() => {
                    this.props.navigation.navigate('訂單', {
                      plan: item.item.plan,
                      school: item.item.school,
                      major: item.item.major,
                      name: item.item.name,
                      price: item.item.price,
                      description: item.item.description,
                      time: item.item.time, // 上架時間
                      finishTime: item.item.finishTime,
                      googleDriveUrl: item.item.googleDriveUrl,
                      pushId: item.item.pushId,
                    });
                  }}
                >
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{item.index + 1}</Text>
                  </View>
                  <View style={{ flex: 6 }}>
                    <Text style={{ padding: 3, fontSize: 14, }}>計畫：{item.item.plan}</Text>
                    <Text style={{ padding: 3, fontSize: 14, }}>{item.item.school}/{item.item.major}</Text>
                  </View>
                  <View style={{ flex: 2, justifyContent: 'center' }}>
                    <Text>$:{item.item.price}</Text>
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
  flex1: {
    flex: 1,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: 90 + '%',
    alignSelf: 'center',
  },
});