import React,{Component} from 'react';

import {View,ScrollView,StyleSheet,Text} from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import MainLayout from './Component/MainLayout';
import LocationComponent from './Component/LocationComponent';
import * as UserService from '../Service/UserService';
import * as OrderService from '../Service/OrderService';

class MoveoutConfim extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            order:[],
            selected:false
        }
    }

    componentDidMount()
    {
        this.updateinfo();
    }

    componentWillReceiveProps()
    {
        this.updateinfo();
    }

    updateinfo = () => {
        let self = this;
        this.getuserid().then(user=>{
            let userid = user.uid;
            OrderService.getorder(userid).then(result=>{
                self.setState({
                    order:result
                })
            })
        })
    }
    getuserid = async() => {
        let user = await UserService.getuser();
        return user;
    }

    active = async(orderid) => {
        let order = this.state.order;
        let self = this;
        for(let item in order)
        {
            if(order[item].guid == orderid)
            {
                if(!order[item].active)
                {
                    OrderService.enableorder(orderid).then(result=>{
                        console.log(result);
                        let order = self.state.order;
                        for(let item in order)
                        {
                            if(order[item].guid == orderid)
                            {
                                order[item].active = true;
                            }
                            break;
                        }

                        self.setState({
                            order:order
                        })
                    })
                }
                else
                {
                    if(this.state.selected != orderid)
                    {
                        this.setState({selected:orderid});
                    }
                    else
                    {
                        this.setState({selected:false});
                    }
                }
                break;
            }
        }
    }

    render()
    {
        return (
            <MainLayout {...this.props} activetruck={true}>
                <ScrollView style={style.container}>
                    <View style={style.title}>
                        <Text style={style.titletext}>Moveouts</Text>
                    </View>
                    {
                        this.state.order.map((row,index)=>{
                            return <LocationComponent key={index} data={row} active={(orderid)=>this.active(orderid)} opened={this.state.selected}></LocationComponent>
                        })
                    }
                    {/* <LocationComponent></LocationComponent> */}
                </ScrollView>
            </MainLayout>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        flex:1,
        marginLeft:wp('10.5%'),
        marginTop:hp('4.9%')
    },
    titletext:{
        fontSize:hp('2.2%'),
        color:'#939393'
    }
})

export default MoveoutConfim;