import React, { useEffect, useState } from 'react';
import { Text, View, Appearance, Image, TouchableOpacity, StatusBar, FlatList, RefreshControl, ActivityIndicator} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { Button, Modal, FormControl, Input, Icon, NativeBaseProvider } from "native-base";
import APII from '../assets/api/api-confl';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const themeColor = 'rgba(66,95,235,255)';

function CollectionPage() {
    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefreshing] = useState(true);
    const [user_id, setUser_id] = React.useState(route.params.user_id);

    // Display Mode Settings
    const colorScheme = Appearance.getColorScheme();
    const [isLightMode, setColorMode] = useState(true);
    if (colorScheme === 'dark') {
        setColorMode(false);
    }

    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [name, setName] = useState('');
    const [allWallet, setAllWallet] = useState([]);

    const showWallets = async () => {
        const allWallets = await APII.getAllWACollections(user_id);
        setAllWallet(allWallets);
        setRefreshing(false);
    }

    useEffect(() => {
        showWallets();
    }, [])

    const onSubmitHandler = () => {
        setShowModal(false)
        const detail = {
            name,
            user_id
        };
        fetch(APII.API + "/createCollection", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(detail),
        })
        .catch(err => {
            console.log(err);
        });
    };
    return (

        <NativeBaseProvider>
            <View style={{flex:1, backgroundColor: isLightMode ? '#f5f6fa' : '#21222d', marginBottom:50}}>

                <StatusBar barStyle={isLightMode ? 'dark-content' : 'light-content'} translucent={true} backgroundColor='transparent' />
                <View style={{flexDirection:'column',marginTop:('10%'),paddingHorizontal:'5%'}} >

                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >

                        <View style={{flexDirection:'column'}} >
                            <Text style={{fontSize:30, fontWeight:'bold',color : themeColor}} >Collections</Text>
                        </View>

                        <TouchableOpacity onPress={() => setShowModal(true)}> 
                            <View style={{flexDirection:'row',alignItems:'center'}} >
                                <Ionicons name="add-circle-sharp" size={24} color={themeColor} />
                            </View>
                        </TouchableOpacity> 

                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Create New Ledger</Modal.Header>
                            <Modal.Body>
                                <FormControl isRequired>
                                    <FormControl.Label>Ledgers Name</FormControl.Label>
                                    <Input onChangeText={setName}
                                        InputLeftElement = {
                                            <Icon as={<Entypo name="wallet" />}size={5} ml="2" color="muted.400" />
                                        } />
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {setShowModal(false);}}>
                                        Cancel
                                    </Button>
                                    <Button  onPress={onSubmitHandler}>
                                        Save
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </View>

                    <View style={{flexDirection:'column',marginTop:10, marginBottom:70}} >
                        {refreshing ? <ActivityIndicator /> : null}
                        <FlatList
                            keyExtractor={(item)=>item.id}
                            data={allWallet}
                            enableEmptySections={true}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={showWallets} />
                            }
                            renderItem={({item})=>(
                                <TouchableOpacity> 
                                    <View style={{flexDirection:'row',height:hp('10%'),width:'100%',backgroundColor:'rgba(66,95,235,255)',borderRadius:15,justifyContent:'space-between',paddingRight:10,marginBottom:10}} >

                                        <View style={{flexDirection:'row',alignItems:'center'}} >

                                            <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                                                <Text style={{marginLeft:20, fontWeight: '500',color:'white',fontSize:20}} >{item.collection_name}</Text>
                                            </View>

                                        </View>

                                        <View style={{flexDirection:'column',alignContent:'center',justifyContent:'center'}} >
                                            {/* price */}
                                            <Text style={{fontWeight: '500',fontSize:14,color:'white'}} >RM {item.Total_Amount}</Text>

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

export default CollectionPage;