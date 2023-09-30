import React from 'react'
import Styles from './UpdateCourse.module.css'
import { useNavigate, useParams } from 'react-router';
import {
  Heading,
  Box,
  Button,
  Flex,
  Input,
  Slide,
  Slider,
  Center,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useState } from 'react';
import Done from '../../../Components/DoneModal/Done';
import { useEffect } from 'react';
import { GetSliderById, GetSliderId, UpdateSlider } from '../../../Services/SliderService';
import { GetCourseId, UpdateCourseById } from '../../../Services/CourseService';
import { getAllCourseategories, getAllCourseCategories } from '../../../Services/CategoryService';

export default function UpdateCourse() {
  const [succsess, Setsuccsess] = useState(false)
  const [CourseId, SetCourseId] = useState("")
  const { id } = useParams();
  const [File, SetFile] = useState(null);
  const [FileName, SetFileName] = useState('');
  const [step2Data, setStep2Data] = useState('');
  const [selected, setSelected] = useState(false);
  const [Data, setData] = useState({ data: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [number, setNumber] = useState(0);
  const [thisCourseIncludes, setThisCourseIncludes] = useState([''])
  const [learningObjectives, setLearningObjectives] = useState([''])
  const [selectedValue, setSelectedValue] = useState('');
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const [PreviusData, SetPreviusData] = useState(null);
  const initialThisCourseIncludes = [];
  const initialLearningObjectives = [];
  const handleNavigate = (path) => {
    navigate(path);
  };
  const { mutate } = useMutation(
    (formData) => UpdateCourseById(id, formData),
    {
      onSuccess: (resp) => {
        Setsuccsess(true);
        queryClient.invalidateQueries("sliders");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  const { mutate: Category } = useMutation(() => getAllCourseategories(), {
    onSuccess: (resp) => {
      setData(resp);

    },
    onError: (error) => {
      console.error(error);
    },
  });
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleValueChange = (Course) => {
    const selectedValue = Course.target.value;
    const [GuId, category] = selectedValue.split(',');
    const selectedData = { GuId, category };
    const selectedDataArray = [selectedData];
    setStep2Data(selectedDataArray);
    formik.setFieldValue('CourseCategoryId', GuId)
    formik.setFieldValue('subject', category)
    setSelected(true);
  };
  const handleSearchChange = (Course) => {
    const query = Course.target.value.toLowerCase();
    setSearchQuery(query);
  };
  const fileUploadHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      SetFile(selectedFile);
      SetFileName(selectedFile.name);
      formik.setFieldValue('image', selectedFile)
    } else {
      console.error("No file selected.");
    }
  };
  const { mutate: getCourseById } = useMutation((id) => GetCourseId(id), {
    onSuccess: (resp) => {
      SetCourseId(resp);
    },
    onError: (error) => {
      Setsuccsess(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      image: File,
      CourseCategoryId: '',
      approved: selectedValue,
      title: "",
      price: "",
      aboutCourse: "",
      languge: "",
      orginazer: "",
      subject: "",
      ThisCourseIncludes: initialThisCourseIncludes,
      whatWillLearn: CourseId?.whatWillLearn || [],
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("image", File ? File : " ");
      formData.append("title", values.title ? values.title : CourseId.title);
      formData.append("price", values.price ? values.price : CourseId.price);
      formData.append("aboutCourse", values.aboutCourse ? values.aboutCourse : CourseId.aboutCourse);
      formData.append("approved", selectedValue ? selectedValue : CourseId.approved);
      formData.append("languge", values.languge ? values.languge : CourseId.languge);
      formData.append("orginazer", CourseId.orginazer);
      formData.append("whatWillLearn", artists2 ? artists2 : CourseId.whatWillLearn);
      formData.append("ThisCourseIncludes", artists ? artists : CourseId.ThisCourseIncludes);
      formData.append("courseCategoryId", values.CourseCategoryId ? values.CourseCategoryId : CourseId.courseCategoryId);
      formData.append("subject", values.subject ? values.subject : CourseId.subject);
      formData.append("Instructor", CourseId.Instructor);
      formData.append(
        'CourseCategoryId',
        values.CourseCategoryId || CourseId.courseCategoryId
      );
      formData.append(
        'subject',
        values.subject || CourseId.subject
      );
      if (formData.get("image")) {
        mutate(formData);
      } else {
      }
    },
  });

  const loadCategories = async () => {
    try {
      const response = await getAllCourseategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  const initialString = CourseId.ThisCourseIncludes;
  const [originalString, setOriginalString] = useState(initialString);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    try {
      const cleanedString = initialString.replace(/[\[\]"]+/g, '');
      const parsedArray = cleanedString.split(',').map((item) => item.trim());
      if (Array.isArray(parsedArray)) {
        setArtists((prevArtists) => [...prevArtists, ...parsedArray]);
      } else {
        console.error('The parsed value is not an array.');
      }
    } catch (error) {
      console.error('Error parsing the string:', error);
    }
  }, [initialString]);

  const [name, setName] = useState('');

  function handleClickThisCourseIncludes() {
    const insertAt = 1;
    const nextArtists = [
      ...artists.slice(0, insertAt),
      name,
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  // For the second section (whatWillLearn)
  const initialString2 = CourseId.whatWillLearn;
  const [originalString2, setOriginalString2] = useState(initialString2);
  const [artists2, setArtists2] = useState([]);

  useEffect(() => {
    try {
      const cleanedString = initialString2.replace(/[\[\]"]+/g, '');
      const parsedArray = cleanedString.split(',').map((item) => item.trim());
      if (Array.isArray(parsedArray)) {
        setArtists2((prevArtists) => [...prevArtists, ...parsedArray]);
      } else {
        console.error('The parsed value is not an array.');
      }
    } catch (error) {
      console.error('Error parsing the string:', error);
    }
  }, [initialString2]);

  const [name2, setName2] = useState('');

  function handleClickWhatWillLearn() {
    const insertAt = 1;
    const nextArtists2 = [
      ...artists2.slice(0, insertAt),
      name2,
      ...artists2.slice(insertAt)
    ];
    setArtists2(nextArtists2);
    setName2('');
  }
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('')
  const { mutate: Previus } = useMutation((id) => getCourseById(id), {
    onSuccess: (resp) => {
      SetPreviusData(resp);
    },
    onError: (error) => {
    },
  });
  useEffect(() => {
    Previus(id)
  }, [])
  useEffect(() => {
    if (succsess) {
      const timer = setTimeout(() => {
        Setsuccsess(false);
        handleNavigate("/ControlPanel/CourseList")
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [succsess]);
  useEffect(() => {
    getCourseById(id)
    Category();
  }, []);
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredData(Data.data?.filter((data) =>
      data.category.toLowerCase().includes(query)
    ));
  }, [searchQuery, Data.data]);
  return (
    <Flex p={"40px 0"} width={'100%'}>
      {succsess && (
        <Done
          firstTitle={'Success'}
          seccondTitle={'the Slider Updated Succesfully'}
        />
      )}
        <Flex p={"30px 10px"} gap={5} flexFlow={"column"}>
          <Heading color={"#3270fc"} mb={4}>
            Update Courses
          </Heading>
          <img width={200} src={`/Uploads/Course/${CourseId?.imageRoutue}`} alt="" />
          <Flex>
            <h1 style={{ color: "#3270fc" }} >Title: </h1><span>{CourseId?.title}</span>
          </Flex>
          <Flex>
            <h1 style={{ color: "#3270fc" }} >cost: </h1> <span>{CourseId?.price}$</span>
          </Flex>
          <Flex>
            <h1 style={{ color: "#3270fc" }} >About Course:  </h1><span>{CourseId?.aboutCourse}</span>
          </Flex>
          <Flex>
            <h1 style={{ color: "#3270fc" }} >Course instructor:  </h1><span>{CourseId?.instructor}</span>
          </Flex>
          <Flex>
            <h1 style={{ color: "#3270fc" }} >Course languge:  </h1><span>{CourseId?.languge}</span>
          </Flex>
          <Flex>
            <h1 style={{ color: "#3270fc" }} >rate:  </h1><span>{CourseId?.rate}</span>
          </Flex>
          <Flex>
            <h1 style={{ color: "#3270fc" }} >approved:  </h1><span>{CourseId?.approved?.toString()}</span>
          </Flex>
          <Flex>
            <h1 style={{ color: "#3270fc" }} >Category :  </h1><span>{CourseId?.subject}</span>
          </Flex>
          <form onSubmit={formik.handleSubmit}>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => fileUploadHandler(e)}
            />
            <div>
              <h1 style={{ color: "#3270fc" }} >What Students Will Learn</h1>
              <>
                <Input
                  value={name2}
                  onChange={e => setName2(e.target.value)}
                />
                <button type='none' onClick={handleClickWhatWillLearn}>
                  Insert
                </button>
                <ul>
                  {artists2.map((artist, index) => (
                    <li style={{listStyle:"none"}} key={index}>
                      {artist}{' '}
                      <button
                        onClick={() => {
                          setArtists2((prevArtists) =>
                            prevArtists.filter((a, i) => i !== index)
                          );
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>

              </>
            </div>
            <div>
              <h1 style={{ color: "#3270fc" }} >What Students Will Learn</h1>
              <>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <button onClick={handleClickThisCourseIncludes}>
                  Insert
                </button>
                <ul>
                  {artists.map((artist, index) => (
                    <li style={{listStyle:"none"}}  key={index}>
                      {artist}{' '}
                      <button
                        onClick={() => {
                          setArtists((prevArtists) =>
                            prevArtists.filter((a, i) => i !== index)
                          );
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>

              </>
            </div>
            <Box>
              <Input
                borderColor={"black"}
                variant="flushed"
                pr="4.5rem"
                size="lg"
                placeholder="title"
                onChange={formik.handleChange}
                name="title"
                value={formik.values.title}
                className={Styles.Input}
              />
            </Box>
            <Box>
              <Input
                borderColor={"black"}
                variant="flushed"
                pr="4.5rem"
                size="lg"
                placeholder="aboutCourse"
                onChange={formik.handleChange}
                name="aboutCourse"
                value={formik.values.AboutCourse}
                className={Styles.Input}
              />
            </Box>
            <Box>
              <Input
                borderColor={"black"}
                variant="flushed"
                className={Styles.Input}
                pr="4.5rem"
                size="lg"
                placeholder="price"
                onChange={formik.handleChange}
                name="price"
                value={formik.values.price}
              />
            </Box>
            <Box>
              <Input
                borderColor={"black"}
                variant="flushed"
                pr="4.5rem"
                size="lg"
                placeholder="languge"
                onChange={formik.handleChange}
                name="languge"
                value={formik.values.languge}
                className={Styles.Input}
              />
            </Box>
            <Box>
              <Stack spacing={3}>
                <Select
                  placeholder='Select an option'
                  size='lg'
                  variant='flushed'
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <option value='true'>True</option>
                  <option value='false'>False</option>
                </Select>
              </Stack>
              <p>Selected Value: {selectedValue}</p>
            </Box>
            <Box>
              <Stack>
                <h1>Please Select the Course Category</h1>
                <Input
                  variant='flushed'
                  placeholder='Search Category'
                  size='lg'
                  onChange={handleSearchChange}
                />
                <Select
                  variant='flushed'
                  placeholder='Select Category'
                  size='lg'
                  onChange={handleValueChange}
                >
                  {searchQuery ? (
                    filteredData.map((data) => (
                      <option key={data.guId} value={`${data.guId},${data.category}`}>
                        {data.category}
                      </option>
                    ))
                  ) : (
                    Data.data?.map((data) => (
                      <option key={data.guId} value={`${data.guId},${data.category}`}>
                        {data.category}
                      </option>
                    ))
                  )}
                </Select>
              </Stack>
            </Box>
            <Flex alignItems={'center'} className={Styles.ButtonContainer} justifyContent={"center"} gap={10} flexFlow={"row"}>
              <Button
                className={Styles.Button}
                size="md"
                backgroundColor={"white !important"}
                mt="24px"
                onClick={() => handleNavigate("/ControlPanel/CourseList")}
              >
                Return to menu
              </Button>
              {true && (
                <Button mt="24px" className={Styles.Button} type="submit">
                  Submit
                </Button>
              )}
            </Flex>
          </form>
        </Flex>
    </Flex >
  )
}
