import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Chart from '../Chart';

import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation, route }) {
  const [dadosUsuario, setDadosUsuario] = useState([]);
  const [dadosAfericoes, setDadosAfericoes] = useState([]);
  const [errorRegister, setErrorRegister] = useState('');

  const db = firebase.firestore();
  const idUser = route.params.idUser;

  const itensHome = [
    {

    }
  ]

  const getDadosUsuario = () => {
    db.collection('dadosUsuarios').doc(idUser).get()
      .then(doc => {
        if (doc && doc.exists) {
          // console.log(doc.id, '=>', doc.data());
          setDadosUsuario(doc.data())
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  const getDadosAfericoes = () => {
    db.collection('afericoes').doc(global.userId).get()
      .then(doc => {
        if (doc && doc.exists) {
          let dados = doc.data();
          const arrDados = [];
          Object.values(dados).map(item => {
            arrDados.push(item)
          })
          arrDados.sort((a, b) => {
            return new Date(a.data) - new Date(b.data);
          })
          setDadosAfericoes(arrDados);
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  useEffect(() => {
    getDadosUsuario();
    getDadosAfericoes();
  }, []);

  return (
    <View style={styles.container}>
      {dadosUsuario.tipoUsuario === '2' ?
        <View>
          <Text style={styles.title}>Olá, {dadosUsuario.nome}!</Text>
          <Text style={styles.textItem}>Gráfico de Glicemia</Text>
          <Chart
            dadosUsuario={dadosUsuario}
            dadosAfericoes={dadosAfericoes}
          />
          <Text style={styles.textItem}>Gráfico de Pressão Arterial</Text>
          <Chart
            dadosUsuario={dadosUsuario}
            dadosAfericoes={dadosAfericoes}
          />
        </View>
        :
        <View>
          <Text style={styles.title}>Olá,</Text>
          <Text style={styles.title}>Dr.(a) {dadosUsuario.nome}!</Text>
          <Text>{dadosUsuario.crm}</Text>
        </View>
      }
    </View>
  )
}