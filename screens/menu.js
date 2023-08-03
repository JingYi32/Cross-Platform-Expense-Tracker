import React, {useState} from 'react';
import { StyleSheet, StatusBar, ScrollView, View, SafeAreaView, Text, Appearance, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { NativeBaseProvider, useColorMode, Button} from "native-base";
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import apiClient from '../assets/api/client'


function Menu () {

    const navigation = useNavigation();

    const route = useRoute();
    const [user_id, setUser_id] = useState(route.params.user_id);
    const [user_name, setUser_name] = useState(route.params.user_name);

    const exporttoCSV = async () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var hh = String(today.getHours()).padStart(2, '0');
        var MM = String(today.getMinutes()).padStart(2, '0');
        var ss = String(today.getSeconds()).padStart(2, '0');
        today = yyyy+mm+dd+hh+MM+ss;
        let wb = XLSX.utils.book_new();
        //Ledgers
        const f = await apiClient.get(`/getLedgers/${(user_id)}`);
        let allLedgers = await f.data.ledgers;
        let ws2 = XLSX.utils.json_to_sheet(allLedgers);
        XLSX.utils.book_append_sheet(wb, ws2, 'Ledgers', true);

        //Wallets
        let allWallets = await (await apiClient.get(`/getWallets/${(user_id)}`)).data.wallets;
        let ws1 = XLSX.utils.json_to_sheet(allWallets);
        XLSX.utils.book_append_sheet(wb, ws1, 'Wallets', true);

        //Category
        let allCategories = await (await apiClient.get(`/getCategories/${(user_id)}`)).data.categories;
        let ws3 = XLSX.utils.json_to_sheet(allCategories);
        XLSX.utils.book_append_sheet(wb, ws3, 'Categories', true);

        //Collection
        let allCollections = await (await apiClient.get(`/getCollections/${(user_id)}`)).data.collections;
        let ws4 = XLSX.utils.json_to_sheet(allCollections);
        XLSX.utils.book_append_sheet(wb, ws4, 'Collections', true);

        //Member
        let allMembers = await (await apiClient.get(`/getMembers/${(user_id)}`)).data.members;
        let ws5 = XLSX.utils.json_to_sheet(allMembers);
        XLSX.utils.book_append_sheet(wb, ws5, 'Collections', true);

        //Debt Record
        let allDebtRecords = await (await apiClient.get(`/getDebtRecords/${(user_id)}`)).data.debtrecords;
        let ws6 = XLSX.utils.json_to_sheet(allDebtRecords);
        XLSX.utils.book_append_sheet(wb, ws6, 'Debt Records', true);

        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + "BudgetAppData_" + today +".xlsx";
        FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64
        }).then(() => {
            Sharing.shareAsync(filename);
        });
    }

    // Display Mode Settings
    const [isLightMode, setColorMode] = useState(true);

    return(
        <NativeBaseProvider>
        <StatusBar barStyle='dark-content' translucent={true} backgroundColor='transparent' />

        <View style={[styles.container, {backgroundColor: isLightMode ? '#f5f6fa' : '#21222d'} ]}>

            <ScrollView>

                <View style={{ borderBottomColor: '#cccccc',backgroundColor:'rgba(66,95,235,255)', borderBottomWidth: 1, marginHorizontal: '2%',borderRadius:15}}>
                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center', marginBottom: 10, marginTop: 10}}>                         
                        <Image source={require('../assets/images/avatar.png')} resizeMode='cover' style={{width:100,height:100,borderRadius:50,marginLeft:15}} />
                        <Text style={styles.profileText}>
                            Welcome! {user_name != null ? user_name : "name"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={()=>navigation.navigate('TransactionRecord', {user_id: user_id})} style={styles.buttonBox} >

                    <Image style={{height:'140%'}} resizeMode="contain" source={require('../assets/icons/TransactionRecords.png')} />
                    
                    <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                        <Text style={styles.buttontext} >Transaction Records</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('Wallet', {user_id: user_id})} style={styles.buttonBox} >

                    <Image style={{height:'140%'}} resizeMode="contain" source={require('../assets/icons/wallets.png')} />
                    
                    <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                        <Text style={styles.buttontext} >Wallets</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('Ledgers', {user_id: user_id})} style={styles.buttonBox} >

                    <Image style={{height:'140%'}} resizeMode="contain" source={require('../assets/icons/Ledgers.png')} />
                    
                    <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                        <Text style={styles.buttontext} >Ledgers</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('Categories', {user_id: user_id})} style={styles.buttonBox} >

                    <Image style={{height:'140%'}} resizeMode="contain" source={require('../assets/icons/Categories.png')} />
                    
                    <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                        <Text style={styles.buttontext} >Categories</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('CollectionPage', {user_id: user_id})} style={styles.buttonBox}>

                    <Image style={{height:'140%'}} resizeMode="contain" source={require('../assets/icons/Tags.png')} />
                    
                    <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                        <Text style={styles.buttontext} >Collections</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('MemberPage', {user_id: user_id})} style={styles.buttonBox}>

                    <Image style={{height:'140%'}} resizeMode="contain" source={require('../assets/icons/Tags.png')} />
                    
                    <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                        <Text style={styles.buttontext} >Members</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('DebtRecord', {user_id: user_id})}  style={styles.buttonBox} >

                    <Image style={{height:'140%'}} resizeMode="contain" source={require('../assets/icons/DebtRecords.png')} />
                    
                    <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                        <Text style={styles.buttontext} >Debt Records</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonBox} onPress={exporttoCSV}>

                    <Image style={{height:'140%'}} resizeMode="contain" source={require('../assets/icons/export.png')} />
                    
                    <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                        <Text style={styles.buttontext} >Export</Text>
                    </View>

                </TouchableOpacity>

            </ScrollView>

        </View>
    </NativeBaseProvider>
    );
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 50,
        ...Platform.select({
            ios: {
                marginTop: 10,
            },
            android: {
                marginTop: 40,
            },
            default: {
                // other platforms, web for example
                marginTop: 0,
            },
        }),
    },

    profileText:{
        fontWeight:'500',
        fontSize:20,
        marginLeft:10,
        color:'white'
    },

    lightProfileText: {
        color:'black',
    },

    darkProfileText: {
        color:'black',
    },

    buttontext: {
        fontWeight:'500',
        color:'black',
        fontSize:18,
    },
    buttonBox:{
        flexDirection:'row',
        alignItems:'center', 
        marginTop: 10, 
        paddingTop: 10,
        marginBottom: 10
    }

})