import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {ScrollView,View,StyleSheet,Text,TouchableOpacity,Image,TextInput,KeyboardAvoidingView,Platform} from 'react-native';

import PageLayout from './Component/PageLayout';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permission from 'expo-permissions';
import * as UserService from '../Service/UserService';
class MovooutFirst extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            selected:false,
            user:{},
            location:{
                zipcode:""
            },
            from:"",
            to:""
        }
    }

    back = () => {
        this.setState({
            selected:!this.state.selected
        })
    }

    
    componentWillMount()
    {
        // if(Platform.OS == 'android' && !Constants.isDevice)
        // {
        //     console.log('Oops, this will not work on Sketch in an Android emulator. Try it on your device!')
        // }
        // else{
        //     this._getLocationAsync();
        // }
        this.getuser();
    }

    _getLocationAsync = async () => {
        let { status } = await Permission.askAsync(Permission.LOCATION);
        if (status !== 'granted') {
          console.log('permission denined');
        }
    
        let location = await Location.getCurrentPositionAsync({});
        if(location)
        {
            let locationinfo = await Location.reverseGeocodeAsync({latitude:location.coords.latitude,longitude:location.coords.longitude});
            return locationinfo;
        }
        
      };
    
      getuser = async() =>{
        let self = this;
        UserService.getuser().then(async(user)=>{
            if(user)
            {
                    let location = {};
                    if(user.address)
                    {
                        location.street = user.address.name + " " + user.address.number;
                    }
                    else
                    {
                        let locationinfo = await self._getLocationAsync();
                        console.log(locationinfo);
                        if(locationinfo.length > 0)
                        {
                            location.street = locationinfo[0].street + " " + locationinfo[0].name;
                            location.region = locationinfo[0].region;
                            location.city = locationinfo[0].city;
                            
                        }
                    }

                    self.setState({
                        user:user,
                        location:location
                    })
            }
        })
    
      }

      handleChange = (name,text) => {
        let data = this.state;
        data[name] = text;
        this.setState(data);
      }

      select = () => {
        if(!this.state.selected)
        {
            this.setState({
                from:this.state.location.street,
                to:'Avenida Paula Ferreira, 979'
            })    
        }
        
        
        this.back();
      }

      nextlocation = () => {
          this.setState({
              to:"Avenida Paula Ferreira, 979"
          })

          this.props.navigation.navigate('moveoutsecond',{data:{from:this.state.from,to:this.state.to}})
      }
    
    render()
    {
        return(
            <PageLayout {...this.props} back={this.back}  backdisable={!this.state.selected}>
                <KeyboardAvoidingView behavior="padding" style={{flex:1}} >
                    <ScrollView style={style.container}>
                        {!this.state.selected && (<Text style={style.title}>Esta é sua localização?</Text>)}
                        {this.state.selected && (<Text style={style.titleselected}>Ponto de Partida</Text>)}
                        <View style={style.placeholdercontainer}>
                            <TouchableOpacity style={style.placeholder} onPress={()=>this.select()}>
                                <View style={style.placeholderflex}>
                                    <Text style={style.titleplaceholder}>{this.state.location.street}</Text>
                                    <Text style={style.descriptionplaceholder}>Campo Belo</Text>
                                    <Text style={style.descriptionplaceholder}>São Paulo/SP</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image source={require('../../img/icon/placeholder_light.png')} style={{width:hp('3.32%'),height:hp('4.51%'),marginLeft:'auto'}}></Image>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            !this.state.selected && (
                                <View>
                                    <Text style={style.descriptionaction}>clique para modificar</Text>
                                    <Text style={style.enterzipcode}>Caso não esteja correto, digite o seu CEP</Text>
                                    <View style={style.zipinputcontainer}>
                                        <TextInput style={style.input} placeholder="Código postal" onChangeText={(text)=>this.handleChange("zip",text)} defaultValue={this.state.zip}></TextInput>
                                    </View>
                                </View>
                            )
                        }
                        {
                            this.state.selected && (
                                <View style={style.selectedplaceholder}>
                                    <TouchableOpacity style={style.dot}></TouchableOpacity>
                                    <View style={{marginLeft:hp('0.4%'),borderLeftColor:'#338AF0',borderLeftWidth:1,height:hp('8.424%')}}></View>
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity style={style.dot}></TouchableOpacity>
                                        <Text style={style.dottext}>Nos fale para onde vai</Text>
                                    </View>                                
                                </View>
                            )
                        }
                        {
                            this.state.selected && (
                                <TouchableOpacity style={style.locationcontainer} onPress={this.nextlocation}>
                                    <Text style={style.location}>Avenida Paula Ferreira, 979</Text>
                                </TouchableOpacity>
                            )
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
            </PageLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:hp('9.24%')
    },
    title:{
        fontSize:hp('2.174%'),
        textAlign:'center',
        color:'#9C9C9C'
    },
    titleselected:{
        fontSize:hp('1.9%'),
        color:'#9C9C9C',
        marginLeft:wp('11.84%')
    },
    dot:{
        width:hp('0.95%'),
        height:hp('0.95%'),
        backgroundColor:'#338AF0'
    },
    dottext:{
        marginLeft:wp('1.657%'),
        fontSize:hp('1.9%'),
        color:'#9C9C9C',
        position:'relative',
        bottom:hp('0.95%')
    },
    selectedplaceholder:{
        paddingTop:hp('0.815%'),
        paddingBottom:hp('0.815%'),
        paddingLeft:wp('7.488%')
    },
    placeholdercontainer:{
        flex:1,
        backgroundColor:'#FFF',
        paddingLeft:wp('7.488%'),
        paddingRight:wp('7.488%'),
        paddingTop:hp('2.038%'),
        paddingBottom:hp('2.038%')
    },
    locationcontainer:{
        paddingTop:hp('0.95%'),
        paddingBottom:hp('0.95%'),
        backgroundColor:'#FFF',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    location:{
        width:wp('85%'),
        backgroundColor:'#EDEDED',
        borderRadius:15,
        paddingLeft:wp('4.348%'),
        paddingTop:hp('1.359%'),
        paddingBottom:hp('1.359%'),
        fontSize:hp('1.9%')
    },
    placeholder:{
        flex:1,
        flexDirection:'row',
        borderRadius:15,
        borderColor:'#338AF0',
        borderWidth:1,
        paddingRight:wp('5.113%')
    },
    placeholderflex:{
        paddingTop:hp('2.174%'),
        paddingBottom:hp('2.174%'),
        paddingLeft:wp('3.348%'),
        flex:1
    },
    titleplaceholder:{
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        color:'#5666F9'
    },
    descriptionplaceholder:{
        fontSize:hp('1.9%'),
        color:'#5666F9'
    },
    descriptionaction:{
        textAlign:'center',
        fontSize:hp('1.63%'),
        color:'#9C9C9C'
    },
    enterzipcode:{
        textAlign:'center',
        fontSize:hp('2.17%'),
        color:'#9C9C9C',
        marginTop:hp('8.83%')
    },
    zipinputcontainer:{
        marginTop:hp('5.43%'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        backgroundColor:'#FFF',
        width:wp('69.8%'),
        paddingTop:hp('1.63%'),
        paddingBottom:hp('1.63%'),
        textAlign:'center',
        fontSize:hp('1.9%'),
        color:'#5666F9',
        borderBottomColor:'#5666F9',
        borderBottomWidth:1
    }
})

export default MovooutFirst;