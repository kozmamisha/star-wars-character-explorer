import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './CharacterList.module.scss';

const CharacterList = () => {
  const { characters } = useSelector((state) => state.characters);
  const filters = useSelector((state) => state.filters);

  const isCharactersLoading = characters.status === 'loading';

  const filteredCharacters =
    characters?.data?.results?.filter((character) => {
      if (Object.values(filters).every((value) => value === null || value === '')) {
        return true;
      }

      if (filters.movies.length > 0 && !filters.movies.includes(character.movies)) {
        return false;
      }

      if (filters.name && character.name.toLowerCase().indexOf(filters.name.toLowerCase()) === -1) {
        return false;
      }

      if (filters.gender && character.gender !== filters.gender) {
        return false;
      }

      const characterMass = parseInt(character.mass, 10);
      if (
        (filters.massRange[0] &&
        characterMass < filters.massRange[0]) ||
        (filters.massRange[1] &&
        characterMass > filters.massRange[1])
      ) {
        return false;
      }

      return true;
    }) || [];

  return (
    <Grid container spacing="2vw">
      {isCharactersLoading ? (
        [...Array(6)].map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Skeleton height={40} width="80%" animation="wave" />
                <Skeleton height={40} width="60%" animation="wave" />
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : filteredCharacters.length > 0 ? (
        filteredCharacters.map((character, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
            <Link to={`/characters/${index + 1}`}>
              <Card className={styles.card}>
                <CardContent>
                  <Typography variant="h5">{character.name}</Typography>
                  <Typography variant="body1">Gender: {character.gender}</Typography>
                  <Typography variant="body1">Mass: {character.mass}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" style={{ margin: '40px auto' }}>
          No characters match the selected filters.
        </Typography>
      )}
    </Grid>

    // <Grid container spacing="2vw">
    //   {isCharactersLoading
    //     ? [...Array(6)].map((_, index) => (
    //         <Grid item key={index} xs={12} sm={6} md={4}>
    //           <Card>
    //             <CardContent>
    //               <Skeleton height={40} width="80%" animation="wave" />
    //               <Skeleton height={40} width="60%" animation="wave" />
    //             </CardContent>
    //           </Card>
    //         </Grid>
    //       ))
    //     : characters.data.results.map((obj, index) => (
    //         <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
    //           <Link to={`/characters/${index + 1}`}>
    //             <Card className={styles.card}>
    //               <CardContent>
    //                 <Typography variant="h5">{obj.name}</Typography>
    //                 <Typography variant="body1">Gender: {obj.gender}</Typography>
    //                 <Typography variant="body1">Mass: {obj.mass}</Typography>
    //               </CardContent>
    //             </Card>
    //           </Link>
    //         </Grid>
    //       ))}
    // </Grid>
  );
};

export default CharacterList;
