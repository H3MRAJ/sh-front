import React from 'react';
import {StyleSheet,View,Dimensions, Image, Text, Button} from 'react-native';

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'

var {width}=Dimensions.get("window");

const ProductCard = (props) => {
    const { name, price,image,countInStock}=props;

    return(
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: image ? image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"}}
            />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0,15-3)
                +'...': name}
            </Text>
            <Text style={styles.price}>Rs.{price}</Text>
            {   countInStock > 0 ? (
                <View style= {{marginBottom:60}}>
                    <Button 
                    title={'Add'} 
                    color={'green'} 
                    onPress={() => {
                        props.addItemToCart(props)
                    }}
                     />
                </View>
            ) : <Text style= {{marginTop: 20}}> Currently Unavailable</Text>  }
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        addItemToCart: (product) =>
        dispatch(actions.addToCart({quantity: 1, product}))
    }
}
const styles=StyleSheet.create({
    container: {        
        width: width/2-20,//-20
        height: width/1.4, //1.7
        padding: 10,
        borderRadius:10,
        marginTop:5,
        marginBottom:50,
        marginLeft:10,
        alignItems: "center",
        elevation:8,
        backgroundColor: "white",// put back white
    },
    image:{
        width: width/2 -20-10,
        height: width/1.7, //check again
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom:10,
        //position:'relative',
        height: width/2-20-10, //was -20-90
        backgroundColor: 'transparent',
        width: width/2-20-10     //-20-10 
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop:10,
        textAlign: 'center'

    }
})
export default connect(null, mapDispatchToProps)(ProductCard);