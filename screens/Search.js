import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,StatusBar,TouchableOpacity,FlatList,Image,TextInput} from 'react-native'
import { NativeBaseProvider} from "native-base";
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import APII from '../assets/api/api-confl';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

function Search (props){
    const [allRecords, setAll] = useState([]);
    const [allFilRecords, setfilAll] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const [user_id, setUser_id] = React.useState(route.params.user_id);
    const [search, setSearch] = useState([""]);
    const showTrans = async () => {
        const allRecords = await APII.getAllTransRecords(user_id);
        setAll(allRecords);
        setfilAll(allRecords);
    }

    const changeflat = () => {
        
    }

    useEffect(() => {
        showTrans();
    })

    const searchFilter = (text) => {
        if(text) {
            const newData = allRecords.filter((item) => {
                const itemData = item.transname ? item.transname.toUpperCase() 
                        : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
                
            });
            setfilterRecords(newData);
            setSearch(text);
        } else {
            setfilterRecords(allRecords);
            setSearch(text);
        }
    }

    return(
        
        <View style={{flex:1,backgroundColor:'white'}}>

            <StatusBar barStyle='dark-content' translucent={true} />

            <View style={{flex:1,flexDirection:'column'}} >

                {/* search bar */}
                <View style={styles.searchBar} >
                    <View style={styles.insideSearchBar} >
                        <Ionicons name='search' color='rgba(66,95,235,255)' size={22} />
                        <TextInput style={{marginLeft: 5}} value = {search} placeholder='Search' placeholderTextColor='rgba(66,95,235,255)'/>

                    </View>
                    
                    <FlatList
                            keyExtractor={(item)=>item.trans_id}
                            data={allRecords}
                            renderItem={({item})=>(
                                <TouchableOpacity onPress={()=>navigation.navigate('SingleTransPage', {wallet_id: item.trans_id})}> 
                                    <View style={{flexDirection:'row',height:hp('7%'),width:'100%',backgroundColor:'rgba(66,95,235,255)',borderRadius:15,justifyContent:'space-between',alignItems:'center',paddingRight:10, marginBottom:10}} >

                                        <View style={{flexDirection:'column',alignItems:'flex-start'}} >

                                                <Text style={{marginLeft:20, fontWeight: '500',color: 'white',fontSize:20}} >{item.transname}</Text>

                                        </View>

                                        <View style={{flexDirection:'column',alignContent:'center',justifyContent:'center'}} >
                                            {/* price */}
                                            <Text style={{fontWeight: '500',fontSize:14,color:'white'}} >RM {item.price}</Text>
                                            <Text style={{color:'white',fontSize:12}} >{item.date}</Text>

                                        </View>

                                    </View>
                                </TouchableOpacity> 
                            )}
                        />

                </View>

            </View>
            
        </View>
    
    );
}

export default Search;

const styles = StyleSheet.create({
    searchBar : {
        marginTop: 40,
        justifyContent:'flex-start',
        backgroundColor:'white',
        paddingHorizontal:'2%'
    },
    insideSearchBar:{
        flexDirection:'row',
        borderWidth:1,
        borderColor:'rgba(66,95,235,255)',
        borderRadius:20,
        height:50,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft:20,
        marginBottom: 10
    }
})