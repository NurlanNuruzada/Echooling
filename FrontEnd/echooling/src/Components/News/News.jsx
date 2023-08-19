import React from "react";
import video from "../../Videos/AdobeStock_610985032.mov";
import Styles from "./News.module.css";
import { Grid, GridItem } from "@chakra-ui/react";
import SearchInputCom from "../SeacthInput/SearchInput2";
const News = () => {
  return (
    <div className={Styles.VideoContainer}>
      <video className={Styles.BackgroundVideo} autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <Grid
        className={Styles.GridBox2}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <div className={Styles.Left}>
          <GridItem>
            <h1 className={Styles.Content}>Newsletter To Get Daily Content!</h1>
          </GridItem>
        </div>
        <div className={Styles.right}>
          <GridItem>
           <SearchInputCom  width={"100%"} placeholder={"Enter your email adress"} />
           <h2 className={Styles.rightContent}>Get the latest Echooling news delivered to you inbox</h2>
          </GridItem>
        </div>
      </Grid>
    </div>
  );
};

export default News;
