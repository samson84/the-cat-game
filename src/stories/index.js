import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button, {CloseButton} from '../components/lib/Button';
import Alert from '../components/lib/Alert';
import Opening from '../components/Opening';
import Loading from '../components/lib/Loading';
import CatImages from '../components/CatImages';
import AnswerButtons from '../components/AnswerButtons'
import QuestionStatus from '../components/QuestionStatus';

// import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Button', module)
  .add('normal', () => 
    <Button onClick={action('clicked')}>Normal Button</Button>
  )
  .add('error', () => 
    <Button onClick={action('clicked')} error>Error Button</Button>
  )
  .add('success', () => 
    <Button onClick={action('clicked')} success>Success Button</Button>
  )
  .add('primary', () => 
    <Button onClick={action('clicked')} primary>Primary Button</Button>
  );

storiesOf('CloseButton', module)
  .add('normal', () => 
    <CloseButton onClick={action('clicked')} />
  )

storiesOf('Alert', module)
  .add('normal', () => 
    <Alert>This is an error message.</Alert>
  )
  .add('long message', () => 
    <Alert>This is an error message. This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.This is an error message.</Alert>
  );

storiesOf('Opening', module)
  .add('normal', () => 
    <Opening />
  )

storiesOf('Loading', module)
  .add('normal', () => 
    <Loading />
  )

storiesOf('CatImages', module)
  .add('normal', () => {
    const images = [
      'https://cdn2.thecatapi.com/images/DUxU01IY5.jpg',
      'https://cdn2.thecatapi.com/images/KrDYENsA3.jpg',
      'https://cdn2.thecatapi.com/images/POPfuPq8t.jpg'
    ]
      return (<CatImages images={images}  />)
    }
  )

storiesOf('AnswerButtons', module)
  .add('unanswered', () => {
    const options = [
      {'id': 'id1', 'name': 'Name1'},
      {'id': 'id2', 'name': 'Name2'},
      {'id': 'id3', 'name': 'Name3'},      
    ]
    return (
      <AnswerButtons 
        onSelect={action('clicked')}
        options={options}
        correctAnswer='id1'
        userAnswer={null}
      />
    )
  })
  .add('correct', () => {
    const options = [
      {'id': 'id1', 'name': 'Name1'},
      {'id': 'id2', 'name': 'Name2'},
      {'id': 'id3', 'name': 'Name3'},      
    ]
    return (
      <AnswerButtons 
        onSelect={action('clicked')}
        options={options}
        correctAnswer='id1'
        userAnswer='id1'
      />
    )
  })
  .add('wrong', () => {
    const options = [
      {'id': 'id1', 'name': 'Name1'},
      {'id': 'id2', 'name': 'Name2'},
      {'id': 'id3', 'name': 'Name3'},      
    ]
    return (
      <AnswerButtons 
        onSelect={action('clicked')}
        options={options}
        correctAnswer='id1'
        userAnswer='id2'
      />
    )
  })
  .add('wrong unknown', () => {
    const options = [
      {'id': 'id1', 'name': 'Name1'},
      {'id': 'id2', 'name': 'Name2'},
      {'id': 'id3', 'name': 'Name3'},      
    ]
    return (
      <AnswerButtons 
        onSelect={action('clicked')}
        options={options}
        correctAnswer='id1'
        userAnswer='something else'
      />
    )
  })

storiesOf('QuestionStatus', module)
  .add('normal', () => 
    <QuestionStatus />
  )
  .add('success', () => 
    <QuestionStatus resultMessage='The result is good' isSuccess={true} />
  )
  .add('wrong', () => 
    <QuestionStatus resultMessage='The result is bad' isSuccess={false} />
  )

