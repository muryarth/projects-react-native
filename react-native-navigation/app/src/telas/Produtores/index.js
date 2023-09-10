import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

// Importando hook de navegação
import { useNavigation, useRoute } from '@react-navigation/native';

import Produtor from './componentes/Produtor';
import Topo from './componentes/Topo';
import useProdutores from '../../hooks/useProdutores';
import useTextos from '../../hooks/useTextos';

//COMPONENTE
export default function Produtores({ melhoresProdutores }) {

  //Hook de navegação
  const navigation = useNavigation();

  //Recebe os parâmetros enviandos pelo hook de navegação
  const route = useRoute();

  const [exibeMensagem, setExibeMensagem] = useState(false); // valor padrão "false"

  //vindo do hook
  const nomeCompra = route.params?.compra.nome;
  const timestampCompra = route.params?.compra.timestamp

  console.log(nomeCompra);

  //carrega os dados de cada produtor
  const lista = useProdutores(melhoresProdutores);
  const { tituloProdutores, mensagemCompra } = useTextos();

  // se a variável 'mensagemCompra' for diferente de 'undefined', efetua o replace
  const mensagemCompleta = mensagemCompra?.replace('$NOME', nomeCompra)

  useEffect(() => {
    setExibeMensagem(!!nomeCompra);
    let timeout;

    if(nomeCompra){
      //setTimeout executa a função após o tempo definido no segundo parâmetro
      timeout = setTimeout(() => {
        setExibeMensagem(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
    
    // sempre que o estado de 'timestampCompra' for alterado, esse useEffect será executado
  }, [timestampCompra]);

  const TopoLista = () => {
    return (
      <>
        <Topo melhoresProdutores={melhoresProdutores} />
        { exibeMensagem && <Text style={estilos.compra}>{mensagemCompleta}</Text>}
        <Text style={estilos.titulo}>{tituloProdutores}</Text>
      </>
    );
  };

  return (
    <FlatList
      data={lista}
      renderItem={({ item }) => <Produtor
        {...item}
        aoPressionar={() => {
          navigation.navigate('Produtor', item);
        }} />}
      keyExtractor={({ nome }) => nome}
      ListHeaderComponent={TopoLista}
      style={estilos.lista}
    />
  );
}

//estilo
const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#464646',
  },
  compra: {
    backgroundColor: '#EAF5F3',
    padding: 16,
    color: '#464646',
    fontSize: 16,
    lineHeight: 26
  }
});
