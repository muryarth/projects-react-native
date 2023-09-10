import React from 'react';
import {FlatList, StyleSheet, Image, View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import useTextos from '../../hooks/useTextos';

import Cesta from './componentes/Cesta.js';
import Topo from '../../componentes/Topo.js';
import topo from '../../assets/produtores/topo.png';

const TopoLista = ({
  tituloProdutor,
  tituloCestas = '',
  header,
  imagem,
  nome,
}) => {
  return (
    <>
      <Topo titulo={tituloProdutor} imagem={header} altura={150} />
      <View style={estilos.conteudo}>
        <View style={estilos.logo}>
          <Image source={imagem} style={estilos.produtorImage} />
          <Text style={estilos.produtor}>{nome}</Text>
        </View>
        <Text style={estilos.cestas}>{tituloCestas}</Text>
      </View>
    </>
  );
};

export default function Produtor() {
  const route = useRoute();
  const {tituloProdutor, tituloCestas} = useTextos();
  const {nome, imagem, cestas} = route.params;

  return (
    <FlatList
      ListHeaderComponent={
        <TopoLista
          tituloProdutor={tituloProdutor}
          tituloCestas={tituloCestas}
          header={topo}
          imagem={imagem}
          nome={nome}
        />
      }
      data={cestas}
      renderItem={({item}) => <Cesta {...item} produtor={{nome, imagem}} />}
      style={estilos.lista}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  conteudo: {
    paddingHorizontal: 16,
  },
  logo: {
    flexDirection: 'row',
  },
  produtorImage: {
    width: 62,
    height: 62,

    marginTop: -23,

    borderRadius: 6,
  },
  produtor: {
    color: '#464646',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  cestas: {
    color: '#464646',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
    marginTop: 32,
  },
});
