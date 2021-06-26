import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default class Privacy extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{ flexDirection: 'row', backgroundColor: 'black' }}>
                    <View style={{ width: width / 3, alignItems: 'flex-start', padding: 10 }}>
                        <Icon name="chevron-left" size={30} color="white" onPress={() => {
                            this.props.navigation.goBack();
                        }} />
                    </View>
                    <View style={{ width: width / 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, padding: 5, color: 'white' }}>隱私權條款</Text>
                    </View>
                    <View style={{ width: width / 3, alignItems: 'flex-end', padding: 10 }}>
                        {/* <Icon name="chevron-right" size={30} color="white" onPress={() => {
                            this.login();
                            //this.props.navigation.navigate('NavigationList');
                        }} /> */}
                    </View>
                </View>
                <ScrollView style={{flex: 1, backgroundColor: 'black'}}>
                    <Text style={styles.h2}>使用者隱私權同意書:</Text>
                    <Text style={styles.h3}>非常歡迎您使用"校園小霸王"應用程式，為了讓您能夠安心使用本應用程式的各項服務與資訊，特此向您說明我們的隱私權保護政策，以保障您的權益，請您詳閱下列內容：</Text>

                    <Text style={styles.h1}>隱私權保護政策的適用範圍</Text>
                    <Text style={styles.h3}>隱私權保護政策內容，包括本公司如何處理在您使用程式中任何服務時收集到的個人識別資料。隱私權保護政策不適用於本程式以外的相關連結，也不適用於非本程式所委託或參與管理的人員。</Text>

                    <Text style={styles.h2}>一、個人資料的蒐集、處理及利用方式</Text>
                    <Text style={styles.h3}>當您造訪本程式或使用本程式所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您的同意，本公司不會將個人資料用於其他用途。</Text>
                    <Text style={styles.h3}>本程式在您使用服務信箱、問卷調查等互動性功能時，會保留包括但不限於您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。</Text>
                    <Text style={styles.h3}>於一般使用時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進服務的參考依據，此記錄為內部應用，不對外公佈。</Text>
                    <Text style={styles.h3}>為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。</Text>

                    <Text style={styles.h2}>二、資料之保護</Text>
                    <Text style={styles.h3}>本網站主機有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。</Text>
                    <Text style={styles.h3}>如因業務需要有必要委託其他單位提供服務時，本公司亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。</Text>

                    <Text style={styles.h2}>三、程式對外的相關連結</Text>
                    <Text style={styles.h3}>本程式提供其他的網路連結，您也可經由本程式內的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。</Text>

                    <Text style={styles.h2}>四、與第三人共用個人資料之政策</Text>
                    <Text style={styles.h3}>本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。</Text>
                    <Text style={styles.h3}>前項但書之情形包括但不限於：</Text>
                    <Text style={styles.h3}>經由您同意。</Text>
                    <Text style={styles.h3}>法律明文規定。</Text>
                    <Text style={styles.h3}>為免除您生命、身體、自由或財產上之危險。</Text>
                    <Text style={styles.h3}>與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集著依其揭露方式無從識別特定之當事人。</Text>
                    <Text style={styles.h3}>當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。</Text>
                    <Text style={styles.h3}>有利於您的權益。</Text>
                    <Text style={styles.h3}>本公司委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。</Text>

                    <Text style={styles.h2}>五、Cookie之使用</Text>
                    <Text style={styles.h3}>為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導致某些功能無法正常執行 。</Text>

                    <Text style={styles.h2}>六、隱私權保護政策之修正</Text>
                    <Text style={styles.h3}>本程式隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。</Text>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
        padding: 10,
        color: 'white',
    },
    h2: {
        fontSize: 18,
        padding: 10,
        color: 'white',
    },
    h3: {
        fontSize: 14,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 5,
        color: 'white',
    }
});