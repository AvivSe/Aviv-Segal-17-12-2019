import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import styled from "styled-components"

const StyledCard = styled(Card)`
  max-width: 320px;
  margin: .5rem;
  .MuiCardMedia-root {
    height: 140px;
  }
`;

export default function WeatherMiniature() {
  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia image="http://cdn.taboola.com/libtrc/static/thumbnails/103a47baec9e704e04df27fe07e5c588.jpg" title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </StyledCard>
  );
}
