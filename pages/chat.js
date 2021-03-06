import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {useRouter} from 'next/router';
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';


const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NzMxMiwiZXhwIjoxOTU4ODYzMzEyfQ.FeOvmgnbB6mgMXv0Z2Ag1IVQD1auvBhTk3eKCsb9UOU';
const SUPABASE_URL = 'https://mizsodgdnbfmfbokgkao.supabase.co';
const supaBaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem){
        returnsupabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
          adicionaMensagem(respostaLive.new);
        })
        .subscribe();
    }


export default function ChatPage() {
    const roteamento=useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);


const dadosDoSupabase = supaBaseClient
    .from('mensagens')
    .select('*')
    .then((dados)=>{
     
    });
console.log (dadosDoSupabase);
function escutaMensagensEmTempoReal(adicionaMensagem){
    return supaBaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) =>{
        adicionaMensagem(respostaLive.new);
    })
    .subscribe();

}

    

    /*
    // Sua lógica vai aqui
    - usuário digita campo em textarea
     -Aperta enter para enviar
    -Tem que adicionar o texto na listagem


    // ./Sua lógica vai aqui
    */
    React.useEffect(() => {
        supaBaseClient
          .from('mensagens')
          .select('*')
          // console.log('Dados da consulta:', data);
          .order('id', { ascending: false })
          .then(({ data }) => {
            setListaDeMensagens(data);
          });
    
        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
          console.log('Nova mensagem:', novaMensagem);
          console.log('listaDeMensagens:', listaDeMensagens);
          setListaDeMensagens((valorAtualDaLista) => {
            console.log('valorAtualDaLista:', valorAtualDaLista);
            return [
              novaMensagem,
              ...valorAtualDaLista,
            ]
          });
        });
    
        return () => {
          subscription.unsubscribe();
        }
      }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de:usuarioLogado, 
            texto:novaMensagem,
        };
        supaBaseClient
        .from('mensagens')
        .insert([
            mensagem
        ])
        .then(({data})=>{
            console.log('Criando mensagem: ', data);
            
        });
    
             
        setMensagem('');
    }
   /* function apagaMensagem(){
        supaBaseClient
        .from('mensagens')
        .delete()
        .match({ de:usuarioLogado })
    };*/
    function botaoMensagem(e){
        handleNovaMensagem(mensagem);
        e.preventDefault();
         
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://images.pexels.com/photos/6712474/pexels-photo-6712474.jpeg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            
          
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[999],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                        <Image
                styleSheet={{
                  width:'70px',  
                  borderRadius: '50%',
                 margin:'auto',

                }}
                src={`https://www.github.com/${usuarioLogado}.png`}
              /> 
                <Header />
             
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                     

                    <Box

                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);

                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.primary[500],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals['700'],
                            }}
                        />
                        <ButtonSendSticker 
                       onStickerClick={(sticker)=>{
                        handleNovaMensagem(":sticker:"+sticker)
                       }}
                               
                            
                            />
        <Button
                type='submit'
                onClick = {botaoMensagem}
                label='Enviar'
                position='relative'
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["900"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
         
                    </Box>
            
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
      return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            listStyleType: 'none',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[200],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/*Condicional: {mensagem.texto.startsWith(':sticker:').toString()*/}
                        {mensagem.texto.startsWith(':sticker:')
                        
                        ? (
                            <Image 
                            
                            styleSheet={{
                                maxWidth: '300px',
                               
                                borderRadius: '5%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}src={mensagem.texto.replace(':sticker:','')}/>
                        )
                            :(
                        mensagem.texto
                        )}      
                    </Text>
                    
                );

            })}

        </Box>
    )
}

