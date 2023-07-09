import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, fetchCharacterDetails, setSearchQuery } from './components/charactersSlice';
import { List, Avatar, Input, Modal } from 'antd';
import CharacterDetails from './components/CharacterDetails';

const { Search } = Input;

const App = () => {
  const dispatch = useDispatch();
  const { data: characters, loading, error } = useSelector(
    (state) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const handleSearch = (value) => {
    dispatch(setSearchQuery(value));
    dispatch(fetchCharacters());
  };

  return (
    <div className="App">
      <Search
        placeholder='Search characters'
        allowClear
        enterButton="Search"
        onSearch={handleSearch}
        style={{marginBottom: '16px'}}
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
            {characters.length > 0 && (
              <List
                dataSource={characters}
                renderItem={(character) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        />
                      }
                      title={character.name}
                    />
                  </List.Item>
                )}
              />
            )}
            <CharacterDetails />
    </div>
  );
};

export default App;
