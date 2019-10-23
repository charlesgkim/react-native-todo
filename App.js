import React, { Component } from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  ScrollView,
  StatusBar,
  TextInput,
  Dimensions,
  Platform
} from 'react-native';
import { AppLoading } from 'expo';
import ToDo from './ToDo';

const { height, width } = Dimensions.get('window');

export default class App extends Component {
  state = {
    newToDo: '',
    loadedToDos: false
  }

  componentDidMount = () => {
    this.loadToDos();
  }
  render () {
    const { newToDo, loadedToDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={styles.title}>KIM to do?</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input}
            placeholder={'New to do'} 
            value={newToDo} 
            onChangeText={this.controllNewToDo} 
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this.addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello I'm To Do"} />
          </ScrollView>
        </View>
      </View>
    );
  }
  controllNewToDo = (text) => {
    this.setState({
      newToDo: text
    });
  }
  loadToDos = () => {
    this.setState ({
      loadedToDos: true
    })
  }
  addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== '') {
      this.setState({
        newToDo: ''
      });
      const toDos = [
        {
          id: 12341234,
          text: 'buy something',
          isCompleted: false,
          date: 43214321
        },
        {
          id: 12341232,
          text: 'buy something',
          isCompleted: false,
          date: 43214321
        }
      ];
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123456',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '300'
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width -25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(0,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: 'center',
  },
});
