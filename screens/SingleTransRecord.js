import React, { useState, useEffect } from 'react';
import {Text, View, StatusBar, Image, Alert, Appearance} from 'react-native';
import APII from '../assets/api/api-confl';
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import { NativeBaseProvider, VStack, FormControl, AlertDialog, Button } from "native-base";
import apiClient from '../assets/api/client';


const getOneTransRecord = async(wallet_id) => {
  try {
    const response = await apiClient.get(`/getOneTransRecord/${(wallet_id)}`);
    if (response.data.success) {
      return response.data.transrecord;
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

    const [Wallet, setAllWallet] = useState([]);
    const [transname, settransname] = useState(null);
    const [transDate, setDate] = useState('');
    const [ledger, setLedger] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [category, setCategory] = useState(null);
    const [price, setPrice] = useState(0.00);
    const [collection, setCollection] = useState(null);
    const [remark, setRemark] = useState(null);
    const [platform, setPlatform] = useState(null);
    const [venue, setVenue] = useState(null);
    const [orderid, setOrderid] = useState(null);
    const [method, setMethod] = useState(null);
    const [personPaid, setPersonPaid] = useState(null);
    const [memberJoin, setMemberJoin] = useState([]);
    const [amountPaid, setAmountPaid] = useState(0.00);

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const deleteRecord = async() => {

        const recorddetail = {
            trans_id,
        };
        console.log(trans_id);

        fetch(APII.API + "/deleterecord", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recorddetail),
        })

        onClose();
    }



    const showWallets = async () => {
        const responce = await getOneTransRecord(trans_id);
        settransname(responce[0]['transname']);
        setDate(responce[0]['date']);
        setLedger(responce[0]['ledger_name']);
        setWallet(responce[0]['wallet_name']);
        setCategory(responce[0]['category_name']);
        setPrice(responce[0]['price']);
        setCollection(responce[0]['collection_name']);
        setRemark(responce[0]['remark']);
        setPlatform(responce[0]['platform']);
        setVenue(responce[0]['venue']);
        setOrderid(responce[0]['orderid']);
        setMethod(responce[0]['method']);
        setPersonPaid(responce[0]['personPaid_id']);
        setAmountPaid(responce[0]['amountPaid']);
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
                        <Text style={{fontSize:17,color:'white'}}>
                            RM {price}
                        </Text>
                    </View>
                    {/* #f5f6fa' */}
                    <View style={{flex:4,flexDirection:'column',justifyContent:'flex-start',alignItems:'center', backgroundColor:'#f5f6fa'}}>
                        <VStack width={'300'} mt='10'>

                            <FormControl mb='5'>

                                <FormControl.Label _text={{bold: true}}> Date: {transDate} </FormControl.Label>
                                
                            </FormControl>

                            <FormControl mb='5'>

                                <FormControl.Label _text={{bold: true}}> Ledger: {ledger} </FormControl.Label>
                                
                            </FormControl>

                            <FormControl mb='5'>

                                <FormControl.Label _text={{bold: true}}> Category: {category != null ? category : "null"} </FormControl.Label>
                                
                            </FormControl>

                            <FormControl mb='5'>

                                <FormControl.Label _text={{bold: true}}> Collection: {collection != null ? collection : "null"} </FormControl.Label>
                                
                            </FormControl>

                            <FormControl mb='5'>

                                <FormControl.Label _text={{bold: true}}> Platform: {platform != null ? platform : "null"} </FormControl.Label>
                                
                            </FormControl>

                            <FormControl mb='5'>

                                <FormControl.Label _text={{bold: true}}> Venue: {venue != null ? venue : "null"} </FormControl.Label>
                                
                            </FormControl>

                            <FormControl mb='5'>

                                <FormControl.Label _text={{bold: true}}> Order ID:{orderid != null ? orderid : "null"} </FormControl.Label>
                                
                            </FormControl>

                            <FormControl mb='5'>

                                <FormControl.Label _text={{bold: true}}> Method: {method} </FormControl.Label>
                                
                            </FormControl>

                            <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
                                Delete
                            </Button>
                            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                                <AlertDialog.Content>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header>Delete Customer</AlertDialog.Header>
                                <AlertDialog.Body>
                                    This will remove all data relating to Alex. This action cannot be
                                    reversed. Deleted data can not be recovered.
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button.Group space={2}>
                                    <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="danger" onPress={deleteRecord}>
                                        Delete
                                    </Button>
                                    </Button.Group>
                                </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog>
                        </VStack>
                    </View>
                </View>
            </View>
        </NativeBaseProvider>
    );
}

export default SingleTransPage;