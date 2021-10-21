import React , {
    createContext,
    useState,
    useContext,
    ReactNode
} from 'react';

import { api } from '../services/api';

// tudo que vem do banco 
interface User {
    id: string;
    email: string;
    nome: string;
    driver_license: string;
    avatar: string;
}

// estado de autenticacao
interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

// para o contexto, vou querer compartilhar com a aplicacao
interface AuthContextData {
    user: User; // Dados do usuario
    // meu signIn tem credenciais(credentials) e essas credenciais é SignInCredentials
    // função signIn não retorna nada
    signIn: (credentials: SignInCredentials) => Promise<void>; 
}

interface AuthProviderProps {
    children: ReactNode;
}

// Criaremos o contexto, falamos qual é o estado inicial do contexto que é um objeto vazio que 
// esperar o AuthContextData
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Vamos precisar prover para toda a aplicação o nosso context
// Esse context precisamos receber um children, então fazemos um interfaces
// e tipamos a frente do children { children } : AuthProviderProps
function AuthProvider({ children } : AuthProviderProps) {
    // Criamos para armazenar os dados de autenticacao
    // que tipo queremos guardar dentro deste estado<> que vai receber token e user
    // e começa com objeto vazio de AuthState
    const [data, setData] = useState<AuthState>({} as AuthState);

    // função de signIn, e vai receber de SignInCredentials o email e senha
    async function signIn({ email, password } : SignInCredentials) {    
        // Requeremos da Api, passando o email e a senha para que a nossa autenticação funcione
        const response = await api.post('/sessions', {
            email,
            password
        });

        // Como estamos utilizando o axios ele devolve dentro do data
        // console.log(response.data);

        // Vamos agora desestruturar esses dois objetos o token e o usuario
        const { token, user } = response.data;

        // Vamos add em todas a resquisições que forem feitas o token do usuario
        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user }); // atualizamos o estado
    }

    return (
        <AuthContext.Provider
            value={{
                    user: data.user,
                    signIn
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

// Criamos o hook para usar em qq rota
function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };