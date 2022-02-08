import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {useState,useEffect} from "react";
import styles from "./Employee.module.css";
import { DisplayEmployees } from './DisplayEmployees';

export const Employee = () =>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [gender,setGender] = useState("male");
    const [date,setDate] = useState("");
    const [loading,setLoading] = useState(true)
    const [hobbies,setHobbies] = useState([]);
    const [data,setData] = useState([]);
    /* HERE I AM GETTING THE CHECKBOX VALUE */
    const HandleCheck = (e) => {
      setHobbies({
        ...hobbies,
        [e.target.name]: e.target.checked
      })
    }
    useEffect(()=>{
      getEmployees()
    },[])
    /* HERE WHEN USER CLICK ON SUMBIT DETAILS BUTTON, THE EMPLOYEE DETAILS ARE STORED IN DB.JSON */
    const handleSubmit = (e) =>{
      e.preventDefault()
      fetch(`http://localhost:3001/Employees`,{
            method: "POST",
            body: JSON.stringify({
              Name:name,
              email:email,
              phone:phone,
              gender:gender,
              dob:date,
              hobbies:hobbies
            }),
            headers: {
                "content-Type":"application/json"
            }
      }).then(getEmployees)
    }
    /* HERE I AM GETTING THE EMPLOYEE DETAILS FROM THE DB.JSON */
    const getEmployees = () =>{
      fetch(`http://localhost:3001/Employees`)
      .then(x=>x.json())
      .then(res => setData(res))
      .then(()=>{setLoading(false)})
      .catch(err=>{
          console.log(err.message)
      })
    }
    return (loading?"....loading please wait":<div>
        <div className={styles.EmployeeForms}>Employees Forms</div>
        <div id={styles.FormLayout}>
          {/* HERE IS THE FORM */}
        <form onSubmit={handleSubmit}>
          <div className={styles.textfieldstyles}>
            <TextField id="outlined-Name" style={{margin:"20px 0px 20px 0px"}} onChange={(e)=>{setName(e.target.value);}} label="Name" variant="outlined" />
            <TextField id="outlined-Email" style={{margin:"20px 0px 20px 0px"}} onChange={(e)=>{setEmail(e.target.value);}} label="Email" variant="outlined" />
            <TextField id="outlined-Phone" style={{margin:"20px 0px 20px 0px"}} onChange={(e)=>{setPhone(e.target.value);}} label="Phone" variant="outlined"/>
            <input type="date" label="dob" className={styles.dob} style={{margin:"20px 0px 20px 0px"}} onChange={(e)=>{setDate(e.target.value)}}/>
          </div>
          <div className={styles.RadioBtnStyles}>
          <FormLabel id="demo-radio-buttons-group-label" className={styles.genderlabel}>Gender</FormLabel>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="male" name="radio-buttons-group" >
            <FormControlLabel value="male" onChange={e=>{setGender(e.target.value)}} control={<Radio />} label="Male" />
            <FormControlLabel value="female" onChange={e=>{setGender(e.target.value)}} control={<Radio />} label="Female" />
            <FormControlLabel value="other" onChange={e=>{setGender(e.target.value)}} control={<Radio />} label="Other" />
          </RadioGroup>
          </div>
          <div className={styles.CheckBoxesStyles}>
          <FormLabel id="demo-radio-buttons-group-label" className={styles.CheckBoxLabel}>Hobbies</FormLabel>
            <FormControlLabel name="eating" onChange={HandleCheck} control={<Checkbox />} label="Eating" />
            <FormControlLabel name="coding" onChange={HandleCheck} control={<Checkbox  />} label="Coding" />
            <FormControlLabel name="sleeping" onChange={HandleCheck} control={<Checkbox  />} label="Sleeping" />
            <FormControlLabel name="music" onChange={HandleCheck} control={<Checkbox  />} label="Listhening Music" />
          </div>
          <Button variant="contained" type="submit" className={styles.submitBtn}>Submit Details</Button>
        </form>
        </div>
        <h1 className={styles.EmployeeDetailsHeading}>Employees Details</h1>
        <div className={styles.DisplayEmployeePropTags}>
            <DisplayEmployees data={data}/>
        </div>
    </div>)
}