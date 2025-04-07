import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

function Registration() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData) {
      setFirstname(storedData.firstname || "");
      setLastname(storedData.lastname || "");
      setEmail(storedData.email || "");
      setGender(storedData.gender || "");
      setEducation(storedData.education || "");
      setHobbies(storedData.hobbies || []);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { firstname, lastname, email, gender, education, hobbies };
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log(formData);
    setFirstname('');
    setLastname('');
    setEmail('');
    setGender('');
    setEducation('');
    setHobbies([]);
  };

  const handleHobbiesChange = (e) => {
    const { value, checked } = e.target;
    setHobbies(checked ? [...hobbies, value] : hobbies.filter(hobby => hobby !== value));
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div>
          <label>Gender:</label>
          <input type="radio" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} /> Male
          <input type="radio" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} /> Female
          <input type="radio" value="Others" checked={gender === "Others"} onChange={(e) => setGender(e.target.value)} /> Others
        </div>
        <select value={education} onChange={(e) => setEducation(e.target.value)}>
          <option value="highschool">High School</option>
          <option value="diploma">Diploma</option>
          <option value="bachelor">Bachelor</option>
          <option value="master">Master</option>
          <option value="other">Others</option>
        </select>
        <div>
          <label>Hobbies:</label>
          <input type="checkbox" value="reading" checked={hobbies.includes("reading")} onChange={handleHobbiesChange} /> Reading
          <input type="checkbox" value="sports" checked={hobbies.includes("sports")} onChange={handleHobbiesChange} /> Sports
          <input type="checkbox" value="dancing" checked={hobbies.includes("dancing")} onChange={handleHobbiesChange} /> Dancing
          <input type="checkbox" value="singing" checked={hobbies.includes("singing")} onChange={handleHobbiesChange} /> Singing
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData && storedData.email === email) {
      alert("Login successful!");
      navigate("/register");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Go to Registration</Link>
    </div>
    <div>
          <Link to="/register">Go to Registration</Link>
          <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register/</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
