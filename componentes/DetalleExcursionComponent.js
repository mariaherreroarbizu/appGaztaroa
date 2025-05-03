import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button } from 'react-native';
import { Card, Icon, Input } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import styles from './StyleComponents.js';
import { stylesDetalleExcursion } from './StyleComponents.js';
import { colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings';

const mapStateToProps = state => ({
    actividades: state.actividades,
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
    comentarios: state.comentarios,
    favoritos: state.favoritos
});

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) =>
        dispatch(postComentario(excursionId, valoracion, autor, comentario))
});

function RenderExcursion(props) {
    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card containerStyle={styles.container}>
                <Card.Divider />
                <Card.Image
                    source={{ uri: baseUrl + excursion.imagen }}
                    style={styles.image}
                />
                <Card.Title style={stylesDetalleExcursion.text}>
                    {excursion.nombre}
                </Card.Title>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() =>
                        props.favorita
                            ? console.log('La excursión ya se encuentra entre las favoritas')
                            : props.onPress()
                    }
                />
                <Icon
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome'
                    color={colorGaztaroaOscuro}
                    onPress={props.onPressComentario} // se pasa como función
                />
            </Card>
        );
    } else {
        return <View />;
    }
}

function RenderComentario(props) {
    const comentarios = props.comentarios;

    const renderCommentarioItem = ({ item, index }) => (
        <View key={index} style={{ margin: 10 }}>
            <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
            <Text style={{ fontSize: 14 }}>{item.valoracion} Valoración</Text>
            <Text style={{ fontSize: 14 }}>
                {'-- ' + item.autor + ', ' + formatDate(item.dia)}
            </Text>
        </View>
    );

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList
                scrollEnabled={false}
                data={comentarios}
                renderItem={renderCommentarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false
        };
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    resetForm = () => {
        this.setState({
            valoracion: 3,
            autor: '',
            comentario: '',
            dia: '',
            showModal: false
        });
    };

    gestionarComentario = (excursionId) => {
        this.props.postComentario(
            excursionId,
            this.state.valoracion,
            this.state.autor,
            this.state.comentario
        );
        //this.toggleModal();
        this.resetForm();
        this.setState({ showModal: false });
    };

    marcarFavorito = (excursionId) => {
        this.props.postFavorito(excursionId);
    };

    render() {
        const { excursionId } = this.props.route.params;

        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    onPressComentario={this.toggleModal} 
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter(
                        comentario => comentario.excursionId === excursionId
                    )}
                />

                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={this.resetForm}
                    onRequestClose={this.resetForm}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.valoracion}
                            onFinishRating={value => this.setState({ valoracion: value })}
                            style={{ paddingVertical: 40 }}
                        />
                        <Input
                            placeholder='Autor'
                            onChangeText={value => this.setState({ autor: value })}
                            leftIcon={<Icon name='user-o' type='font-awesome' size={24} color='black' />}
                        />
                        <Input
                            placeholder='Comentario'
                            onChangeText={value => this.setState({ comentario: value })}
                            leftIcon={<Icon name='comment-o' type='font-awesome' size={24} color='black' />}
                        />
                        <Button
                            title='ENVIAR'
                            onPress={() => this.gestionarComentario(excursionId)}
                            color={colorGaztaroaOscuro}
                        />
                        <Button
                            title='CANCELAR'
                            onPress={() => {
                                //this.toggleModal();
                                this.resetForm();
                                this.setState({ showModal: false }); 
                            }}
                            color={colorGaztaroaOscuro}
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
