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
        break;
    }
}

export const typeToString = (type: string) => {
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
        break;
    }
}

export const nameToString = (firstName: string, lastName: string) => {
    return `${firstName[0]}. ${lastName}`;
}

export const formatAppointmentDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
};

export const formatAppointmentTime = (timeString: string) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
};