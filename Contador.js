import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Contador(props){

    return(
        <View style={styles.container}>

            <StatusBar white />
            <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.background}
          />

          <View style={{flexDirection:'row'}}>
            <Text style={styles.textContador}>{props.Minutos} : </Text>
            <Text style={styles.textContador}>{props.Segundos}</Text>
          </View>

          <TouchableOpacity onPress={() => props.SetarEstado('selecionar')} style={styles.btnIniciar}>
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