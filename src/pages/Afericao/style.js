import { StyleSheet } from "react-native";
import { Platform } from "react-native-web";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 50
  },
  title: {
    fontSize: 40,
    color: '#33ACFF',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    width: 300,
    marginTop: 10,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#33ACFF',
    marginLeft: 'auto',  
    marginRight: 'auto',
    color: '#161819',
    fontSize: 20
  },
  inputPressao: {
    width: 134,
    padding: 10,
    paddingBottom: -20,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#33ACFF',
    marginLeft: 'auto',  
    marginRight: 'auto',
    color: '#161819',
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputDate: {
    width: 255,
    marginTop: 10,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#33ACFF',
    marginLeft: 2,  
    marginRight: 'auto',
    color: '#161819',
    fontSize: 20
  },
  textPressao: {
    width: 255,
    marginTop: 30,
    marginLeft: -50,
    marginBottom: -15,
    marginStart: -20,
    color: '#161819',
    fontSize: 20,
  },
  buttonRegister: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33ACFF',
    borderRadius: 50,
    marginTop: 30
  },
  textButtonSave: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20
  },
  contentAlert: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  warningAlert: {
    paddingLeft: 10,
    color: '#bdbdbd',
    fontSize: 16
  }, 
  login: {
    marginTop: 20,
    color: '#161819'
  },
  linkLogin: {
    color: '#1877f2',
    fontSize: 16
  },
  icon: {
    marginTop: 30,
    marginLeft: 10
  },
});

export default styles;