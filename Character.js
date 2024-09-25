import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { GetCharacterData } from './api';
import { Component, startTransition } from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default class Character extends Component {
  state = {
    details: false,
    hair_colors: {'blond': 'yellow', 'brown':'brown', 'n/a': 'white', 'none': 'white'},
    skin_colors: {},
    starshipNames: 'No Starships',
  }
  async componentDidUpdate(prevProps, prevState){
    if(prevProps.character != this.props.character){
      await this.getCharacterShips(this.props.character);
    }
  }
  async componentDidMount() {
    await this.getCharacterShips(this.props.character);
  }
  async getCharacterShips(character) {
    const names = await Promise.all(
      character.starships.map(async (ship) => {
        const result = await GetCharacterData(ship);
        return result.name;
      })
    );

    startTransition(() => {
      this.setState({
        starshipNames: names.length > 0 ? names.join(', ') : 'No Starships',
      });
    });
  }
  render(){
    const {character} = this.props
    const eye = character.eye_color.split('-')[0]
    const hair = character.hair_color.split(',')[0]
    const skin = character.skin_color.split(',')[0]
    return (
      <View style={this.state.details ? styles.itemSelected : styles.item}>
        <Text style = {this.state.details ? styles.textSelected : styles.text} onLongPress={()=>this.setState({details: !this.state.details})}>{character.name}</Text>

        <FontAwesome name="eye" size={24} color={eye}/>
        <MaterialCommunityIcons name="head-outline" size={24} color={this.state.hair_colors[hair]} />
        <Ionicons name="body-outline" size={24} color={skin} />
        <View style={styles.detailItem}>
            <Text style={{color: 'white'}}>x{this.state.starshipNames.split(',').length}</Text>
            <FontAwesome5 name="space-shuttle" size={24} color="white" />
          </View>
        {this.state.details && <View style={styles.details}>
          <View style={styles.detailItem}>
            <FontAwesome name="eye" size={24} color={'black'}/>
            <Text>Eye color: {eye}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="head-outline" size={24} color={'black'} />
            <Text>Hair color: {hair}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="body-outline" size={24} color={'black'} />
            <Text>Skin color: {skin}</Text>
          </View>
          <View style={styles.detailItem}>
            <FontAwesome5 name="space-shuttle" size={24} color="black" />
            <Text>Starship(s): {this.state.starshipNames}</Text>
          </View>
          <View style={styles.detailItem}>
            <FontAwesome name="calendar-o" size={24} color="black" />
            <Text>Birth year: {character.birth_year}</Text>
          </View>
          
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: '#ffe81f',
    borderBottomWidth: 2,
    marginLeft: 20,
    marginRight: 20,
  },
  itemSelected:{
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    backgroundColor:'#ffe81f',
    alignItems: 'center',
    color: 'black',
    flexWrap: 'wrap',
    padding:10
  },
  text:{
      color: '#ffe81f',
      width: 150,
      fontWeight: 'bold'
  },
  textSelected:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  details:{
    width: '100%',
    backgroundColor: '#ffe81f',
  },
  detailItem:{
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  }
});
