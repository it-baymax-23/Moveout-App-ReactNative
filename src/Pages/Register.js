import React,{Component} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StyleSheet,View,Image,ScrollView,Text,TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native';

import Toast from 'react-native-easy-toast';

import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';
import axios from 'axios';
import  * as UserService from '../Service/UserService';
import config from '../../config/google.json';

class Register extends Component
{
    error = {};
    constructor(props)
    {
        super(props);
        this.state = {
            data:{
                name:'',
                email:'',
                cpf:'',
                password:''
            },
            r_password:'',
            error:false
        }
    }
    
    googlesignup = async() => {
            
            const tokenResponse = await AppAuth.authAsync(config);
            if(tokenResponse)
            {
                let self = this;  
                axios.get('https://www.googleapis.com/userinfo/v2/me', {
                    headers: { Authorization: `Bearer ${tokenResponse.accessToken}` },
                }).then(res=>{
                    UserService.createusergoogle(res.data.name,res.data.picture,res.data.id,res.data.email,function(data){
                        if(data.success)
                        {
                            self.props.navigation.navigate('login');
                        }
                        else
                        {
                            alert(data.message);
                        }
                    })
                }
                ).catch(e=>alert(e))
            }
    }
    singupwithFB = async()=> {
        const {type, token} = await Facebook.logInWithReadPermissionsAsync('2274843729436475', {permissions: ['public_profile']})

        let self = this;
        if (type == 'success') {
            axios.get('https://graph.facebook.com/me?access_token=' + token + '&fields=id,name,picture,email').then(res=>{
                UserService.createusergoogle(res.data.name,res.data.picture,res.data.id,res.data.email,function(data){
                    if(data.success)
                    {
                        self.props.navigation.navigate('login');
                    }
                    else
                    {
                        alert(data.message);
                    }
                })
            }).catch(e=>alert(e))
        }
    }

    handleChange = (name,value) => {
        let data = this.state.data;
        data[name] = value;
        this.validate(data,this.state.r_password);
        this.setState({data:data});
    }

    handleConfirmPassword = (value) => 
    {
        let data = this.state.data;
        
        this.validate(data,value);
        this.setState({
            r_password:value
        });
    }

    validate = (data,r_password) => {
        this.error = {};
        let enable = true;
        if(!r_password)
        {
            enable = false;
            this.error.r_password = "Este campo é obrigatório";
        }
        else
        {
            if(r_password != data.password)
            {
                enable = false;
                this.error.r_password = "Confirmar senha deve ser euqal para senha";
            }
        }

        for(let item in data)
        {
            if(!data[item])
            {
                enable = false;
                this.error[item] = "Este campo é obrigatório"
                continue;
            }
            
            if(item == 'email')
            {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(!reg.test(data[item]))
                {
                    enable = false;
                    this.error[item] = "email não está correto";
                    continue;
                }
            }
        }
        return enable;
    }

    signup = async() => {
        let data = this.state.data;
        if(this.validate(data,this.state.r_password))
        {
            let exist = false;//await UserService.emailexist(data.email);
            if(!exist)
            {
                let result = await UserService.signup(data);
                if(result.success)
                {
                    this.props.navigation.navigate('login');
                }
                else
                {
                    alert(result.message);
                }
            }
            else
            {
                this.error.email = "e-mail já existe";
                this.refs.toast.show("e-mail já existe",1200,()=>{});
                this.setState({error:false});
            }
        }
        else
        {
            this.refs.toast.show("corrija erros",1200,()=>{});
            this.setState({error:true})
        }
    }

    render()
    {
        return (
        <KeyboardAvoidingView behavior="padding" style={style.container} >
            <LinearGradient 
                colors={['rgba(145, 230, 168, 0.5)','rgba(79, 117, 239, 0.5)']}
                start={[0,0]}
                end={[1,1]}
                locations={[0.031,0.4323]}           
                style={style.container}>
                    <ScrollView style={style.register_container}>
                        <Toast ref="toast" position="top"></Toast>
                        <Image source={require('../../img/logo.png')} style={style.logoimage}></Image>
                        <View style={style.content}>
                            <Text style={style.title}>
                                Nos informe seus dados{'\n'}
                                para cadastro
                            </Text>
                            <View style={{marginTop:hp('8%')}}>
                                <Text style={style.label}>Nome</Text>
                                <TextInput 
                                    autoCapitalize='none'
                                    ref="name" 
                                    placeholder="" 
                                    placeholderTextColor="#FFF" 
                                    style={style.input} 
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text)=>this.handleChange('name',text)}
                                    ></TextInput>
                                {this.state.error && this.error.name && (
                                    <Text style={style.errortext}>{this.error.name}</Text>                                
                                )}
                            </View>
                            <View style={style.inputcontainer}>
                                <Text style={style.label}>Email</Text>
                                <TextInput
                                  autoCapitalize='none'
                                  ref="email" 
                                  placeholder="" 
                                  placeholderTextColor="#FFF" 
                                  style={style.input} 
                                  enablesReturnKeyAutomatically={true}
                                  onChangeText={(text)=>this.handleChange('email',text)}
                                  ></TextInput>
                                {
                                    this.state.error && this.error.email && (
                                        <Text style={style.errortext}>{this.error.email}</Text>
                                    )
                                }
                                
                            </View>
                            <View style={style.inputcontainer}>
                                <Text style={style.label}>Sneha</Text>
                                <TextInput
                                  type
                                  autoCapitalize='none'
                                  ref="password"
                                  secureTextEntry={true} 
                                  placeholder="" 
                                  placeholderTextColor="#FFF" 
                                  style={style.input} 
                                  enablesReturnKeyAutomatically={true}
                                  onChangeText={(text)=>this.handleChange('password',text)}
                                  ></TextInput>
                                {
                                    this.state.error && this.error.password && (
                                        <Text style={style.errortext}>{this.error.password}</Text>
                                    )
                                }
                                
                            </View>
                            <View style={style.inputcontainer}>
                                <Text style={style.label}>Confirm a Senha</Text>
                                <TextInput
                                  autoCapitalize='none'
                                  ref="r_password" 
                                  placeholder="" 
                                  placeholderTextColor="#FFF" 
                                  style={style.input} 
                                  enablesReturnKeyAutomatically={true}
                                  onChangeText={(text)=>this.handleConfirmPassword(text)}
                                  ></TextInput>
                                {
                                    this.state.error && this.error.r_password && (
                                        <Text style={style.errortext}>{this.error.r_password}</Text>
                                    )
                                }
                                
                            </View>
                            <View style={style.inputcontainer}>
                                <Text style={style.label}>CPF</Text>
                                <TextInput 
                                autoCapitalize='none'
                                ref="cpf" 
                                placeholder="" 
                                placeholderTextColor="#FFF" 
                                style={style.input} 
                                enablesReturnKeyAutomatically={true}
                                onChangeText={(text)=>this.handleChange('cpf',text)}
                                ></TextInput>
                                {
                                    this.state.error && this.error.cpf && (
                                        <Text style={style.errortext}>{this.error.cpf}</Text>
                                    )
                                }                                
                            </View>
                            <Text style={style.titlefacebook}>ou faça login por:</Text>
                            <View style={style.facebookbtncontainer}>
                                <TouchableOpacity style={style.socialbutton} onPress={this.googlesignup}>
                                    <Image source={require('../../img/google.png')}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.socialbutton} onPress={this.singupwithFB}>
                                    <Image source={require('../../img/facebook.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={style.continuebtn} onPress={this.signup}   >
                                <Text style={style.continuebtntext}>CONTINUAR</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>   
                </LinearGradient>
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    },
    register_container:{
        flex:1,
        backgroundColor:"rgba(11, 85, 197, 0.5)",
        paddingLeft:wp('11%'),
        paddingRight:wp('11%')
    },
    logoimage:{
        width:wp('20%'),
        height:hp('6%'),
        marginTop:hp('8%')
    },
    content:{
        marginTop:hp('7%')
    },
    title:{
        alignSelf:'center',
        fontSize:hp('2.4%'),
        textAlign:"center",
        color:'#FFF',
        fontWeight:'500'
    },
    label:{
        flex:1,
        textAlign:"center",
        fontSize:hp('1.8%'),
        color:'#FFF',
        fontWeight:'500'
    },
    titlefacebook:{
        marginTop:hp('3%'),
        flex:1,
        textAlign:"center",
        fontSize:hp('2.4%'),
        fontWeight:"500",
        color:'#FFF'
    },
    input:{
        flex:1,
        marginTop:10,
        borderBottomColor:'#FFF',
        borderBottomWidth:1,
        color:'#FFF',
        textAlign:'center',
        paddingTop:hp('1.3%'),
        paddingBottom:hp('1.3%')
    },
    inputcontainer:{
        marginTop:hp('3%'),
        flex:1
    },
    facebookbtncontainer:{
        flex:1,
        alignSelf:'center',
        flexDirection:"row",
        marginTop:hp('2.6%')
    },
    socialbutton:{
        backgroundColor:'#FFF',
        width:49,
        height:49,
        marginLeft:10,
        borderRadius:25,
        padding:5,
        alignItems:'center'
    },
    continuebtn:{
        paddingTop:17,
        paddingBottom:17,
        borderRadius:4,      
        height:hp('7%'),
        marginTop:hp('4%'),
        borderColor:'#FFF',
        borderWidth:1,
        marginBottom:hp('4%')
    },
    continuebtntext:{
        alignSelf:"center",
        color:'#FFF',
        fontSize:hp('1.8%'),
        fontWeight:'bold'
    },
    errortext:{
        color:'#FF0000',
        fontSize:hp('1.63%')
    }
})

export default Register;
