import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { findCharacterByName, GetCharacters, getCharacterNames } from './api';
import { Component, createRef } from 'react';
import Character from './Character';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default class App extends Component {
  state = {
    characters: [],
    filteredCharacters: [],
    page: 1,
    inputValue: '',
    selectedFilter: 1,
    selectedSort: 0
  }
  async componentDidMount() {
    var result = await GetCharacters();
    this.setState({ characters: result, filteredCharacters: result });

    this.handleSearchInput('blue');
    this.handleSorting(0)
  }

  handleSearchInput(text) {
    if (text == "") {
      this.setState({ filteredCharacters: this.state.characters });
    }
    if (this.state.selectedFilter == 0) { //BY NAME
      const filteredCharacters = this.state.characters.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      this.setState({ inputValue: text, filteredCharacters });
    }
    if (this.state.selectedFilter == 1) { //BY EYE COLOR
      const filteredCharacters = this.state.characters.filter((item) =>
        item.eye_color.toLowerCase().includes(text.toLowerCase())
      );
      this.setState({ inputValue: text, filteredCharacters });
    }
    if (this.state.selectedFilter == 2) { //BY HAIR COLOR
      const filteredCharacters = this.state.characters.filter((item) =>
        item.hair_color.toLowerCase().includes(text.toLowerCase())
      );
      this.setState({ inputValue: text, filteredCharacters });
    }
    if (this.state.selectedFilter == 3) { //BY SKIN COLOR
      const filteredCharacters = this.state.characters.filter((item) =>
        item.skin_color.toLowerCase().includes(text.toLowerCase())
      );
      this.setState({ inputValue: text, filteredCharacters });
    }
    if (this.state.selectedFilter == 4) { //BY NUMBER OF SHIPS
      const filteredCharacters = this.state.characters.filter((item) =>
        item.starships.length == text
      );
      this.setState({ inputValue: text, filteredCharacters });
    }
  }
  handleSorting(index) {
    let sortedCharacters = [...this.state.filteredCharacters];
    this.setState({selectedSort: index})
    switch (index) {
      case 0:
        sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 1:
        sortedCharacters.sort((a, b) => a.eye_color.localeCompare(b.eye_color));
        break;
      case 2:
        sortedCharacters.sort((a, b) => a.hair_color.localeCompare(b.hair_color));
        break;
      case 3:
        sortedCharacters.sort((a, b) => a.skin_color.localeCompare(b.skin_color));
        break;
      case 4:
        sortedCharacters.sort((b, a) => a.starships.length - b.starships.length);
        break;
      default:
        break;
    }

    this.setState({ filteredCharacters: sortedCharacters });
  }
  render() {
    const { selectedFilter } = this.state;
    const { selectedSort } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ height: '25%' }}>
          <Text style={styles.text}>Star Wars Characters</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10, gap: 10, justifyContent: 'space-around' }}>
            <TextInput style={styles.input} onChangeText={text => this.handleSearchInput(text)} defaultValue='blue'></TextInput>
          </View>
        </View>
        <View style={styles.header}>
          <Ionicons name="text" size={selectedFilter == 0 ? 35 : 24} color={selectedFilter == 0 ? '#ffe81f' : 'white'} 
          style={ selectedSort == 0 ? {borderWidth:2, borderColor:'#ffe81f', borderRadius: 5} : {}}
            onPress={() => this.setState({ selectedFilter: 0 })} onLongPress={() => this.handleSorting(0)} />
          <FontAwesome name="eye" size={selectedFilter == 1 ? 35 : 24} color={selectedFilter == 1 ? '#ffe81f' : 'white'}
          style={ selectedSort == 1 ? {borderWidth:2, borderColor:'#ffe81f', borderRadius: 5} : {}}
            onPress={() => this.setState({ selectedFilter: 1 })} onLongPress={() => this.handleSorting(1)} />
          <MaterialCommunityIcons name="head-outline" size={selectedFilter == 2 ? 35 : 24} color={selectedFilter == 2 ? '#ffe81f' : 'white'}
          style={ selectedSort == 2 ? {borderWidth:2, borderColor:'#ffe81f', borderRadius: 5} : {}}
            onPress={() => this.setState({ selectedFilter: 2 })} onLongPress={() => this.handleSorting(2)} />
          <Ionicons name="body-outline" size={selectedFilter == 3 ? 35 : 24} color={selectedFilter == 3 ? '#ffe81f' : 'white'}
          style={ selectedSort == 3 ? {borderWidth:2, borderColor:'#ffe81f', borderRadius: 5} : {}}
            onPress={() => this.setState({ selectedFilter: 3 })} onLongPress={() => this.handleSorting(3)} />
          <FontAwesome5 name="space-shuttle" size={selectedFilter == 4 ? 35 : 24} color={selectedFilter == 4 ? '#ffe81f' : 'white'}
            style={ selectedSort == 4 ? {borderWidth:2, borderColor:'#ffe81f', borderRadius: 5} : {}}
            onPress={() => this.setState({ selectedFilter: 4 })} onLongPress={() => this.handleSorting(4)} />

        </View>
        {this.state.filteredCharacters.length > 0 ? <FlatList
          style={styles.list}
          data={this.state.filteredCharacters}
          renderItem={({ item }) => <Character character={item} />}>
        </FlatList> :
          <View style={styles.list}>
              <Text style={{color: '#ffe81f', fontSize: 30, fontWeight: 'bold', textAlign: 'center', padding: 5}}>No Characters can be shown for the selected filter</Text>
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    height: '100vh',
    paddingTop: '20%',
    backgroundColor: 'black',
  },
  list: {
    width: '100%',
    height: '67.5%'
  },
  input: {
    width: '80%',
    borderColor: '#ffe81f',
    borderWidth: 2,
    borderRadius: 10,
    height: 30,
    color: '#ffe81f',
    padding: 2
  },
  text: {
    color: '#ffe81f',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 50,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ffe81f',
    borderRadius: 10,
    padding: 2
  },
  nav: {
    height: '10%',
    backgroundColor: '#ffe81f',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
