import { useState, useEffect, useCallback } from "react";
import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
// import appointmentList from "./data.json";
import AppointmentInfo from "./components/AppointmentInfo";
function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  // now we want to display filter list as per the user search query so we will create new list and not to touch original list
  const filteredAppointments = appointmentList.filter((item) => {
    return (
      // includes method checking query has lowercase compare to data variable
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    );
  });

  // get our data, create function called fetchData and then going to use useCallback hook, inside callback use fetch api which allow to retrieve an element either from a local file or from server
  const fetchData = useCallback(() => {
    fetch("./data.json") // it looks like I'm asking for the data to be in the same folder as my current file, but it really is not. it's instead in the public folder. Now, as i mentioned anything in the public folder will just appear in the same level as your application once it has been pushed up to server
      .then((res) => res.json())
      .then((data) => setAppointmentList(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // if data change in some reason then keep track and update our application automatically
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 class="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointment
      </h1>
      <AddAppointment />
      <Search query={query} onQueryChange={(myQuery) => setQuery(myQuery)} />

      <ul className="divide-y divide-gray-200">
        {/* now instead of appointmentList we will use filteredAppointments 
        {appointmentList.map((appointment) => (
          */}
        {filteredAppointments.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={
              // whenever this event trigger we receive appontmentID
              (appointmentId) =>
                // we use setAppointmentList method and take the appointmentList and then we filter to remove any items that match the ID that we get from the past the list
                setAppointmentList(
                  appointmentList.filter(
                    (appointment) => appointment.id !== appointmentId
                  )
                )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
