import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button, {CloseButton} from '../components/lib/Button';
import Alert from '../components/lib/Alert';
import Opening from '../components/Opening';

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
