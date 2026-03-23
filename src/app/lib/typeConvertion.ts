export const stringToType = (type: string) => {
    switch (type) {
      case 'Classwork':
        return 'CW';
      case 'Homework':
        return 'HW';
      case 'Quiz':
        return 'Q';
      case 'Test':
        return 'T'; 
      case 'Project':
        return 'P'; 
      default:
        return 'N/A';
    }
}

export const typeToString = (type: string | undefined) => {
    switch (type) {
      case 'CW':
        return 'Classwork';
      case 'HW':
        return 'Homework';
      case 'Q':
        return 'Quiz';
      case 'T':
        return 'Test'; 
      case 'P':
        return 'Project'; 
      default:
        return 'N/A';
    }
}

export const nameToString = (firstName: string, lastName: string) => {
    return `${firstName[0]}. ${lastName}`;
}

export const formatAppointmentDate = (date: Date | undefined) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
};

export const formatAppointmentTime = (time: Date | undefined) => {
  if (!time) return '';
  const [hours, minutes] = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0');
  const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
  const displayHour = parseInt(hours) % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};
//   if (!timeString) return '';
//   const [hours, minutes] = timeString.split(':');
//   const hour = parseInt(hours);
//   const ampm = hour >= 12 ? 'PM' : 'AM';
//   const displayHour = hour % 12 || 12;
//   return `${displayHour}:${minutes} ${ampm}`;
// };

export const formatDate = (date: Date | undefined) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
};

export const formatDateShort = (date: Date | undefined) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
};