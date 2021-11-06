import React from 'react';
import {StyleSheet,View, Dimensions, Image, SafeAreaView} from 'react-native';


var { height } = Dimensions.get("window");
const Header=() => {
    return(
        <SafeAreaView style={styles.header}>
        <Image source={require("../assets/logo.jpeg")}
            resizeMode="contain"
            style={{height: 100, //50 and no width
            width:height}}
        />
        </SafeAreaView>
    )
    }
    const styles= StyleSheet.create({
        header: {
            width: '100%',
            flexDirection:'row',
            alignContent: 'center',
            justifyContent:'center',
            padding: 2, //20
           // marginTop:90      //ToDO: delete
        },
    })
        

export default Header;
