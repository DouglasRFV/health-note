import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MinhasAfericoes({ navigation, route }) {

  const [dadosAfericoes, setDadosAfericoes] = useState([]);

  const db = firebase.firestore();

  const getDadosAfericoes = () => {
    console.log('ENTROU', global.userId);
    db.collection('afericoes').doc(global.userId).get()
      .then(doc => {
        if (doc && doc.exists) {
          let dados = doc.data();
          const arrDados = [];
          Object.values(dados).map(item => {
            let tempDate = new Date(item.data);
            let fDay = tempDate.getDate() < 10 ? `0${tempDate.getDate()}` : tempDate.getDate();
            let fMonth = tempDate.getMonth() + 1 < 10 ? `0${tempDate.getMonth() + 1}` : tempDate.getMonth() + 1;
            let stringDate = `${fDay+1}/${fMonth}/${tempDate.getFullYear()}`
            item.dataStr = stringDate;
            arrDados.push(item)
          })
          arrDados.sort((a, b) => {
            return new Date(a.data) - new Date(b.data);
          })
          setDadosAfericoes(arrDados);
          console.log('DADOS');
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  const atualizaAfericao = () => {
    // db.collection('afericoes').doc(global.userId).where('data', '==', '2022-05-20').update({
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
        <Text  style={styles.textItemObservacao}><Text style={styles.textItem}>Obs.: </Text>{observacao}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {console.log(item);}}>
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