import React,{Component} from 'react';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {View,KeyboardAvoidingView,ScrollView,StyleSheet,Text,TouchableOpacity,TextInput} from 'react-native';

import PageLayout from './Component/PageLayout';

import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
class MoveoutSecond extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data:{
                date:Moment(new Date()).format('MM/DD/YYYY'),
                period:'',
                flex:''
            }
        }
    }

    handleChange = (name,value) => {
        let data = this.state.data;
        data[name] = value;
        this.setState({
            data:data
        });
    }
    
    next = () => {
        let data = this.state.data;
        let locationinfo = this.props.navigation.state.params.data;

        for(let item in locationinfo)
        {
            data[item] = locationinfo[item];
            
        }

        this.props.navigation.navigate('checkout',{data:data})
    }
    render(){
        return (
            <PageLayout {...this.props}>
                <KeyboardAvoidingView behavior="padding" style={style.container}>
                    <ScrollView style={style.container}>
                        <View style={style.containerview}>
                            <Text style={style.title}>Qual a data da sua mudança?</Text>
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                <DatePicker format="MM/DD/YYYY" style={style.dateinputcontainer} placeholder="selecione a data" showIcon={false} customStyles={{
                                    dateInput:{
                                        paddingTop:hp('1.22%'),
                                        paddingBottom:hp('1.22%'),
                                        backgroundColor:'#FFF',
                                        borderColor:'white',
                                        borderBottomColor:'#5666F9',
                                        borderBottomWidth:1,
                                        textAlign:'center'
                                    },
                                    dateText:{
                                        color:'#5666F9',
                                        fontSize:hp('1.9%')
                                    }
                                }} onDateChange={(date)=>this.handleChange('date',date)} date={this.state.data.date}></DatePicker>
                                {/* <TextInput style={style.dateinput} placeholder="selecione a data"></TextInput> */}
                            </View>
                            <View style={style.form}>
                                <Text style={style.titledescription}>Tem alguma flexibilidade de data?</Text>
                                <View style={style.buttoncontainer}>
                                    <TouchableOpacity style={this.state.data.flex == 'antes'?style.buttonactive:style.button} onPress={()=>this.handleChange('flex','antes')}>
                                        <Text style={this.state.data.flex=='antes'?style.buttonactivetext:style.buttontext}>até dois dias antes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={this.state.data.flex == 'depois'?style.buttonactive:style.button} onPress={()=>this.handleChange('flex','depois')}>
                                        <Text style={this.state.data.flex=='depois'?style.buttonactivetext:style.buttontext}>até dois dias depois</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={style.form}>
                                <Text style={style.titledescription}>Qual o Período?</Text>
                                <View style={style.buttoncontainer}>
                                    <TouchableOpacity style={this.state.data.period == 'manha'?style.buttonactive:style.button} onPress={()=>this.handleChange('period','manha')}>
                                        <Text style={this.state.data.period=='manha'?style.buttonactivetext:style.buttontext}>Manhã</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={this.state.data.period == 'tarde'?style.buttonactive:style.button}  onPress={()=>this.handleChange('period','tarde')}>
                                        <Text style={this.state.data.period=='tarde'?style.buttonactivetext:style.buttontext}>Tarde</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={style.continue} onPress={this.next}>
                                <Text style={style.continuebtn}>CONTINUAR</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </PageLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    containerview:{
        paddingLeft:wp('11.835%'),
        paddingRight:wp('11.835%'),
        paddingTop:hp('9.5%')
    },
    title:{
        fontSize:hp('2.17%'),
        textAlign:'center',
        color:'#9C9C9C'
    },
    dateinput:{
        paddingTop:hp('1.22%'),
        paddingBottom:hp('1.22%'),
        backgroundColor:'#FFF',
        borderColor:'white',
        borderBottomColor:'#5666F9',
        borderBottomWidth:1,
        color:'#5666F9',
        fontSize:hp('1.9%'),
        textAlign:'center',
        
    },
    dateinputcontainer:{
        width:wp('69.8%'),
        marginTop:hp('5.57%'),
        backgroundColor:'#FFF'
    },
    form:{
        marginTop:hp('5.3%')
    },
    titledescription:{
        fontSize:hp('2.174%'),
        textAlign:'center',
        color:'#9C9C9C',
        fontWeight:'normal'
    },
    buttoncontainer:{
        marginTop:hp('4.62%'),
        flexDirection:'row',
        paddingRight:wp('1.207%')
    },
    button:{
        marginLeft:wp('4.59%'),
        flex:1,
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:4,
        paddingLeft:wp('1.207%'),
        paddingRight:wp('1.207%'),
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%')
    },
    buttonactive:{
        marginLeft:wp('4.59%'),
        flex:1,
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#5666F9',
        paddingLeft:wp('1.207%'),
        paddingRight:wp('1.207%'),
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%')
    },
    buttonactivetext:{
        color:'white',
        fontSize:hp('1.9%'),
        textAlign:'center'
    },
    buttontext:{
        color:'#5666F9',
        fontSize:hp('1.9%'),
        textAlign:'center'
    },
    continue:{
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        marginTop:hp('5.706%'),
        borderColor:'#5666F9',
        borderWidth:1,
        borderRadius:4
    },
    continuebtn:{
        color:'#5666F9',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    }   
})

export default MoveoutSecond;