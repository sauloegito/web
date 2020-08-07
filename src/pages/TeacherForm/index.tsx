import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    const [scheduleItems, setSheduleItems] = useState([
        {week_day: -1, from: '', to: ''}
    ]);

    function setScheduleItemValue(position: number, field: string, value: any) {
        const updated = scheduleItems.map((item, index) =>{
            if (index === position) {
                return {...item, [field]: value};
            }
            return item;
        });

        setSheduleItems(updated);
    }

    function addNewScheduleItem() {
        if (!scheduleItems.some(item => item.week_day === -1)) {
            setSheduleItems([
                ...scheduleItems,
                {week_day: -1, from: '', to: ''}
            ])
        } else {
            alert('Preencha um horário por vez!');
        }
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(reponse => {
            console.log('sucesso cadastro classe', reponse);
            alert('Cadastro com sucesso!');
            history.push('/');
        }).catch(motivo => {
            alert(`Falha no cadastro! Causa [${motivo}]`);
        });

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher o formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>

                    <Input
                        name="name"
                        label="Nome Completo"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    <Input
                        name="avatar"
                        label="URL do Avatar"
                        value={avatar}
                        onChange={(e) => {setAvatar(e.target.value)}}
                    />
                    <Input
                        name="whatsapp"
                        label="Whatsapp"
                        value={whatsapp}
                        onChange={(e) => {setWhatsapp(e.target.value)}}
                    />
                    <Textarea
                        name="bio"
                        label="Biografia"
                        value={bio}
                        onChange={(e) => {setBio(e.target.value)}}
                    />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>

                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}
                        options={[
                            { value: 'Artes' },
                            { value: 'Biologia' },
                            { value: 'Ciências' },
                            { value: 'Educação Física' },
                            { value: 'Física' },
                            { value: 'Geografia' },
                            { value: 'História' },
                            { value: 'Matemática' },
                            { value: 'Português' },
                            { value: 'Química' },
                        ]}
                    />
                    <Input
                        name="cost"
                        value={cost}
                        onChange={(e) => {setCost(e.target.value)}}
                        label="Custo da sua hora por aula"
                    />
                </fieldset>

                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo horário
                        </button>
                    </legend>
                    
                    {scheduleItems.map((item, index) =>{
                        return (
                            <div key={item.week_day} className="schedule-item">
                                <Select
                                    unSelectedValue={-1}
                                    name="week_day"
                                    label="Dia da semana"
                                    value={item.week_day}
                                    onChange={(e) => {setScheduleItemValue(index, 'week_day', e.target.value)}}
                                    options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-feira' },
                                        { value: '2', label: 'Terça-feira' },
                                        { value: '3', label: 'Quarta-feira' },
                                        { value: '4', label: 'Quinta-feira' },
                                        { value: '5', label: 'Sexta-feira' },
                                        { value: '6', label: 'Sábado' }
                                    ]}
                                />
                                <Input name="from" label="Das" type="time" value={item.from}
                                    onChange={(e) => {setScheduleItemValue(index, 'from', e.target.value)}}
                                />
                                <Input name="to" label="Até" type="time" defaultValue={item.to}
                                    onChange={(e) => {setScheduleItemValue(index, 'to', e.target.value)}}
                                />
                                    
                            </div>
                        )
                    })}
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                        Salvar cadastro
                    </button>
                </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;