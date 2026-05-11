import { fn } from 'storybook/test';
import TopicSelect from '../components/TopicSelect';

export default {
  title: 'Components/TopicSelect',
  component: TopicSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    topics: { control: 'object' },
    username: { control: 'text' },
    disabled: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
  },
  args: { 
    onSelect: fn(),
    onTopicChange: fn(),
  },
};

export const Default = {
  args: {
    topics: ['abortion', 'cloning', 'death_penalty', 'gun_control'],
    username: 'akira',
    disabled: false,
    variant: 'outlined',
    size: 'medium',
  },
};

export const EmptyTopics = {
  args: {
    topics: [],
    username: 'user123',
  },
};

export const Disabled = {
  args: {
    topics: ['abortion', 'cloning', 'death_penalty'],
    username: 'daired',
    disabled: true,
  },
};

export const FilledVariant = {
  args: {
    topics: ['abortion', 'cloning', 'death_penalty'],
    username: 'alexandre',
    variant: 'filled',
  },
};

export const SmallSize = {
  args: {
    topics: ['abortion', 'cloning', 'death_penalty'],
    username: 'victor',
    size: 'small',
  },
};
