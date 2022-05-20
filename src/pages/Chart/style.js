import { StyleSheet } from "react-native";
import { Platform } from "react-native-web";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : 10
  },
  chart: {
    height: 200, 
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: '#A6BFC2',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  }
});

export default styles;