import React, { useState } from 'react';
import { SERVER_URL } from '../constants';

function Tour(props) {
    const [tourdate, setCdate] = useState({
        cdate:"",
        id:"",
    });
    const [tours,setTours] = useState([]);
    const onChange = (e) => {
        setCdate({
            ...tourdate,
            [e.target.name] : e.target.value
        });
    }
    const getTour = () => {
        fetch(`${SERVER_URL}tour/wea?CurrentDate=${tourdate.cdate}&CourseId=${tourdate.id}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data.response.body.items.item);
            setTours(data.response.body.items.item);
        })
        .catch(e=>console.log(e));
    }
    return (
        <div>
            여행지 조회
            <input name="id" value={tourdate.id} onChange={onChange} />
            <input name="cdate" value={tourdate.cdate} onChange={onChange} />
            <button onClick={getTour}>조회</button>
            <div>
                <ul>
                    {tours.map((t,index)=><li key={index}>{t.thema} : {t.courseName} {t.spotName}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default Tour;