import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation, route }) {
  const [data, setData] = useState('');
  const [glicemia, setGlicemia] = useState('');
  const [pressao, setPressao] = useState('');
  const [dadosUsuario, setDadosUsuario] = useState([]);
  const [errorRegister, setErrorRegister] = useState('');

  const db = firebase.firestore();
  const idUser = route.params.idUser;

  const getDadosUsuario = () => {
    db.collection('dadosUsuarios').doc(idUser).get()
      .then(doc => {
        if (doc && doc.exists) {
          console.log(doc.id, '=>', doc.data());
          setDadosUsuario(doc.data())
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  useEffect(() => {
    getDadosUsuario();
  }, []);


  return (
    <View>
      <Text style={styles.title}>Olá,</Text>
      {dadosUsuario.crm === '' ? 
          <Text style={styles.title}>{dadosUsuario.nome}!</Text>
        : 
          <Text style={styles.title}>Dr. {dadosUsuario.nome}!</Text>
      }
      <Text>{dadosUsuario.crm}</Text>
    </View>
  )
}