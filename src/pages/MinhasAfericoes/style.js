import { StyleSheet } from "react-native";
import { Platform } from "react-native-web";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : 10
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
    fontWeight: 'bold',
    color: '#55555A',
    fontSize: 15.5
  },
  titleItem: {
    fontWeight: 'bold',
    color: '#2383DE',
    fontSize: 25
  },
  textItemAlert: {
    fontWeight: 'bold',
    color: '#A00011',
    fontSize: 15.5
  },
  contentAlert: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default styles;