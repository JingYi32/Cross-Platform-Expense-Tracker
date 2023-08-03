import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Welcome from './screens/Welcome'
import Home from './screens/Home'
import Form from './screens/RecordForm'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Wallet from './screens/WalletPage'
import TransactionRecord from './screens/TransactionPage'
import Categories from './screens/Categories';
import CollectionPage from './screens/CollectionPage'
import Ledgers from './screens/Ledgers'
import MemberPage from './screens/MemberPage'
import SingleTransPage from './screens/SingleTransRecord'
import DebtRecord from './screens/DebtRecord'


const Stack = createNativeStackNavigator();

export default function App() {

  return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} >
          <Stack.Screen name = 'Welcome' component = {Welcome}/>
          <Stack.Screen name = 'Home' component = {Home}/>
          <Stack.Screen name = 'Form' component = {Form}/>
          <Stack.Screen name = 'Login' component = {Login}/>
          <Stack.Screen name = 'Signup' component = {Signup} />
          <Stack.Screen name = 'Wallet' component = {Wallet}/>
          <Stack.Screen name = 'TransactionRecord' component = {TransactionRecord}/>
          <Stack.Screen name = 'Ledgers' component = {Ledgers}/>
          <Stack.Screen name = 'CollectionPage' component = {CollectionPage}/>
          <Stack.Screen name = 'Categories' component = {Categories}/>
          <Stack.Screen name = 'SingleTransPage' component = {SingleTransPage}/>
          <Stack.Screen name = 'MemberPage' component = {MemberPage}/>
          <Stack.Screen name = 'DebtRecord' component = {DebtRecord}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
  
};

