import { useState, useEffect } from 'react';
import pacientesRegistrados from '../Database/pacientesRegistrados.json';
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const Registro = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientDni: '',
    patientName: '',
    dateTime: '',
    specialty: '',
    isFollowUp: false,
  });
  const [followUpText, setFollowUpText] = useState("");
  const [followUpIcon, setFollowUpIcon] = useState(null);

  useEffect(() => {
    setPatients(pacientesRegistrados.patients);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeDni = (e) => {
    const { name, value } = e.target;
    const patient = patients.find(patient => patient.dni === value);
    const isFollowUp = patient ? patient.followUp : false;

    const followUp = isFollowUp ? "Seguimiento" : "Sin seguimiento";
    const icon = isFollowUp ? <FaCheckCircle size={20} className='text-green-500' /> : <IoMdCloseCircle size={24} className='text-red-500' />;

    setFollowUpText(followUp);
    setFollowUpIcon(icon);
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      isFollowUp: followUp,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dateTimeParts = formData.dateTime.split('T');
    const dateOnly = dateTimeParts[0];
    
    const newAppointment = {
      date: dateOnly,
      specialty: formData.specialty,
      doctor: formData.doctor,
      reason: formData.reason
    };

    setPatients(prevPatients => {
      const patientIndex = prevPatients.findIndex(patient => patient.dni === formData.patientDni);
      if (patientIndex >= 0) {
        const updatedPatients = [...prevPatients];
        updatedPatients[patientIndex].treatmentHistory.push(newAppointment);
        return updatedPatients;
      } else {
        const newPatient = {
          dni: formData.patientDni,
          name: formData.patientName,
          gender: formData.gender, 
          followUp: formData.isFollowUp === 'seguimiento',
          treatmentHistory: [newAppointment],
        };
        return [...prevPatients, newPatient];
      }
    });

    setFormData({
      patientDni: '',
      patientName: '',
      dateTime: '',
      specialty: '',
      doctor: '',
      reason: '',
      isFollowUp: false,
    });

    setFollowUpText("");
    setFollowUpIcon(null);

    alert('Cita registrada');
  };

  return (
    <div className='flex flex-col gap-10 p-5 md:p-10 bg-sky-900 min-h-screen'>
      <h1 className='text-2xl font-bold text-white text-center'>Citas Medicas</h1>
      <div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-">
          <label className="block mb-4">
            <span className="text-white">DNI:</span>
            <input
              type="text"
              name="patientDni"
              value={formData.patientDni}
              onChange={handleChangeDni}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-white">Nombre del Paciente:</span>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-white">Genero del Paciente:</span>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none" name="gender" onChange={handleChange} required>
              <option value={formData.gender}>Masculino</option>
              <option value={formData.gender}>Femenino</option>
              <option value={formData.gender}>Sin definir</option>
            </select>
          </label>
          <label className="block mb-4">
            <span className="text-white">Fecha y Hora:</span>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-white">Especialidad:</span>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none" name="specialty" onChange={handleChange} required>
              <option value="Cardiologia">Cardiología</option>
              <option value="Oftalmología">Oftalmología</option>
              <option value="Pediatría">Pediatría</option>
              <option value="Ginecología">Ginecología</option>
              <option value="Neurología">Neurología</option>
              <option value="Dermatología">Dermatología</option>
              <option value="Psicología">Psicología</option>
              <option value="Nutrición">Nutrición</option>
              <option value="Traumatología">Traumatología</option>
            </select>
          </label>
          <label className="block mb-4">
            <span className="text-white">Doctor:</span>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none" name="doctor" onChange={handleChange} required>
              <option value="Dr. Juan Perez">Dr. Juan Perez</option>
              <option value="Dra. Maria Rodriguez">Dra. Maria Rodriguez</option>
              <option value="Dr. Carlos Sanchez">Dr. Carlos Sanchez</option>
              <option value="Dra. Laura Gomez">Dra. Laura Gomez</option>
              <option value="Dr. Jose Ramirez">Dr. Jose Ramirez</option>
              <option value="Dra. Ana Martinez">Dra. Ana Martinez</option>
              <option value="Dr. Luis Torres">Dr. Luis Torres</option>
              <option value="Dra. Sofia Lopez">Dra. Sofia Lopez</option>
            </select>
          </label>
          <label className="block mb-4">
            <span className="text-white">Razon:</span>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
              required
            />
          </label>
          <label className="flex items-center mb-4">
            <span className="ml-2 text-white flex gap-4">Con seguimiento: <span className='flex items-center gap-2'>{followUpText} {followUpIcon}</span></span>
          </label>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrar Cita
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-xl text-white">Historial de Citas</h2>
        <div className=" overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient, index) => (
                patient.treatmentHistory.map((history, historyIndex) => (
                  <tr key={`${index}-${historyIndex}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.dni}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.specialty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.reason}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Registro;
