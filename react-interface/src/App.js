import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 class="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointment
      </h1>
      <AddAppointment/>
      <Search />
    </div>
  );
}

export default App;
