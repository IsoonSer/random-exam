import { useEffect, useState } from 'react'
import './App.css'
import Button from './components/Button'
import Dropdown from './components/Dropdown'
import axios from 'axios';
import UploadForm from './components/UploadForm'

function App() {
  const [count, setCount] = useState(0)



  const subjects = ['ทั่วไป', 'อังกฤษ', 'กฏหมาย'];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  // Define the options in an array

  // Handle selection change
  const handleSubject = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value)
    // setSelectedTopic(topics[selectedSubject][0])
    // console.log(selectedTopic)
  };


  const topics: { [key: string]: string[] } = {
    'ทั่วไป': ['ความเข้าใจในภาษา', 'เรียงประโยค', 'อุปมาอุปไมย', 'อนุกรม', 'คณิตทั่วไป', 'ตาราง', 'เงื่อนไขภาษา', 'เงื่อนไขสัญลักษณ์'],
    'กฏหมาย': ['พรบ.แผ่นดิน', 'พรฎ.กิจการ', 'วิปกครอง', 'อาญา', 'พรบ.ละเมิด', 'พรบ.จริยธรรม'],
    'อังกฤษ': ['conver', 'vocab', 'grammar', 'reading']
  };

  const [selectedTopic, setSelectedTopic] = useState(topics[selectedSubject][0]);

  const [maxNumExam, setMaxNumExam] = useState(0);
  // Define the options in an array

  // Handle selection change
  const handleTopic = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  const handleClickButton = () => {
    const numKey = `${selectedSubject}/${selectedTopic}`
    const maxNumExam = examNumState ? examNumState[numKey as keyof Exam] : 0
    if (maxNumExam == 0) {
      setImageSrc('https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Two_red_dice_01.svg/220px-Two_red_dice_01.svg.png')
    } else {

      const number = Math.floor(Math.random() * maxNumExam) + 1; // Random number between 1 and 1000
      const fileName = `${selectedSubject}/${selectedTopic}/${number.toString().padStart(3, '0')}.png`
      setImageSrc('http://localhost:8080/exam/' + fileName)
      console.log()
    }

  }

  const [imageSrc, setImageSrc] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Two_red_dice_01.svg/220px-Two_red_dice_01.svg.png'
  );

  interface Exam {
    "กฏหมาย/พรฎ.กิจการ": number
    "กฏหมาย/พรบ.จริยธรรม": number
    "กฏหมาย/พรบ.ละเมิด": number
    "กฏหมาย/พรบ.แผ่นดิน": number
    "กฏหมาย/วิปกครอง": number
    "กฏหมาย/อาญา": number
    "ทั่วไป/คณิตทั่วไป": number
    "ทั่วไป/ความเข้าใจในภาษา": number
    "ทั่วไป/ตาราง": number
    "ทั่วไป/อนุกรม": number
    "ทั่วไป/อุปมาอุปไมย": number
    "ทั่วไป/เงื่อนไขภาษา": number
    "ทั่วไป/เงื่อนไขสัญลักษณ์": number
    "ทั่วไป/เรียงประโยค": number
    "อังกฤษ/conver": number
    "อังกฤษ/grammar": number
    "อังกฤษ/reading": number
    "อังกฤษ/vocab": number
  }

  const [examNumState, setExamNumState] = useState<Exam | null>(null);

  const [uploadSuccess, setUploadSuccess] = useState(false); // Track upload status

  useEffect(() => {
    // console.log(selectedSubject);
    // setSelectedTopic(topics[selectedSubject][0])

    const fetchNumExam = async () => {
      try {
        // Make an API request using Axios
        const response = await axios.get<Exam>('http://localhost:8080/q');
        const examNum = response.data
        console.log(examNum)
        setExamNumState(examNum)
      } catch (err) {

        console.log(err)
      }
    }

    fetchNumExam()



  }, [selectedSubject, uploadSuccess]);

  useEffect(() => {

    // setSelectedTopic(topics[selectedSubject][0])
    // console.log(topics[selectedSubject][0])


    const numKey = `${selectedSubject}/${selectedTopic}`
    const maxNum = examNumState ? examNumState[numKey as keyof Exam] : 0
    setMaxNumExam(maxNum)
    // console.log(maxNum)

  }, [selectedTopic])

  useEffect(() => {
    setSelectedTopic(topics[selectedSubject][0])
  }, [selectedSubject])




  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e: any) => {
    console.log('file changed')
    setFile(e.target.files[0]);
    setUploadSuccess(false); // Reset upload status on file change
  };

  // Handle the file upload logic (this will be triggered when the button is clicked)
  const handleUploadClick = async () => {
    if (!file) {
      alert('Please select a file before uploading!');
      return;
    }

    // You can implement your custom logic here (e.g., sending the file to the server)
    console.log('File ready for upload:', file);

    // Example: Use a FormData object to send the file to your server.
    const formData = new FormData();
    formData.append('file', file);

    // Perform the actual file upload based on your event (e.g., sending the file to a backend)
    // You can use `fetch` or any other library to send the file.
    // For example:
    // fetch('http://your-server-endpoint/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then((response) => {
    //   if (response.ok) {
    //     alert('File uploaded successfully');
    //   } else {
    //     alert('File upload failed');
    //   }
    // })
    // .catch((err) => {
    //   alert('Error uploading file:', err);
    // });


    try {

      // Adjust the URL and headers based on your backend API
      const response = await axios.post<any>(`http://localhost:8080/upload?subject=${selectedSubject}&topic=${selectedTopic}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // This tells the server you're uploading a file
        },
      });

      // console.log(response.data)
      setUploadSuccess(true);  // Update state on successful upload
    } catch (err: any) {
      console.log(err)
    }
  };



  return (
    <div className='flex flex-row w-screen h-screen bg-green-100'>
      <div className='w-1/3 bg-gray-400 flex flex-col justify-center items-center'>
        <div className='flex flex-col gap-8 w-2/3'>
          <Dropdown options={subjects} handler={handleSubject} selected={selectedSubject}></Dropdown>
          <Dropdown options={topics[selectedSubject]} handler={handleTopic} selected={selectedTopic}></Dropdown>
          {/* <p>{selectedOption}</p> */}
          <Button text='สุ่ม' handler={handleClickButton}></Button>
          <div className='text-center font-bold'>
            มี {maxNumExam} ข้อ
          </div>

          <UploadForm handleFileChange={handleFileChange} handleUploadClick={handleUploadClick} />
          {/* {JSON.stringify(examNumState)} */}
        </div>

      </div>
      <div className='w-2/3 bg-yellow-100 flex flex-col justify-center items-center'>
        <div>
          <img src={imageSrc} alt="" className='max-w-full max-h-screen' />
        </div>
      </div>
    </div>
  )
}

export default App
