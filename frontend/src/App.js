import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import Messenger from './pages/Messaging/Messenger';
import Profile from './pages/User/Profile';
import Guest from './pages/User/Guest';
import Login from './pages/User/Login';
import Registration from './pages/User/Registration';
import ConfirmRegistration from './pages/User/ConfirmRegistration'
import Apply from './pages/Application/Apply';
import Edit from './pages/Application/Edit';
import Review from './pages/Application/Review';
import ViewApplications from './pages/Application/ViewApplications';
import ViewAsList from './pages/Application/ViewAsList';
import ViewOnMap from './pages/Application/ViewOnMap';
import Reviews from './pages/Review/Reviews';
import University from './pages/University/University';
import ActionLog from './pages/University/ActionLog';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/universities" element={<ViewAsList />} />
          <Route path="/universities-map" element={<ViewOnMap />} />
          <Route path="/universities/university" element={<University />} />
          <Route path="/universities/university/action-log" element={<ActionLog />} />

          <Route path="/messenger" element={<Messenger />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/guest" element={<Guest />}/>
          <Route path="/guest/login" element={<Login />}/>
          <Route path="/guest/registration" element={<Registration />}/>
          <Route path="/guest/registration/confirm-registration" element={<ConfirmRegistration />}/>
          
          <Route path="/apply" element={<Apply />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/review" element={<Review />} />
          <Route path="/view-applications" element={<ViewApplications />} />
          
          <Route path="/universities/reviews" element={<Reviews />} />

          <Route path="/*" element={<Main />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
