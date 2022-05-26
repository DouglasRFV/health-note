import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Chart from '../Chart';
import { cpfMask } from 'masks-br';
import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation, route }) {
  const [dadosUsuario, setDadosUsuario] = useState([]);
  const [tipoUsuario, setTipoUsuario] = useState(0);
  const [arrGlicemia, setArrGlicemia] = useState([]);
  const [arrDiasAfericao, setArrDiasAfericao] = useState([]);
  const [arrPressao, setArrPressao] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semAfericao, setSemAfericao] = useState(false);
  const [dadosPacientes, setDadosPacientes] = useState([]);

  const db = firebase.firestore();

  const getDadosUsuario = async () => {
    console.log('DADOS USUARIO');
    await db.collection('dadosUsuarios').doc(global.userId).get()
      .then(doc => {
        if (doc && doc.exists) {
          setDadosUsuario(doc.data());
          if (doc.data().tipoUsuario === '1') {
            setTipoUsuario(1);
            getPacientes();
          } else if (doc.data().tipoUsuario === '2') {
            setTipoUsuario(2);
            getDadosAfericoes();
          }
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  const getDadosAfericoes = async () => {
    await db.collection('afericoes').doc(global.userId).get()
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

  const getPacientes = () => {
    db.collection('pacientesMedico').doc(global.userId).get()
      .then(doc => {
        if (doc && doc.exists) {
          let dados = doc.data();
          const arrDados = [];
          Object.values(dados).map(item => {
            arrDados.push(item)
          })
          // console.log('DADOS =>', arrDados);
          setDadosPacientes(arrDados);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  const pacienteChart = (idUser) => {
    navigation.navigate('ChartPaciente', { idUser: idUser })
  }

  const Item = ({ nome, cpf }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItemCard}>{nome}</Text>
        <Text style={styles.textItemCPF}>CPF: {cpfMask(cpf)}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => { navigation.navigate('ChartPaciente', { idUser: item.id }) }}>
        <Item
          nome={item.nome}
          cpf={item.cpf}
        />
      </TouchableOpacity>
    )
  };

  useEffect(() => {
    getDadosUsuario();
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
          <Text style={styles.title}>Nenhuma Aferição Anotada</Text>
        </View>
      );
    } else {
      if (tipoUsuario === 2) {
        return (
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
        )
      } else if (tipoUsuario === 1) {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Olá, Dr.(a) {dadosUsuario.nome}!</Text>
            <Text style={styles.crm}>CRM: {dadosUsuario.crm}/BR</Text>
            <FlatList
              data={dadosPacientes}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )
      }
    }

  }
}