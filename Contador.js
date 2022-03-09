import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

export default function Contador(props){

    let done = false;

    useEffect(() => {

        const timer = setInterval(() => {

           props.setarSegundos(props.Segundos - 1)

           if(props.Segundos <= 0){
               if(props.Minutos > 0){
                   props.setarMinutos(props.Minutos - 1);
                   props.setarSegundos(59);
               }else{
                   if(!done){
                       done = true;
                       props.SetarEstado('selecionar')
                       props.setarMinutos(1);
                       props.setarSegundos(0);
                       playSound()
                       alert("Acabou o tempo");
                   }
               }
           }

        }, 1000)

        return () => clearInterval(timer)

    })

    async function playSound(){
        const soundObject = new Audio.Sound()
        try{
            let alarme;
            props.alarmes.map((val) => {
                if(val.selecionado){
                    alarme = val.file;
                }
            })
            await soundObject.loadAsync(alarme);
            await soundObject.playAsync();
        } catch (error){

        }
    }

    function resetar(){
        props.SetarEstado('selecionar')
        props.setarMinutos(1);
        props.setarSegundos(0);
    }

    function formatarNumero(number){
        let finalNumber = ""

        if(number < 10){
            finalNumber = "0"+number;
        }else{
            finalNumber = number;
        }

        return finalNumber;
    }

    let segundos = formatarNumero(props.Segundos)
    let minutos = formatarNumero(props.Minutos)

    return(
        <View style={styles.container}>

            <StatusBar white />
            <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.background}
          />

          <View style={{flexDirection:'row'}}>
            <Text style={styles.textContador}>{minutos} : </Text>
            <Text style={styles.textContador}>{segundos}</Text>
          </View>

          <TouchableOpacity onPress={() => resetar()} style={styles.btnIniciar}>
                <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>Resetar</Text>
          </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgb(80, 50, 168)'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    textContador:{
        color:'white',
        fontWeight:'bold',
        fontSize:40
    },
    btnIniciar:{
        backgroundColor:'rgb(80, 50, 168)',
        width:130,
        height:130,
        borderRadius:65,
        borderWidth:10,
        marginTop:35,
        borderColor:'rgba(80, 50, 168, 0.4)',
        alignItems:'center',
        justifyContent:'center'
      }

})