import React, {Component} from 'react';
import {Container, Icon, Text, Content} from 'native-base';
import { AppRegistry, FlatList, StyleSheet, View, Image, Alert } from 'react-native';
import flatListData from '../data/data';
import Swipeout from 'react-native-swipeout';
class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null
        };
    }
    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key });
            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'sei sicuro di voler chiamare questo ristorante?',
                            [
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'si', onPress: () => {
                                flatListData.splice(this.props.index, 1);
                                //Refresh FlatList !
                                this.props.parentFlatList.refreshFlatList(deletingRow);
                              }},
                            ],
                            { cancelable: true }
                          );
                    },
                    text: 'Chiama', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };
        return (
            <Swipeout {...swipeSettings}>
                <View style={{
                flex: 1,
                flexDirection:'column',

                }}>
                    <View style={{
                            flex: 1,
                            flexDirection:'row',

                            // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
                            backgroundColor: 'grey',

                    }}>
                        <Image
                            source={{uri: this.props.item.imageUrl}}
                            style={styles.customImage}
                        >

                        </Image>
                        <View style={{
                                flex: 1,
                                flexDirection:'column',

                                height: 100
                            }}>
                                <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                                <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
                        </View>
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor:'white'
                    }}></View>
                </View>
            </Swipeout>

        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        fontSize: 16,
    },
    customImage: {width: 100, height: 100,  margin: 5},
});


export default class Ristoranti extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => {
      return <Icon name="ios-wine-outline" style={{ color: tintColor}}/>
    }
  };
  constructor(props) {
       super(props);
       this.state = ({
           deletedRowKey: null,
       });
   };
   refreshFlatList = (deletedKey) => {
       this.setState((prevState) => {
           return {
               deletedRowKey: deletedKey
           };
       });
   }
  render() {
    return(
      <Container>
        <Content>
        <View style={{flex: 1}}>
          <FlatList
              data={flatListData}
              renderItem={({item, index})=>{
                  //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                  return (
                  <FlatListItem item={item} index={index} parentFlatList={this}>

                  </FlatListItem>);
              }}
              >

          </FlatList>
      </View>
        </Content>
      </Container>
    );
  }
}
