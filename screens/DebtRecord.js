import React, { useEffect, useState } from 'react';
import { Text, View, Appearance, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import { NativeBaseProvider} from "native-base";
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import APII from '../assets/api/api-confl';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

function DebtRecord() {

    const navigation = useNavigation();
    const route = useRoute();
    const [user_id, setUser_id] = React.useState(route.params.user_id);
    const [refreshing, setRefreshing] = useState(true);

    // Display Mode Settings
    const colorScheme = Appearance.getColorScheme();
    const [isLightMode, setColorMode] = useState(true);
    if (colorScheme === 'dark') {
        setColorMode(false);
    }

    const [allRecords, setAll] = useState([]);

    const showWallets = async () => {
        const allRecords = await APII.getAllWADebtRecords(user_id);
        setAll(allRecords);
        setRefreshing(false);
    }

    useEffect(() => {
        showWallets();
    }, [])

    return (

        <NativeBaseProvider>
            <View style={{flex:1, backgroundColor: isLightMode ? 'white' : 'black'}}>

                <StatusBar barStyle={isLightMode ? 'dark-content' : 'light-content'} translucent={true} backgroundColor='transparent' />
                <View style={{flexDirection:'column',marginTop:('10%'),paddingHorizontal:'5%'}} >

                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >

                        <View style={{flexDirection:'column'}} >
                            <Text style={{fontSize:30, fontWeight:'bold', color : 'rgba(66,95,235,255)'}} >Debt Record</Text>
                        </View>

                        <TouchableOpacity onPress={()=>navigation.navigate('Form', {user_id: user_id, cashflow: 'In'})}> 
                            <View style={{flexDirection:'row'}} >
                                <Ionicons name="add-circle-sharp" size={24} color='rgba(66,95,235,255)' />
                            </View>
                        </TouchableOpacity> 

                    </View>

                    <View style={{flexDirection:'column',marginTop:10, marginBottom:70}} >
                        {refreshing ? <ActivityIndicator /> : null}
                        <FlatList
                            keyExtractor={(item)=>item.trans_id}
                            data={allRecords}
                            enableEmptySections={true}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={showWallets} />
                            }
                            renderItem={({item})=>(
                                <TouchableOpacity onPress={()=>navigation.navigate('SingleTransPage', {wallet_id: item.trans_id})}> 
                                    <View style={{flexDirection:'row',height:hp('7%'),width:'100%',backgroundColor:'rgba(66,95,235,255)',borderRadius:15,justifyContent:'space-between',alignItems:'center',paddingRight:10, marginBottom:10}} >

                                        <View style={{flexDirection:'column',alignItems:'flex-start'}} >

                                                <Text style={{marginLeft:20, fontWeight: '500',color: 'white',fontSize:13}} >{item.member_name}</Text>

                                        </View>

                                        <View style={{flexDirection:'column',alignContent:'center',justifyContent:'center'}} >
                                            {/* price */}
                                            <Text style={{fontWeight: '500',fontSize:14,color:'white'}} >RM {item.price}</Text>
                                            <Text style={{color:'white',fontSize:12}} >Status: {item.paid_status}</Text>

                                        </View>

                                    </View>
                                </TouchableOpacity> 
                            )}
                        />

                    </View>
                </View>
                
            </View>
        </NativeBaseProvider>

    );
}

export default DebtRecord;