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
    fontSize: 30,
    color: '#33ACFF',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    width: 300,
    marginTop: 10,
    padding: 10,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#33ACFF',
    marginLeft: 'auto',  
    marginRight: 'auto',
    color: '#4d5156'  
  },
  inputDate: {
    width: 255,
    marginTop: 10,
    padding: 10,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#33ACFF',
    marginLeft: 10,  
    marginRight: 'auto',
    color: '#4d5156'  
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
  textButtonRegister: {
    color: '#ffffff',
    fontWeight: 'bold'
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
    color: '#4d5156'
  },
  linkLogin: {
    color: '#1877f2',
    fontSize: 16
  },
  icon: {
    marginTop: 30,
    marginLeft: 10
  }
});

export default styles;