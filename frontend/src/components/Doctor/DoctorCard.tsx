interface DoctorCardProps {
    doctor: {
      id: string;
      name: string;
      specialty: string;
      hospital: string;
      rating: number;
      visitFee: string;
      online: boolean;
    };
  }
  
  const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="text-sm text-gray-600">{doctor.specialty}</p>
        <p className="text-sm text-gray-500">{doctor.hospital}</p>
        <p className="text-sm text-gray-500">{doctor.rating} stars</p>
        <p className="text-sm text-gray-500">{doctor.visitFee}</p>
        <p className="text-sm text-gray-500">{doctor.online ? 'Online' : 'Offline'}</p>
      </div>
    );
  };
  
  export { DoctorCard };
  