import { StyleSheet } from "react-native";
import { Platform } from "react-native-web";
import { Dimensions } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  crm: {
    fontSize: 20,
    color: '#6C7481',
    marginLeft: 20,
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
    marginTop: 15,
    marginLeft: 10,
    marginBottom: -5,
    fontWeight: 'bold',
    color: '#55555A',
    fontSize: 18
  },
  item: {
    backgroundColor: '#C6F4FA',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#A6BFC2',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
  textItemCard: {
    marginTop: 2,
    fontWeight: 'bold',
    color: '#55555A',
    fontSize: 28
  },
  textItemCPF: {
    marginTop: 2,
    color: '#55555A',
    fontSize: 20
  },
  contentAlert: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default styles;