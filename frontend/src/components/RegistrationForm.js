// src/components/RegistrationForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './RegistrationForm.css';

const RegistrationForm = () => {

  
  const states = [    
    { id: "1", name: "Haryana" },
    { id: "2", name: "Delhi" },
  ]

  

  const districts = [
    { id: "3", stateId: "1", name: "Faridabad" },
    { id: "4", stateId: "1", name: "Palwal" },
    { id: "5", stateId: "2", name: "Mandi House" },
    { id: "6", stateId: "2", name: "kalka Ji" },

  ]

  const tehsils = [
    { id: "7", districtId: "3", name: "Faridabad Tehsil" },
    { id: "8", districtId: "4", name: "Palwal Tehsil" },
    { id: "9", districtId: "5", name: "Mandi House Tehsil" },
    { id: "10", districtId: "6", name: "kalka Ji Tehsil" },

  ]

  const Fpsshop = [
    { id: "11", tehsilId: "7", name: "Faridabad Tehsil FPS Shop 1" },
    { id: "12", tehsilId: "8", name: "Palwal Tehsil FPS Shop 1" },
    { id: "13", tehsilId: "9", name: "Mandi House Tehsil FPS Shop 1" },
    { id: "14", tehsilId: "10", name: "kalka Ji Tehsil FPS Shop 1" },

  ]

  
  

  useEffect(() => {
    setState();
  }, [])

  const handlestate = (e) => {            
    setState(e.target.selectedOptions[0].text);
    const dtdist = districts.filter(x => x.stateId === e.target.value);    
    setDistrict(dtdist)    
    setTehsil('')
    setFpsShop('')
  }

  const handledistrict = (e) => {    
    //alert(`on district of State: ${e.target.options[e.target.selectedIndex].text}`);  
    setDistrict1(e.target.options[e.target.selectedIndex].text);   
    const dt = tehsils.filter(x => x.districtId === e.target.value);        
    setTehsil(dt)    
    setFpsShop('')
  }

  const handleTehsil = (e) => {
    setTehsil1(e.target.options[e.target.selectedIndex].text);   
    const dt = Fpsshop.filter(x => x.tehsilId === e.target.value);
    setFpsShop(dt)
  }

  const handleFPS = (e) => {
    setFpsShop1(e.target.options[e.target.selectedIndex].text);       
  }


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('male');
  const [streetAddress1, setStreetAddress1] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');  
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [fpsShop, setFpsShop] = useState('');
  const [district1, setDistrict1] = useState('');
  const [tehsil1, setTehsil1] = useState('');
  const [fpsShop1, setFpsShop1] = useState('');
  const [membercnt, setMembercnt] = useState('');
  const [familyincome, setFamilyincome] = useState('');
  const [scheme, setScheme] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      fullName,
      email,
      phoneNumber,
      birthDate,
      gender,
      streetAddress1,
      streetAddress2,
      state,
      region,
      postalCode,
      district,
      tehsil,
      fpsShop,
      membercnt,
      familyincome,
      scheme
    };
    console.log(registrationData);
  
    try {
     // alert('calling api')
      const response = await axios.post('https://localhost:44386/api/register', registrationData);
      alert(`User registered with ID: ${response.data.id}`);
  
      // Reset form fields after successful registration
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setBirthDate('');
      setGender('male');
      setStreetAddress1('');
      setStreetAddress2('');
      setRegion('');
      setPostalCode('');
      setTehsil('');
      setFpsShop('');
      setState('');
      setDistrict('');
      setMembercnt('');
      setFamilyincome('');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };



  return (
    <section className="container">      
      <label className="Regheader">Application Registration</label>
      <form onSubmit={handleSubmit} className="form">      
        <div className="Registrationinputbox">
          <label className="label">Full Name</label>
          <input type="text" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>

        <div className="Registrationinputbox">
          <label className="label">Email Address</label>
          <input type="text" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="column">
          <div className="Registrationinputbox">
            <label className="label">Phone Number</label>
            <input  placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>
          <div className="Registrationinputbox">
            <label className="label">Birth Date</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
          </div>
        </div>

        <div className="column">
          <div className="Registrationinputbox">
            <label className="label">Annual Family income</label>
            <input type="number" placeholder="Enter Family income" value={familyincome} onChange={(e) => setFamilyincome(e.target.value)} required />
          </div>
          <div className="Registrationinputbox">
            <label className="label">No of family member(count)</label>
            <input type="number" value={membercnt} onChange={(e) => setMembercnt(e.target.value)} required />
          </div>
        </div>

        <div className="gender-box">
          
          <div className="gender-option">
          Gender &nbsp;&nbsp;&nbsp;:&nbsp;
            <div className="gender">
              <input type="radio" id="check-male" name="gender" checked={gender === 'male'} onChange={() => setGender('male')} />
              <label htmlFor="check-male">Male</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-female" name="gender" checked={gender === 'female'} onChange={() => setGender('female')} />
              <label htmlFor="check-female">Female</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-other" name="gender" checked={gender === 'other'} onChange={() => setGender('other')} />
              <label htmlFor="check-other">not to say</label>
            </div>
          </div>
        </div>
        <br></br>
        <label className="label">Address Details</label>
        <div className="column">
          <div className="select-box">            
            <select onChange={(e) => handlestate(e)}>
              <option value="0">Select State</option>
              {
                states &&
                  states !== undefined ?
                  states.map((ctr, index) => {
                    return (
                      <option key={index} value={ctr.id}>{ctr.name}</option>
                    )
                  })
                  : "No State"

              }
            </select>
          </div>
          <div className="select-box">
            <select onChange={(e) => handledistrict(e)}>
              <option value="0" >Select District</option>
              {
                district &&
                district !== undefined ?
                district.map((ctr, index) => {
                    return (
                      <option key={index} value={ctr.id}>{ctr.name}</option>
                    )
                  })
                  : "No District"

              }
            </select>
          </div>
        </div>
        <div className="column">
          <div className="select-box">
            <select id="ddlCity" onChange={(e) => handleTehsil(e)} >
              <option value="0">Select Tehsil</option>
              {
                tehsil &&
                  tehsil !== undefined ?
                  tehsil.map((ctr, index) => {
                    return (
                      <option key={index} value={ctr.id}>{ctr.name}</option>
                    )
                  })
                  : "No City"

              }
            </select>
          </div>
          <div className="select-box">
          <select id="ddlCity" onChange={(e) => handleFPS(e)}>
              <option value="0">Select FPS shop</option>
              {
                fpsShop &&
                fpsShop !== undefined ?
                fpsShop.map((ctr, index) => {
                    return (
                      <option key={index} value={ctr.id}>{ctr.name}</option>
                    )
                  })
                  : "No City"

              }
            </select>
          </div>
        </div>

        <div className="Registrationinputbox address">          
          <input type="text" placeholder="Enter street address" value={streetAddress1} onChange={(e) => setStreetAddress1(e.target.value)} required />
          <input type="text" placeholder="Enter street address line 2" value={streetAddress2} onChange={(e) => setStreetAddress2(e.target.value)} required />
        </div>
        

        <button type="submit" className="button">Submit</button>
      </form>
    </section>
  );
};

export default RegistrationForm;
