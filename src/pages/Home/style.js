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
    fontSize: 38,
    color: '#33ACFF',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  input: {
    width: 300,
    marginTop: 10,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#33ACFF',
    marginLeft: 'auto',  
    marginRight: 'auto',
    color: '#4d5156'  
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33ACFF',
    borderRadius: 50,
    marginTop: 30
  },
  textButton: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  contentAlert: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  warningAlert: {
    paddingLeft: 10,
    color: '#bdbdbd',
    fontSize: 16
  }, 
  registration: {
    marginTop: 20,
    color: '#4d5156'
  }
});

export default styles;