const API_BASE_URL = "http://localhost:4515/api";

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `HTTP error! status: ${response.status}, response:`,
        errorText
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle 204 No Content responses (empty responses for DELETE operations)
    if (response.status === 204) {
      console.log("204 No Content response - operation successful");
      return { success: true, message: "Operation completed successfully" };
    }

    // For other responses, try to parse JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // If not JSON, return success
      console.log("Non-JSON response - operation successful");
      return { success: true, message: "Operation completed successfully" };
    }
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// ==================== USERS ====================
const getAllUsers = async () => {
  return await apiCall("/users");
};

const getUserById = async (userId) => {
  return await apiCall(`/users/${userId}`);
};

const updateUser = async (userId, userData) => {
  return await apiCall(`/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
};

const deleteUser = async (userId) => {
  return await apiCall(`/users/${userId}`, {
    method: "DELETE",
  });
};

// ==================== Subjects ====================
const getAllSubjects = async () => {
  return await apiCall("/subject/all");
};

const getSubjectById = async (carId) => {
  return await apiCall(`/subject/read/${carId}`);
};

const createSubject = async (carData) => {
  return await apiCall("/car/create", {
    method: "POST",
    body: JSON.stringify(carData),
  });
};

const updateSubject = async (subjectId, subjectData) => {
  return await apiCall("/car/update", {
    method: "PUT",
    body: JSON.stringify({ ...subjectData, subjectID: subjectId }),
  });
};

const deleteSubject = async (subjectId) => {
  return await apiCall(`/subject/delete/${subjectId}`, {
    method: "DELETE",
  });
};

// ==================== LOCATIONS ====================
const getAllLocations = async () => {
  return await apiCall("/location/all");
};

const getLocationById = async (locationId) => {
  return await apiCall(`/location/read/${locationId}`);
};

const createLocation = async (locationData) => {
  return await apiCall("/location/create", {
    method: "POST",
    body: JSON.stringify(locationData),
  });
};

const updateLocation = async (locationId, locationData) => {
  return await apiCall("/location/update", {
    method: "PUT", // Your backend uses POST for update
    body: JSON.stringify({ ...locationData, locationID: locationId }),
  });
};

const deleteLocation = async (locationId) => {
  return await apiCall(`/location/delete/${locationId}`, {
    method: "DELETE",
  });
};

// ==================== BOOKINGS ====================
const getAllBookings = async () => {
  return await apiCall("/booking/all");
};

const updateBooking = async (bookingData) => {
  return await apiCall("/booking/update", {
    method: "PUT",
    body: JSON.stringify(bookingData),
  });
};

const cancelBooking = async (bookingId) => {
  return await apiCall(`/booking/cancel/${bookingId}`, {
    method: "DELETE",
  });
};

const deleteBooking = async (bookingId) => {
  return await apiCall(`/booking/delete/${bookingId}`, {
    method: "DELETE",
  });
};

// ==================== INSURANCE ====================
const getAllInsurance = async () => {
  return await apiCall("/insurance");
};

const getInsuranceById = async (insuranceId) => {
  return await apiCall(`/insurance/${insuranceId}`);
};

const createInsurance = async (insuranceData) => {
  return await apiCall("/insurance", {
    method: "POST",
    body: JSON.stringify(insuranceData),
  });
};

const updateInsurance = async (insuranceId, insuranceData) => {
  return await apiCall(`/insurance/${insuranceId}`, {
    method: "PUT",
    body: JSON.stringify(insuranceData),
  });
};

const deleteInsurance = async (insuranceId) => {
  return await apiCall(`/insurance/${insuranceId}`, {
    method: "DELETE",
  });
};

// Export all functions
export const adminApi = {
  // Users
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,

  // Cars
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,

  // Locations
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,

  // Bookings
  getAllBookings,
  updateBooking,
  cancelBooking,
  deleteBooking,

  // Insurance
  getAllInsurance,
  getInsuranceById,
  createInsurance,
  updateInsurance,
  deleteInsurance,

};
