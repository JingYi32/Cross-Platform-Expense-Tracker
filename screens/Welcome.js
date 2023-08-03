import React from 'react'
import {StyleSheet,Text,View,StatusBar, Image,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


function Welcome (props){

    const navigation = useNavigation();

    return(
        <View style={{flex:1,flexDirection:'column'}} >
            <StatusBar translucent={true} />

            <View  style={{flex:1, backgroundColor:'#f5f6fa'}} >

                {/* Top Section */}
                <View style={{flex:2,justifyContent:'center',alignItems:'center'}} >
                   <Image resizeMode='contain' style={{width:600, height: 800}} source={require('../assets/images/WelcomePage.png')} />
                </View>

                {/* Button and text section */}
                <View style={{flex:1,justifyContent:'center',paddingHorizontal:wp('5%')}} >
                    <View style={{position:'relative',justifyContent:'center',flexDirection:'column',height:hp('25%'),borderRadius:15,paddingHorizontal:wp('5%')}} >
                        <Text style={{fontSize:35,color:'black', fontWeight:'bold'}} >Welcome!</Text>
                        <Text style={{fontSize:17,marginTop:10,color:'black'}} >Log in with your data that you entered during the registration.</Text>
                        
                        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.buttonlogin} >
                            <Text style={{fontSize:20,color:'#f5f6fa', fontWeight: 'bold'}} > Log In </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={[styles.buttonlogin, {marginTop: 5, backgroundColor: '#f5f6fa', borderColor: 'rgba(66,95,235,255)', borderWidth: 1}]} >
                            <Text style={{fontSize:20,color:'rgba(66,95,235,255)', fontWeight: 'bold'}} > Sign Up </Text>
                        </TouchableOpacity>

                    </View>

                </View>    

            </View>
        </View>
    );

}

export default Welcome;

const styles = StyleSheet.create({
    buttonlogin: {
        position:'relative',
        width:'100%',
        backgroundColor:'rgba(66,95,235,255)',
        height:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 30,
    }
})