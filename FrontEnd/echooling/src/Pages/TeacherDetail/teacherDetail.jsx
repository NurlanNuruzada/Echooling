import React from "react";
import Styles from "../TeacherDetail/teacherDetail.module.css";
import image from "../../Images/teacher/teacher5.jpg";
import { Grid, Flex } from "@chakra-ui/react";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import News from "../../Components/News/News";
import Counter from "../../Components/Counter/Couter";
const TeacherDetail = () => {
  return (
    <div className={Styles.Container}>
      <div className={Styles.upContainer}>
        <Grid
          className={Styles.teacherContainer}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
          rowGap={5}
        >
          <div className={Styles.ImageContainer}>
            <img className={Styles.Image} src={image} alt="" />
          </div>
          <div className={Styles.details}>
            <div>
              <h1>STUART KELVIN</h1>
              <h2>Associate Professor</h2>
            </div>
            <div>
              <h3>ABOUT ME</h3>
              <p>
                I must explain to you how all this a mistaken idea of denouncing
                great explorer of the rut the is lder of human happiness pcias
                unde omnis iste natus error sit voluptatem accusantium ue
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quas i architeo beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas
              </p>
              <h2>DEGREE:</h2>
              <span> PHD in Micro Biology</span>
              <h2>EXPERIENCE:</h2>
              <span> 7 years experience</span>
              <h2>HOBBIES:</h2>
              <span> music, travelling, catching fish</span>
              <h2>FACULTY:</h2>
              <span>Din, Department of Micro Biology</span>
            </div>
          </div>
        </Grid>
      </div>
      <Grid
        className={Styles.ContactContainer}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
        rowGap={5}
      >
        <div className={Styles.ContactInformation}>
          <h1>Contact Information</h1>
          <div>
            <Flex gap={1} alignItems={"center"}>
              <h2>Mail me:</h2>
              <span> stuart@eduhome.com</span>
            </Flex>
            <Flex gap={1} alignItems={"center"}>
              <h2>Make a call:</h2>
              <span> (+125) 5896 548 9874</span>
            </Flex>
          </div>
          <div>
            <div className={Styles.down3}>
              <FontAwesomeIcon className={Styles.icon} icon={faFacebook} />
              <FontAwesomeIcon className={Styles.icon} icon={faTwitter} />
              <FontAwesomeIcon className={Styles.icon} icon={faLinkedin} />
              <FontAwesomeIcon className={Styles.icon} icon={faInstagram} />
            </div>
          </div>
        </div>
        <div>
          <Flex className={Styles.flex} gap={4} pt={10} flexWrap={"wrap"}>
            <Counter MaxNumber={50} InlineText={"total Students"} />
            <Counter MaxNumber={100} InlineText={"total Experiance"} />
            <Counter MaxNumber={10} InlineText={"total online Courses"} />
          </Flex>
        </div>
      </Grid>
      <News />
    </div>
  );
};

export default TeacherDetail;
