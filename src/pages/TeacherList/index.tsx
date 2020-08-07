import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import searchIcon from '../../assets/images/icons/study.svg';

import './styles.css'


function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const params = {
            subject,
            week_day,
            time
        }

        console.log('searching for', params);

        api.get('/classes', { params })
            .then(response =>{
                console.log('find for', response);

                setTeachers(response.data);
            }).catch(because => {
                console.log('fail because:', because);
            });
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
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
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => {setWeekDay(e.target.value)}}
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
                    <Input type="time" name="time" label="Hora" value={time}
                        onChange={(e) => {setTime(e.target.value)}}
                    />
                    <button type="submit">
                        <img src={searchIcon} alt="pesquisar" />
                        Pesquisar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) =>{
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher}/>
                    )
                })}
            </main>
        </div>
    )
}

export default TeacherList;