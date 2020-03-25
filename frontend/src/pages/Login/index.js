import React, {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import LogoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login(){
    const [id,setId] = useState('');
    const history = useHistory();

   async function HandleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions',{id});
            
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.name);
            
            history.push('/profile');
        }
        catch(err){
            alert('Falha no login,tente novamente');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={LogoImg} alt="Logo do site - Be The Hero"/>
                <form onSubmit={HandleLogin}>
                    <h1>Faça o Login</h1>
                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e =>setId(e.target.value)}
                    />
                    <button className="button" type="submit">Logar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não me cadastrei
                    </Link>
                </form>
            
            </section>
            <img src={heroesImg} alt="Imagem de fundo"/>
        </div>
    );
}