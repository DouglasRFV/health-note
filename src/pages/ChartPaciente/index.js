import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Chart from '../Chart';

import firebase from '../../config/firebase'
import styles from './style';

export default function ChartPaciente({ navigation, route }) {
  const [dadosUsuario, setDadosUsuario] = useState([]);
  const [arrGlicemia, setArrGlicemia] = useState([]);
  const [arrDiasAfericao, setArrDiasAfericao] = useState([]);
  const [arrPressao, setArrPressao] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semAfericao, setSemAfericao] = useState(false);
  const idUser = route.params.idUser;
  const db = firebase.firestore();

  const getDadosUsuario = async () => {
    await db.collection('dadosUsuarios').doc(idUser).get()
      .then(doc => {
        if (doc && doc.exists) {
          setDadosUsuario(doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  const getDadosAfericoes = async () => {
    await db.collection('afericoes').doc(idUser).get()
      .then(doc => {
        if (doc.exists && doc.data()) {
          let dados = doc.data();
          let withoutAfericao = false;

          Object.values(dados).map(item => {
            if (item.glicemia === '' &&
              item.pressaoSist === '' &&
              item.pressaoDiast === '') {
              withoutAfericao = true;
            }
          });

          if (Object.keys(dados).length === 1 && withoutAfericao) {
            setSemAfericao(true);
            setLoading(false);
          } else {
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

            if (arrDados.length < 15) {
              addItemsArray(arrDadosGlicemia);
              addItemsArray(arrDadosPressao);
              addItemsArray(arrDadosDiasAfericao);
            }

            setArrGlicemia(arrDadosGlicemia);
            setArrPressao(arrDadosPressao);
            setArrDiasAfericao(arrDadosDiasAfericao);

            setLoading(false);
            // console.log('GLICEMIA =>', arrGlicemia);
            // console.log('PRESSAO =>', arrPressao);
            // console.log('DIAS =>', arrDiasAfericao);
          }
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  const addItemsArray = (arr) => {
    if (arr.length < 15) {
      for (let i = 0; arr.length < 15; i++) {
        arr.unshift("0");
      }
    }

    return arr;
  }

  useEffect(() => {
    getDadosUsuario();
    getDadosAfericoes();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size='large'
          color={'#33ACFF'}
          animating={true}
        />
        <Text>Aguarde</Text>
      </View>
    );
  } else {
    if (semAfericao) {
      return (
        <View>
          <Text>Nenhuma Aferição Anotada</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Aferições de {dadosUsuario.nome}!</Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {navigation.navigate('AfericoesPaciente', { idUser: idUser })}}
          >
            <Text style={styles.textButton}>Aferições Completas</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}