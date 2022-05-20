import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Chart from '../Chart';

import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation, route }) {
  const [dadosUsuario, setDadosUsuario] = useState([]);
  const [arrGlicemia, setArrGlicemia] = useState([]);
  const [arrDiasAfericao, setArrDiasAfericao] = useState([]);
  const [arrPressao, setArrPressao] = useState([]);
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
          setDadosUsuario(doc.data());
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
          const arrDadosGlicemia = [];
          const arrDadosPressao = [];
          const arrDadosDiasAfericao = [];

          Object.values(dados).map(item => {
            arrDados.push(item)
          });

          arrDados.sort((a, b) => {
            return new Date(a.data) - new Date(b.data);
          });

          arrDados.forEach((element) => {
            arrDadosGlicemia.push(element.glicemia);
          });

          arrDados.forEach((element) => {
            arrDadosPressao.push(`${element.pressaoSist}.${element.pressaoDiast}`);
          });

          arrDados.forEach((element) => {
            arrDadosDiasAfericao.push(element.data.substr(8, 9));
          });

          setArrGlicemia(arrDadosGlicemia);
          setArrPressao(arrDadosPressao);
          setArrDiasAfericao(arrDadosDiasAfericao);

          console.log('GLICEMIA =>', arrGlicemia);
          console.log('PRESSAO =>', arrPressao);
          console.log('DIAS =>', arrDiasAfericao);
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };
  
  useEffect(() => {
    getDadosAfericoes();
    getDadosUsuario();
  }, []);

  return (
    <View style={styles.container}>
      {dadosUsuario.tipoUsuario === '2' ?
        <View style={styles.container}>
          <Text style={styles.title}>Olá, {dadosUsuario.nome}!</Text>
          <Text style={styles.textItem}>Gráfico de Glicemia(Últimos 15 dias)</Text>
          <Chart
            dadosUsuario={dadosUsuario}
            dados={arrGlicemia}
            dias={arrDiasAfericao}
            sufix={' mg/dL'}
            decimalPlaces={0}
          />
          <Text style={styles.textItem}>Gráfico de Pressão Arterial(Últimos 15 dias)</Text>
          <Chart
            dadosUsuario={dadosUsuario}
            dados={arrPressao}
            dias={arrDiasAfericao}
            sufix={' mmHG'}
            decimalPlaces={1}
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