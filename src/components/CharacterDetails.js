import React from 'react';
import { useSelector } from 'react-redux';
import { Descriptions, Spin } from 'antd';

const CharacterDetails = () => {
  const { selectedCharacter, loading, error } = useSelector(
    (state) => state.characters
  );

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedCharacter) {
    return null;
  }

  const { name, description, thumbnail } = selectedCharacter;

  return (
    <div>
      <h2>{name}</h2>
      <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
      <Descriptions title="Character Details">
        <Descriptions.Item label="Description">
          {description || 'N/A'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default CharacterDetails;
