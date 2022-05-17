import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Afericao({ navigation, route }) {
  const [data, setData] = useState('');
  const [glicemia, setGlicemia] = useState('');
  const [pressao, setPressao] = useState('');
  const [errorRegister, setErrorRegister] = useState('');

  const db = firebase.firestore();

  const salvarAfericao = () => {
    db.collection('afericoes').doc(route.params.idUser).set({
      '2020-05-11': {
        glicemia,
        pressao
      }
    }).then(() => {
      console.log("Document successfully written!");
    })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Aferição diária</Text>
      <TextInput
        style={styles.input}
        placeholder='Insira sua glicemia'
        type="number"
        onChangeText={(text) => setGlicemia(text)}
        value={glicemia}
      />
      <TextInput
        style={styles.input}
        placeholder='Insira sua pressão'
        type="number"
        onChangeText={(text) => setPressao(text)}
        value={pressao}
      />
      {errorRegister === true ?
        <View style={styles.contentAlert}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={24}
            color="#bdbdbd"
          />
          <Text style={styles.warningAlert}>Valores inválidos</Text>
        </View>
        :
        <View />
      }
      {glicemia === '' || pressao === '' ?
        <TouchableOpacity
          disabled={true}
          style={styles.buttonRegister}
        >
          <Text style={styles.textButtonRegister}>Salvar</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={salvarAfericao}
        >
          <Text style={styles.textButtonRegister}>Salvar</Text>
        </TouchableOpacity>
      }
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}