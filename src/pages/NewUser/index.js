import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import firebase from '../../config/firebase'
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NewUser({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [crm, setCrm] = useState('');
  const [errorRegister, setErrorRegister] = useState('');

  const register = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Chart', { idUser: user.uid });
      })
      .catch((error) => {
        setErrorRegister(true);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Criar conta</Text>
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
      <TextInput
        style={styles.input}
        placeholder='Insira seu CRM'
        type="text"
        onChangeText={(text) => setCrm(text)}
        value={crm}
      />
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