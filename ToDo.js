import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  TextInput
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: ''
  }

  render () {
    const { isEditing, isCompleted, toDoValue } = this.state;
    const { text } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.toggleComplete}>
            <View style={[
                styles.circle, 
                isCompleted ? styles.completedCircle : styles.incompletedCircle
              ]}
            />
          </TouchableOpacity>
          { isEditing ? (
            <TextInput 
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText: styles.incompletedText
              ]} 
              value={toDoValue} 
              multiline={true} 
              onChangeText={this.controlInput}
              returnKeyType={'done'}
              onBlur={this.finishEditing}
            />
          ) : (
            <Text style={[
              styles.text, 
              isCompleted ? styles.completedText: styles.incompletedText
            ]}>
              { text }
            </Text>
          )}          
        </View>
        { isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this.finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✓</Text>
              </View>
            </TouchableOpacity>
          </View>
        )  : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this.startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✎</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✗</Text>
              </View>
            </TouchableOpacity>              
          </View>
        )}
      </View>
    );
  }
  
  toggleComplete = () => {
    this.setState({
      isCompleted: !this.state.isCompleted
    });
  }

  startEditing = () => {
    const { text } = this.props;    
    this.setState({
      isEditing: true,
      toDoValue: text
    });
  }

  finishEditing = () => {
    this.setState({
      isEditing: false
    });
  }  

  controlInput = (text) => {
    this.setState({
      toDoValue: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: '#bbb'
  },
  incompletedCircle: {
    borderColor: '#123456'
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 15,
    width: width / 2
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: "Line-through"
  },
  incompletedText: {
    color: '#353839'
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
    justifyContent: 'space-between'
  },
  actions: {
    flexDirection: 'row'
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    marginVertical: 15,
    width: width / 2
  }
});