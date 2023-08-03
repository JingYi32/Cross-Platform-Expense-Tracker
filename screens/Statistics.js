import React, {useState} from 'react';
import { StyleSheet, Text,Appearance, View, Dimensions } from 'react-native';
import { LineChart, } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';

function Statistics() {

    const route = useRoute();
    const [user_id, setUser_id] = React.useState(route.params.user_id);

    // Display Mode Settings
    const colorScheme = Appearance.getColorScheme();
    const [isLightMode, setColorMode] = useState(true);
    if (colorScheme === 'dark') {
        setColorMode(false);
    }

    return (
        <View  style={{flex:1, backgroundColor: isLightMode ? '#f5f6fa' : '#21222d', marginBottom:50}}>
        <View style={{flexDirection:'column',marginTop:('10%'),paddingHorizontal:'5%'}}>
            
            <Text style={{fontSize:30, fontWeight:'bold', color : 'rgba(66,95,235,255)'}} >Statistics</Text>

        <View>

        <LineChart
            data={{
            labels: ['December','January',],
            datasets: [{
                data: [
                Math.random() * 100,
                Math.random() * 100,
                ]
            }]
            }}
            width={350} // from react-native
            height={220}
            chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />
        </View>
        </View>
        </View>
    );
}

export default Statistics;