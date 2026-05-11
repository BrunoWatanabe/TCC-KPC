import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

const TopicSelect = ({
  topics = [],
  username = '',
  onSelect = () => {},
  onTopicChange = () => {},
  disabled = false,
  variant = 'outlined',
  size = 'medium'
}) => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [annotationProfile, setAnnotationProfile] = useState('');

  // Simular a busca do annotation profile (no backend real seria uma API call)
  const getAnnotationProfile = (username, topic) => {
    // Simulação - no código real isso seria uma chamada para o UserAttributionController
    if (!topic) return '';
    return `${username}_${topic}_profile`;
  };

  const handleTopicChange = (event) => {
    const topic = event.target.value;
    setSelectedTopic(topic);
    
    // Buscar o annotation profile para o tópico selecionado
    const profile = getAnnotationProfile(username, topic);
    setAnnotationProfile(profile);
    
    // Chamar callbacks
    onTopicChange(topic);
    onSelect(event);
  };

  // Se não há tópicos, mostrar mensagem
  if (topics.length === 0) {
    return (
      <Box>
        <Typography color="textSecondary">
          Attributions not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth variant={variant} size={size} disabled={disabled}>
        <InputLabel id="topic-select-label">Topic</InputLabel>
        <Select
          labelId="topic-select-label"
          id="topic-select"
          value={selectedTopic}
          label="Topic"
          onChange={handleTopicChange}
          name="topic"
        >
          <MenuItem value="" disabled>
            Select a topic
          </MenuItem>
          {topics.map((topic) => (
            <MenuItem key={topic} value={topic}>
              {topic}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {annotationProfile && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Profile: {annotationProfile}
        </Typography>
      )}
    </Box>
  );
};

TopicSelect.propTypes = {
  /** Array of available topics */
  topics: PropTypes.arrayOf(PropTypes.string),
  /** Username for profile lookup */
  username: PropTypes.string,
  /** Callback when a topic is selected */
  onSelect: PropTypes.func,
  /** Callback when topic changes */
  onTopicChange: PropTypes.func,
  /** Whether the select is disabled */
  disabled: PropTypes.bool,
  /** Material-UI variant */
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  /** Size of the select component */
  size: PropTypes.oneOf(['small', 'medium']),
};

export default TopicSelect;
