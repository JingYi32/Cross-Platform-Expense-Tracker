import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Alert} from 'react-native';
import { HStack, Icon, VStack,TextArea, FormControl,useColorModeValue, Container, Box, Button, Checkbox, Input, ScrollView, NativeBaseProvider, Center, WarningOutlineIcon } from 'native-base';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { Ionicons } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import APII from '../assets/api/api-confl';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const showAlert = (message) =>
    Alert.alert(
        "Create Transaction Record",
        message,
        [
            {
                text: "Close",
                style: "default",
            },
        ],
        {
            cancelable: true,
            onDismiss: () => Alert.alert(message),
        }
);

function RecordForm(){

    const navigation = useNavigation();
    const route = useRoute();

    // Declare Variables
    const [user_id, setUser_id] = useState(route.params.user_id);
    const [transname, setData] = useState(null);
    const [transDate, setDate] = useState(new Date());
    const [ledger, setLedger] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [cashflow, setCashflow] = useState(route.params.cashflow);
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [price, setPrice] = useState(0.00);
    const [collection, setCollection] = useState(null);
    const [remark, setRemark] = useState(null);
    const [platform, setPlatform] = useState(null);
    const [venue, setVenue] = useState(null);
    const [orderid, setOrderid] = useState(null);
    const [method, setMethod] = useState("Individual");
    const [personPaid, setPersonPaid] = useState(null);
    const [memberJoin, setMemberJoin] = useState([]);
    const [amountPaid, setAmountPaid] = useState(0.00);
    const [showDate, setShow] = useState(false);

    const [Error_transname, setErrorData] = useState(null);
    const [Error_ledger, setErrorLedger] = useState(null);
    const [Error_wallet, setErrorWallet] = useState(null);
    const [Error_toWallet, setErrorToWallet] = useState(null);
    const [Error_FromWallet, setErrorFromWallet] = useState(null);
    const [Error_price, setErrorPrice] = useState(null);

    const [isError_transname, setIsErrorData] = useState(false);
    const [isError_ledger, setIsErrorLedger] = useState(false);
    const [isError_wallet, setIsErrorWallet] = useState(false);
    const [isError_toWallet, setIsErrorToWallet] = useState(false);
    const [isError_fromWallet, setIsErrorFromWallet] = useState(false);
    const [isError_price, setIsErrorPrice] = useState(false);

    const [isAdvanced, setIsAdvanced] = useState(false);
    const [isGrouping, setIsGrouping] = useState(false);
    const [isCashIn, setCashIn] = useState(true);
    const [isCashOut, setCashOut] = useState(false);
    const [isTransfer, setTransfer] = useState(false);

    const [ledgerList, setledgerList] = useState([]);
    const [walletList, setwalletList ] = useState([]);
    const [categoryList, setcategoryList ] = useState([]);
    const [collectionList, setcollectionList] = useState([]);
    const [memberList, setmemberList ] = useState([]);

    const showTransfer = () => {
        setCashflow('Transfer');
        setTransfer(true);
        setCashIn(false);
        setCashOut(false);
        console.log(cashflow);
    }

    const showCashIn = () => {
        setCashflow('In');
        setCashIn(true);
        setCashOut(false);
        setTransfer(false);
        console.log(cashflow);
    }

    const showCashOut = () => {
        setCashflow('Out');
        setCashIn(false);
        setCashOut(true);
        setTransfer(false);
        console.log(cashflow);
    }

    const updateMethodString = () => {
        if (method === '1') {
            setIsGrouping(false);
        } else if (method === '2') {
            setIsGrouping(true);
        }
    }

    const methodData = [
        {key:'1', value:'Individual'},
        {key:'2', value:'Grouping'},
    ]


    // Display Mode Settings
    const text = useColorModeValue("#21222d", "#f5f6fa");
    const bg = useColorModeValue("#f5f6fa", "#21222d");

    const SyncData = async () => {
        
        //Load Wallet List
        const allWallet = await APII.getAllWallets(user_id);
        let newarray1 = allWallet.map((item) => {
            return {key: item.wallet_id, value: item.wallet_name};
        })
        setwalletList(newarray1);

        //Load Ledger List
        const allLedger = await APII.getAllLedgers(user_id);
        let newarray2 = allLedger.map((item) => {
            return {key: item.ledger_id, value: item.ledger_name};
        })
        setledgerList(newarray2);

        //Load Collection List
        const allCollection = await APII.getAllCollections(user_id);
        let newarray3 = allCollection.map((item) => {
            return {key: item.collection_id, value: item.collection_name};
        })
        setcollectionList(newarray3);

        //Load Category List
        const allCategory = await APII.getAllCategories(user_id);
        let newarray4 = allCategory.map((item) => {
            return {key: item.category_id, value: item.category_name};
        })
        setcategoryList(newarray4);

        //Load Member List
        const allMember = await APII.getAllMembers(user_id);
        let newarray5 = allMember.map((item) => {
            return {key: item.member_id, value: item.member_name};
        })
        setmemberList(newarray5);
    };

    useEffect(() => {
        SyncData();
    }, [])
    

    const validateData = async () => {
        if (transname == null){
            setErrorData('This field cannot be blank!');
            setIsErrorData(true);
        } else {
            if (transname.length > 3 && transname.length <= 100) {
                setErrorData(null);
                setIsErrorData(false);
            } else if (transname.length > 3) {
                setErrorData('Name should contain at least 3 characters');
                setIsErrorData(true);
            } else if (transname.length < 100) {
                setErrorData('Name should contain less than or eqaul to 100 characters');
                setIsErrorData(true);
            }
        }

        if (ledger == null) {
            setErrorLedger('Please make a selection!');
            setIsErrorLedger(true);
        } else {
            setErrorLedger(null);
            setIsErrorLedger(false);
        }

        if (wallet == null) {
            setErrorWallet('Please make a selection!');
            setIsErrorWallet(true);
        } else {
            setErrorWallet(null);
            setIsErrorWallet(false);
        }

        if (price == 0.00){
            setErrorPrice('Please enter an amount!')
            setIsErrorPrice(true);
        } else{
            setErrorPrice(null)
            setIsErrorPrice(false);
        }
        await onSubmitHandler();
    }

    const furtherAction = async () => {
        const das = price
        const newprice = das * -1;

        if (personPaid != user_id && personPaid != null){
            setPrice(0);
            setAmountPaid(das);
        } 
        if (cashflow == 'Out') {
            if(price > 0) {
                setPrice(newprice);
                setAmountPaid(newprice);
            }
        }

        if (memberJoin.length > 0) {
            setAmountPaid(newprice/memberJoin.length);
        }
    }

    // Handlers
    const onSubmitHandler = async () => {
        if (isError_transname || isError_ledger || isError_price) {
            showAlert("Error 1 Show.");
        } else if (isError_wallet && (isCashIn || isCashOut)) {
            showAlert("Error 2 Show.");
        } else if(isTransfer){
            setData("" + transname);
        } else {
            const recorddetail = {
                user_id, transname, cashflow, wallet, ledger, price, transDate, category, subCategory, 
                collection, remark, platform, venue, orderid, method, personPaid, amountPaid, memberJoin,
            };
            console.log(recorddetail);
            fetch(APII.API+"/createTransRecord", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recorddetail),
            })
            .then(async res => { 
                try {
                    const jsonRes = await res.json();
                    if (res.status !== 200) {
                        showAlert(jsonRes.message);
                    } else {
                        showAlert(jsonRes.message);
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
        };

    };

    // Toggle Advanced Display Mode
    const showMode = () => {
        setShow(true);
    }

    // Toggle Date Display Mode
    const selectDateHandler = (event, selectedDate) =>{
        console.log(selectedDate);
        setShow(false);
        setDate(selectedDate);
    }

    // Screen Settings
    return  <NativeBaseProvider>
        <Box flex={1} bgColor = {bg}>
        <Button.Group mt='30' isAttached mx={{base: "auto",}}>
            <Button _text={{bold: true}} onPress={showCashIn} width={'33.33%'} variant={isCashIn ? 'solid' : 'outline'}>Cash In</Button>
            <Button _text={{bold: true}} onPress={showCashOut} width={'33.33%'} variant={isCashOut ? 'solid' : 'outline'}>Cash Out</Button>
            <Button _text={{bold: true}} onPress={showTransfer} width={'33.33%'} variant={isTransfer ? 'solid' : 'outline'}>Transfer</Button>
        </Button.Group>
        
        <Center flex={1}> 
        <Container>

        <Box mt="30" mb='10' flex={1}>

            <ScrollView px={2} height={'100%'}  _contentContainerStyle={{  mb: '10'}} >
                
                <VStack flex={1}>

                    {/* Transaction Name */}

                    <FormControl isRequired>

                        <FormControl.Label _text={{bold: true, color: {text}}}> Transaction Name </FormControl.Label>
                        <Input placeholder="Enter Transaction Name" onChangeText={setData} />
                        {isError_transname && <FormControl.HelperText> {Error_transname} </FormControl.HelperText>}
                        
                    </FormControl>

                    {/* Date */}

                    <FormControl isRequired mt={'3'}>

                        <FormControl.Label _text={{bold: true}}> Date </FormControl.Label>
                        <Button size={'sm'} variant={'outline'} _text={{color:'grey' ,fontSize: 'xs'}} onPress={showMode}> {transDate.toDateString()} </Button>
                        {showDate && <RNDateTimePicker value={new Date()}  onChange={selectDateHandler}/>}
                        
                    </FormControl>

                    <FormControl isRequired mt={'3'}>

                        <FormControl.Label _text={{bold: true}}> Ledger </FormControl.Label>

                        <HStack alignItems="center" justifyContent={"space-between"}>
                            <SelectList placeholder='Select a Ledger' boxStyles={{borderRadius:4, borderColor:'#cccccc'}} data={ledgerList} save='key' setSelected = {setLedger}/>
                            <TouchableOpacity> 
                                <Icon as={<Ionicons name="add-circle" />}size={7} color="muted.400" />
                            </TouchableOpacity>
                        </HStack>
                        {isError_ledger && <FormControl.HelperText> {Error_ledger} </FormControl.HelperText>}

                    </FormControl>

                    {/* Wallets */}

                    {!isTransfer && <FormControl isRequired mt={'3'}>

                        <FormControl.Label _text={{bold: true}}> Wallet </FormControl.Label>

                        <HStack alignItems="center" justifyContent={"space-between"}>
                            <SelectList placeholder='Select a Wallet' data={walletList} save="key" setSelected = {(key) => setWallet(key)} boxStyles={{borderRadius:4, borderColor:'#cccccc'}}/>
                            <TouchableOpacity> 
                                <Icon as={<Ionicons name="add-circle" />}size={7} ml="3" color="muted.400" />
                            </TouchableOpacity>
                        </HStack>

                        {isError_wallet && <FormControl.HelperText> {Error_wallet} </FormControl.HelperText>}

                    </FormControl>}

                    {isTransfer && <FormControl isRequired mt={'3'}>

                        <FormControl.Label _text={{bold: true}}> From Wallet </FormControl.Label>

                        <HStack alignItems="center" justifyContent={"space-between"}>
                            <SelectList placeholder='Select a Wallet' save="key" boxStyles={{borderRadius:4, borderColor:'#cccccc'}} data={walletList} setSelected = {setWallet}/>
                            <TouchableOpacity> 
                                <Icon as={<Ionicons name="add-circle" />}size={7} ml="3" color="muted.400" />
                            </TouchableOpacity>
                        </HStack>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please make a selection!
                        </FormControl.ErrorMessage>

                    </FormControl>}

                    {isTransfer && <FormControl isRequired mt={'3'}>

                        <FormControl.Label _text={{bold: true}}> To Wallet </FormControl.Label>

                        <SelectList placeholder='Select a Wallet' boxStyles={{borderRadius:4, borderColor:'#cccccc'}} data={walletList} setSelected = {setWallet}/>

                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please make a selection!
                        </FormControl.ErrorMessage>

                    </FormControl>}


                    {!isTransfer && <FormControl mt={'3'}>

                        <FormControl.Label _text={{bold: true}}> Category </FormControl.Label>
                        <SelectList placeholder='Select a Category' save="key" data={categoryList} boxStyles={{borderRadius:4, borderColor:'#cccccc'}} setSelected = {setCategory}/>

                    </FormControl>}

                    <FormControl isRequired mt={'3'}>

                        <FormControl.Label _text={{bold: true}}> Amount </FormControl.Label>
                        <Input keyboardType='number-pad' placeholder="Enter Amount" onChangeText={setPrice} onBlur={furtherAction} />   

                    </FormControl>

                    <Checkbox mt="2" size="sm" _text={{fontSize: "11"}} isChecked={isAdvanced} onChange={() => setIsAdvanced(!isAdvanced)} > ADVANCED SETTING </Checkbox>

                    {!isTransfer && isAdvanced && <FormControl>

                        <FormControl.Label _text={{bold: true, textAlign: 'justify', fontSize: '10'}} > Collection </FormControl.Label>

                        <SelectList placeholder='Add into a Collection' save="key" data={collectionList} boxStyles={{borderRadius:4, borderColor:'#cccccc'}} setSelected = {setCollection}/>

                    </FormControl>}

                    {!isTransfer && isAdvanced && <FormControl>
                        <FormControl.Label _text={{bold: true, textAlign: 'justify', fontSize: '10'}} > Platform </FormControl.Label>

                        <Input placeholder="eg. Online / In Store" onChangeText={setPlatform} />

                    </FormControl>}

                    {!isTransfer && isAdvanced && <FormControl>
                        <FormControl.Label _text={{bold: true, textAlign: 'justify', fontSize: '10'}} > Venue </FormControl.Label>

                        <Input placeholder="Enter Venue Name" onChangeText={setVenue} />

                    </FormControl>}

                    {!isTransfer && isAdvanced && <FormControl>
                        <FormControl.Label _text={{bold: true, textAlign: 'justify', fontSize: '10'}} > Order ID </FormControl.Label>

                        <Input placeholder="Enter Order ID" onChangeText={setOrderid} />

                    </FormControl>}

                    {!isTransfer && isAdvanced && <FormControl>

                        <FormControl.Label _text={{bold: true, textAlign: 'justify', fontSize: '10'}} > Pay Method </FormControl.Label>

                        <SelectList 
                            placeholder='Grouping or Individual' 
                            boxStyles={{borderRadius:4, borderColor:'#cccccc'}} 
                            data = {methodData}
                            defaultOption={{ key:'1', value:'Individual' }}
                            setSelected = {setMethod}
                            onSelect = {updateMethodString}
                            save = "value" />

                    </FormControl>}

                    {!isTransfer && isAdvanced && <FormControl>

                        <FormControl.Label _text={{bold: true, textAlign: 'justify', fontSize: '10'}} > Person Paid </FormControl.Label>

                        <SelectList 
                            placeholder='Select Person Paid' 
                            boxStyles={{borderRadius:4, borderColor:'#cccccc'}} 
                            setSelected = {setPersonPaid}
                            data = {memberList}/>
                            

                    </FormControl>}

                    {!isTransfer && isAdvanced && <FormControl>

                        <FormControl.Label _text={{bold: true, textAlign: 'justify', fontSize: '10'}} > Member joined </FormControl.Label>

                        <MultipleSelectList 
                            placeholder='Select Member Joined' 
                            boxStyles={{borderRadius:4, borderColor:'#cccccc'}}
                            setSelected = {setMemberJoin}
                            data = {memberList}/>
                            
                    </FormControl>}

                    {isAdvanced && <FormControl mt='5'>

                        <TextArea h={20} placeholder="Enter Remark"/>

                    </FormControl>}

                    <Button mt='3' onPress={validateData} onChangeText={setRemark}>
                        Save
                    </Button>

                </VStack>

            </ScrollView>

        </Box>

    </Container>
    </Center>

        </Box>
        </NativeBaseProvider>
}

export default RecordForm