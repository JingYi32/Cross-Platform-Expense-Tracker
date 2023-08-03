import React, { useEffect, useState } from 'react';
import { Text, View, Appearance, Image, TouchableOpacity, StatusBar, FlatList, RefreshControl, ActivityIndicator} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Button, Modal, FormControl, Input, Icon, NativeBaseProvider, AlertDialog, IconButton } from "native-base";
import APII from '../assets/api/api-confl';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const themeColor = 'rgba(66,95,235,255)';

const icons = [
  {name: 'ambulance', bg: 'amber.600'},
  {name: 'baby', bg: 'emerald.600'},
  {name: 'birthday-cake', bg: 'blue.600'},
  {name: 'bus-alt', bg: 'orange.600'},
  {name: 'business-time', bg: 'rose.600'},
  {name: 'hamburger', bg: 'violet.600'},
  {name: 'piggy-bank', bg: 'lime.600'},
  {name: 'shopping-basket', bg: 'indigo.600'},
  {name: 'toolbox', bg: 'pink.600'},
  {name: 'paw', bg: 'coolGray.600'},
  {name: 'cat', bg: 'darkBlue.600'},
  {name: 'credit-card', bg: 'fuchsia.600'},
  {name: 'faucet', bg: 'amber.500'},
  {name: 'fly', bg: 'violet.800'},
  {name: 'gamepad', bg: 'blue.800'},
  {name: 'gas-pump', bg: 'indigo.600'},
  {name: 'tshirt', bg: 'orange.600'},
  {name: 'home', bg: 'rose.600'},
  {name: 'plane', bg: 'emerald.600'},
  {name: 'wrench', bg: 'indigo.600'}
];


function Categories() {

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

    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [name, setName] = useState('');
    const [iconName, setIcon] = useState('toolbox');

    const [allWallet, setAllWallet] = useState([]);

    const showWallets = async () => {
        const allWallets = await APII.getAllWACategories(user_id);
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
            user_id,
            iconName
        };
        fetch(APII.API + "/createCategory", {
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
                            <Text style={{fontSize:30, fontWeight:'bold',color : themeColor}} >Categories</Text>
                        </View>

                        <TouchableOpacity onPress={() => setShowModal(true)}> 
                            <View style={{flexDirection:'row',alignItems:'center'}} >
                                <Ionicons name="add-circle-sharp" size={24} color={themeColor} />
                            </View>
                        </TouchableOpacity> 

                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Create New Category</Modal.Header>
                            <Modal.Body>
                                <FormControl isRequired>
                                    <FormControl.Label>Category Name</FormControl.Label>
                                    <Input onChangeText={setName}
                                        InputLeftElement = {
                                            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}> 
                                                <Icon as={<MaterialIcons name="category" />}size={5} ml="2" color="muted.400" />
                                            </TouchableOpacity>
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
                        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                            <AlertDialog.Content>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header>Select Icon</AlertDialog.Header>
                            <AlertDialog.Body style={{alignItems: 'center'}}>
                                <FlatList 
                                    scrollEnabled={false}
                                    numColumns={4} 
                                    m={'-8px'} 
                                    data={icons} 
                                    renderItem={({ item}) => {
                                        return <IconButton m={'8px'} borderRadius="full" bg={item.bg} onPress={setIcon(item.name)} variant="solid" p="3" icon={<Icon color="white" name={item.name} as={FontAwesome5} size="sm" />} />;}} />
                            </AlertDialog.Body>
                            </AlertDialog.Content>
                        </AlertDialog>
                    </View>

                    <View style={{flexDirection:'column',marginTop:10, marginBottom:70}} >
                      {refreshing ? <ActivityIndicator /> : null}
                        <FlatList
                            keyExtractor={(item)=>item.category_id}
                            data={allWallet}
                            enableEmptySections={true}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={showWallets} />
                            }
                            renderItem={({item})=>(
                                <TouchableOpacity> 
                                    <View style={{flexDirection:'row',height:hp('10%'),width:'100%',backgroundColor:'rgba(66,95,235,255)',borderRadius:15,justifyContent:'space-between',paddingRight:10,marginBottom:10}} >

                                        <View style={{flexDirection:'row',alignItems:'center'}} >

                                        <FontAwesome5 style={{marginLeft: 20}} name={item.icon_name} size={30} color='white' />
                                            <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                                                <Text style={{marginLeft:20, fontWeight: '500',color:'white',fontSize:20}} >{item.category_name}</Text>
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

export default Categories;