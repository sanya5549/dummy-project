import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from '../../static/image/ecommerce-trends-2019.jpg'

const useStyles = makeStyles({
    media: {
        height: 500,
        MarginTop: "2em"
    },
});

export default function HomeComponent() {
  const classes = useStyles();

  return (
    <Card>
        <CardMedia
          className={classes.media}
          image={Image}
          title="E-Commerce"
        />
        
    </Card>
  );
}

