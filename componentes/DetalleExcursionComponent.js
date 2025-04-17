import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList} from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import styles from './StyleComponents';
import { stylesDetalleExcursion } from './StyleComponents';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        actividades: state.actividades,
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        comentarios: state.comentarios,
    }
}

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card containerStyle={styles.container}>
                <Card.Divider />
                <Card.Image
                    source={{uri: baseUrl + excursion.imagen}}
                    style={styles.image}
                />
                <Card.Title style={stylesDetalleExcursion.text}>{excursion.nombre}</Card.Title>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={ props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComentario(props) {

    const comentarios = props.comentarios;
    const renderCommentarioItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comentario}</Text>
                <Text style={{fontSize: 14}}>{item.valoracion} Valoracion</Text>
                <Text style={{fontSize: 14}}>{'-- ' + item.autor + ', ' + formatDate(item.dia)} </Text>
            </View>
        );
    };

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList scrollEnabled={false}
                data={comentarios}
                renderItem={renderCommentarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function formatDate(dateStr) {
    const date = new Date(dateStr.replace(/\s*:\s*/g, ':').replace(/(\.\d{3})\d+Z$/, '$1Z'));
    return date.toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    });
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autor: '',
            comentario: '',
            puntuacion: 3,
            showModal: false,
            image: '',
            favoritos: []
        };
    }

    marcarFavorito(excursionId) {
        this.setState({favoritos: this.state.favoritos.concat(excursionId)});
    }

    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
        );
    }

}

export default connect(mapStateToProps)(DetalleExcursion);