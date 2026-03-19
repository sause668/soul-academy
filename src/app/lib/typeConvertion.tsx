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