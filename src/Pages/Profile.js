import React,{Component} from 'react';

import {View,StyleSheet,Text,Image,TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ProfileLayout from './Component/Profilelayout';

class Profile extends Component
{
    constructor(props)
    {
        super(props);
        
    }

    render(){
        return(
            <ProfileLayout {...this.props} backdisabled={true} activeprofile={true}>
                <View style={style.container}>
                    <Text style={style.profiletext}>Dados Pessoais</Text>
                    <TouchableOpacity style={style.fieldcontainer} onPress={()=>this.props.navigation.navigate('updateprofile')}>
                        <Image source={require('../../img/icon/person.png')} style={style.fieldimage}></Image>
                        <Text style={style.fieldtext}>Meu Perfil</Text>
                        <TouchableOpacity style={{marginLeft:'auto'}}>
                            <Image source={require('../../img/icon/chevron-right.png')} style={style.fieldright}></Image>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.fieldcontainer} onPress={()=>this.props.navigation.navigate('updateinfo')}>
                        <Image source={require('../../img/icon/phone.png')} style={style.fieldimage}></Image>
                        <Text style={style.fieldtext}>Informações de Contato</Text>
                        <TouchableOpacity style={{marginLeft:'auto'}}>
                            <Image source={require('../../img/icon/chevron-right.png')} style={style.fieldright}></Image>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={style.mastercard}>
                        <Text style={style.profiletext}>Formas de Pagamento</Text>
                        <TouchableOpacity style={style.fieldcontainer} onPress={()=>this.props.navigation.navigate('paymentselect')}>
                            <Image source={require('../../img/icon/mastercard.png')} style={style.mastercardimage}></Image>
                            <Text style={style.mastercardtext}>... 8899</Text>
                            <TouchableOpacity style={{marginLeft:'auto'}}>
                                <Image source={require('../../img/icon/chevron-right.png')} style={style.fieldright}></Image>
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.fieldcontainer} onPress={()=>this.props.navigation.navigate('registercard')}>
                            <Text style={style.addcard}>Adicionar um novo cartão para pagamento</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ProfileLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    profiletext:{
        color:'#939393',
        fontSize:hp('2.17%'),
        marginLeft:hp('4.61%'),
        marginTop:hp('4.61%'),
        marginBottom:hp('1.766%')
    },
    fieldcontainer:{
        width:wp('100%'),
        height:hp('6.8%'),
        backgroundColor:'#FFF',
        borderWidth:1,
        borderColor:'#E9E9E9',
        flexDirection:'row',
        alignItems:'center'
    },
    fieldimage:{
        width:hp('2.925%'),
        height:hp('3.315%'),
        marginLeft:wp('11.11%')
    },
    fieldtext:{
        marginLeft:wp('6.635%'),
        fontSize:hp('2.174%'),
        color:'#939393'
    },
    fieldright:{
        width:wp('3.26%'),
        height:hp('3.26%'),
        marginRight:wp('4.59%')
    },
    mastercard:{
        marginTop:hp('1.5%')
    },
    mastercardimage:{
        width:hp('5.3%'),
        height:hp('5.3%'),
        marginLeft:wp('11.11%')
    },
    mastercardtext:{
        fontSize:hp('2.174%'),
        color:'#939393',
        marginLeft:wp('4%')
    },
    addcard:{
        fontSize:hp('2.174%'),
        color:'#5666F9',
        marginLeft:wp('9.42%')
    }
})
export default Profile;