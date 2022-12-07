import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressArea,
    Text
} from './styles';

import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [slip_id, setID] = useState('');
    const [address, setAddress] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`${slip_id}/json/`);

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'ID não encontrado');
            } else {
                setAddress(data);
            }

        } catch (erro) {
            console.log(erro)
            Alert.alert('Buscar', ' ID inválido');
        }
    };

    async function handleLimpar() {
        setAddress(null);
        setID('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!address &&
                    <Input
                        keyboardType="numeric"
                        maxLength={8}
                        onChangeText={setID}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite um número e receba um conselho"
                        placeholderTextColor="#2F48D4"
                        value={slip_id}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={address ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {address ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {address &&
                <AddressArea>
                    <Text>Conselho:{slip_id}</Text>
                    <Text>{address.advice}</Text>
                </AddressArea>
            }
        </Container>
    );
}