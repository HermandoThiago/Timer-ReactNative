import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Contador from './Contador'

export default function App() {
  
  const [Segundos, setSegundos] = useState(0)
  const [Minutos, setMinutos] = useState(1)
  const [Estado, setEstado] = useState('selecionar')

  let numbers = []

  for(i = 1; i <= 60; i++){
    numbers.push(i)
  }

  const [AlarmeSound, setAlarmeSound] = useState([
    {
      id:1,
      selecionado: true,
      sound: 'alarme1'
    },
    {
      id:2,
      selecionado: false,
      sound:'alarme2'
    }
  ])

  function setarAlarme(id){
    alert('alarme alterado')

    let alarmesTemp = AlarmeSound.map((val => {
      if(id != val.id)
        val.selecionado = false;
      else
        val.selecionado = true;
      return val;
    }))
    setAlarmeSound(alarmesTemp)
  }

  if(Estado == 'selecionar'){
      return (
        <View style={styles.container}>
          <StatusBar style="auto" />

          <LinearGradient
            // Background Linear Gradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.background}
          />

          <Text style={styles.textTime}>Selecione o seu tempo</Text>
          
          <View style={{flexDirection:'row'}}>
            
            <Text style={styles.textPicker}>Min:</Text>
            
            <Picker 
            style={styles.pickerStyles}
            selectedValue={Minutos}
            onValueChange={(itemValue, itemIndex) => {
              setMinutos(itemValue)
            }}
            >
              {
                numbers.map((val) => {
                  return(
                    <Picker.Item label={val.toString()} value={val.toString()} />
                  );
                })
              }
            </Picker>
            
            <Text style={styles.textPicker}>Seg:</Text>
            
            <Picker 
            style={styles.pickerStyles} 
            selectedValue={Segundos}
            onValueChange={(itemValue, itemIndex) => {
              setSegundos(itemValue)
            }}>
              
              <Picker.Item label='0' value='0' />
              
              {
                numbers.map((val) => {
                  return(
                    <Picker.Item label={val.toString()} value={val.toString()} />
                  );
                })
              }
            
            </Picker>
          
          </View>

          <View style={{flexDirection:'row', marginTop:20}}>

              {
                AlarmeSound.map((val) => {
                  
                  if(val.selecionado){
                    return(
                      <TouchableOpacity onPress={() => setarAlarme(val.id)} style={styles.btnSoundSelecionado}>
                        <Text style={{color:'white', textAlign:'center'}}>{val.sound}</Text>
                      </TouchableOpacity>
                    );
                  }else{
                    return(
                      <TouchableOpacity onPress={() => setarAlarme(val.id)} style={styles.btnSound}>
                        <Text style={{color:'white', textAlign:'center'}}>{val.sound}</Text>
                      </TouchableOpacity>
                    );
                  }
                  
                })
              }

          </View>
              <TouchableOpacity onPress={() => setEstado('iniciar')} style={styles.btnIniciar}>
                <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>Iniciar</Text>
              </TouchableOpacity>
        </View>
      );

  }else if(Estado == 'iniciar'){
          return(
            <Contador
            setarMinutos={setMinutos}
            setarSegundos={setSegundos}
            SetarEstado={setEstado}
            Minutos={Minutos}
            Segundos={Segundos}
            ></Contador>
          )
        }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(80, 50, 168)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  pickerStyles:{
    height:50,
    width:100,
    color:'white'
  },
  textTime:{
    color:'white',
    fontSize:22,
    fontWeight:'bold',
    marginBottom:25
  },
  textPicker:{
    paddingTop:16,
    color:'white'
  },
  btnSound:{
    width:120,
    padding:8,
    backgroundColor:'rgb(80, 50, 168)',
    borderRadius:20,
    marginRight:12
  },
  btnSoundSelecionado:{
    width:120,
    padding:8,
    backgroundColor:'rgba(80, 50, 168, 0.4)',
    borderRadius:20,
    marginRight:12,
    borderWidth:1,
    borderColor:'white'
  },
  btnIniciar:{
    backgroundColor:'rgb(80, 50, 168)',
    width:110,
    height:110,
    borderRadius:55,
    borderWidth:10,
    marginTop:35,
    borderColor:'rgba(80, 50, 168, 0.4)',
    alignItems:'center',
    justifyContent:'center'
  }
});
