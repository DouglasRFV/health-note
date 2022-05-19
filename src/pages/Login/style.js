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
    fontSize: 48,
    color: '#33ACFF',
    marginBottom: 10,
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
    color: '#4d5156',
    fontSize: 20  
  },
  buttonLogin: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33ACFF',
    borderRadius: 50,
    marginTop: 30
  },
  textButtonLogin: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20
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
    color: '#4d5156',
    fontSize: 18
  },
  linkSubscribe: {
    color: '#1877f2',
    fontSize: 18
  }
});

export default styles;