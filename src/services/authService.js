import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4515/api/authentication', 
});

const STORAGE_KEY = 'heriplay_auth';

const authService = {
  login: async ({ email, password }) => {
    try {
      const res = await API.post('/login', { email, password }); // Use email for login
      if (!res?.data) throw new Error('Invalid response from server');
      const payload = res.data;
      // Normalize payload to include userName
      const normalized = {
        ...payload,
        userName: payload.userName || payload.username || payload.user?.userName || email
      };
      console.log('Login response:', normalized); // DEBUG: check what backend sends
      // persist token first so we can call profile with Authorization
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));

      // Attempt to fetch user profile (backend returns only token on login)
      try {
        const token = normalized.token || payload.token;
        if (token) {
          const profileRes = await axios.get('http://localhost:4515/api/authentication/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const profile = profileRes.data;
          // merge profile data (role, userName, etc) into stored auth
          const merged = { ...normalized, user: profile, role: profile?.role || normalized.role, userName: profile?.userName || normalized.userName };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return merged;
        }
      } catch (err) {
        console.warn('Failed to fetch profile after login', err?.response?.data || err.message);
        // still return whatever we have (token at least)
        return normalized;
      }

      return normalized;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  },

  register: async ({ name, username, email, password, role = 'USER' }) => {
    // Ensure username is not null or empty
    if (!username || username.trim() === '') {
      throw new Error('Username is required and cannot be null or empty');
    }

    // Ensure name is not null or empty
    if (!name || name.trim() === '') {
      throw new Error('Name is required and cannot be null or empty');
    }

    // Split name into firstName and lastName
    const nameParts = (name || "").trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const body = { 
      firstName, 
      lastName, 
      userName: username.trim(), // Ensure userName is trimmed and valid
      password, 
      email,
      role: role.toUpperCase()
    };

    console.log('Register request body:', body); // DEBUG: Log request body

    try {
      const res = await API.post('/register', body);
      console.log('Register response:', res.data); // DEBUG: Log backend response
      return res.data;
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      // Check if backend provides specific validation errors
      if (err.response?.data?.errors) {
        console.error('Validation errors:', err.response.data.errors);
      }
      // Surface backend error messages to the user
      throw new Error(err.response?.data?.message || err.response?.data || 'Registration failed');
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getAuth: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  getToken: () => {
    const auth = authService.getAuth();
    // if backend returns token field, return it, otherwise null
    // Support different shapes: { token }, { data: { token } }, { user: { token } }, { accessToken }
    return auth?.token || auth?.data?.token || auth?.user?.token || auth?.accessToken || null;
  },

  isAuthenticated: () => !!authService.getAuth(),

  submitReview: async ({ rating, comments }) => {
    const auth = authService.getAuth();
    if (!auth || !auth.user?.userId) {
      throw new Error('User is not authenticated or userId is missing');
    }

    const payload = {
      rating,
      comments,
      userId: auth.user.userId, // Ensure userId is included
    };

    const res = await axiosInstance.post('/api/review', payload);
    return res.data;
  },

  getUserRole: () => {
    const auth = authService.getAuth();
    return auth?.role || null; // Return the user's role if available, otherwise null
  },
};

export default authService;
