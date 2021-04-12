import React,{Component} from 'react';
import {View,StyleSheet,Text,Image,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView} from 'react-native';

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import CheckoutLayout from './Component/CheckoutLayout';
import ServiceItem from './Component/ServiceItem';
class CheckoutPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            service:[
                {icon:require('../../img/service/sofa.png'),title:"Sala",largeicon:require('../../img/service/sofa-large.png'),data:[
                    {icon:require('../../img/service/sofa1.png'),title:'Sofá 3 lugares',count:0},
                    {icon:require('../../img/service/sofa1.png'),title:'Sofá 2 lugares',count:0},
                    {icon:require('../../img/service/armchair.png'),title:'Poltrona',count:0},
                    {icon:require('../../img/service/books-on-bookshelf.png'),title:'Mesa de centro',count:0},
                    {icon:require('../../img/service/books-on-bookshelf.png'),title:' Rack de TV',count:0}
                ]},
                {icon:require('../../img/service/stove.png'),title:'Cozinha',largeicon:require('../../img/service/stove-large.png'),data:[
                    {icon:require('../../img/service/table1.png'),title:'Mesa',count:0},
                    {icon:require('../../img/service/laundry-machine1.png'),title:'Máquina de lavar louças',count:0},
                    {icon:require('../../img/service/stove1.png'),title:'Fogão',count:0},
                    {icon:require('../../img/service/books-on-bookshelf1.png'),title:'Geladeira',count:0},
                    {icon:require('../../img/service/table1.png'),title:'Buffet',count:0},
                    {icon:require('../../img/service/wardrobe.png'),title:'Armário',count:0}
                ]},
                {icon:require('../../img/service/bed.png'),title:'Quarto',largeicon:require('../../img/service/stove-large.png'),data:[
                    {icon:require('../../img/service/bed1.png'),title:'Cama casal',count:0},
                    {icon:require('../../img/service/bed1.png'),title:'Cama solteiro',count:0},
                    {icon:require('../../img/service/wardrobe1.png'),title:'Guarda-roupa',count:0},
                    {icon:require('../../img/service/dresser.png'),title:'Cômoda',count:0}
                    
                ]},
                {icon:require('../../img/service/table.png'),title:'Sala de Jantar',largeicon:require('../../img/service/table-large.png'),data:[
                    {icon:require('../../img/service/table1.png'),title:'Mesa de jantar',count:0},
                    {icon:require('../../img/service/chair.png'),title:'Cadeiras',count:0},
                    {icon:require('../../img/service/wardrobe.png'),title:'Buffet',count:0}
                ]},
                {icon:require('../../img/service/laundry-machine.png'),title:'Lavanderia',largeicon:require('../../img/service/laundry-machine-large.png'),data:[
                    {icon:require('../../img/service/laundry-machine2.png'),title:'Máquina de lavar',count:0},
                    {icon:require('../../img/service/laundry-machine1.png'),title:'Cama solteiro',count:0},
                    {icon:require('../../img/service/wardrobe.png'),title:'Buffet',count:0}
                ]},
                {icon:require('../../img/service/outdoor-cafe.png'),title:'Área Externa',largeicon:require('../../img/service/outdoor-cafe-large.png'),data:[
                    {icon:require('../../img/service/chair.png'),title:'Cadeiras',count:0},
                    {icon:require('../../img/service/longchair.png'),title:'Banco',count:0},
                    {icon:require('../../img/service/table1.png'),title:'Mesa',count:0},
                    {icon:require('../../img/service/barbecue.png'),title:'Cômoda',count:0}
                ]}
            ],
            params:{},
            toggle:-1
        }
    }

    save = (index,data) => {
        let service = this.state.service;
        service[index].data = data;
        this.setState({
            service:service
        })
    }
    componentDidMount()
    {
        console.log(this.props.navigation.state.params);
        this.setState({
            params:this.props.navigation.state.params.data
        })   
    }
    toggle = (index) => {
        let toggle  = -1;
        if(this.state.toggle != index)
        {
            toggle = index;
        }
        this.setState({toggle:toggle});
    }

    continue = () => {
        let data = this.state.service;
        let value = [];
        for(let item in data)
        {
            if(data[item].data)
            {
                for(let index in data[item].data)
                {
                    if(data[item].data[index].count > 0)
                    {
                        value.push({label:data[item].data[index].title,count:data[item].data[index].count})
                    }
                }
            }
        }

        let params = this.state.params;
        params.value = value;

        this.props.navigation.navigate('confirm',{params:params});
    }

    special = () => {
        this.props.navigation.navigate('confirm',{special:true,selectspecial:this.selectspecific,specialtext:this.state.params.specialdata})
    }

    selectspecific = (data) => {
        let params = this.state.params;
        params.specialdata = data;
        this.setState({
            params:params
        })
    }

    render()
    {
        let self = this;
        return (
            <CheckoutLayout {...this.props}>
                <Text style={style.title}>Legal, agora é o inventário</Text>
                <Text style={style.description}>O que vai levar na sua mudança?</Text>
                <View style={style.servicelist}>
                    {
                        this.state.service.map((row,index)=>{
                            if(self.state.toggle == index){
                                return (
                                    <ServiceItem key={index} data={row} save={(data)=>this.save(index,data)} toggle={()=>self.toggle(index)}></ServiceItem>
                                ) 
                            }
                            else{
                                return (
                                    <TouchableOpacity key={index} style={style.serviceitem} onPress={()=>self.toggle(index)}>
                                        <View style={style.iconcontainer}>
                                            <Image source={row.icon}></Image>
                                        </View>
                                        <Text style={style.servicetitle}>{row.title}</Text>
                                        <Image source={require('../../img/icon/chevron-right-white.png')} style={style.righticon}></Image>
                                    </TouchableOpacity>
                                )
                            }
                            
                        })
                    }
                </View>
                <Text style={style.largelisttext}>
                    Possui objetos grandes e ou frágeis {'\n'}
                    que gostaria de listar?
                </Text>
                <View style={{marginTop:hp('2.446%'),borderBottomColor:'#8995FF', borderBottomWidth:1}}>
                    <TouchableOpacity style={style.serviceitem} onPress={this.special}>
                        <View style={style.iconcontainer}>
                            <Image source={require('../../img/service/stationary-bicycle.png')}></Image>
                        </View>
                        <Text style={style.servicetitle}>{this.state.params.specialdata?this.state.params.specialdata:'Outros itens grandes/frágeis'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={style.continuebtn} onPress={this.continue}>
                    <Text style={style.continuetext}>CONTINUAR</Text>
                </TouchableOpacity>
            </CheckoutLayout>
        )
    }
}

const style = StyleSheet.create({
    title:{
        marginTop:hp('9.42%'),
        color:'#FFF',
        fontSize:hp('2.45%'),
        fontWeight:'500',
        textAlign:'center'
    },
    description:{
        fontSize:hp('2.17%'),
        color:'#FFF',
        marginTop:hp('7.74%'),
        textAlign:'center'
    },
    servicelist:{
        flex:1,
        marginTop:hp('7.745%'),
        borderBottomColor:'#8995FF',
        borderBottomWidth:1
    },
    serviceitem:{
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:wp('4.83%'),
        height:hp('6.657%'),
        borderTopColor:'#8995FF',
        borderTopWidth:1
    },
    iconcontainer:{
        width:hp('3.076%')
    },
    servicetitle:{
        fontSize:hp('2.174%'),
        color:'#FFF',
        marginLeft:wp('3.14%')
    },
    righticon:{
        marginLeft:'auto',
        marginRight:wp('0.48%')
    },
    largelisttext:{
        fontSize:hp('1.9%'),
        fontWeight:'500',
        lineHeight:hp('2.174%'),
        textAlign:'center',
        marginTop:hp('10.87%'),
        color:'#FFF'
    },
    continuebtn:{
        flexDirection:'row',
        marginTop:hp('8.424%'),
        width:wp('76.33%'),
        alignSelf:'center',
        paddingTop:hp('2.31%'),
        paddingBottom:hp('2.31%'),
        borderRadius:4,
        borderWidth:1,
        borderColor:'#FFF',
        justifyContent:'center',
        marginBottom:hp('6.93%')
    },
    continuetext:{
        color:'#FFF',
        fontSize:hp('1.9%'),
        fontWeight:'bold',
        textAlign:'center'
    }
})
export default CheckoutPage;