import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SvgComponent from "./SvgComponent/svgComponent";

const CustomMediaCardView = ({ cardsData }) => {
  return (
    <Grid container spacing={2}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "100%",
            }}
          >
            <SvgComponent
              className="p-4"
              svg={card.svg} // Dynamically pass SVG component
              height="50px"
              width="50px"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title} {/* Render title dynamically */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.subtitle} {/* Render subtitle dynamically */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomMediaCardView;
