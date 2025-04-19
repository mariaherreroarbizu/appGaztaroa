import { StyleSheet } from 'react-native';
import { colorGaztaroaOscuro } from '../comun/comun';

const styles = StyleSheet.create({
    container: {
        margin: 10,    
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'chocolate',
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
    },
});
export default styles;

export const stylesCampoBase = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export const stylesDetalleExcursion = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -60,
  },
});

export const stylesIndicadorActividad = StyleSheet.create({
  indicadorView: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
  },
  indicadorText: {
      color: colorGaztaroaOscuro,
      fontSize: 14,
      fontWeight: 'bold'
  }
});