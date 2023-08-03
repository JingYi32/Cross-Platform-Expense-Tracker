import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '../screens/Dashboard'
import Statistics from '../screens/Statistics'
import Wallet from '../screens/WalletPage'
import Menu from '../screens/menu'
import { Ionicons } from '@expo/vector-icons/';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


function Home() {

    const route = useRoute();
    const [user, setName] = React.useState(route.params.user);
    const [username, setuserNAme] = React.useState(route.params.user_name);

    return (
        <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarStyle:{
                position:'absolute',
                backgroundColor: 'rgba(66,95,235,255)',
                height:50,

            },
            tabBarShowLabel:false,

        }} >
            <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >
                         <Ionicons name={focused ? 'home' : 'home-outline'} size={20} color={focused ? '#fff' :'#bbb'} />
                         <Text style={{color: focused ? '#fff':'#bbb', fontSize:10, fontWeight: 'bold'}} >Dashboard</Text>       
                    </View>
                )
            }}  name="Dashboard" component={Dashboard} initialParams={{user_id: user}}/>
            <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >
                        <Ionicons name={focused ? 'stats-chart':'stats-chart-outline'} size={20} color={focused ? '#fff' :'#bbb'} />
                        <Text style={{color:focused ? '#fff' :'#bbb', fontSize:10, fontWeight: 'bold'}} >Statistics</Text>
                    </View>
                )
            }} name="Statistics" component={Statistics} initialParams={{user_id: user}}/>
            <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >
                        <Ionicons name={focused ? 'wallet':'wallet-outline'} size={20} color={focused ? '#fff' :'#bbb'} />
                        <Text style={{color:focused ? '#fff' :'#bbb', fontSize:10, fontWeight: 'bold'}} >Wallet</Text>
                    </View>
                )
            }} name="Wallet" component={Wallet} initialParams={{user_id: user}}/>
            <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >
                        <Ionicons name={focused ? 'menu':'menu-outline'} size={20} color={focused ? '#fff' :'#bbb'} />
                        <Text style={{color:focused ? '#fff' :'#bbb', fontSize:10, fontWeight: 'bold'}} >More</Text>
                    </View>
                )
            }} name="Menu" component={Menu} initialParams={{user_id: user, user_name: username}}/>
        </Tab.Navigator>
        
    )
}

export default Home;

const styles = StyleSheet.create({
    shadow:{
        elevation:5,
        shadowColor:'#000',
        backgroundColor:'#00003f',
        borderWidth:1,
        borderColor:'transparent',
    },
})