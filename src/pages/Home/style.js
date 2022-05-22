import { StyleSheet } from "react-native";
import { Platform } from "react-native-web";
import { Dimensions } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    marginLeft: 'auto',  
    marginRight: 'auto',
  },
  title: {
    fontSize: 30,
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
  textItem: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: -5,
    fontWeight: 'bold',
    color: '#55555A',
    fontSize: 18
  },
});

export default styles;