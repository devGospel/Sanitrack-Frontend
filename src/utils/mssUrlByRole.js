export const getMssUrlForRole = (role, facilityId) => {
    let url = '';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    console.log('In the mss role function', role, facilityId)

    switch (role) {
      case 'manager':
        url = `${baseUrl}work-order/manager/mss-table?facilityId=${facilityId}`  
        break;
        
      case 'inspector':
        url = `${baseUrl}inspector/mss-table?facilityId=${facilityId}`
        break;
      
      case 'supervisor':
        url = `${baseUrl}inspector/mss-table?facilityId=${facilityId}`
        break;
  
      default:
        url = `${baseUrl}work-order/mss-data`; // Default or fallback endpoint
    }
    
    return url;
  }
  