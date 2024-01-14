import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './CharacterList.module.scss';

const CharacterList = () => {
  const { characters } = useSelector((state) => state.characters);
  const isCharactersLoading = characters.status === 'loading';

  return (
    <Grid container spacing="2vw">
      {isCharactersLoading
        ? [...Array(6)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Skeleton height={40} width="80%" animation="wave" />
                  <Skeleton height={40} width="60%" animation="wave" />
                </CardContent>
              </Card>
            </Grid>
          ))
        : characters.data.results.map((obj, index) => (
            <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
              <Link to={`/characters/${index + 1}`}>
                <Card className={styles.card}>
                  <CardContent>
                    <Typography variant="h5">{obj.name}</Typography>
                    <Typography variant="body1">Gender: {obj.gender}</Typography>
                    <Typography variant="body1">Mass: {obj.mass}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
    </Grid>
  );
};

export default CharacterList;
