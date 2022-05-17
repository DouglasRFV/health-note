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
  const [pressao, setPressao] = useState('');
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
        onChangeText={(text) => {
          setGlicemia(text);
          setFocus(true);
        }}
        value={glicemia}
      />
      <TextInput
        style={styles.input}
        placeholder='Insira sua pressão'
        type="number"
        onChangeText={(text) => {
          setPressao(text);
          setFocus(true);
        }}
        value={pressao}
      />
      <View style={styles.contentAlert}>
        <TextInput
          style={styles.inputDate}
          placeholder='Insira a data'
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
          displey='default'
          onChange={onChangeDate}
        />
      )}
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