import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AfericoesPaciente({ navigation, route }) {

  const [dadosAfericoes, setDadosAfericoes] = useState([]);
  const idUser = route.params.idUser

  const db = firebase.firestore();

  const formataStringData = (data) => {
    var ano = data.split("-")[0];
    var mes = data.split("-")[1];
    var dia = data.split("-")[2];

    return ("0" + dia).slice(-2) + '/' + ("0" + mes).slice(-2) + '/' + ano;
  }

  const getDadosAfericoes = () => {
    db.collection('afericoes').doc(idUser).get()
      .then(doc => {
        if (doc && doc.exists) {
          let dados = doc.data();
          const arrDados = [];
          Object.values(dados).map(item => {
            let stringDate = formataStringData(item.data);
            item.dataStr = stringDate;
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

  const atualizaAfericao = () => {
    // db.collection('afericoes').doc(idUser).where('data', '==', '2022-05-20').update({
    //   observacao: 'teste testes teste'  
    // }).then(() => {
    //   console.log("Document successfully written!");
    // })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });
  }

  const Item = ({ data, glicemia, pressaoSist, pressaoDiast, observacao }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.titleItem}>{data}</Text>
        {glicemia > 140 ?
          <View style={styles.contentAlert}>
            <Text style={styles.textItemAlert}>Glicemia acima do normal: {glicemia} mg/dL</Text>
            <MaterialCommunityIcons
              name="alert-circle"
              size={24}
              color="#A00011"
              titleItem='test'
            />
          </View>
          :
          <Text style={styles.textItem}>Glicemia: {glicemia} mg/dL</Text>
        }
        {pressaoSist >= 13 || pressaoDiast > 8 ?
          <View style={styles.contentAlert}>
            <Text style={styles.textItemAlert}>Pressão acima do normal: {pressaoSist}/{pressaoDiast} mmHG</Text>
            <MaterialCommunityIcons
              name="alert-circle"
              size={24}
              color="#A00011"
              titleItem='test'
            />
          </View>
          :
          <Text style={styles.textItem}>Pressão Arterial: {pressaoSist}/{pressaoDiast} mmHG</Text>
        }
        <Text style={styles.textItemObservacao}><Text style={styles.textItem}>Obs.: </Text>{observacao}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => { console.log(item); }}>
        <Item
          data={item.dataStr}
          glicemia={item.glicemia}
          pressaoSist={item.pressaoSist}
          pressaoDiast={item.pressaoDiast}
          observacao={item.observacao}
        />
      </TouchableOpacity>
    )
  };

  useEffect(() => {
    getDadosAfericoes();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={dadosAfericoes}
        renderItem={renderItem}
        keyExtractor={item => item.data}
      />
    </View>
  )
}