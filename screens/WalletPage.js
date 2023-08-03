import React, { useEffect, useState } from 'react';
import { Text, View, Appearance , RefreshControl, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, Alert} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Button, Modal, FormControl, Input, Icon, IconButton, NativeBaseProvider, AlertDialog } from "native-base";
import APII from '../assets/api/api-confl';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

function Wallet() {

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

    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('wallet');
    const [allWallet, setAllWallet] = useState([]);
    const [selectWallet, setSelectWallet] = useState([]);

    const selectMoreWallet = (item, index) => {
        const newData = allWallet.map(newItem => {
            if (newItem.id == item.id) {
                return {
                    ...newItem, 
                    selected: true
                }
            }
            return {
                ...newItem,
                selected: false
            }
        })
        setAllWallet(newData);
    }

    const icons = [{
        name: 'cash',
        bg: 'amber.600'
      }, {
        name: 'cellphone',
        bg: 'emerald.600'
      }, {
        name: 'bank',
        bg: 'blue.600'
      }];

    const showWallets = async () => {
        const allWallets = await APII.getAllWAWallets(user_id);
        setAllWallet(allWallets);
        setRefreshing(false);
    }

    useEffect(() => {
        showWallets();
    }, [])

    const onSubmitHandler = () => {
        setShowModal(false)
        const walletdetail = {
            name,
            icon,
            user_id,
        };
        fetch(APII.API + '/createWallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(walletdetail),
        })
        .catch(err => {
            console.log(err);
        });
    };

    const showpa = () => {
        const listSelected = allWallet.filter(item => item.selected == true);
        let contentAlert = '';
        listSelected.forEach(item => {
            contentAlert = contentAlert + item.wallet_name + '\n';
        })
        Alert.alert(contentAlert);
    }

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity> 
                <View style={{flexDirection:'row',height:hp('8%'),width:'100%',backgroundColor:'rgba(66,95,235,255)',borderRadius:15,justifyContent:'space-between',paddingRight:10,marginBottom:10}} >

                    <View style={{flexDirection:'row',alignItems:'center'}} >

                        <MaterialCommunityIcons style={{marginLeft: 20}} name={item.icon_url} size={30} color='white' />

                        <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                            <Text style={{marginLeft:20, fontWeight: '500',color: 'white',fontSize:20}} >{item.wallet_name}</Text>
                        </View>

                    </View>

                    <View style={{flexDirection:'column',alignContent:'center',justifyContent:'center'}} >
                        {/* price */}
                        <Text style={{fontWeight: '500',fontSize:14,color: 'white'}} >RM {item.Total_Amount}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    return (

        <NativeBaseProvider>
          
            <View style={{flex:1, backgroundColor: isLightMode ? '#f5f6fa' : '#21222d', marginBottom:50}}>

                <StatusBar barStyle={isLightMode ? 'dark-content' : 'light-content'} translucent={true} backgroundColor='transparent' />
                <View style={{flexDirection:'column',marginTop:('10%'),paddingHorizontal:'5%'}} >

                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >

                        <View style={{flexDirection:'column'}} >
                            <Text style={{fontSize:30, fontWeight:'bold', color : 'rgba(66,95,235,255)'}} >Wallets</Text>
                        </View>

                        <TouchableOpacity onPress={() => setShowModal(true)}> 
                            <View style={{flexDirection:'row'}} >
                                <Ionicons name="add-circle-sharp" size={24} color='rgba(66,95,235,255)' />
                            </View>
                        </TouchableOpacity> 

                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Create New Wallet</Modal.Header>
                            <Modal.Body>
                                <FormControl isRequired>
                                    <FormControl.Label>Wallet Name</FormControl.Label>
                                    <Input onChangeText={setName}
                                        InputLeftElement = {
                                            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}> 
                                                <Icon as={<MaterialCommunityIcons name={icon} />}size={5} ml="2" color="muted.400" />
                                            </TouchableOpacity>
                                        } />
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setShowModal(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button  onPress={onSubmitHandler}>
                                    Save
                                </Button>
                                </Button.Group>
                            </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                            <AlertDialog.Content>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header>Select Icon</AlertDialog.Header>
                            <AlertDialog.Body>
                                <FlatList numColumns={4} m={'-8px'} data={icons} renderItem={({
                                  item
                                }) => {
                                  return <IconButton m={'8px'} borderRadius="full" bg={item.bg} onPress={setIcon(item.name)} variant="solid" p="3" icon={<Icon color="white" name={item.name} as={MaterialCommunityIcons} size="sm" />} />;
                                }} />
                            </AlertDialog.Body>
                            </AlertDialog.Content>
                        </AlertDialog>
                    </View>

                    <View style={{flexDirection:'column',marginTop:10, marginBottom:70}} >
                        {refreshing ? <ActivityIndicator /> : null}
                        <FlatList
                            keyExtractor={(item)=>item.wallet_id}
                            data={allWallet}
                            enableEmptySections={true}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={showWallets} />
                            }
                            renderItem={renderItem}
                        />

                    </View>
                </View>
                
            </View>
        </NativeBaseProvider>

    );
}

export default Wallet;