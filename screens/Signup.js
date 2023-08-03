import React, { useState } from 'react';
import {Text, View, StatusBar, Alert} from 'react-native';
import APII from '../assets/api/api-confl';
import { useNavigation } from '@react-navigation/native'
import { NativeBaseProvider, VStack, FormControl, Input, Button} from "native-base";

function Signup(props){

    const showAlert = (message) =>
        Alert.alert(
            "Signup",
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
    
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const onLoggedIn = token => {
        fetch(APII.API + '/private', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onSubmitHandler = () => {
        console.log("hi");
        const payload = {
            email,
            name,
            password,
        };
        fetch(APII.API + '/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status != 200) {
                    setIsError(true);
                    showAlert(jsonRes.message);
                } else {
                    onLoggedIn(jsonRes.token);
                    setIsError(false);
                    showAlert(jsonRes.message);
                    navigation.navigate('Home', {user: jsonRes.user});
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return(
        <NativeBaseProvider>
        <View style={{flex:1,flexDirection:'column'}} >

            <StatusBar barstyle="light-content" translucent={true} backgroundColor="transparent" />

                <View style={{flex:1, backgroundColor:'white'}} >

                    <View style={{flex:2,flexDirection:'column',justifyContent:'center',alignItems:'flex-start', marginHorizontal:'7%', borderBottomRightRadius:15}} >
                        <Text style={{fontSize:35,color:'rgba(66,95,205,255)', fontWeight:'bold'}}>
                            New Account
                        </Text>
                        <Text style={{fontSize:17,color:'black'}}>
                            Sign up and get started
                        </Text>
                    </View>

                    <View style={{flex:4,flexDirection:'column',justifyContent:'flex-start',alignItems:'center', backgroundColor:'#f5f6fa'}}>
                        <VStack width={'300'} mt='10'>

                            <FormControl isRequired mb='5'>

                                <FormControl.Label _text={{bold: true}}> Email </FormControl.Label>
                                <Input placeholder="Enter Email" autoCapitalize="none" onChangeText={setEmail}/>
                                
                            </FormControl>

                            <FormControl mb='5'>

                                <FormControl.Label _text={{bold: true}}> Name </FormControl.Label>
                                <Input placeholder="Enter Name" autoCapitalize="none" onChangeText={setName}/>
                                
                            </FormControl>

                            <FormControl isRequired mb='5'>

                                <FormControl.Label _text={{bold: true}}> Password </FormControl.Label>
                                <Input placeholder="Enter Email" secureTextEntry={true} autoCapitalize="none" onChangeText={setPassword}/>
                                
                            </FormControl>

                            <Button _text={{bold: true}} backgroundColor={'rgba(66,95,235,255)'} onPress={onSubmitHandler}> Sign Up </Button>

                        </VStack>

                    </View>


                </View>

            </View>
        </NativeBaseProvider>
    );
}

export default Signup;