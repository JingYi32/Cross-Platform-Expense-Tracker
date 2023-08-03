import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, StatusBar, Appearance, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import API from '../assets/api/api-confl';

function Dashboard (){

    const navigation = useNavigation();
    const route = useRoute();
    const [user_id, setUser_id] = useState(route.params.user_id);
    const [refreshing, setRefreshing] = useState(true);

    // Display Mode Settings
    const colorScheme = Appearance.getColorScheme();
    const [isLightMode, setColorMode] = useState(true);
    if (colorScheme === 'dark') {
        setColorMode(false);
    }
    const [allTran, setAllWallet] = useState([]);
    const [TotalAmount, setTotalAmount] = useState(0.00);
    const [Available_Amount, setAvailable_Amount] = useState(0.00);
    const showWallets = async () => {
        const allTrans = await API.getAllWATransRecords(user_id);
        allTrans['Available_Amount'];
        setAllWallet(allTrans);
        const displayAmount = await API.getTotalAmount(user_id);
        setTotalAmount(displayAmount[0]['Total_Amount'])
        setAvailable_Amount(displayAmount[0]['Available_Amount']);
        setRefreshing(false);
    }

    useEffect(() => {
        showWallets();
    }, [])

    return (
        <View style={{flex:1, backgroundColor: isLightMode ? '#f5f6fa' : '#21222d'}} >

            <View style={{flexDirection:'column',flex:1, backgroundColor: isLightMode ? '#f5f6fa' : '#21222d', marginBottom: 50, paddingHorizontal:'2%' }} >
                
                {/* Statusbar */}
                <StatusBar barStyle='light-content' translucent={true} backgroundColor='transparent' />

                {/* Header section */}
                <View style={{flexDirection:'column'}} >
                    <View style={{flexDirection:'column',marginTop:40}} >
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >

                            <View style={{flexDirection:'column',alignItems:'center', justifyContent:'center'}} >
                                <Text style={{color:'rgba(66,95,235,255)',fontSize:15, fontWeight: '500'}} >Your Balance</Text>
                            </View>

                            <View style={{flexDirection:'row',alignItems:'center'}} >
                                <TouchableOpacity>
                                    <Ionicons name="notifications" size={24} color='rgba(66,95,235,255)' />   
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>navigation.navigate('Auth')}>                         
                                <Image source={require('../assets/images/avatar.jpg')} resizeMode='cover' style={{width:40,height:40,borderRadius:20,marginLeft:15}} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        
                        {/* amount  */}
                        <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between',alignItems:'center'}} >
                                {/* Amount */}
                                <View style={{flexDirection:'column'}} >
                                    <Text style={{color:'rgba(66,95,235,255)',fontSize:28, fontWeight: 'bold'}} >RM {TotalAmount}</Text>
                                    <Text style={{color:'rgba(66,95,235,255)',fontSize:15, fontWeight: 'bold'}} >Available Amount: RM {Available_Amount}</Text>
                                </View>          
                        </View>
                    </View>
                </View>
                

                <View style={{flexDirection:'row',backgroundColor:'rgba(66,95,235,255)',height:hp('13%'),width:'100%',alignItems:'center',justifyContent:'space-around',borderRadius:10,shadowColor:'#000',shadowRadius:10, marginTop: 10}} >

                    <TouchableOpacity onPress={()=>navigation.navigate('Form', {user_id: user_id, cashflow: 'In'})} style={{flexDirection:'column',alignItems:'center'}} >
                        <Image style={{height:50,width:50}} source={require('../assets/icons/cash-in.png')} />
                        <Text style={{fontSize:15, color:'white', marginTop:6}} >Cash In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigation.navigate('Form', {user_id: user_id, cashflow: 'Out'})} style={{flexDirection:'column',alignItems:'center'}} >
                        <Image style={{height:50,width:50}} source={require('../assets/icons/cash-out.png')} />
                        <Text style={{fontSize:15,color:'white', marginTop:6}} >Cash Out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigation.navigate('Form', {user_id: user_id, cashflow: 'Transfer'})} style={{flexDirection:'column',alignItems:'center'}} >
                        <Image style={{height:50,width:50}} source={require('../assets/icons/transfer.png')} />
                        <Text style={{fontSize:15,color:'white', marginTop:6}} >Transfer</Text>
                    </TouchableOpacity>

                </View>
            


                <View style={{flex:1,flexDirection:'column',marginTop:15, marginBottom:40}} >
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:18,color:'rgba(66,95,235,255)', marginBottom:10, fontWeight: 'Bold'}} >Recent Transactions</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('TransactionRecord', {user_id: user_id})}>
                        <Text style={{color:'rgba(66,95,235,255)',fontSize:13, fontWeight: '500'}} >See All</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor:'rgba(66,95,235,255)', paddingHorizontal:'2%', paddingTop : '2%',paddingEnd:'2%',borderRadius:15}} >
                        {refreshing ? <ActivityIndicator /> : null}
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

        </View>
            
    );
}

const styles = StyleSheet.create({
    
});

export default Dashboard;

