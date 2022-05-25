import { StyleSheet } from "react-native";
import { Platform } from "react-native-web";
import { Dimensions } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: Dimensions.get("window").width + 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
  },
  title: {
    fontSize: 30,
    color: '#33ACFF',
    marginLeft: 10,
    fontWeight: 'bold'
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
  textItem: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#55555A',
    fontSize: 16
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
  button: {
    width: Dimensions.get("window").width - 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33ACFF',
    borderRadius: 10,
    marginTop: 10
  },
  textButton: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20
  },
});

export default styles;