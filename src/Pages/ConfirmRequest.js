import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,ScrollView,StyleSheet,Text,Image,TouchableOpacity} from 'react-native';

import PageLayout from './Component/PageLayout';

import * as UserService from '../Service/UserService';

import * as OrderService from '../Service/OrderService';

class ConfirmRequest extends Component
{
    constructor(props)
    {
        super(props);
    }

    getuser = async() => {
        let user = await UserService.getuser();
        return user;
    }

    moveoutconfirm = async() => {
        let data = this.props.navigation.state.params.data;
        let self = this;

        this.getuser().then(user=>{
            let key = user.uid;
            data.userid = key;
            OrderService.createorder(data).then(result=>{
                if(result.success)
                {
                    self.props.navigation.navigate('moveoutconfirm');
                }
            })
        })
    }

    render()
    {
        return (
            <PageLayout {...this.props}>
                <ScrollView style={style.container}>
                    <Text style={style.title}>
                        Confira as informações{'\n'}
                        do seu Moveout
                    </Text>
                    <View style={style.paymentdesc}>
                        <Text style={style.paymenttitle}>{this.props.navigation.state.params.data.to}</Text>
                        <Text style={style.paymentdate}>dia {this.props.navigation.state.params.data.date}</Text>
                        <Text style={style.descriptiontitle}>{this.props.navigation.state.params.data.from}</Text>
                        <Text style={style.descriptiondetail}>Campo Belo</Text>
                        <Text style={style.descriptiondetail}>São Paulo/SP</Text>
                        <Text style={style.price}>R$ 1.000,00</Text>
                    </View>
                    <TouchableOpacity style={style.confirmbtn} onPress={this.moveoutconfirm}>
                        <Text style={style.confirmtext}>CONFIRMAR SOLICITAÇÃO</Text>
                    </TouchableOpacity>
                </ScrollView>
            </PageLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    paymentdesc:{
        width:wp('76.32%'),
        minHeight:hp('43.478%'),
        paddingLeft:wp('4.1%'),
        paddingRight:wp('4.1%'),
        paddingTop:hp('5.84%'),
        paddingBottom:hp('5.84%'),
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:15,
        marginLeft:wp('12%'),
        marginTop:hp('3.4%')
    },
    paymenttitle:{
        fontSize:hp('2.445%'),
        fontWeight:'500'
    },
    paymentdate:{
        fontSize:hp('1.9%'),
        color:'#939393'
    },
    descriptiontitle:{
        fontWeight:'bold',
        fontSize:hp('1.9%'),
        color:'#939393'
    },
    descriptiondetail:{
        fontSize:hp('1.9%'),
        color:'#939393'
    },
    price:{
        fontSize:hp('4.62%'),
        fontWeight:'500',
        marginTop:hp('3%')
    },
    title:{
        fontSize:hp('2.445%'),
        fontWeight:'500',
        color:'#939393',
        marginTop:hp('7.6%'),
        marginLeft:wp('12%')
    },
    confirmbtn:{
        flexDirection:'row',
        marginTop:hp('7.88%'),
        width:wp('76.33%'),
        alignSelf:'center',
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        borderRadius:4,
        backgroundColor:'#5160E9',
        borderWidth:1,
        borderColor:'#5463F2',
        justifyContent:'center',
        marginBottom:hp('3%')
    },
    confirmtext:{
        color:'#FFF',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    },
    
})
export default ConfirmRequest;