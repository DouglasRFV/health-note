import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'

import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Afericao({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateInput, setDateInput] = useState('');
  const [dateSave, setDateSave] = useState('');
  const [focus, setFocus] = useState(false);
  const [glicemia, setGlicemia] = useState('');
  const [pressaoSist, setPressaoSist] = useState('');
  const [pressaoDiast, setPressaoDiast] = useState('');
  const [observacao, setObservacao] = useState('');
  const [errorRegister, setErrorRegister] = useState('');
  const db = firebase.firestore();


  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDay = tempDate.getDate() < 10 ? `0${tempDate.getDate()}` : tempDate.getDate();
    let fMonth = tempDate.getMonth() + 1 < 10 ? `0${tempDate.getMonth() + 1}` : tempDate.getMonth() + 1;
    let stringDate = `${fDay}/${fMonth}/${tempDate.getFullYear()}`;
    setDateInput(stringDate);
    stringDate = `${tempDate.getFullYear()}-${fMonth}-${fDay}`;
    setDateSave(stringDate);
    stringDate = '';
  };

  const salvarAfericao = () => {
    db.collection('afericoes').doc(global.userId).update({
      [dateSave]: {
        'data': dateSave,
        glicemia,
        pressaoSist,
        pressaoDiast,
        observacao
      }
    }).then(() => {
      console.log("Document successfully written!");
      setDateInput('');
      setDateSave('');
      setGlicemia('');
      setPressaoDiast('');
      setPressaoSist('');
      setObservacao('');
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
      <View style={styles.contentAlert}>
        <TextInput
          style={styles.inputDate}
          placeholder='Insira a data'
          placeholderTextColor={'#35414F'}
          type="date"
          onFocus={() => setShow(true)}
          value={dateInput}
          editable={false}
        />
        <MaterialCommunityIcons
          name="calendar-range"
          size={40}
          color="#bdbdbd"
          style={styles.icon}
          onPress={() => setShow(true)}
        />
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={'date'}
          is24Hour={true}
          display='default'
          onChange={onChangeDate}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder='Insira sua glicemia'
        placeholderTextColor={'#35414F'}
        keyboardType="numeric"
        onChangeText={(text) => {
          setGlicemia(text);
          setFocus(true);
        }}
        value={glicemia}
      />
      <Text style={styles.textPressao}>Insira sua pressão:</Text>
      <View style={styles.contentAlert}>
        <TextInput
          style={styles.inputPressao}
          placeholder='Sistólica'
          keyboardType="numeric"
          onChangeText={(text) => {
            setPressaoSist(text);
            setFocus(true);
          }}
          value={pressaoSist}
        />
        <MaterialCommunityIcons
            name="slash-forward"
            size={30}
            color="#bdbdbd"
            style={{marginBottom: -30}}
          />
        <TextInput
          style={styles.inputPressao}
          placeholder='Diastólica'
          keyboardType="numeric"
          onChangeText={(text) => {
            setPressaoDiast(text);
            setFocus(true);
          }}
          value={pressaoDiast}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder='Observação (Opcional)'
        placeholderTextColor={'#35414F'}
        pla
        type="text"
        onChangeText={(text) => {
          setObservacao(text);
          setFocus(true);
        }}
        value={observacao}
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
      {glicemia === '' || pressaoSist === '' || pressaoDiast === '' ?
        <TouchableOpacity
          disabled={true}
          style={styles.buttonRegister}
        >
          <Text style={styles.textButtonSave}>Salvar</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={salvarAfericao}
        >
          <Text style={styles.textButtonSave}>Salvar</Text>
        </TouchableOpacity>
      }
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}