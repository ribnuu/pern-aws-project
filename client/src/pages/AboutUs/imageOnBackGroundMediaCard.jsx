import * as React from "react";
import Grid from "@mui/material/Grid";

const ImageOnBackGroundMediaCard = ({ cardsData }) => {
  const [expandedIndex, setExpandedIndex] = React.useState(-1);

  const handleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1); // Collapse if clicked again
    } else {
      setExpandedIndex(index); // Expand the clicked card
    }
  };

  return (
    <Grid container spacing={2}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <div class="relative grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
            <div
              className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-contain bg-clip-border bg-center text-gray-700 shadow-none`}
              style={{ backgroundImage: `url(${card.img})` }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-bg-black-10"></div>
            </div>

            <div class="relative p-6 px-6 py-14 md:px-12">
              <h2 class="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                {card.title}
              </h2>
              {/* <h5 class="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                Tania Andrew
              </h5> */}
              {/* <img
                alt="Tania Andrew"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                class="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center"
              /> */}
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageOnBackGroundMediaCard;
