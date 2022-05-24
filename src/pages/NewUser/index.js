import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NewUser({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [crm, setCrm] = useState('');
  const [cpf, setCpf] = useState('');
  const [listaMedicos, setListaMedicos] = useState([]);
  const [nomeMedico, setNomeMedico] = useState('');
  const [open, setOpen] = useState(false);
  const [openMedico, setOpenMedico] = useState(false);
  const [errorRegister, setErrorRegister] = useState('');

  const db = firebase.firestore();

  const [items, setItems] = useState([
    { label: 'Médico', value: '1' },
    { label: 'Paciente', value: '2' }
  ]);

  const getMedicos = async () => {
    // console.log('CHAMOU GET MEDICOS');
    const dados = [];
    await db.collection('medicos').get()
      .then((query) => {
        query.forEach((doc) => {
          dados.push({
            label: doc.data().nome,
            value: doc.data().id
          });
        });
        setListaMedicos(dados);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    // console.log('DADOS MÉDICOS =>', dados);
  }

  const register = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        let today = new Date().toISOString().slice(0, 10);
        global.userId = user.uid;

        db.collection('dadosUsuarios').doc(user.uid).set({
          nome: nome,
          tipoUsuario: tipoUsuario,
          crm: crm ? crm : '',
          cpf: cpf ? cpf : ''

        });

        if (crm && crm !== '') {
          db.collection('medicos').doc(user.uid).set({
            id: user.uid,
            nome: nome,
            crm: crm
          });
        } else {
          db.collection('pacientesMedico').doc(nomeMedico).set({
            id: user.uid,
            nome: nome,
            cpf: cpf
          });

          db.collection('afericoes').doc(global.userId).set({
            [today]: {
              'data': today,
              'glicemia': '',
              'pressaoSist': '',
              'pressaoDiast': '',
              'observacao': ''
            }
          });
        }

        setEmail('');
        setPassword('');
        setNome('');
        setCrm('');
        setCpf('');
        
        if(tipoUsuario === '1') {
          navigation.navigate('Home', { idUser: user.uid });
        } else if(tipoUsuario === '2') {
          navigation.navigate('Afericao', { idUser: user.uid });
        }
        setTipoUsuario('');

      })
      .catch((error) => {
        console.log('ERROR', error);
        setErrorRegister(true);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  useEffect(() => {
    getMedicos();
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Criar conta</Text>
      <DropDownPicker
        style={styles.inputDropdown}
        placeholder='Tipo de Usuário'
        placeholderStyle={{
          color: '#A5B0BD',
          fontSize: 20,
          paddingLeft: 5
        }}
        open={open}
        value={tipoUsuario}
        items={items}
        setOpen={setOpen}
        setValue={setTipoUsuario}
        setItems={setItems}
      />
      <TextInput
        style={styles.input}
        placeholder='Insira seu e-mail'
        type="text"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder='Insira sua senha'
        type="text"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder='Insira seu nome'
        type="text"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />
      {tipoUsuario === '1' ?
        <TextInput
          style={styles.input}
          placeholder='Insira seu CRM'
          type="text"
          onChangeText={(text) => setCrm(text)}
          value={crm}
        /> : tipoUsuario === '2' ?
          <View>
            <TextInput
              style={styles.input}
              placeholder='Insira seu CPF'
              type="text"
              onChangeText={(text) => setCpf(text)}
              value={cpf}
            />
            <DropDownPicker
              style={styles.inputDropdown}
              placeholder='Nome do médico'
              placeholderStyle={{
                color: '#A5B0BD',
                fontSize: 20,
                paddingLeft: 5
              }}
              open={openMedico}
              value={nomeMedico}
              items={listaMedicos}
              setOpen={setOpenMedico}
              setValue={setNomeMedico}
              setItems={setListaMedicos}
            />
          </View>
          :
          <View />
      }
      {errorRegister === true ?
        <View style={styles.contentAlert}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={24}
            color="#bdbdbd"
          />
          <Text style={styles.warningAlert}>E-mail ou senha inválidos</Text>
        </View>
        :
        <View />
      }
      {email == '' || password === '' ?
        <TouchableOpacity
          disabled={true}
          style={styles.buttonRegister}
        >
          <Text style={styles.textButtonRegister}>Registrar</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={register}
        >
          <Text style={styles.textButtonRegister}>Registrar</Text>
        </TouchableOpacity>
      }
      <Text style={styles.login}>
        Já está cadastrado?
        <Text
          style={styles.linkLogin}
          onPress={() => navigation.navigate('Login')}
        >
          Login...
        </Text>
      </Text>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}