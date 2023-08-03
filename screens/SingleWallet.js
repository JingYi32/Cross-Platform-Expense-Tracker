import React, { useState, useEffect } from 'react';
import {Text, View, StatusBar, Image, Alert, Appearance} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import { NativeBaseProvider, VStack, FormControl, Input, Button } from "native-base";
import apiClient from '../assets/api/client';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const showAlert = (message) =>
    Alert.alert(
        "Login",
        message,
        [
            {
                text: "Okay",
                style: "default",
            },
        ],
        {
            cancelable: true,
            onDismiss: () => Alert.alert(message),
        }
);

const getOneWallet = async(wallet_id) => {
  try {
    const response = await apiClient.get(`/getOneWallet/${(wallet_id)}`);
    if (response.data.success) {
      return response.data.wallet;
    }
  } 
  catch (error) {
    console.log('Error while getting all wallets.', error.message);
    return [];
  }
}

function SingleTransPage(){

    const navigation = useNavigation();
    const route = useRoute();
    const [trans_id, setTrans_id] = useState(route.params.wallet_id);

    // Display Mode Settings
    const colorScheme = Appearance.getColorScheme();
    const [isLightMode, setColorMode] = useState(true);
    if (colorScheme === 'dark') {
        setColorMode(false);
    }

    const [name, setName] = useState();
    const [icon_name, setIconName] = useState();

    const showWallets = async () => {
        const responce = await getOneWallet(trans_id);

    }

    useEffect(() => {
        showWallets();
    }, [])

    return(
        <NativeBaseProvider>
            <View style={{flex:1,flexDirection:'column'}} >

                <StatusBar barstyle="light-content" translucent={true} backgroundColor="transparent" />

                <View style={{flex:1, backgroundColor:'white'}} >

                    <View style={{flex:2,flexDirection:'column',backgroundColor:'rgba(66,95,205,255)', justifyContent:'center',alignItems:'flex-start', paddingHorizontal:'7%', borderBottomStartRadius:30}} >
                        <Text style={{fontSize:35,color:'#f5f6fa', fontWeight:'bold'}}>
                            {transname}
                        </Text>
                        <Text style={{fontSize:17,color:'black'}}>
                            RM {price}
                        </Text>
                    </View>
                    {/* #f5f6fa' */}
                    <View style={{flex:4,flexDirection:'column',justifyContent:'flex-start',alignItems:'center', backgroundColor:'#f5f6fa'}}>

                        <FlatList
                            keyExtractor={(item)=>item.trans_id}
                            data={allTran}
                            enableEmptySections={true}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={showWallets} />
                            }
                            renderItem={({item})=>(
                                <TouchableOpacity onPress={()=>navigation.navigate('SingleTransPage', {wallet_id: item.trans_id})}> 
                                    <View style={{flexDirection:'row',height:hp('8%'),width:'100%',backgroundColor:isLightMode ? '#f5f6fa' : '#21222d',borderWidth:1,borderColor:'#ddd',borderRadius:15,justifyContent:'space-between',paddingRight:10,marginBottom:10}} >
                                        
                                        <View style={{flexDirection:'row',alignItems:'center'}} >

                                            <FontAwesome5 style={{marginLeft: 10}} name="toolbox" size={30} color='rgba(66,95,235,255)' />
                                            
                                            <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                                                
                                                <Text style={{marginLeft:20, fontWeight: '500',color:isLightMode ? '#21222d' : '#21222d',fontSize:18}} >{item.transname}</Text>
                                                
                                            </View>
                                        </View>

                                        <View style={{flexDirection:'column',alignContent:'center',justifyContent:'center'}} >
                                            
                                            <Text style={{fontWeight: '500',fontSize:14,color:isLightMode ? '#21222d' : '#21222d'}} >RM {item.price}</Text>

                                            <View style={{alignItems:'flex-end',justifyContent:'center'}} >
                                                <Text style={{color:isLightMode ? '#21222d' : '#21222d' ,fontWeight: 'Bold',fontSize:12}} >{item.date}</Text>
                                            </View>
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

export default SingleTransPage;