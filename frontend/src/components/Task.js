import React from 'react';

export default function Task(props){
  return (
    <li className='card task'>
    <h2>{props.title}</h2>
    <p>{props.description}</p>
    </li>
  );
}
